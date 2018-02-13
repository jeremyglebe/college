/**
*	File: BSTree.h
*	Author: Jeremy Glebe (And originally, Dr. Griffin & 3013 Algorithms class)
*	Date: 2/12/18 Idk when we started this exactly. I fixed stuff on the 12th.
*	Description: Defines a Binary Search Tree class (BSTree). Binary Search Tree
*	can be searched quickly and efficiently. The bug in deletion was
*	fixed in implementation file.
*/
#pragma once
#include <iostream>
#include <fstream>
#include <string>
#include <vector>

//http://www.webgraphviz.com/

using namespace std;

struct node
{
	int data;
	node *left;
	node *right;
	node()
	{
		data = -1;
		left = NULL;
		right = NULL;
	}
	node(int x)
	{
		data = x;
		left = NULL;
		right = NULL;
	}
};
/**
 *
 */
class BSTree
{
private:
	node *root;
	/**
	 * Recursively counts how many nodes are in the tree
	 * @param  root - The root node of the subtree for the current call
	 * @return int  - # of nodes
	 */
	int count(node *root);
	/**
	 * Recursively inserts a new node into the tree
	 * @param root - The root node of the subtree for the current call
	 * @param temp - The node being added to the tree
	 */
	void insert(node *&root, node *&temp);
	/**
	 * Prints formatted information about a tree node
	 * @param n     - The node to print out
	 * @param label - Optional label to identify the node
	 */
	void print_node(node *n, string label);
	/**
	 * Gets the predecessor or successor to the given root node
	 * @param  root - The node who's predecessor/successor we're getting
	 * @return node* - the predecessor or successor to the root
	 */
	node *minValueNode(node *root);
	/**
	 * Recursively deletes a node from the tree
	 * @param  root  - The root node of the subtree for the current call
	 * @param  key   - The data stored in the node we wish to delete
	 * @return node* - The node which should take the place of the item from the
	 * 		   previous call.
	 */
	node *deleteNode(node *&root, int key);
	/**
	 * Recursively determines the height of the tree
	 * @param  root - The root node of the subtree for the current call
	 * @return int  - The height calculated so far in THIS call
	 */
	int height(node *root);
	/**
	 * Prints nodes at a given level
	 * @param root  - The root node of the subtree for the current call
	 * @param level - The level which we are currently printing at
	 */
	void printGivenLevel(node *root, int level);
	//************************************************************************
	// Method to help create GraphViz code so the expression tree can
	// be visualized. This method prints out all the unique node id's
	// by traversing the tree.
	// Recivies a node pointer to root and performs a simple recursive
	// tree traversal.
	//************************************************************************
	void GraphVizGetIds(node *nodePtr, ofstream &VizOut);
	//************************************************************************
	// This method is partnered with the above method, but on this pass it
	// writes out the actual data from each node.
	// Don't worry about what this method and the above method do, just
	// use the output as your told:)
	//************************************************************************
	void GraphVizMakeConnections(node *nodePtr, ofstream &VizOut);
public:
	/**
	 * BSTree Constructor
	 */
	BSTree();
	/**
	 * BSTree Destructor
	 */
	~BSTree();
	/**
	 * Public facing method to count the nodes in the tree
	 * @return int - Number of nodes in the tree
	 */
	int count();
	/**
	 * Public facing method to insert a new node into the tree.
	 * @param x - The value to be inserted
	 */
	void insert(int x);
	/**
	 * Public facing method to delete a value from the tree
	 * @param key - The data of the node to be deleted
	 */
	void deleteNode(int key);
	/**
	 * Method to print the predecessor/successor of the root of the tree
	 */
	void minValue();
	/**
	 * Gets the height of a subtree of the tree(or the tree itself)
	 * @param  key - (Optional) The data in the root node of the subtree
	 * @return int - The height of the tree/subtree
	 */
	int height(int key);
	/**
	 * Gets the value of the root node's data
	 * @return int - Root node's data
	 */
	int top();
	/* Function to line by line print level order traversal a tree*/
	void printLevelOrder();
	//************************************************************************
	// Recieves a filename to place the GraphViz data into.
	// It then calls the above two graphviz methods to create a data file
	// that can be used to visualize your expression tree.
	//************************************************************************
	void GraphVizOut(string filename);
};
