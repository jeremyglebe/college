/**
* @ProgramName: Integer List
* @Author: Jeremy Glebe
* @Description:
*     This program  makes a list of integers that can have new integers
*	  inserted at the back or front of the list.
* @Course: 1063 Data Structures
* @Semester: Spring 2017
* @Date: 07 02 2017
*/

#include <iostream>

struct Node {
	int Data;
	Node *Next;
};

using namespace std;

class List {
private:
	Node *Head;
	Node *Tail;
public:
	List() {
		Head = NULL;
		Tail = NULL;
	}

	void FrontSert(int x) {

		// Removed some unneeded code to make the method smaller
		Node *Temp = new Node;
		Temp->Data = x;
		Temp->Next = Head;
		Head = Temp;

		// Added this to account for the tail if the list was empty
		if (!Tail)
			Tail = Head;

	}

	/**
	* @FunctionName: EndSert
	* @Description:
	*     Inserts an integer at the end of a list.
	* @Params:
	*    int x - integer to add to the list
	* @Returns:
	*    void
	*/
	void EndSert(int x) {

		Node *Temp = new Node;
		Temp->Data = x;
		Temp->Next = NULL;

		if (Tail)
			Tail->Next = Temp;
		else
			Head = Temp;

		Tail = Temp;

	}

	void PrintList() {
		if (!Head) {
			cout << "Empty" << endl;
			return;
		}
		else {
			Node *Temp = Head;
			while (Temp != NULL) {
				cout << Temp->Data << "->";
				Temp = Temp->Next;
			}
		}
	}

};

int main() {

	List L;

	// I changed the main function to test the new method
	L.EndSert(5);
	L.PrintList();
	cout << endl;

	L.FrontSert(18);
	L.PrintList();
	cout << endl;

	L.FrontSert(9);
	L.PrintList();
	cout << endl;

	L.FrontSert(51);
	L.PrintList();
	cout << endl;

	L.EndSert(11);
	L.PrintList();
	cout << endl;

	L.FrontSert(22);
	L.PrintList();
	cout << endl;

	system("pause");

	return 0;
}
