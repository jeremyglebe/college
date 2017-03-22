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
