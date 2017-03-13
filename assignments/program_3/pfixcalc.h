#pragma once
#include "liststructs.h"
#include<string>
using namespace std;

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

class PfixCalc {
private:
	string infix;
	Stack<char> stack;
	Queue<char> pfix;
	Stack<double> ans;

	void _inToPost() {

		// Infix to postfix algorithm
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

	void _setProb(string ifx) {
		infix = ifx;
		_inToPost();
	}
public:
	double evaluate(string problem) {
		_setProb(problem);
		double x, y, z;
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
					for (int i = 0; i < x; i++)
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