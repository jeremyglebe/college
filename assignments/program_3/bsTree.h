//File Name: bsTree.h
//Author: Jeremy Glebe
//Date: 2/28/18
//Description: Header file for the binary search tree class. This BST is used
//    to store words and their associated type.

#pragma once
#include<string>
using namespace std;

class BSTree
{
public:
	struct node
	{
		string data;
		string type;
		node *left;
		node *right;
		node()
		{
			data = "";
			type = "";
			left = NULL;
			right = NULL;
		}
		node(string w, string t)
		{
			data = w;
			type = t;
			left = NULL;
			right = NULL;
		}
	};
	BSTree();
	~BSTree();
	int count();
	void insert(string x, string type);
	//Method Name: find
	//Description: Finds a node in the tree, counts the number of comparisons 
	//    in finding it, and also provides you with the word type.
	//Params: string - this is the word to find
	//        string& - This is where the method returns the word type. As it
	//                  can't return two things, I used this as a workaround
	//Returns: int - the number of comparisons made
	int find(string, string&);
	void deleteNode(string key);
	void minValue();
	int height(string key = "");
	string top();
	/* Function to line by line print level order traversal a tree*/
	void printLevelOrder();
	//************************************************************************
	// Recieves a filename to place the GraphViz data into.
	// It then calls the above two graphviz methods to create a data file
	// that can be used to visualize your expression tree.
	//************************************************************************
	void GraphVizOut(string filename);
private:
	node *root;
	int count(node *root);
	void insert(node *&root, node *&temp);
	void print_node(node *n, string label = "");
	node *minValueNode(node *root);
	node *deleteNode(node *&root, string key);
	int height(node *root);
	/* Print nodes at a given level */
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
};