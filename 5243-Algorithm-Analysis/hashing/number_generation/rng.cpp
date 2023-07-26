// Jeremy Glebe
// Random Number Generator for Hashing Program
// 5243 Algorithm Analysis
// 3/27/2020
// Generates random data for our hashing program.

#include <ctime>
#include <fstream>
#include <iostream>
using std::cout;
using std::ofstream;

bool isDuplicate(int *array, int size, int val);

int main(int argc, char *argv[])
{
    // Number of items to generate, this should be passed in by the user
    int num_items;
    // Data holds all numbers generated and is used to avoid duplicates
    int *data;
    // Open the output file
    ofstream outfile("random.txt");
    // Seed the random number generator
    srand(time(0));
    // Make sure the user passed in an argument for how many
    // random numbers to generate
    try
    {
        if (argc < 2)
        {
            throw "Argument [num_items] required!\nUsage: RNG.exe num_items";
        }
        else if (argc > 2)
        {
            throw "Too many arguments!\nUsage: RNG.exe num_items";
        }
    }
    catch (char const *e)
    {
        cout << "Error: " << e << '\n';
        exit(2);
    } // End of error handling for arguments
    // Convert the number passed in from a string to an integer
    num_items = atoi(argv[1]);
    // Create an array to hold generated numbers
    data = new int[num_items];
    // Generate the random numbers
    for (int i = 0; i < num_items; i++)
    {
        // Declare a random number called num
        int num = rand();
        // Keep changing the value of num until it is a non-duplicate of all
        // elements in the data array
        while (isDuplicate(data, num_items, num))
        {
            num = rand();
        } // End duplicates check
        // After we've ensured num is not a duplicate, add it to the data array
        // and print it to the output file.
        data[i] = num;
        outfile << num << '\n';
    } // End random number generation
    // Close the output file and exit the program
    outfile.close();
    return 0;
}

/**
 * Checks if a value is a duplicate any any values in a given array.
 * @param array The array to search for duplicates
 * @param size The size of the array to search
 * @param val The value to check for duplicates of
 * @return a boolean which is true if the value is a duplicate
 */
bool isDuplicate(int *array, int size, int val)
{
    // Scane the array for any duplicate elements
    for (int i = 0; i < size; i++)
    {
        // Check if the value matches the array element at i
        if (val == array[i])
        {
            return true;
        }
    } // End array scan
    return false;
}