//File: analyze_trees.cpp
//Author: Jeremy Glebe
//Date: 3/1/2018
//Description: We do all the main handling in the program in this file. It will
//    search for every word in the file and keep track of counts for searches
//    and word types used. It will optionally generate NUM_WORDS words into
//    the file.

#include"bsTree.h"
#include"avlTree.h"
#include<iostream>
//Number of words we should generate (if generating them at all)
#define NUM_WORDS 10000
using namespace std;

//Function Name: generateWords
//Description: Generates a list of crazy words from the text files containing
//    our various types of words(implemented in generate_words.cpp as directed)
//Param: num - number of words to generate
//       filename - file to store generated words in
//Returns: void
void generateWords(int num, string filename = "tenthousandwords.txt");

int main(int argc, char **argv) {
	//Search Trees for words
	BSTree badtree;
	avlTree goodtree;
	// file pointers
	ifstream infile;
	ofstream outfile;
	//The word currently being read in
	string word;
	//Counters for various operations and status reporting
	//NOTE - There are 84,802 words in total in the files given to us
	int treeAdj = 0;//Adjectives in the trees
	int treeAdv = 0;//Adverbs in the trees
	int treeNoun = 0;//Nouns in the trees
	int treeVerb = 0;//Verbs in the trees
	int crazyAdj = 0;//Adjectives in the list of crazy words
	int crazyAdv = 0;//Adverbs in the list of crazy words
	int crazyNoun = 0;//Nouns in the list of crazy words
	int crazyVerb = 0;//Verbs in the list of crazy words
	int bstComps = 0;//Comparisons made by the BST
	int avlComps = 0;//Comparisons made by the AVL tree

	// count command line args and make sure 
	// a file name is on the line to run this file
	if (argc < 2) {
		cout << "You need an input file!\n";
		cout << "Usage: analyze_trees filename.txt [generate]";
		exit(0);
	}

	//If the keyword "generate" is included, make a new set of words
	for (int i = 0; i < argc; i++) {
		if (string(argv[i]) == "generate")
			//argv[1] SHOULD BE the file name
			generateWords(NUM_WORDS, argv[1]);
	}

	//Load the Binary Search Tree
	cout << "Loading words into Search Trees..." << endl;
	//Adjectives
	infile.open("adjectives.txt");
	while (infile >> word) {
		goodtree.insert(word, "adjective");
		badtree.insert(word, "adjective");
		//Outputs an active count of words loaded
		cout << "Adjectives: " << ++treeAdj << '\r';
	}
	cout << "Adjectives: " << treeAdj << endl;
	infile.close();
	//Adverbs
	infile.open("adverbs.txt");
	while (infile >> word) {
		goodtree.insert(word, "adverb");
		badtree.insert(word, "adverb");
		//Outputs an active count of words loaded
		cout << "Adverbs: " << ++treeAdv << '\r';
	}
	cout << "Adverbs: " << treeAdv << endl;
	infile.close();
	//Animals (Nouns)
	infile.open("animals.txt");
	while (infile >> word) {
		//For counting purposes, animals are nouns
		//(The assignment asks for # of nouns but does not distinguish animals)
		goodtree.insert(word, "noun");
		badtree.insert(word, "noun");
		//Outputs an active count of words loaded
		cout << "Nouns: " << ++treeNoun << '\r';
	}
	infile.close();
	//Nouns (Additional)
	infile.open("nouns.txt");
	while (infile >> word) {
		goodtree.insert(word, "noun");
		badtree.insert(word, "noun");
		//Outputs an active count of words loaded
		cout << "Nouns: " << ++treeNoun << '\r';
	}
	cout << "Nouns: " << treeNoun << endl;
	infile.close();
	//Verbs
	infile.open("verbs.txt");
	while (infile >> word) {
		badtree.insert(word, "verb");
		//Outputs an active count of words loaded
		cout << "Verbs: " << ++treeVerb << '\r';
	}
	cout << "Verbs: " << treeVerb << endl;
	infile.close();

	//Searching for words in the trees
	cout << "Running searches for words...";
	// open file from command line
	infile.open(argv[1]);
	while (infile >> word) {
		string type;//Temporary string to determine type
		//This method returns total and updates "type" to the word type
		bstComps += badtree.find(word, type);
		avlComps += goodtree.find(word, type);
		if (type == "adjective")
			crazyAdj++;
		else if (type == "adverb")
			crazyAdv++;
		else if (type == "noun")
			crazyNoun++;
		else if (type == "verb")
			crazyVerb++;
		//Actively outputs the current total comparisons made by the trees
		cout << "BST Comparisons: " << bstComps << ", "
			<< "AVL Comparisons: " << avlComps << string(30, ' ') << '\r';
	}
	cout << endl << endl;
	infile.close();

	outfile.open("analysis.out");
	//Final analysis output to file and screen
	outfile << "BST Comparisons = " << bstComps << endl;
	outfile << "AVL Comparisons = " << avlComps << endl;
	outfile << "Number of Adjectives = " << crazyAdj << endl;
	outfile << "Number of Adverbs = " << crazyAdv << endl;
	outfile << "Number of Nouns = " << crazyNoun << endl;
	outfile << "Number of Verbs = " << crazyVerb << endl;
	cout << "Final analysis..." << endl;
	cout << "BST Comparisons = " << bstComps << endl;
	cout << "AVL Comparisons = " << avlComps << endl;
	cout << "Number of Adjectives = " << crazyAdj << endl;
	cout << "Number of Adverbs = " << crazyAdv << endl;
	cout << "Number of Nouns = " << crazyNoun << endl;
	cout << "Number of Verbs = " << crazyVerb << endl;
	outfile.close();

	system("PAUSE");
	return 0;
}