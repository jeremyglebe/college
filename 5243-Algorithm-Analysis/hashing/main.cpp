/**
 * @author Jeremy Glebe <jeremyglebe@gmail.com>
 * CMPS 5243 Algorithm Analysis, Dr. Halverson
 * 3/27/2020
 * Generates an array of values to be inserted into a hash table. Computes the
 * average number of probes needed to place an element into the hash table
 * through two collision resolution policies. (linear and double)
 */
#include <cmath>
#include <fstream>
#include <iostream>
#include <iomanip>
#include <string>
#include "Hash.hpp"
using namespace std;

void checkArgs(int argc, char *argv[]);
void loadArray(int *data, int num_items, ifstream &input);
int loadTable(Hash &table, int *arr, int num_items, bool doub = false);
void results(ofstream &out, Hash &table, std::string head, int probe_count);
void printHeading(ofstream &out);

int main(int argc, char *argv[])
{
    // Hash table which will have values inserted
    Hash *table;
    // Sum which will hold the total number of probes performed
    int sum;
    // Heading to print above each table results
    string head;
    // Data array to read from and generate tables with
    int *data;
    // Size of the Hash tables
    int table_size;
    // Number of items to insert into the tables
    int num_items;
    // Input and output file streams
    ifstream infile;
    ofstream outfile;
    // Verify that arguments are valid and handle help flag
    checkArgs(argc, argv);
    // Store first two command line args as integers (convert with atoi)
    table_size = atoi(argv[1]);
    num_items = atoi(argv[2]);
    // Create array to hold data items to be inserted into Hash tables
    data = new int[num_items];
    // Open input and output files
    if (argc > 4)
    {
        outfile.open(argv[4]);
    }
    else
    {
        outfile.open("output.txt");
    }
    if (argc > 3)
    {
        infile.open(argv[3]);
    }
    else
    {
        infile.open("input.txt");
    } // End file opening

    // Load the data array
    loadArray(data, num_items, infile);

    // Print the programs heading to the file
    printHeading(outfile);

    // Perform the linear probing test
    // Create the table
    table = new Hash(table_size);
    // Load manually entered values into the table
    sum = loadTable(*table, data, num_items, false);
    // Create a heading for the results
    int loadFactor = round(table->getLoadFactor() * 100);
    string factorString = to_string(loadFactor);
    head = "Linear Probing: " + factorString + "% Loaded";
    // Print the results of the table
    results(outfile, *table, head, sum);
    // Delete the table so we can allocate a new one
    delete table;

    // Perform the double probing test
    // Create the table
    table = new Hash(table_size);
    // Load manually entered values into the table
    sum = loadTable(*table, data, num_items, true);
    // Create a heading for the results
    loadFactor = round(table->getLoadFactor() * 100);
    factorString = to_string(loadFactor);
    head = "Double Probing: " + factorString + "% Loaded";
    // Print the results of the table
    results(outfile, *table, head, sum);
    // Delete the table so we can allocate a new one
    delete table;

    // Close files and exit program
    infile.close();
    outfile.close();
    return 0;
}

/**
 * Checks command line arguments for rules, such as number of arguments or
 * the help flag.
 * @param argc Number of command line arguments
 * @param argv Array of arguments
 */
void checkArgs(int argc, char *argv[])
{
    // Make sure user didn't pass in too many arguments
    try
    {
        if (argc > 5)
        {
            throw "Too many arguments! \
            \nUsage: Hash.exe table_size num_items [input_file] [output_file] \
            \n  - table_size: overall size of the hash tables \
            \n  - num_items: number of items to insert into the hash tables \
            \n  - input_file: path to file to get input from \
            \n  - output_file: path to file to output to";
        }
        else if (argc < 3)
        {
            throw "Too few arguments! \
            \nUsage: Hash.exe table_size num_items [input_file] [output_file] \
            \n  - table_size: overall size of the hash tables \
            \n  - num_items: number of items to insert into the hash tables \
            \n  - input_file: path to file to get input from \
            \n  - output_file: path to file to output to";
        }
    }
    catch (char const *e)
    {
        cout << "Error: " << e << '\n';
        exit(2);
    } // End of error handling for arguments

    // Check if the user wants usage help
    if (argc > 1 && argv[1] == "help")
    {
        cout << "Usage: Hash.exe table_size num_items [input_file] [output_file] \
            \n  - table_size: overall size of the hash tables \
            \n  - num_items: number of items to insert into the hash tables \
            \n  - input_file: path to file to get input from \
            \n  - output_file: path to file to output to\n";
        exit(0);
    } // End usage help
}

void loadArray(int *data, int num_items, ifstream &input)
{
    for (int i = 0; i < num_items; i++)
    {
        input >> data[i];
    }
}

int loadTable(Hash &table, int *array, int num_items, bool double_hash)
{
    // Counts the total number of probes during insertion
    int probe_count = 0;
    // Add each item from the array
    for (int i = 0; i < num_items; i++)
    {
        // Determine an initial Hash position
        int location = table.Mod_Hash(array[i]);
        // Insert and add probes to sum
        if (double_hash)
        {
            probe_count += table.Double_Probe(array[i], location);
        }
        else
        {
            probe_count += table.Lin_Probe(array[i], location);
        }
    }
    return probe_count;
}

/**
 * Prints results for Hash Table experiments.
 * @param table The table which the experiment ran on.
 * @param head The heading to print with the results.
 * @param probe_count The number of probes performed during the experiment.
 */
void results(ofstream &out, Hash &table, string head, int probe_count)
{
    // Set precision of decimal prints
    out << fixed << setprecision(3);
    // Print the linear probing table
    out << head << '\n';
    table.Print_Table(out);
    // Print vertical output to console, good for watching what happens as it
    // happens but not ideal for final results in file.
    cout << head << '\n';
    table.Print_Table(cout, true);
    // Print the average # of probes for insertions during this experiment
    double avg = probe_count / (double)table.getNumItems();
    out << "Average # of Probes: " << avg << "\n\n";
}

/**
 * Prints a heading for the output. Neater when turned in.
 */
void printHeading(ofstream &out)
{
    out << "\
Jeremy Glebe <jeremyglebe@gmail.com>                                     \n\
CMPS 5243 Algorithm Analysis, Dr. Halverson                              \n\
3/27/2020                                                                \n\
Generates an array of values to be inserted into a hash table. Computes  \n\
average number of probes needed to place an element into the hash table  \n\
through two collision resolution policies. (linear and double)           \n\
\n";
}
