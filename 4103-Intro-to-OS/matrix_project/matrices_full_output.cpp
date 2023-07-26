#include<iostream>
#include<iomanip>
#include<cstdlib>
#include<ctime>
#include<pthread.h>
#include<chrono>
using namespace std;

//Definitions
const int SIZE = 160;
typedef float Matrix[SIZE][SIZE];
void* matrix_processing(void*);
float rfn();
void print_matrices();

//Global variables
Matrix A;
Matrix B;
Matrix M;
int ROW;
int COL;
float ROW_VAL;
float COL_VAL;

int main(){
	
	//Time keeping
	float t = -1;
	
	//Create the thread objects
	pthread_t threads[4];

	//Read in input values
	cin >> ROW >> ROW_VAL >> COL >> COL_VAL;

	//Seed random number generator
	srand(time(NULL));

	//Initialize both matricies to random values 0-1
    for(int r = 0; r < SIZE; r++){
        for(int c = 0; c < SIZE; c++){
			A[r][c] = rfn();
			B[r][c] = rfn();
			M[r][c] = -1;
        }
    }
	cout << "\nINITIALIZING MATRICES\n\n";
	print_matrices();
	
	//Set the input row/col
	for (int i = 0; i < SIZE; i++){
		A[ROW][i] = ROW_VAL;
		B[i][COL] = COL_VAL;
	}
	cout << "\n\nSETTING ROWS AND COLS\n\n";
	print_matrices();
	
	const auto begin_time = chrono::high_resolution_clock::now();
    for (int i = 0; i < 4; i++){
        //Create the thread
        pthread_create(
            &threads[i], // Address of pthread variable
            NULL, // No idea wtf this is
            &matrix_processing, // Main function of thread
            (void*)i // Argument passed into second_thread
    );
    }
	
    for (int i = 0; i < 4; i ++){
        pthread_join(threads[i], NULL);
    }
	auto end_time = chrono::high_resolution_clock::now();
	cout << "\n\nMULTIPLYING MATRICES\n\n";
	print_matrices();
	
	t = chrono::duration_cast<chrono::milliseconds>(end_time - begin_time).count();
	
	cout << "Processing time of the array multiplication was " << t << " ms " << endl;
	cout << "The array results are" << endl;
	cout << '[' << ROW - 1 << "][" << COL << "] is " << M[ROW - 1][COL] << endl;
	cout << '[' << ROW << "][" << COL - 1 << "] is " << M[ROW][COL - 1] << endl;
	cout << '[' << ROW << "][" << COL << "] is " << M[ROW][COL] << endl;
	cout << '[' << ROW << "][" << COL + 1 << "] is " << M[ROW][COL + 1] << endl;
	cout << '[' << ROW + 1 << "][" << COL << "] is " << M[ROW + 1][COL] << endl;
	cout << endl;
	return 0;
}

void print_matrices(){
	
	cout << fixed << setprecision(2);
	
	cout << "Matrix A\n";
    for(int r = 0; r < SIZE; r++){
        for(int c = 0; c < SIZE; c++){
			cout << A[r][c] << ' ';
        }
		cout << '\n';
    }
	
	cout << "\nMatrix B\n";
    for(int r = 0; r < SIZE; r++){
        for(int c = 0; c < SIZE; c++){
			cout << B[r][c] << ' ';
        }
		cout << '\n';
    }
	
	cout << "\nMatrix M\n";
    for(int r = 0; r < SIZE; r++){
        for(int c = 0; c < SIZE; c++){
			cout << M[r][c] << ' ';
        }
		cout << '\n';
    }
	
}

float rfn(){
	float num = rand() % 100;
	num /= 100;
	return num;
}

void* matrix_processing(void* thread_id){
	
	long tid = (long)thread_id;
	
	float first_col = tid * (SIZE / 4);
	float last_col = first_col + (SIZE / 4) - 1;
	cout << "THREAD STARTED! RANGE: " << first_col << " TO " << last_col << '\n';
	
	//For each column of Matrix B that this thread covers
	for (int column = first_col; column <= last_col; column++){
		//For each row in matrix A
		for (int row = 0; row < SIZE; row++){
			float summation = 0;
			for (int c = 0; c < SIZE; c++){
				summation += A[row][c] * B[c][column];
			}
			M[row][column] = summation;
		}
	}
	
}