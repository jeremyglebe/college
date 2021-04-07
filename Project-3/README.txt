My project was written in Python and it is expected that it will be run in
a Python 3 environment. The CSE servers do have Python installed.

Usage:
python3 ./prog3svr.py <port>

Python is interpreted so no compilation needed!

Note:
Weird character encoding errors may occur depending on your terminal.

For reference, it runs find with netcat without any character encoding issues,
so I really think it is a telnet problem. I can't seem to get python to encode
in a way that CSE's telnet likes when connecting using my Mac.

I know we're graded based on CSE server, but if you run into the error can you
at least consider testing it in another environment? I really cannot wrap my
mind around why it is complaining about the encoding.
