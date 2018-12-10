#include<iostream>
#include<pthread.h>
using namespace std;

//Definitions
void* counting_thread(void*);

//Global variables
const int N = 6;
int counter = 1;
pthread_mutex_t mutexes[N];

int main(){
	
    pthread_t threads[N];
	
	//Initialize mutexes
	for(int i = 0; i < N; i++){
		pthread_mutex_init(&mutexes[i], NULL);
		if (i)
			pthread_mutex_lock(&mutexes[i]);
	}
	
    for (int i = 0; i < N; i++){
        long int l = i;
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

	//Destroy mutexes
	for(int i = 0; i < N; i++){
		pthread_mutex_destroy(&mutexes[i]);
	}
	
    return 0;
}

void* counting_thread(void* thread_id){
	int tid = (long)thread_id;
	
	while(counter != 10){
		pthread_mutex_lock(&mutexes[tid]);
		//We check again in case it has changed while waiting
		if(counter != 10){
			cout << "Display " << counter++ << " Thread " << tid << '\n';
		}else{
			cout << "Counter is already 10 Thread " << tid << '\n';
		}
		pthread_mutex_unlock(&mutexes[(tid + 1) % N]);
	}
	
}