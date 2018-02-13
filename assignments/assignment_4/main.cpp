/**
*	File: main.cpp
*	Author: Dr. Griffin with a little bit of input from the 3013 Algorithms class
*	Date: 2/12/18 Idk when we started this exactly. I fixed stuff on the 12th.
*	Description: Tests Binary Search Tree class and ensures it can delete properly
*/
using namespace std;
#include"BSTree.h"

int main()
{
	srand(2342);

	BSTree B;

	B.insert(38);
	B.insert(10);
	B.insert(29);
	B.insert(27);
	B.insert(5);
	B.insert(43);
	B.insert(36);
	B.insert(3);
	B.printLevelOrder();
	B.GraphVizOut("before.txt");

	while (B.top()) {
		cout << "removing: " << B.top() << endl;
		B.deleteNode(B.top());
	}

	B.printLevelOrder();
	B.GraphVizOut("after.txt");

	//system("PAUSE");
	return 0;
}
