/**
* @Homework: Homework-3
* @Author: Jeremy Glebe
* @Description:
*     This program does nothing because its a single method not connected to
		any main function or class or anything at all that would make it do
		anything. For information on what this one particular function WOULD do
		hypothetically, see the method comment block.
* @Course: 1063 Data Structures
* @Semester: Spring 2017
* @Date: 28 02 2017
*/

/**
* @FunctionName: Print
* @Description:
*     This function will print out the contents of a circular array-based queue
		In order to fix the issue of not printing the values when the queue is
		full, I added a single boolean variable, which tells us whether we are
		at the beginning of a full queue. If the queue is full, it is true
		initially. The loop will then make it false. So it will run once if
		Index and Rear are equal, but not the next time Index reaches Rear.
* @Params:
*    NONE
* @Returns:
*    NONE
*/
void Print() {
	int Index = Front;
	bool startFullLoop = Full(); //Is the queue full and is this the start?

	while (Index != Rear || startFullLoop) {
		cout << Q[Index] << " ";
		Index = ((Index + 1) % (ArraySize));
		startFullLoop = false;
	}
	cout << endl;
}