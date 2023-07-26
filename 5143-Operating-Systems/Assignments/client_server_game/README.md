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
* You'll need Python3 installed. Just do it.
* You'll need to install python package `websockets` using this command: `pip3 install websockets`

Right now, to run the server just execute this command:

`python3 GameServer.py`

To run the client, execute this command:

`python3 Client.py host port [guess_mode]` (from the client folder)

If you are running client and server on the same machine for testing, then "localhost" as the host and "8080" as the port will work just fine.

To change the guess mode you need to pass in an integer to the command line args.
* `python3 Client.py host port 0` utilizes *Bounded Random Guessing*
* `python3 Client.py host port 1` utilizes *Binary Search Guessing*
* `python3 Client.py host port 2` utilizes *Brute Force Guessing*

Trying to make a webpage (with GUI!) to connect to for testing client. If I do I will link it right here.

**The platform it was developed on**

Windows 10 and Ubuntu 20

**Any know issues or flaws**

The strategies aren't varied in a way that makes choosing between them interesting. Binary is clearly superior and Brute Force is the worst thing you could ever experience. (It would take years, YEARS, to guess the highest possible vallue that the server might generate) I'd like to come up with multiple good strategies that have tradeoffs.
