///////////////////////////////////////////////////////////////////////////////
// Title:            Linked List - orderedSert
// Files:            main.cpp
// Semester:         3013 Algorithms Spring 2018
//
// Author:           Jeremy Glebe
// Email:            jeremyglebe@gmail.com
// Description:
//       This program implements an integer linked list. In addition to the code
//		written in class, I implemented an ordered insert method.
/////////////////////////////////////////////////////////////////////////////////

#include <iostream>
#include <ctime>

using namespace std;

//Create a container for our list data
struct node {
	int data;
	node* next;
};

/**
* Class: intLinkedList
* Purpose:
*     Implements a singly linked list that holds integers.
* Methods:
*	  void orderedSert(int x)
*     void  frontSert(int x)
*     node* find(int key)
*     node* remove(int key)
*     void  print()
*/
class intLinkedList {
private:
	node* Head;
public:
	intLinkedList() {
		Head = NULL;
	}

	//MY CODE BEGINS HERE

	void orderedSert(int x) {
		if (!Head) {
			//If the list is empty, insert the first item
			Head = new node;
			Head->data = x;
			Head->next = NULL;
		}
		else {
			//If the list isn't empty
			node* insNode = new node;//insNode is the node being inserted
			insNode->data = x;
			insNode->next = Head;//Place it at the front of the list
			//If it is already smaller than Head, make it the new Head
			if (insNode->data <= Head->data)
				Head = insNode;
			else {
				//If the new node isn't smaller than Head
				node* swapNode = NULL;//swapNode is the node we may swap with
				//Keep swapping until we're at the end of the list
				//or in the correct position
				while (insNode->next && insNode->data > insNode->next->data) {
					node* prevNode = swapNode;//prevNode is before insNode
					swapNode = insNode->next;
					insNode->next = swapNode->next;
					swapNode->next = insNode;
					if (prevNode)//We shouldn't do this if the node* is NULL
						//Node behind insNode should now point to swapNode
						prevNode->next = swapNode;
				}
			}
		}
	}

	//MY CODE ENDS HERE

	void frontSert(int x) {
		//empty list case
		if (!Head) {
			Head = new node;
			Head->data = x;
			Head->next = NULL;
		}
		else {//not empty list
			node* T = new node;
			T->data = x;
			T->next = Head;
			Head = T;
		}
	}

	node* Find(int key) {
		node* temp = Head;
		while (temp) {
			if (temp->data == key) {
				return temp;
			}
			temp = temp->next;
		}
		return NULL;
	}

	void Remove(int key) {
		node* result = Find(key);
		if (result) {
			node* temp = Head;
			while (temp->next != result) {
				temp = temp->next;
			}
			temp->next = result->next;
			delete result;
		}
	}

	void print() {
		node* p = Head;
		while (p) {
			cout << p->data << endl;
			p = p->next;
		}
	}
};

//I changed main a little bit in testing
int main() {
	// seed random number generator
	srand(8734587);

	// declare instance of intLinkedList turning
	// a class definition into an "object"
	intLinkedList mylist;

	//Load 10 random ints into our list
	for (int i = 0; i < 10; i++) {
		//mylist.frontSert(rand() % 100);
		mylist.orderedSert(rand() % 100);
	}

	//print the list
	mylist.print();

	system("pause");
}
