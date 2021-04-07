import socket
import sys
import threading

HOST = 'localhost'
PORT = int(sys.argv[1])


def Server(host, port):
    # Create socket as specified in assignment, using AF_INET and SOCK_STREAM
    svr = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    print("TCP socket created...")
    # Attempt to bind the server to the host and port
    try:
        # Host and port in a tuple
        svr.bind((host, port))
        print(f"Socket bound to port {port}...")
    except Exception as e:
        # In event of failed bind, print fail message and exit
        print(f"Could not bind to port {port}: {e}")
        sys.exit()
    # Listen for connections
    svr.listen()
    print("Server is listening...")
    # Wait on and accept client connections
    while True:
        cliSocket, cliAddress = svr.accept()
        print(f"Client {cliAddress} connected...")
        # Python's "threading" module uses pthread on non-windows systems
        # (So it meets the pthread requirement)
        cliThread = threading.Thread(
            target=ClientHandler, args=(cliSocket, cliAddress))
        # Start the thread
        cliThread.start()
        print(f"Client {cliAddress} thread started...")
    # Close the server
    svr.close()


def ClientHandler(client: socket.socket, address):
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
        if message == "":
            noRespond += 1
        else:
            noRespond = 0
            print(message)
    client.close()
    print("Client disconnected...")


Server(HOST, PORT)
