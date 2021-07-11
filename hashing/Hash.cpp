// Jeremy Glebe
// Hash Class Definitions
// 5243 Algorithm Analysis
// 3/27/2020
// Implements the methods in the Hash class.

#include <iostream>
#include <iomanip>
#include "Hash.hpp"

Hash::Hash()
{
    // Set the table size to a default size
    this->table_size = 11;
    this->num_items = 0;
    // Create the table
    this->table = new int[this->table_size];
    // Initialize all values in the table
    for (int i = 0; i < this->table_size; i++)
    {
        this->table[i] = -1;
    }
}

Hash::Hash(int table_size)
{
    // Set the table size
    this->table_size = table_size;
    this->num_items = 0;
    // Create the table
    this->table = new int[this->table_size];
    // Initialize all values in the table
    for (int i = 0; i < this->table_size; i++)
    {
        this->table[i] = -1;
    }
}

Hash::Hash(int *array, int table_size)
{
    // Set the table size
    this->table_size = table_size;
    this->num_items = 0;
    // Create the table
    this->table = new int[this->table_size];
    // Initialize all values in the table
    for (int i = 0; i < this->table_size; i++)
    {
        this->table[i] = array[i];
        // Negative numbers mean empty slots, so increase number of items
        // if key is not negative
        if (array[i] >= 0)
        {
            num_items++;
        }
    }
}

int Hash::getNumItems() { return num_items; }
double Hash::getLoadFactor() { return load_factor; }

int Hash::Mod_Hash(int key)
{
    // Straightforward modulo hash
    return key % table_size;
}

int Hash::Lin_Probe(int key, int orig_loc)
{
    int probes = 1;
    // If the original location is not occupied
    if (table[orig_loc] < 0)
    {
        // Insert the item and return the probe count.
        table[orig_loc] = key;
        num_items++;
        load_factor = (double)num_items / table_size;
        return probes;
    }
    else
    {
        // Set the location to the initial location
        int loc = orig_loc;
        // Continue to probe for new locations until we've found an open slot
        // (< 0) or looped back to the original
        do
        {
            // Set the new location 1 forward
            loc = (loc + 1) % table_size;
            // Increment the number of probes
            probes++;

        } while (table[loc] >= 0 && loc != orig_loc);

        // Once we've finished the loop, check if we ended up back where we
        // started. If we did not, then we can assume we found an empty slot.
        if (loc != orig_loc)
        {
            // In this case, insert the item and return the probe count.
            table[loc] = key;
            num_items++;
            load_factor = (double)num_items / table_size;
            return probes;
        }
        else
        {
            // If we did end up back where we started, there are no available
            // slots. We'll return the negative version of the # of probes to
            // indicate a failed insert, while still recording the number of
            // probes.
            return -1 * probes;
        }
    }
}

int Hash::Double_Probe(int key, int orig_loc)
{
    int probes = 1;
    // Increment is the last digit of the key + 1
    int increment = key % 10 + 1;
    // If the original location is not occupied
    if (table[orig_loc] < 0)
    {
        // Insert the item and return the probe count.
        table[orig_loc] = key;
        num_items++;
        load_factor = (double)num_items / table_size;
        return probes;
    }
    else
    {
        // Set the location to the initial location
        int loc = orig_loc;
        // Continue to probe for new locations until we've found an open slot
        // (< 0) or looped back to the original
        do
        {
            // Set the new location 1 forward
            loc = (loc + increment) % table_size;
            // Increment the number of probes
            probes++;

        } while (table[loc] >= 0 && loc != orig_loc);

        // Once we've finished the loop, check if we ended up back where we
        // started. If we did not, then we can assume we found an empty slot.
        if (loc != orig_loc)
        {
            // In this case, insert the item and return the probe count.
            table[loc] = key;
            num_items++;
            load_factor = (double)num_items / table_size;
            return probes;
        }
        else
        {
            // If we did end up back where we started, there are no available
            // slots. We'll return the negative version of the # of probes to
            // indicate a failed insert, while still recording the number of
            // probes.
            return -1 * probes;
        }
    }
}

void Hash::Print_Table(std::ostream &out, bool vertical)
{
    if (vertical)
    {
        for (int i = 0; i < table_size; i++)
        {
            if (table[i] < 0)
                out << "[   ]" << '\n';
            else
                out << table[i] << '\n';
        }
    }
    else
    {
        // Create the top of the table display
        out << "Index __________________________________________________\n";
        // Add a row for each group of 8 indices
        for (int i = 0; i < table_size; i += 8)
        {
            // Print the index label for each group of 8
            out << std::setw(4) << i << " |";
            // Print the actual values left to right for that group of 8
            for (int j = 0; j < 8; j++)
            {
                // Print the value at index i + j (to get the exact position)
                // only if it does not exceed the size of the table (Table likely
                // isn't an even multiple of 8)
                if (i + j < table_size)
                {
                    // In addition, if the value is -1, it is an empty slot in
                    // the table. So instead of printing -1, we will print a
                    // blank space.
                    if (table[i + j] < 0)
                        out << std::setw(6) << "[   ]";
                    else
                        out << std::setw(6) << table[i + j];
                }
            }
            // Go to the next line before looping
            out << '\n';
        }
    }
}