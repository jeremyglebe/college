# NFL SQL Project

### Description
This is a php program that will get a bunch of interpreted stats about the NFL from a database containing less interpreted stats.

### Instructions
Run the `main.php` file. I don't care how you do it. All its output comes in the form of `echo` commands. So redirect it or put
it in a browser or whatever.

IMPORTANT: You will need to set up a `.CONFIG/db_login.config.php` that defines $USER and $PW

Wanna see the code's results without having to set it up?

Here: http://cs2.mwsu.edu/~glebe/software_tools/A04/main.php

(Or look at output.html)

### File List
- `README.md`
  - Does this really need explanation?
- `main.php`
  - Driver for the code. Runs functions defined in a bunch of other files. Gets you all your results.
- `output.html`
  - Output, if you don't want to run it. ¯\\_(ツ)_/¯
- `q[1-11]_[...].php`
  - These are the 11 files that each correspond with one of the 11 questions. Each contains a function.