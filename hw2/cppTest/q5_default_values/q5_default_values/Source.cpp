/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Question 05: When declaring a variable (and not initializing it), is it   *
 * given a default value?                                                    *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

#include <iostream>
using namespace std;

//Globals are often given an default value of zero. Whether the compiler will
//allow you to use an uninitialized global is dependent on the compiler itself.
int global_i;
//Members of classes and structs are given default values
struct mystruct {
	int i;
} i_struct;

int main() {
	//The value of this depends on the compiler.
	int i;
	//Static variables are given a default value.
	static int static_i;
	//Here are the results using Visual Studio 17
	cout << global_i << endl;	//0
	cout << i_struct.i << endl;	//0
	cout << static_i << endl;	//0
	//cout << i << endl;		//Run-Time Check Failure #3 - The variable 'i'
								//is being used without being initalized.

	return 0;
}