//File: avlTree.h
//Edited by: Jeremy Glebe
//Description of changes:
//    - Nested the "node" so it doesn't conflict with "node" defined in BSTree
//        (we have namespaces associated with them now, they're still public)
//    - Added a 'find' method that will return the number of comparisons made

#include <iostream>
#include <fstream>
#include <time.h>
#include <string>

using namespace std;

class avlTree {
public:
	struct node {
		string value;
		string type;
		node *left;
		node *right;
		node *parent;
		int avlValue;
		node(string word, string t) {
			value = word;
			type = t;
			left = right = parent = NULL;
			avlValue = 0;
		}
	};
	/**
	 * Constructor for the avlTree
	 */
	avlTree();
	/**
	 * Destructor for the avlTree
	 */
	~avlTree();
	/**
	 * TBH, don't know what this does.
	 */
	void doDumpTree(node *);
	/**
	 * TBH, don't know what this does.
	 */
	void dumpTree() {
		cout << "---------------------------------" << endl;
		cout << "Root:   " << root << "\n";
		doDumpTree(root);
	};
	/**
	 * Inserts an item into the AVL Tree
	 * @param string - word to store
	 * @param string - what type of word this is (noun, verb, ...)
	 */
	void insert(string, string);
	/**
	 * Prints inorder traversal of the tree
	 */
	void showInorder() { inorder(root); };
	/**
	 * Prints the preorder traversal of the tree
	 */
	void showPreorder() { preorder(root); };
	/**
	 * Prints the postorder traversal of the tree
	 */
	void showPostorder() { postorder(root); };
	/**
	 * Searches for an item in the tree
	 * @param  string - The word to search for
	 * @return        Was the item found
	 */
	bool search(string);
	//Method Name: find
	//Description: Finds a node in the tree, counts the number of comparisons
	//    in finding it, and also provides you with the word type.
	//Params: string - this is the word to find
	//        string& - This is where the method returns the word type. As it
	//                  can't return two things, I used this as a workaround
	//Returns: int - the number of comparisons made
	int find(string, string&);
	/**
	 * Removes an item from the tree
	 * @param word - the word to delete from the tree
	 */
	void remove(string word) { root = remove(root, word); };
	/**
	 * Determines the height of the tree
	 * @return int - heigh of the tree
	 */
	int  treeHeight();
	/**
	 * TBH, don't know what this does.
	 */
	void graphVizGetIds(node *, ofstream &);
	/**
	 * TBH, don't know what this does.
	 */
	void graphVizMakeConnections(node *, ofstream &);
	/**
	 * TBH, don't know what this does.
	 */
	void graphVizOut(string);
private:
	node *root;
	//Implementations
	bool rightHeavy(node *);
	bool leftHeavy(node *);
	void insert(node *&, node *&);
	void inorder(node *);
	void preorder(node *);
	void postorder(node *);
	node* remove(node*&, string);
	node* predSuccessor(node*);
	void printNode(node *, string);
	int  height(node *);
	void computeAvlValues(node *&);
	void rotateLeft(node *&);
	void rotateRight(node *&);
	int  avlValue(node *);
};
