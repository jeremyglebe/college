//File: generate_words.cpp
//Author: Jeremy Glebe
//Date: 3/1/2018
//Description: Implements the function generateWords

#include<iostream>
#include<fstream>
#include<string>
#include<ctime>
#include<vector>
#include<set>
using namespace std;

//Function Name: generateWords
//Description: Generates a list of crazy words from the text files containing
//    our various types of words.
//Param: num - number of words to generate
//       filename - file to store the generated words into
//Returns: void
void generateWords(int num, string filename) {
	vector<string> adjectives; //Stores adjectives
	vector<string> adverbs; //Stores adverbs
	vector<string> nouns; //Stores nouns
	vector<string> verbs; //Stores verbs
	set<string> all; //Set of all of the words from all lists
	set<string> newWords; //Stores finished crazy words
	string word; //The current word
	ifstream infile;
	ofstream outfile;
	//Tracks how many words are generated thus far
	int thusFar = 0;
	//Read in the adjectives
	infile.open("adjectives.txt");
	while (infile >> word) {
		//This condition ensures there are no duplicates between lists of words
		if (all.find(word) == all.end()) {
			all.insert(word);
			adjectives.push_back(word);
		}
	}
	infile.close();
	//Read in the adverbs
	infile.open("adverbs.txt");
	while (infile >> word) {
		//This condition ensures there are no duplicates between lists of words
		if (all.find(word) == all.end()) {
			all.insert(word);
			adverbs.push_back(word);
		}
	}
	infile.close();
	//Read in the animals
	infile.open("animals.txt");
	while (infile >> word) {
		//This condition ensures there are no duplicates between lists of words
		if (all.find(word) == all.end()) {
			all.insert(word);
			//Animals are nouns as well
			nouns.push_back(word);
		}
	}
	infile.close();
	//Read in the nouns
	infile.open("nouns.txt");
	while (infile >> word) {
		//This condition ensures there are no duplicates between lists of words
		if (all.find(word) == all.end()) {
			all.insert(word);
			nouns.push_back(word);
		}
	}
	infile.close();
	//Read in the verbs
	infile.open("verbs.txt");
	while (infile >> word){
		//This condition ensures there are no duplicates between lists of words
		if (all.find(word) == all.end()) {
			all.insert(word);
			verbs.push_back(word);
		}
	}
	infile.close();
	//Generate some number of words and send them to tenthousandwords.txt
	outfile.open(filename);
	srand(time(NULL));
	while (newWords.size() < num) {
		string crazy = "";
		//Choose an adverb
		crazy += adverbs[rand() % adverbs.size()] + " ";
		//Choose a verb
		crazy += verbs[rand() % verbs.size()] + " ";
		//Choose an adjective
		crazy += adjectives[rand() % adjectives.size()] + " ";
		//Choose a noun
		crazy += nouns[rand() % nouns.size()];
		//If it isn't the last word, append a new line
		if (newWords.size() + 1 != num)
			crazy += '\n';
		//If statement to ensure the word isn't already there
		if (newWords.find(crazy) == newWords.end()) {
			newWords.insert(crazy);
			outfile << crazy;
		}
		//Tracking status
		cout << "# of Words Generated: " << ++thusFar << '\r';
	}
	//Final status on words generated
	cout << "# of Words Generated: " << thusFar << endl;
	outfile.close();
	return;
}