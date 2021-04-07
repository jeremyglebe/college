import socket
import sys
import threading

MAX_CONNECTIONS = 10
KILL_THREADS = False
HOST = 'localhost'
PORT = int(sys.argv[1])

database = {}


def Server(host, port):
    # Create socket as specified in assignment, using AF_INET and SOCK_STREAM
    svr = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    # Attempt to bind the server to the host and port
    try:
        # Host and port in a tuple
        svr.bind((host, port))
    except Exception as e:
        # In event of failed bind, print fail message and exit
        print(f"Could not bind to port {port}: {e}")
        sys.exit()
    # Listen for connections
    svr.listen()
    print("Waiting for Incoming Connections...")
    try:
        # Wait on and accept client connections
        while True:
            cliSocket, cliAddress = svr.accept()
            fd = cliSocket.fileno()
            print(f"Client ({fd}): Connection Accepted")
            # Python's "threading" module uses pthread on non-windows systems
            # (So it meets the pthread requirement)
            cliThread = threading.Thread(
                target=ClientHandler, args=(cliSocket, cliAddress), daemon=True)
            # Start the thread
            cliThread.start()
            print(f"Client ({fd}): Connection Handler Assigned")
    except KeyboardInterrupt:
        KILL_THREADS = True
    # Close the server
    svr.close()


def ClientHandler(client: socket.socket, address):
    # Socket file descriptor
    fd = client.fileno()
    # Variable to mark if the client has quit
    quitReceived = False
    # After 3 "blank" responses, we should assume the client disconnected
    noRespond = 0
    while not quitReceived and noRespond < 3 and (not KILL_THREADS):
        # Get message data from the client
        message = client.recv(256)
        # Change the message data into text
        message = message.decode("UTF-8")
        # Remove the newline from the message
        message = message.replace("\n", "")
        # Extract the base command
        command = message.split(' ')[0]
        # Check what the message/command is
        if message == "":
            # Blank message is received, User may have disconnected
            noRespond += 1
        elif command == "QUIT":
            # User is quitting
            quitReceived = True
        elif command == "JOIN":
            # Reset noRespond
            noRespond = 0
            # The user is attempting to join
            # Check that they have no already joined and that there aren't too many users
            if (not fd in database) and len(database) < MAX_CONNECTIONS:
                # Extract the username
                username = message.split(' ')[1]
                # Store the user in the database
                database[fd] = (username, client)
                # Feedback to client
                client.send(f"JOIN {username} Request Accepted\n".encode())
                # Feedback to server
                print(f"Client ({fd}): JOIN {username}")
            elif fd in database:
                # If the user has already joined
                print(
                    f"Client ({fd}): User Already Registered. Discarding JOIN.")
                client.send(
                    f"User Already Registered: Username ({database[fd]}), FD ({fd})\n".encode())
            elif len(database) >= MAX_CONNECTIONS:
                # If the database is full
                print(f"Client ({fd}): Database Full. Disconnecting User.")
                client.send("Too Many Users. Disconnecting User.\n".encode())
                quitReceived = True

        elif not fd in database:
            # Reset noRespond
            noRespond = 0
            # User is not registered
            print(
                f"Unable to Locate Client ({fd}) in Database. Discarding: {message}")
            client.send(
                'Unregistered User. Use "JOIN <username>" to Register.\n'.encode())
        elif command == "LIST":
            # List command, generate a list of names
            names = [f'{v[0]},{k}' for k, v in database.items()]
            names = '\n'.join(names)
            text = "USERNAME,FD\n--------------------\n"
            text += names
            text += "\n--------------------\n"
            # Send the client the list of names
            client.send(text.encode())
            # Print the client's command
            print(f"Client ({fd}): LIST")
        elif command == "BCST":
            # Broadcast command
            # Get the text of the message
            text = ' '.join(message.split(' ')[1:])
            # Print server update
            print(f"Client ({fd}): {message}")
        else:
            # Unknown command
            # Reset noRespond
            noRespond = 0
            # Print status and send message to client
            print(
                f"Client ({fd}): Unrecognizable Message. Discarding UNKNOWN Message.")
            client.send(
                "Unknown Message. Discarding UNKNOWN Message.\n".encode())
    # Close the client connection
    client.close()
    # Might print an unknown user message
    if not fd in database:
        if command == "QUIT":
            print(f"Unable to Locate Client ({fd}) in Database.", end=" ")
        elif command == "JOIN":
            print(f"Database full.", end=" ")
    # Remove the client from the database, or None if it isn't there
    database.pop(fd, None)
    # Print the client disconnecting message
    print(f"Client ({fd}): Disconnecting User.")


Server(HOST, PORT)
