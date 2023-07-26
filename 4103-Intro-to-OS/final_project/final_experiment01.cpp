#include<iostream>
#include<pthread.h>
using namespace std;

//Definitions
void* counting_thread(void*);

//Global variables
const int N = 6;
int counter = 1;

int main(){
	
    pthread_t threads[N];
	
    for (int i = 0; i < N; i++){
        long int l = i + 1;
        //Create the thread
        pthread_create(
            &threads[i], // Address of pthread variable
            NULL, // No idea wtf this is
            &counting_thread, // Main function of thread
            (void*)l // Argument passed into second_thread
    );
    }

    for (int i = 0; i < N; i ++){
        pthread_join(threads[i], NULL);
    }

    return 0;
}

void* counting_thread(void* thread_id){
	int tid = (long)thread_id;
	
	while(counter != 10){
		cout << "Display " << counter++ << " Thread " << tid << '\n';
	}
	
	cout << "Counter is already 10 Thread " << tid << '\n';
}