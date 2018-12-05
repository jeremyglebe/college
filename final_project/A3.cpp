#include<pthread.h>
#include<iostream>

void* other_threads(void*);
int ARR[5000];
int TOTAL = 0;
pthread_mutex_t M;
int main() {
  
    pthread_t threads[5];
    pthread_mutex_init(&M, NULL);

    //Initialize array values
    for (int i = 0; i < 5000; i++){
        ARR[i] = i + 1;
    }

    for (int i = 0; i < 5; i++){
        long int l = i + 1;
        //Create the thread
        pthread_create(
            &threads[i], // Address of pthread variable
            NULL, // No idea wtf this is
            &other_threads, // Main function of thread
            (void*)l // Argument passed into second_thread
    );
    }

    for (int i = 0; i < 5; i ++){
        pthread_join(threads[i], NULL);
    }

    pthread_mutex_destroy(&M);
    return 0;
}

void* other_threads(void* arg){
    pthread_mutex_lock(&M);

    long int tid = (long int) arg;
    std::cout << "TID: " << tid << std::endl;
    void* ret;

    for(int i = (tid-1)*1000; i <= (tid*1000)-1; i++){
        TOTAL += ARR[i];
    }

    std::cout << TOTAL << std::endl;

    pthread_mutex_unlock(&M);
    return ret;
}