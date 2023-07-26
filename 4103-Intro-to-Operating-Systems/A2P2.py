#Jeremy Glebe
#Intro to Operating Systems
#I wrote this Python script to simulate and solve problem 2
class process:
    def __init__(self, pid, t, p):
        self.pid = pid
        self.time = t
        self.priority = p
        self.ta = 999
        self.ticks = 0
        self.complete = False
    def __repr__(self):
        s = "\nProcess: " + self.pid + "\nTime => " + str(self.time)
        s += "\nPriority => " + str(self.priority)
        s += "\nTurnaround => " + str(self.ta) + "\n"
        return s
    def tick(self):
        if not self.complete:
            self.ticks += 1
            if self.ticks == self.time:
                self.complete = True
        else: 
            print("Cannot tick a completed process!")
    def reset(self):
        self.ta = 999
        self.ticks = 0
        self.complete = False
    def __lt__(self, other):
         return self.priority < other.priority
def AllComplete(l):
    for p in l:
        if not p.complete:
            return False
    return True
plist = []
#Input the processes
for i in range(5):
    pid = input("Process Name) ")
    t = float(input("Process Time) "))
    p = int(input("Process Priority) "))
    plist.append(process(pid, t, p))
print(plist)
#Run a "round robin"
t = 0
avg = 0
while not AllComplete(plist):
    for i in range(5):
        if not plist[i].complete:
            t += 1
            plist[i].tick()
            if plist[i].complete:
                plist[i].ta = t
print("\nRound Robin Results")
for p in plist:
    avg += p.ta
    print(p.pid + str(p.ta))
avg /= 5
print("Mean Turnaround Time: " + str(avg))
#Reset the processes
for p in plist:
    p.reset()
#Run first come first served
t = 0
avg = 0
for i in range(5):
    while not plist[i].complete:
        t += 1
        plist[i].tick()
        if plist[i].complete:
            plist[i].ta = t
print("\nFirst-com First-Served Results")
for p in plist:
    avg += p.ta
    print(p.pid + str(p.ta))
avg /= 5
print("Mean Turnaround Time: " + str(avg))
#Reset the processes
for p in plist:
    p.reset()
#Sort the array by priority
plist.sort(reverse = True)
#Run priority scheduling
t = 0
avg = 0
for i in range(5):
    while not plist[i].complete:
        t += 1
        plist[i].tick()
        if plist[i].complete:
            plist[i].ta = t
print("\nPriority Scheduling Results")
for p in plist:
    avg += p.ta
    print(p.pid + str(p.ta))
avg /= 5
print("Mean Turnaround Time: " + str(avg))
#Order array by shortest first
def GetTime(proc):
    return proc.time
plist.sort(key=GetTime)
#Reset the processes
for p in plist:
    p.reset()
#Run shortest first
t = 0
avg = 0
for i in range(5):
    while not plist[i].complete:
        t += 1
        plist[i].tick()
        if plist[i].complete:
            plist[i].ta = t
print("\nShortest First Results")
for p in plist:
    avg += p.ta
    print(p.pid + str(p.ta))
avg /= 5
print("Mean Turnaround Time: " + str(avg))
#Sample Problem
"""
https://www.cs.cornell.edu/courses/cs4410/2008fa/homework/hw2_soln.pdf
A
11
3
B
6
5
C
2
2
D
4
1
E
8
4
"""