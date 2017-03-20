#include<fstream>
#include"pfixcalc.h"
using namespace std;

int main() {
	ifstream infile;
	ofstream outfile;
	int numExp;
	string expression;
	double result;
	PfixCalc calculator;

	infile.open("exp.txt");
	outfile.open("results.txt");

	infile >> numExp;
	for (int i = 0; i < numExp; i++) {
		infile >> expression;
		result = calculator.evaluate(expression);
		cout << expression << " = " << result << endl;
		outfile << expression << " = " << result << endl;
	}

	infile.close();
	outfile.close();

	system("pause");
	return 0;
}
