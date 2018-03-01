//File: bsTree.cpp
//Edited by: Jeremy Glebe
//Description of changes: I've separated the cpp into a cpp and header because
//    the assignment specified uploading a bsTree.h file. I've also ensured that
//    the tree will not include duplicates of items (by modifying insert) as we
//    were told in class to avoid duplicate words. Added a new find method that
//    will return the number of comparisons made in the search.

#include"bsTree.h"
#include <iostream>
#include <fstream>
#include <vector>

//http://www.webgraphviz.com/

using namespace std;

//Method Name: find
//Description: Finds a node in the tree, counts the number of comparisons
//    in finding it, and also provides you with the word type.
//Params: string - this is the word to find
//        string& - This is where the method returns the word type. As it
//                  can't return two things, I used this as a workaround
//Returns: int - the number of comparisons made
int BSTree::find(string key, string &type) {
	node *nodePtr = root;
	int comparisons = 0;
	//Find the key
	while (nodePtr) {
		if (nodePtr->data == key) {
			//We found it!
			comparisons++;
			type = nodePtr->type;
			return comparisons;
		}
		else if (key < nodePtr->data) {
			//Go left
			comparisons++;
			nodePtr = nodePtr->left;
		}
		else {
			//Go right
			comparisons++;
			nodePtr = nodePtr->right;
		}
	}
	//Key not found
	return -1;
}
/**
 * Counts the number of nodes in the tree
 * @param  root - the root of the tree
 * @return      number of items
 */
int BSTree::count(node *root)
{
	if (!root)
	{
		return 0;
	}
	else
	{
		return 1 + count(root->left) + count(root->right);
	}
}
/**
 * Inserts a new item into the tree
 * @param root - the root of the tree
 * @param temp - the pointer that traverses the list
 */
void BSTree::insert(node *&root, node *&temp)
{
	if (!root)
	{
		root = temp;
	}
	else
	{
		if (temp->data < root->data)
		{
			insert(root->left, temp);
		}
		else if (temp->data > root->data)
		{
			insert(root->right, temp);
		}
	}
}
/**
 * prints a node of the tree
 * @param n     - the node to print
 * @param label - an optional label to include with the node
 */
void BSTree::print_node(node *n, string label)
{
	if (label != "")
	{
		cout << "[" << label << "]";
	}
	cout << "[[" << n << "][" << n->data << "]]\n";
	if (n->left)
	{
		cout << "\t|-->[L][[" << n->left << "][" << n->left->data << "]]\n";
	}
	else
	{
		cout << "\t\\-->[L][null]\n";
	}
	if (n->right)
	{
		cout << "\t\\-->[R][[" << n->right << "][" << n->right->data << "]]\n";
	}
	else
	{
		cout << "\t\\-->[R][null]\n";
	}
}
/**
 * minValueNode gets the predecessor or sucessor of a node
 * @param  root - the node to get a sucessor for
 * @return      the sucessor node
 */
BSTree::node *BSTree::minValueNode(node *root)
{
	node *current = root;

	if (root->right)
	{
		current = root->right;
		while (current->left != NULL)
		{
			current = current->left;
		}
	}
	else if (root->left)
	{
		current = root->left;
		while (current->right != NULL)
		{
			current = current->right;
		}
	}

	return current;
}
/**
 * Deletes a node from a tree
 * @param  root the root of the tree
 * @param  key  the item to delete
 * @return     node to replace calling node in recursive calls
 */
BSTree::node *BSTree::deleteNode(node *&root, string key)
{
	if (!root)
	{
		return NULL;
	}
	if (key < root->data)
	{
		cout << "going left" << endl;
		root->left = deleteNode(root->left, key);
	}
	else if (key > root->data)
	{
		cout << "going right" << endl;
		root->right = deleteNode(root->right, key);
	}
	else
	{
		if (root->left == NULL)
		{
			node *temp = root->right;
			delete root;
			return temp;
		}
		else if (root->right == NULL)
		{
			node *temp = root->left;
			delete root;
			return temp;
		}

		// node with two children: Get the inorder successor (smallest
		// in the right subtree)
		node *temp = minValueNode(root);

		print_node(temp, "minvaluenode");

		// Copy the inorder successor's content to this node
		root->data = temp->data;

		// Delete the inorder successor
		root->right = deleteNode(root->right, temp->data);
	}
	return root;
}
/**
 * Gets the height of the tree
 * @param  root - root of the tree
 * @return      the height of the tree
 */
