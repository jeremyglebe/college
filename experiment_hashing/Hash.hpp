#pragma once
class Hash
{
public:
    /** Default constructor */
    Hash();
    /**
     * Parameterized constructor
     * @param table_size Integer size of the table.
     */
    Hash(int table_size);
    /**
     * Gets the number of items inserted into the table.
     * @return data member num_items
     */
    int getNumItems();
    /**
     * Gets the load factor of the table. (between 0 and 1)
     * @return data member load_factor
     */
    double getLoadFactor();
    /**
     * Basic hash that just modulos the key.
     * @param key The value that is being hashed into the table.
     * @return The slot in the array which the key was hashed to.
     */
    int Mod_Hash(int key);
    /**
     * Hash method that gives fairly even distribution and is not easily
     * reversed.
     * @param key The value that is being hashed into the table.
     * @return The slot in the array which the key was hashed to.
     */
    int Better_Hash(int key);
    int Lin_Probe(int key, int orig_loc);
    int Double_Probe(int key, int orig_loc);
    /**
     * Prints a neatly formatted display of the values in the Hash Table
     */
    void Print_Table();

private:
    int table_size;
    int num_items;
    double load_factor;
    int *table;
};