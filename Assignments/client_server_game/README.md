**Authors**

* Me
* Jeremy Glebe
* Also me
* tis I

**Dates**

Completed May 8th

**Who contributed what granular to the function level**

That's a lot of words but to summarize, I contributed everything.

**Detailed instructions on how to run your client and server**

Requirements first:
* You'll need to install python package `websockets` using this command: `pip3 install websockets`

Right now, to run the server just execute this command:

`python GameServer.py`

To run the client, execute this command:

`python client/Client.py` (or just `python Client.py` from the same folder)
When you run the client it will ask for an host address and port. If you are running client and server on the same machine for testing, then "localhost" as the host and "8080" as the port will work just fine.

To change the guess mode you need to pass in an integer to the command line args.
* `python Client.py 0` utilizes *Bounded Random Guessing*
* `python Client.py 1` utilizes *Binary Search Guessing*

Trying to make a webpage (with GUI!) to connect to for testing client. If I do I will link it right here.

**The platform it was developed on**

Windows 10 and Ubuntu 20

**Any know issues or flaws**

I haven't added multiple client strategies yet. But once I'd finished all the client/server connections and the locking strategy, I felt that I should upload my current progress. Multiple client guessing strategies will come soon.