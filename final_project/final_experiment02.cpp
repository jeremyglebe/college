#include<iostream>
#include<pthread.h>
using namespace std;

//Definitions
void* counting_thread(void*);

//Global variables
const int N = 6;
int active_thread = 1;
int counter = 1;
pthread_mutex_t mutex;

int main(){
	
    pthread_t threads[N];
    pthread_mutex_init(&mutex, NULL);
	
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

    pthread_mutex_destroy(&mutex);
    return 0;
}

void* counting_thread(void* thread_id){
	int tid = (long)thread_id;
	
	while(counter != 11){
		pthread_mutex_lock(&mutex);
		//Check counter again in case another thread changed it
		if(counter != 11 && active_thread == tid){
			cout << "Display " << counter++ << " Thread " << tid << '\n';
		}
		pthread_mutex_unlock(&mutex);
	}

	pthread_mutex_lock(&mutex);
	cout << "Counter is already 10 Thread " << tid << '\n';
	pthread_mutex_unlock(&mutex);

}