int BSTree::height(node *root)
{
	if (!root)
	{
		return 0;
	}
	else
	{
		int left = height(root->left);
		int right = height(root->right);
		if (left > right)
		{
			return left + 1;
		}
		else
		{
			return right + 1;
		}
	}
}
/* Print nodes at a given level */
void BSTree::printGivenLevel(node *root, int level)
{
	if (root == NULL)
		return;
	if (level == 1)
	{
		print_node(root);
	}
	else if (level > 1)
	{
		printGivenLevel(root->left, level - 1);
		printGivenLevel(root->right, level - 1);
	}
}
//************************************************************************
// Method to help create GraphViz code so the expression tree can
// be visualized. This method prints out all the unique node id's
// by traversing the tree.
// Recivies a node pointer to root and performs a simple recursive
// tree traversal.
//************************************************************************
void BSTree::GraphVizGetIds(node *nodePtr, ofstream &VizOut)
{
	static int NullCount = 0;
	if (nodePtr)
	{
		GraphVizGetIds(nodePtr->left, VizOut);
		VizOut << "node" << nodePtr->data
			<< "[label=\"" << nodePtr->data << "\\n"
			//<<"Add:"<<nodePtr<<"\\n"
			//<<"Par:"<<nodePtr->parent<<"\\n"
			//<<"Rt:"<<nodePtr->right<<"\\n"
			//<<"Lt:"<<nodePtr->left<<"\\n"
			<< "\"]" << endl;
		if (!nodePtr->left)
		{
			NullCount++;
			VizOut << "nnode" << NullCount << "[label=\"X\",shape=point,width=.15]" << endl;
		}
		GraphVizGetIds(nodePtr->right, VizOut);
		if (!nodePtr->right)
		{
			NullCount++;
			VizOut << "nnode" << NullCount << "[label=\"X\",shape=point,width=.15]" << endl;
		}
	}
}
//************************************************************************
// This method is partnered with the above method, but on this pass it
// writes out the actual data from each node.
// Don't worry about what this method and the above method do, just
// use the output as your told:)
//************************************************************************
void BSTree::GraphVizMakeConnections(node *nodePtr, ofstream &VizOut)
{
	static int NullCount = 0;
	if (nodePtr)
	{
		GraphVizMakeConnections(nodePtr->left, VizOut);
		if (nodePtr->left)
			VizOut << "node" << nodePtr->data << "->"
			<< "node" << nodePtr->left->data << endl;
		else
		{
			NullCount++;
			VizOut << "node" << nodePtr->data << "->"
				<< "nnode" << NullCount << endl;
		}

		if (nodePtr->right)
			VizOut << "node" << nodePtr->data << "->"
			<< "node" << nodePtr->right->data << endl;
		else
		{
			NullCount++;
			VizOut << "node" << nodePtr->data << "->"
				<< "nnode" << NullCount << endl;
		}

		GraphVizMakeConnections(nodePtr->right, VizOut);
	}
}
/**
 * Constructor
 */
BSTree::BSTree()
{
	root = NULL;
}
/**
 * Destructor
 */
BSTree::~BSTree()
{
}
/**
 * Counts the number of items in the tree
 * @return number of items in the tree
 */
int BSTree::count()
{
	return count(root);
}
/**
 * Inserts a new item into the tree
 * @param x    - the word to insert
 * @param type - the type of word to use
 */
void BSTree::insert(string x, string type)
{
	node *temp = new node(x, type);
	insert(root, temp);
}
/**
 * Deletes a node from the tree
 * @param key - the word to delete
 */
void BSTree::deleteNode(string key)
{
	deleteNode(root, key);
}
/**
 * Prints the smallest node of the tree
 */
void BSTree::minValue()
{
	print_node(minValueNode(root), "minVal");
}
/**
 * Gets the height of the tree
 * @param  key - the node to count the height from
 * @return     height
 */
int BSTree::height(string key)
{
	if (key != "")
	{
		//find node
	}
	else
	{
		return height(root);
	}
	return 0;
}

string BSTree::top()
{
	if (root)
		return root->data;
	else
		return 0;
}
/* Function to line by line print level order traversal a tree*/
void BSTree::printLevelOrder()
{
	cout << "Begin Level Order===================\n";
	int h = height(root);
	int i;
	for (i = 1; i <= h; i++)
	{
		printGivenLevel(root, i);
		cout << "\n";
	}
	cout << "End Level Order===================\n";
}
//************************************************************************
// Recieves a filename to place the GraphViz data into.
// It then calls the above two graphviz methods to create a data file
// that can be used to visualize your expression tree.
//************************************************************************
void BSTree::GraphVizOut(string filename)
{
	ofstream VizOut;
	VizOut.open(filename);
	VizOut << "Digraph G {\n";
	GraphVizGetIds(root, VizOut);
	GraphVizMakeConnections(root, VizOut);
	VizOut << "}\n";
	VizOut.close();
}
