/**
* @ProgramName: Game of Life
* @Author: Jeremy Glebe
* @Description:
*     This program is a modification of one designed in class that plays the
*		Game of Life. I have modified it to be menu-driven, have an infinite
*		plane, contain the choice to generate the world with a glider gun, and
*		stop the game once stable.
* @Important Notes:
*	  I only commented the stuff I changed. It only runs on windows because I
*		used windows.h and the system's "clr" command. Also, I implemented
*		the Glider Gun in the constructor if you're looking for it.
* @Course: 1063 Data Structures
* @Semester: Spring 2017
* @Date: April 30, 2017
*/

#include <iostream>
#include <string>
#include <fstream>
#include <windows.h>

using namespace std;

class GameOfLife {
private:
	int **Board;
	int **Board2;
	int Rows;
	int Cols;
public:
	/**
	* @FunctionName: GameOfLife
	* @Description:
	*     Constructor, creates a world from a file or a preconfigured world.
	* @Params:
	*    string filename - The name of the file (or preconfigured world)
	*/
	GameOfLife(string filename) {
		/*
		Because I'm handling the Glider Gun in a similar way to how the file
		loading system works, and because it gives me a way to implement the
		gun in a constructor, I included code for it here based on the filename
		parameter.
		*/
		if (filename == "~Glider Gun~") {
			// This string is a visual representation of the glider gun
			string gliderGun =
				"00000000000000000000000000000000000000"
				"00000000000000000000000001000000000000"
				"00000000000000000000000101000000000000"
				"00000000000001100000011000000000000110"
				"00000000000010001000011000000000000110"
				"01100000000100000100011000000000000000"
				"01100000000100010110000101000000000000"
				"00000000000100000100000001000000000000"
				"00000000000010001000000000000000000000"
				"00000000000001100000000000000000000000"
				"00000000000000000000000000000000000000";
			// 26 Rows by 80 Cols just seems to display nicely
			Rows = 26;
			Cols = 80;
			InitBoardArray(Board);
			InitBoardArray(Board2);
			//The string has 11 rows of 38 characters
			for (int i = 0, k = 0; i < 11; i++) {
				for (int j = 0; j < 38; j++, k++) {
					Board[i][j] = int(gliderGun[k]) - 48;
				}
			}
		}
		// Here is the original code for loading a file
		else {
			string line;
			char ch;
			ifstream fin;
			fin.open(filename);
			fin >> Rows >> Cols;
			InitBoardArray(Board);
			InitBoardArray(Board2);
			for (int i = 0; i < Rows; i++) {
				for (int j = 0; j < Cols; j++) {
					fin.get(ch);
					if (ch == 10) {
						continue;
					}
					Board[i][j] = int(ch) - 48;
				}
			}
			// Changed to include a line to close the file
			fin.close();
		}

	}

	GameOfLife(int r, int c) {
		Rows = r;
		Cols = c;
		InitBoardArray(Board);
		InitBoardArray(Board2);
	}

	void InitBoardArray(int **&b) {
		b = new int*[Rows];
		for (int i = 0; i < Rows; i++) {
			b[i] = new int[Cols];
		}
		ResetBoardArray(b);
	}

	void ResetBoardArray(int **&b) {
		for (int i = 0; i < Rows; i++) {
			for (int j = 0; j < Cols; j++) {
				b[i][j] = 0;
			}
		}
	}

	void PrintBoard() {
		for (int i = 0; i < Rows; i++) {
			for (int j = 0; j < Cols; j++) {
				if (Board[i][j] == 1)
					cout << char('X');
				else
					cout << " ";
			}
			cout << endl;
		}
	}

	int CountNeighbors(int row, int col) {
		int neighbors = 0;


		// I included variables to track which rows/cols are neighboring
		// Mostly for readability
		int up, down, left, right;

		// Zero requires a separate handling
		if (row == 0)
			up = Rows - 1; // Loops to the bottom
		else
			up = row - 1;
		down = (row + 1) % Rows; // Counts like normal but can also loop to top
		// These work the same as the rows, but with cols
		if (col == 0)
			left = Cols - 1;
		else
			left = col - 1;
		right = (col + 1) % Cols;

		if (Board[row][col] == 1) {
			neighbors--;
		}
		// I changed this to use the new neighbor system and move with modulo
		// so that is traverses the area around the cell properly
		for (int i = up; i != (down + 1) % Rows; i = (i + 1) % Rows) {
			for (int j = left; j != (right + 1) % Cols; j = (j + 1) % Cols) {
				if (OnBoard(i, j)) {
					neighbors += Board[i][j];
				}
			}
		}

		return neighbors;
	}

	bool OnBoard(int row, int col) {
		return (row >= 0 && row < Rows && col >= 0 && col < Cols);
	}

