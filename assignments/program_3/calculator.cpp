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
