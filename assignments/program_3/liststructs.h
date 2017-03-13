#pragma once
#include<iostream>
using namespace std;

template<typename dataType = int>
class Node {
public:
	dataType data;
	Node* next = NULL;
	Node* prev = NULL;
	Node(dataType d, Node* next_i = NULL, Node* prev_i = NULL) {
		data = d;
		prev = prev_i;
		next = next_i;
	}
};

template<typename dataType = int>
class Stack {
	typedef Node<dataType> NODE;
private:
	NODE* top = NULL;
public:
	bool Empty() {
		if (!top)
			return true;
		return false;
	}

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

	dataType Peek() {
		if (!Empty())
			return top->data;
		else
			cout << "\nERROR: Cannot peek at an empty stack!\n";
		return NULL;
	}
};

template<typename dataType = int>
class Queue {
	typedef Node<dataType> NODE;
private:
	NODE* first = NULL;
	NODE* last = NULL;
public:
	bool Empty() {
		if (!first)
			return true;
		return false;
	}

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

	dataType Peek() {
		if (!Empty)
			return first;
		else
			cout << "\nERROR: Cannot peek at an empty queue!\n";
			return NULL;
	}
};