calculator.cpp
```cpp
#include<fstream>
#include<iomanip>
#include"pfixcalc.h"
using namespace std;

int main() {
	ifstream infile;	// File input
	ofstream outfile;	// File output
	int numExp;			// Number of expressions to evaluate
	string expression;	// Infix expression to evaluate
	string postfix;		// Postfix expression created
	double result;		// Result of the expression
	PfixCalc calculator;// Calculator object to perform member functions

	infile.open("exp.txt");
	outfile.open("results.txt");

	infile >> numExp;
	for (int i = 0; i < numExp; i++) {
		infile >> expression;
		calculator.inToPost(expression); //Converts the string
		postfix = calculator.PostfixString(); //Returns postfix queue as string
		result = calculator.evaluate(); //Returns evaluation of postfix queue
		outfile << left << setw(13) << expression << " = " << setw(18) \
			<< postfix << " = " << result << endl;
	}

	infile.close();
	outfile.close();

	return 0;
}
```

pfixcalc.h
```cpp
/**
* @ProgramName: Postfix Calculator
* @Author: Jeremy Glebe
* @Description:
*     This program implements a calculator (and relevant functions) that
*		handles expressions by first converting them to postfix form.
* @Course: 1063 Data Structures
* @Semester: Spring 2017
* @Date: Mar 2017
*/

#pragma once
#include "liststructs.h"
#include<string>
using namespace std;

/**
* @FunctionName: OpPr
* @Description:
*     Determines the mathmatical priority of an operator character
* @Params:
*    char op - The character which is to be prioritized
* @Returns:
*    int - Priority on a scale of 1-3, returns -1 if character is not operator
*/
int OpPr(char op) {
	int val;
	switch (op) {
		case '+':
		case '-':
			val = 1;
			break;
		case '*':
		case '/':
		case '%':
			val = 2;
			break;
		case '^':
			val = 3;
			break;
		default:
			val = -1;
	}
	return val;
}

/**
* @ClassName: PfixCalc
* @Description:
*     Implementation of a postfix calculator using list based stacks and queues
*/
class PfixCalc {
private:
	string infix;
	Stack<char> stack;
	Queue<char> pfix;
	Stack<double> ans;

	/**
	* @FunctionName: _setProb
	* @Description:
	*     Assigns the infix string (representing the current problem)
	* @Params:
	*    string ifx - The new infix string to be used
	* @Returns:
	*    void
	*/
	void _setProb(string ifx) {
		infix = ifx;
	}
public:
	/**
	* @FunctionName: inToPost
	* @Description:
	*     Creates the calculator's postfix queue based on the current infix
	*		string
	* @Params:
	*    None
	* @Returns:
	*    void
	*/
	void inToPost(string problem) {

		_setProb(problem);
		// Infix to postfix algorithm as provided
		stack.Push('(');
		infix += ')';
		for (unsigned int i = 0; i < infix.length(); i++) {
			if (infix[i] > 47 && infix[i] < 58) {
				pfix.Push(infix[i]);
			}
			else if (OpPr(infix[i]) > 0) {
				while (OpPr(stack.Peek()) >= OpPr(infix[i])) {
					pfix.Push(stack.Pop());
				}
				stack.Push(infix[i]);
			}
			else if (infix[i] == '(') {
				stack.Push(infix[i]);
			}
			else if (infix[i] == ')') {
				while (stack.Peek() != '(') {
					pfix.Push(stack.Pop());
				}
				stack.Pop();
			}
		}
		return;
	}


	/**
	* @FunctionName: PostfixString
	* @Description:
	*     Converts the postfix queue to a string.
	* @Params:
	*    string problem - The infix problem that we will convert to postfix
	* @Returns:
	*    string - The Postfix queue as a string
	*/
	string PostfixString(string problem = "Undefined") {
		// If a new expression wasn't provided, we're going to assume one has
		// already been converted to postfix with inToPost()
		if (problem != "Undefined")
			inToPost(problem); // Otherwise we will convert the problem first
		return pfix.String();
	}

	/**
	* @FunctionName: evaluate
	* @Description:
	*     Evaluates an expression after converting it to postfix
	* @Params:
	*    string problem - The infix problem that should be evaluated
	* @Returns:
	*    double - Final result of the evaluated expression
	*/
	double evaluate(string problem = "Undefined") {
		// If a new expression wasn't provided, we're going to assume one has
		// already been converted to postfix with inToPost()
		if (problem != "Undefined")
			inToPost(problem); // Otherwise we will convert the problem first
		double x, y, z;
		// Evaluation algorithm as provided
		while (!pfix.Empty()) {
			char temp = pfix.Pop();
			if (temp > 47 && temp < 58) {
				ans.Push(temp - 48);
			}
			else if (OpPr(temp) > 0) {
				x = ans.Pop();
				y = ans.Pop();
				if (temp == '^') {
					z = y;
					for (int i = 1; i < x; i++)
						z *= y;
				}
				else if (temp == '*')
					z = y * x;
				else if (temp == '/')
					z = y / x;
				else if (temp == '%')
					z = int(y) % int(x);
				else if (temp == '+')
					z = y + x;
				else if (temp == '-')
					z = y - x;
				ans.Push(z);
			}
		}
		return ans.Peek();
	}
};
```

liststructs.h
```cpp
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
```
