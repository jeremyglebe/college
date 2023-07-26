// Jeremy Glebe
// Hash Class Prototype
// 5243 Algorithm Analysis
// 3/27/2020
// Declares the Hash class, it's members, and it's methods.

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
     * Parameterized constructor from existing array
     * @param array Integer array to form the table out of.
     * @param table_size Integer size of the table.
     */
    Hash(int *array, int table_size);
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
     * Inserts an item using Linear Probing.
     * @param key The value that is being inserted into the table.
     * @param orig_loc The original location that key was hashed to
     */
    int Lin_Probe(int key, int orig_loc);
    /**
     * Inserts an item using Double Probing.
     * @param key The value that is being inserted into the table.
     * @param orig_loc The original location that key was hashed to
     */
    int Double_Probe(int key, int orig_loc);
    /**
     * Prints a neatly formatted display of the values in the Hash Table
     * @param vertical Use vertical format for tables? (can be very long!)
     */
    void Print_Table(std::ostream &out, bool vertical = false);

private:
    int table_size;
    int num_items;
    double load_factor;
    int *table;
};