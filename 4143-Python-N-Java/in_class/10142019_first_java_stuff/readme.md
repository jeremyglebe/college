# 10/14/2019
## First time using Java in class
- Print sum from 1 to num
I got distracted during the creation of this relatively small program because
I wanted to print a Unicode summation symbol (∑) and I didn't know how. While
the purpose of the program was to calculate summations, for me it turned into
an experiment on Unicode in Java on Windows. Windows is notoriously fickle when
it comes to any non-ascii characters, but it does support it! And I've managed
to make Unicode work on Windows in several other programming languages, so I
wanted to do so with Java. After much stress, I've found a way to make Windows
use Unicode without relying on the User's personal terminal settings or command
arguments. That said, the code is super ugly to look at. I might wrap it all in
a neat little class for future use later.