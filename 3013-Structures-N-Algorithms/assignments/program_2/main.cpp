/**
* Title: Correcting Binary Search Tree
* Files:
*    - main.cpp
*    - BSTree.h
*    - BSTree.cpp
* Semester: Spring 2018
* Author: Jeremy Glebe
* Email: jeremyglebe@gmail.com
* Description: Program defines and implements a binary search tree class. We test
*              the new class in main.cpp
*/

/**
*	File: main.cpp
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
