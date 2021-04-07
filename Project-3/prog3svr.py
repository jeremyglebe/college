import socket
import sys
import threading

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
    # Wait on and accept client connections
    while True:
        cliSocket, cliAddress = svr.accept()
        fd = cliSocket.fileno
        print(f"Client ({fd}): Connection Accepted")
        # Python's "threading" module uses pthread on non-windows systems
        # (So it meets the pthread requirement)
        cliThread = threading.Thread(
            target=ClientHandler, args=(cliSocket, cliAddress))
        # Start the thread
        cliThread.start()
        print(f"Client ({fd}): Connection Handler Assigned")
    # Close the server
    svr.close()


def ClientHandler(client: socket.socket, address):
    # Socket file descriptor
    fd = client.fileno()
    # Variable to mark if the client has quit
    quitReceived = False
    # After 3 "blank" responses, we should assume the client disconnected
    noRespond = 0
    while not quitReceived and noRespond < 3:
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
            # The user is attempting to join
            # Check that they have no already joined
            if not fd in database:
                # Extract the username
                username = message.split(' ')[1]
                # Store the user in the database
                database[fd] = username
        elif not fd in database:
            # User is not registered
            print(f"Unable to Locate Client ({fd}) in Database. Discarding: {message}")
            client.send('Unregistered User. Use "JOIN <username>" to Register.\n'.encode())
        else:
            # Unknown command
            # Reset noRespond
            noRespond = 0
            # Print status and send message to client
            print(f"Client ({fd}): Unrecognizable Message. Discarding UNKNOWN Message.")
            client.send("Unknown Message. Discarding UNKNOWN Message.\n".encode())
    # Close the client connection
    client.close()
    # Might print an unknown user message
    if not fd in database:
        print(f"Unable to Locate Client ({fd}) in Database.", end=" ")
    # Remove the client from the database, or None if it isn't there
    database.pop(fd, None)
    # Print the client disconnecting message
    print(f"Client ({fd}): Disconnecting User.")


Server(HOST, PORT)