	void RandomPopulate(int num) {
		int r = 0;
		int c = 0;
		for (int i = 0; i < num; i++) {
			r = rand() % Rows;
			c = rand() % Cols;
			Board[r][c] = 1;
		}
	}

	void SetCell(int r, int c, int val) {
		Board[r][c] = val;
	}

	void AddGens() {
		for (int i = 0; i < Rows; i++) {
			for (int j = 0; j < Cols; j++) {
				Board[i][j] += Board2[i][j];
			}
		}
		ResetBoardArray(Board2);
	}

	/**
	* @FunctionName: clear_screen
	* @Description:
	*     Clears the screen of any text (usually for pseudo animation)
	* @Params:
	*    none
	* @Returns:
	*    void
	*/
	void clear_screen() {
		// I changed the clear function because this animated nicer for me
		cout << flush;
		system("CLS"); // This system command is for Windows
	}

	/**
	* @FunctionName: Stable
	* @Description:
	*     Determines if life in the game has stabilized
	* @Params:
	*    none
	* @Returns:
	*    bool - false if any there are any changes in the new generation
	*/
	bool Stable() {

		for (int i = 0; i < Rows; i++) {
			for (int j = 0; j < Cols; j++) {
				if (Board[i][j] != Board[i][j] + Board2[i][j])
					return false;
			}
		}

		return true;
	}

	/**
	* @FunctionName: Run
	* @Description:
	*     Determines if life in the game has stabilized
	* @Params:
	*    int generations - number of generations to view (assuming it does not stabilize)
	* @Returns:
	*    void
	*/
	void Run(int generations = 99999) {
		int neighbors = 0;
		int g = 0;
		bool stable = false; // I included a variable to track if the world is stable

		// Display the first generation for a moment before it starts
		clear_screen();
		PrintBoard();
		Sleep(500);

		// The while loop is now dependent on whether life has stabilized
		while (g < generations && !stable) {
			for (int i = 0; i < Rows; i++) {
				for (int j = 0; j < Cols; j++) {
					neighbors = CountNeighbors(i, j);
					if (Board[i][j] == 1 && (neighbors < 2 || neighbors > 3)) {
						Board2[i][j] = -1;
					}
					if (Board[i][j] == 0 && neighbors == 3) {
						Board2[i][j] = 1;
					}
				}
			}
			// Murder anything living in the corners real quick.
			if (Board2[0][0] == 1)
				Board2[0][0] = -1;
			if (Board2[0][Cols - 1] == 1)
				Board2[0][Cols - 1] = -1;
			if (Board2[Rows - 1][0] == 1)
				Board2[Rows - 1][0] = -1;
			if (Board2[Rows - 1][Cols - 1] == 1)
				Board2[Rows - 1][Cols - 1] = -1;

			// Check to see if the world has stabilized
			stable = Stable();
			// If it has, pause a moment extra so viewers
			// can see the final state
			if (stable)
				Sleep(500);
			AddGens();

			// 72 miliseconds is something close to 1/16th of a second
			Sleep(72); // Sleep only works with Windows
			clear_screen();
			PrintBoard();
			cout << "Generation: #" << g;
			g++;
		}

	}
};

int main() {
	int choice = -1;
	GameOfLife* G;

	srand(8675309); // For testing, better random if seeded to system time

	// A really basic menu system implemented through a while loop and switch
	// The game will prompt you and also shut down if you choose to exit
	while (choice != 4) {
		cout <<
			"Game of Life!\n"
			"Choose a method to start your world:\n"
			"\t[1] - Random World\n"
			"\t[2] - Glider Gun\n"
			"\t[3] - Load from file... (gen_one.txt)\n"
			"\t[4] - Exit\n"
			"Type in the number of your choice then press ENTER.\n";
		cin >> choice;
		switch (choice) {
			case 1:
				G = new GameOfLife(26, 80);
				cout << "How many random cells should be generated?  ";
				cin >> choice;
				G->RandomPopulate(choice);

				cout << "How many generations should we view?"
					" (at MAX, if it doesn't stabilize)  ";
				cin >> choice;
				G->Run(choice);
				break;
			case 2:
				G = new GameOfLife("~Glider Gun~");

				cout << "How many generations should we view?"
					" (at MAX, if it doesn't stabilize)  ";
				cin >> choice;
				G->Run(choice);
				break;
			case 3:
				G = new GameOfLife("gen_one.txt");

				cout << "How many generations should we view?"
					" (at MAX, if it doesn't stabilize)  ";
				cin >> choice;
				G->Run(choice);
				break;
			case 4:
				G = NULL;
				break;
			default:
				G = NULL;
				cout << "You didn't choose one of the menu choices. Smart.\n";
				system("pause");
		}
		if (G != NULL) {
			G->clear_screen();
			delete G;
		}
	}

	return 0;
}