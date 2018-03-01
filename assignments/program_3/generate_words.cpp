//File: generate_words.cpp
//Author: Jeremy Glebe
//Date: 3/1/2018
//Description: Implements the function generateWords

#include<iostream>
#include<fstream>
#include<string>
#include<ctime>
#include<vector>
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
	vector<string> all; //Keeps track of all of the words as well
	vector<string> newWords; //Stores finished crazy words
	string word; //The current word
	ifstream infile;
	ofstream outfile;
	//Tracks how many words are generated thus far
	int thusFar = 0;
	//Read in the adjectives
	infile.open("adjectives.txt");
	while (infile >> word) {
		//This condition ensures there are no duplicates between lists of words
		if (find(all.begin(), all.end(), word) == all.end()) {
			all.push_back(word);
			adjectives.push_back(word);
		}
	}
	infile.close();
	//Read in the adverbs
	infile.open("adverbs.txt");
	while (infile >> word) {
		//This condition ensures there are no duplicates between lists of words
		if (find(all.begin(), all.end(), word) == all.end()) {
			all.push_back(word);
			adverbs.push_back(word);
		}
	}
	infile.close();
	//Read in the animals
	infile.open("animals.txt");
	while (infile >> word) {
		//This condition ensures there are no duplicates between lists of words
		if (find(all.begin(), all.end(), word) == all.end()) {
			all.push_back(word);
			//Animals are nouns as well
			nouns.push_back(word);
		}
	}
	infile.close();
	//Read in the nouns
	infile.open("nouns.txt");
	while (infile >> word) {
		//This condition ensures there are no duplicates between lists of words
		if (find(all.begin(), all.end(), word) == all.end()) {
			all.push_back(word);
			nouns.push_back(word);
		}
	}
	infile.close();
	//Read in the verbs
	infile.open("verbs.txt");
	while (infile >> word){
		//This condition ensures there are no duplicates between lists of words
		if (find(all.begin(), all.end(), word) == all.end()) {
			all.push_back(word);
			verbs.push_back(word);
		}
	}
	infile.close();
	//Generate some number of words and send them to tenthousandwords.txt
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
		if (find(newWords.begin(), newWords.end(), crazy) == newWords.end()) {
			newWords.push_back(crazy);
		}
		//Tracking status
		cout << "# of Words Generated: " << ++thusFar << '\r';
	}
	//Final status on words generated
	cout << "# of Words Generated: " << thusFar << endl;
	outfile.open(filename);
	for (int i = 0; i < newWords.size(); i++) {
		outfile << newWords[i];
	}
	outfile.close();
	return;
}