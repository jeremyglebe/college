/**
 * @author Jeremy Glebe <jeremyglebe@gmail.com>
 * CMPS 5243 Algorithm Analysis, Dr. Halverson
 * 3/26/2020
 * Generates an array of values to be inserted into a hash table. Computes the
 * average number of probes needed to place an element into the hash table
 * through two collision resolution policies. (linear and double)
 */
#include <cstdlib>
#include <ctime>
#include <iostream>
#include <iomanip>
#include <string>
#include "Hash.hpp"

int load(Hash &tabl, int numi, bool doub = false, bool manu = false);
void print_heading();
void print_results(Hash &table, std::string head, int probe_count);
void manual_experiment(int table_size, int num_items);
void standard_experiment();

/**
 * Main driver of the program which handles generation of data and computation
 * of results
 * @param argc The number of arguments passed in through the command line
 * @param argv The arguments passed in through the command line
 */
int main(int argc, char *argv[])
{
    print_heading();
    if (argc == 1)
    {
        // If no extra arguments are read from command line, run the experiment
        std::cout << "Standard hashing experiment will run...\n\n";
        standard_experiment();
    }
    else if (argc == 3)
    {
        // If arguments for size and # of items are provided in command line
        std::cout << "Arguments passed for manual entry. Running now...\n\n";
        // Store the values passed in
        int table_size = atoi(argv[1]);
        int num_items = atoi(argv[2]);
        // Run the experiment
        manual_experiment(table_size, num_items);
    }
    else
    {
        // If arguments are otherwise invalid, print the programs usage for the
        // user to reference
        std::cout << "Invalid arguments passed!\n";
        std::cout << "Usage: Hash.exe [table_size] [num_items]\n";
        std::cout << "Manual experiment creates two tables and runs one with\n";
        std::cout << "Linear Probing and the other with Double Hashing.\n";
        std::cout << "  - table_size: size of each of the two tables\n";
        std::cout << "  - num_items: number of items to insert in each table\n";
        std::cout << "Pass in no arguments for the standard Hash experiment\n";
        return 1;
    }
    return 0;
}

/**
 * Loads the passed in Hash table with values. Either via manual entry or
 * through random number generation.
 * @param table Object of type Hash that we are adding data elements to.
 * @param num_elements The number of items to insert into the table
 * @param manual should the data be manually entered? If false, the
 * data will be randomized
 * @param double_hash should we use double hash for insertion? If false, we
 * will use linear probing.
 * @return total number of probes performed during insertion
 */
int load(Hash &table, int num_items, bool double_hash, bool manual)
{
    // Seed random number generator
    if (!manual)
        srand(time(NULL));
    // Counts the total number of probes during insertion
    int probe_count = 0;
    // Insert data items
    for (int i = 0; i < num_items; i++)
    {
        int key;
        // Checks if manually entering data or randomly entering data
        if (manual)
        {
            // Read in a key
            std::cin >> key;
            // End the experiment early if there is not enough data to insert
            if (std::cin.fail())
            {
                std::cout << "ERROR: Not enough data entered.\n";
                std::cout << "You passed in " << num_items << " as the number";
                std::cout << " of elements to be entered in each table.\n";
                std::cout << "You need " << num_items * 2;
                std::cout << " items total to populate ";
                std::cout << "two tables with " << num_items << " items.\n\n";
                return probe_count;
            }
        }
        else
        {
            // Generate a random key
            key = rand();
        }
        // Determine an initial Hash position
        int location = table.Mod_Hash(key);
        // Insert and add probes to sum
        if (double_hash)
        {
            probe_count += table.Double_Probe(key, location);
        }
        else
        {
            probe_count += table.Lin_Probe(key, location);
        }
    }
    return probe_count;
}

/**
 * Prints results for the standard and manual experiments.
 * @param table The table which the experiment ran on.
 * @param head The heading to print with the results.
 * @param probe_count The number of probes performed during the experiment.
 */
void print_results(Hash &table, std::string head, int probe_count)
{
    // Set precision of decimal prints
    std::cout << std::fixed << std::setprecision(3);
    // Print the linear probing table
    std::cout << head << '\n';
    table.Print_Table();
    // Print the average # of probes for insertions during this experiment
    double avg = probe_count / (double)table.getNumItems();
    std::cout << "Average # of Probes: " << avg << "\n\n";
}

/**
 * Prints a heading for the output. Neater when turned in.
 */
void print_heading()
{
    std::cout << "\
Jeremy Glebe <jeremyglebe@gmail.com>                                     \n\
CMPS 5243 Algorithm Analysis, Dr. Halverson                              \n\
3/24/2020                                                                \n\
Generates an array of values to be inserted into a hash table. Computes  \n\
average number of probes needed to place an element into the hash table  \n\
through two collision resolution policies. (linear and double)           \n\
\n";
}

/**
 * Creates two tables of the passed in size and populates them with num_items
 * number of manually entered data elements. One table uses Linear Probing, the
 * other uses Double Hashing. Prints the tables and their average number of
 * probes per insert.
 * @param table_size The number of slots in the table.
 * @param num_items The number of data elements to enter.
 */
void manual_experiment(int table_size, int num_items)
{
    Hash *table;
    int sum;

    // Perform the linear probing test
    // Create the table
    table = new Hash(table_size);
    // Load manually entered values into the table
    sum = load(*table, num_items, false, true);
    // Print the results of the table
    print_results(*table, "Manual Experiment: Linear Probing", sum);
    // Delete the table so we can allocate a new one
    delete table;

    // Perform the double probing test
    // Create the table
    table = new Hash(table_size);
    // Load manually entered values into the table
    sum = load(*table, num_items, true, true);
    // Print the results of the table
    print_results(*table, "Manual Experiment: Double Hashing", sum);
    // Delete the table before we finish the program
    delete table;
}

/**
 * Creates two tables of size 311 and populates them with 205 and 250 data
 * elements. One table uses Linear Probing, the other uses Double Hashing.
 * Prints the tables and their average number of probes per insert.
 */
void standard_experiment()
{
    Hash *table;
    int sum;
    std::string head;
    int table_size = 311;
    int low_load = 205;
    int high_load = 250;

    // Perform the linear probing at 66% test
    // Create the table
    table = new Hash(table_size);
    // Load manually entered values into the table
    sum = load(*table, low_load, false, false);
    // Create a heading for the results
    head = "Linear Probing: 66% Loaded";
    // Print the results of the table
    print_results(*table, head, sum);
    // Delete the table so we can allocate a new one
    delete table;

    // Perform the linear probing at 80% test
    // Create the table
    table = new Hash(table_size);
    // Load manually entered values into the table
    sum = load(*table, high_load, false, false);
    // Create a heading for the results
    head = "Linear Probing: 80% Loaded";
    // Print the results of the table
    print_results(*table, head, sum);
    // Delete the table so we can allocate a new one
    delete table;

    // Perform the double probing at 66% test
    // Create the table
    table = new Hash(table_size);
    // Load manually entered values into the table
    sum = load(*table, low_load, true, false);
    // Create a heading for the results
    head = "Double Hashing: 66% Loaded";
    // Print the results of the table
    print_results(*table, head, sum);
    // Delete the table so we can allocate a new one
    delete table;

    // Perform the double probing at 80% test
    // Create the table
    table = new Hash(table_size);
    // Load manually entered values into the table
    sum = load(*table, high_load, true, false);
    // Create a heading for the results
    head = "Double Hashing: 80% Loaded";
    // Print the results of the table
    print_results(*table, head, sum);
    // Delete the table so we can allocate a new one
    delete table;
}
