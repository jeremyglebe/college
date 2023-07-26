My project was written in Javascript and it is expected that it will be run in
a NodeJS environment. The CSE servers do have Node installed. I have included a
shebang at the top of each script that should make it run using Node
automatically.

Usage:
./project1svr.js <port>
./project1cli.js <hostname> <port>

If, for any reason, the shebang is not working and you need to launch Node
directly, the command only slightly changes.

Usage:
node ./project1svr.js <port>
node ./project1cli.js <hostname> <port>

Javascript is interpreted so no compilation needed!