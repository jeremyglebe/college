# Telnet Server
This project is a server for telnet connections that handles simple chat requests.
Commands for the telnet client includes:
```
JOIN {user_name}
LIST
BCST {message}
MESG {user} {message}
QUIT
```

Usage:
python3 ./prog3svr.py <port>

Python is interpreted so no compilation needed!

### Encoding
There was a fun/disastrous error that occured while I was working on this project for class. I actually turned in the assignment the minute before it was due because I struggled for hours with this. The error was that python kept failing to encode/decode characters sent over telnet. It turns out it was actually just the difference of line endings between Linux, MacOS, and Windows. I had to remember to strip `\r`s and `\n`s.