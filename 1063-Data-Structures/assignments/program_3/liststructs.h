/**
* @ProgramName: List Based Structures
* @Author: Jeremy Glebe
* @Description:
*     This program implements various list based structures and relevant
*		classes and functions.
* @Course: 1063 Data Structures
* @Semester: Spring 2017
* @Date: Mar 2017
*/

#pragma once
#include<iostream>
using namespace std;

/**
* @ClassName: Node
* @Description:
*     Implementation of a list Node for use in other structures
*/
template<typename dataType = int>
class Node {
public:
	dataType data;
	Node* next = NULL;
	Node* prev = NULL;

	/**
	* @FunctionName: Node
	* @Description:
	*     Node constructor
	* @Params:
	*    dataType d - The data that the new Node holds
	*	 Node* next_i - The Node that should come after this one
	*	 Node* prev_i - The Node that should come before this one
	*/
	Node(dataType d, Node* next_i = NULL, Node* prev_i = NULL) {
		data = d;
		prev = prev_i;
		next = next_i;
	}
};

/**
* @ClassName: Stack
* @Description:
*     Implementation of a list based Stack
*/
template<typename dataType = int>
class Stack {
	typedef Node<dataType> NODE;
private:
	NODE* top = NULL;
public:
	/**
	* @FunctionName: Empty
	* @Description:
	*     Checks to see if Stack is empty.
	* @Params:
	*    None
	* @Returns:
	*    bool - true if empty / false otherwise
	*/
	bool Empty() {
		if (!top)
			return true;
		return false;
	}

	/**
	* @FunctionName: Push
	* @Description:
	*     Adds a new Node to the top of the stack
	* @Params:
	*    dataType d - The data that the new Node holds
	* @Returns:
	*    void
	*/
	void Push(dataType d) {
		NODE* temp = new NODE(d);
		if (Empty())
			top = temp;
		else {
			temp->prev = top;
			top->next = temp;
			top = temp;
		}
	}

	/**
	* @FunctionName: Pop
	* @Description:
	*     Removes the top Node of the stack and returns its data
	* @Params:
	*    None
	* @Returns:
	*    dataType - returns the data of the top Node
	*/
	dataType Pop() {
		dataType popped;
		if (!Empty() && top->prev) {
			popped = top->data;
			top = top->prev;
			delete top->next;
			top->next = NULL;
		}
		else if (!Empty()) {
			popped = top->data;
			delete top;
			top = NULL;
		}
		else {
			cout << "\nERROR: Cannot pop from an empty stack!\n";
			popped = NULL;
		}
		return popped;
	}

	/**
	* @FunctionName: Peek
	* @Description:
	*     Checks the top Node of the stack and returns its data
	* @Params:
	*    None
	* @Returns:
	*    dataType - returns the data of the top Node
	*/
	dataType Peek() {
		if (!Empty())
			return top->data;
		else
			cout << "\nERROR: Cannot peek at an empty stack!\n";
		return NULL;
	}

	/**
	* @FunctionName: Stream
	* @Description:
	*     Sends the Stack to an ostream
	* @Params:
	*    ostream& - reference to an ostream object
	* @Returns:
	*    void
	*/
	void Stream(ostream& os) {
		if (top) {
			NODE* temp = top;
			os << temp->data;
			if (temp->prev)
				os << " ";
			while (temp->prev) {
				temp = temp->prev;
				os << temp->data;
				if (temp->prev)
					os << " ";
			}
		}
		return;
	}
};

/**
* @ClassName: Queue
* @Description:
*     Implementation of a list based Queue
*/
template<typename dataType = int>
class Queue {
	typedef Node<dataType> NODE;
private:
	NODE* first = NULL;
	NODE* last = NULL;
public:
	/**
	* @FunctionName: Empty
	* @Description:
	*     Checks to see if Queue is empty.
	* @Params:
	*    None
	* @Returns:
	*    bool - true if empty / false otherwise
	*/
	bool Empty() {
		if (!first)
			return true;
		return false;
	}

	/**
	* @FunctionName: Push
	* @Description:
	*     Adds a new Node to the back of the Queue
	* @Params:
	*    dataType d - The data that the new Node holds
	* @Returns:
	*    void
	*/
	void Push(char d) {
		NODE* temp = new NODE(d);
		if (Empty()) {
			first = temp;
			last = temp;
		}
		else {
			temp->prev = last;
			last->next = temp;
			last = temp;
		}
	}

	/**
	* @FunctionName: Pop
	* @Description:
	*     Removes the first Node in the Queue and returns its data
	* @Params:
	*    None
	* @Returns:
	*    dataType - returns the data of the first Node
	*/
	dataType Pop() {
		dataType popped;
		if (!Empty() && first->next) {
			popped = first->data;
			first = first->next;
			delete first->prev;
			first->prev = NULL;
		}
		else if (!Empty()) {
			popped = first->data;
			delete first;
			first = NULL;
			last = NULL;
		}
		else {
			cout << "\nERROR: Cannot pop items from an empty queue!\n";
			popped = NULL;
		}
		return popped;
	}

	/**
	* @FunctionName: Peek
	* @Description:
	*     Checks the Node at the front of the queue and returns its data
	* @Params:
	*    None
	* @Returns:
	*    dataType - returns the data of the first Node
	*/
	dataType Peek() {
		if (!Empty)
			return first;
		else
			cout << "\nERROR: Cannot peek at an empty queue!\n";
			return NULL;
	}

	/**
	* @FunctionName: String
	* @Description:
	*     Converts the Queue into a string.
	* @Params:
	*    bool - should the string be reversed
	* @Returns:
	*    string - the Queue as a string
	*/
	string String(bool reverse = 0) {
		string qstring = "";
		if (!reverse) {
			NODE* temp = first;
			while (temp) {
				qstring += temp->data;
				temp = temp->next;
				if (temp)
					qstring += " ";
			}
		}
		else {
			NODE* temp = last;
			while (temp) {
				qstring += temp->data;
				temp = temp->prev;
				if (temp)
					qstring += " ";
			}
		}
		return qstring;
	}

	/**
	* @FunctionName: Stream
	* @Description:
	*     Sends the Queue to an ostream
	* @Params:
	*    ostream& - reference to an ostream object
	* @Returns:
	*    void
	*/
	void Stream(ostream& os) {
		if (first) {
			NODE* temp = first;
			os << temp->data;
			if (temp->next)
				os << " ";
			while (temp->next) {
				temp = temp->next;
				os << temp->data;
				if (temp->next)
					os << " ";
			}
		}
		return;
	}
};