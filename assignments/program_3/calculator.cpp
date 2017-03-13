#include<fstream>
#include"pfixcalc.h"
using namespace std;

int main() {
	ifstream infile;
	int numExp;
	string expression;
	double result;
	PfixCalc calculator;

	infile.open("exp.txt");

	infile >> numExp;
	for (int i = 0; i < numExp; i++) {
		infile >> expression;
		result = calculator.evaluate(expression);
		cout << expression << " = " << result << endl;
	}

	infile.close();

	system("pause");
	return 0;
}
