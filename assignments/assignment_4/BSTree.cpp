/**
*	File: BSTree.cpp
*	Description: Implements a Binary Search Tree class (BSTree). Binary Search
*	Tree can be searched quickly and efficiently. The bug in deletion
*	was fixed on line 309, in the public facing delete method
*/
#include"BSTree.h"

/**
 * Recursively counts how many nodes are in the tree
 * @param  root - The root node of the subtree for the current call
 * @return int  - # of nodes
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
 * Recursively inserts a new node into the tree
 * @param root - The root node of the subtree for the current call
 * @param temp - The node being added to the tree
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
		else
		{
			insert(root->right, temp);
		}
	}
}
/**
 * Prints formatted information about a tree node
 * @param n     - The node to print out
 * @param label - Optional label to identify the node
 */
void BSTree::print_node(node *n, string label = "")
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
 * Gets the predecessor or successor to the given root node
 * @param  root - The node who's predecessor/successor we're getting
 * @return node* - the predecessor or successor to the root
 */
node *BSTree::minValueNode(node *root)
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
 * Recursively deletes a node from the tree
 * @param  root  - The root node of the subtree for the current call
 * @param  key   - The data stored in the node we wish to delete
 * @return node* - The node which should take the place of the item from the
 * 		   previous call.
 */
node *BSTree::deleteNode(node *&root, int key)
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
 * Recursively determines the height of the tree
 * @param  root - The root node of the subtree for the current call
 * @return int  - The height calculated so far in THIS call
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
/**
 * Prints nodes at a given level
 * @param root  - The root node of the subtree for the current call
 * @param level - The level which we are currently printing at
 */
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
	 * BSTree Constructor
	 */
BSTree::BSTree()
{
	root = NULL;
}
/**
 * BSTree Destructor
 */
BSTree::~BSTree()
{
}
/**
 * Public facing method to count the nodes in the tree
 * @return int - Number of nodes in the tree
 */
int BSTree::count()
{
	return count(root);
}
/**
 * Public facing method to insert a new node into the tree.
 * @param x - The value to be inserted
 */
void BSTree::insert(int x)
{
	node *temp = new node(x);
	insert(root, temp);
}
/**
 * Public facing method to delete a value from the tree
 * @param key - The data of the node to be deleted
 */
void BSTree::deleteNode(int key)
{
	//FIXED THE DELETION ISSUE HERE by changing
	//deleteNode(root,key); to the line you see below
	root = deleteNode(root, key);
}
/**
 * Method to print the predecessor/successor of the root of the tree
 */
void BSTree::minValue()
{
	print_node(minValueNode(root), "minVal");
}
/**
 * Gets the height of a subtree of the tree(or the tree itself)
 * @param  key - (Optional) The data in the root node of the subtree
 * @return int - The height of the tree/subtree
 */
int BSTree::height(int key = -1)
{
	if (key > 0)
	{
		//find node
	}
	else
	{
		return height(root);
	}
	return 0;
}
/**
 * Gets the value of the root node's data
 * @return int - Root node's data
 */
int BSTree::top()
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
