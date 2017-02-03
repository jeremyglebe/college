***cpp

/**
* @ProgramName: Image Editor - ADT Program 1
* @Author: Jeremy Glebe
* @Description:
*     This rudimentary image editing program, through the use of listed user commands,
	  reads in images stored as rgb values in a space delimited file format, performs
	  basic edits on these images, and exports them still in .txt form.
* @Course: 1063 Data Structures
* @Semester: Spring 2017
* @Date: 02 02 2016
*/

/**
[INSTRUCTIONS FOR USE]
Commands should be typed in the order they are to be executed. They can be
entered all at once or in steps. Multiple images may be read, edited, and saved
before exiting.
Example user input:
read bob grayscale save read cat vertical save exit
This line of commands, entered all at once, would read an image called "bob.txt"
and grayscale it, saving it as "bob_edit.txt". It would then load an image "cat.txt",
vertically flip it, save "cat_edit.txt", and exit the program.
*/

#include<iostream>
#include<fstream>
#include<math.h>
#include<string>

using namespace std;

// Struct for storing the color values of pixels
struct rgb {
	int r;
	int g;
	int b;
};

// Function prototypes
void readImage(rgb**&, string&, int&, int&, ifstream&);
void saveImage(rgb**, string, int, int, ofstream&);
void flipVert(rgb**&, int, int);
void flipHorz(rgb**&, int, int);
void grayScale(rgb**&, int, int);

int main() {
	ifstream ifile;
	ofstream ofile;

	int width; // Width of the image
	int height; // Height of the image
	string command; // The current command of the user
	string userImage; // The file name of the user's image
	rgb **imgArray = NULL; // Pointer to store the 2D array, initialized to NULL
						   // because the program needs to check if an image has been read in

	// Displays list of commands
	cout << "List of Commands:\n- read [filename]\n- save\n- vertical\n- hor" \
		<< "izontal\n- grayscale\n- exit\n" \
		<< "[filename] represents the name of your txt format image file. Do" \
		<< " not include the \".txt\" extension.\n\n";

	// Run the correct function based on user command
	while (command != "exit") {
		cin >> command;
		if (command == "read") {
			readImage(imgArray, userImage, width, height, ifile);
		}
		else if (command == "save") {
			saveImage(imgArray, userImage, width, height, ofile);
		}
		else if (command == "vertical") {
			flipVert(imgArray, width, height);
		}
		else if (command == "horizontal") {
			flipHorz(imgArray, width, height);
		}
		else if (command == "grayscale") {
			grayScale(imgArray, width, height);
		}
	}
	return 0;
}

/**
* @FunctionName: readImage
* @Description:
*     Reads in a .txt space delimited format image, entered by the user, into a 2D array
* @Params:
*    rgb** &arrImg - 2D array holding rgb values
*    string &userFile - name of the image file
*    int &width - width of image
*    int &height - height of image
*    ifstream &inf - stream object for reading from a file
* @Returns:
*    void
*/
void readImage(rgb** &arrImg, string &userFile, int &width, int &height, ifstream &inf) {

	// This allows the program to be used with different images
	cin >> userFile;
	inf.open(userFile + ".txt");
	if (inf) {

		// Using pointers to create a 2D array to hold our image
		inf >> width >> height;
		arrImg = new rgb*[height];
		for (int i = 0;i < height;i++) {
			arrImg[i] = new rgb[width];
		}

		// Read in values for each pixel in the image
		for (int i = 0;i < height;i++) {
			for (int j = 0;j < width;j++) {
				inf >> arrImg[i][j].r >> arrImg[i][j].g >> arrImg[i][j].b;
			}
		}
		inf.close();
		cout << "Read in the image \"" << userFile << ".txt\"\n\n";
	}
	else {
		inf.clear();
		cout << "Error: No image has been read in.\n\n";
	}
}

/**
* @FunctionName: saveImage
* @Description:
*     Saves a 2D array of rgb values as a .txt space delimited image
* @Params:
*    rgb** arrImg - 2D array holding rgb values
*    string userFile - name of the image file
*    int width - width of image
*    int height - height of image
*    ofstream &otf - stream object for saving to a file
* @Returns:
*    void
*/
void saveImage(rgb** arrImg, string userFile, int width, int height, ofstream &otf) {
	if (arrImg) { // If an image has been read in
		otf.open(userFile + "_edit.txt"); // Open the file

		// Saves the first two values to file (width, height)
		otf << width << " " << height << endl;

		// Loop traverses the image and saves the rgb values of each pixel to the file
		for (int i = 0;i < height;i++) {
			for (int j = 0;j < width;j++) {
				otf << arrImg[i][j].r << " " << arrImg[i][j].g << " " << arrImg[i][j].b << " ";
			}
			otf << endl;
		}
		otf.close();
		cout << "Image saved as \"" << userFile << "_edit.txt\"\n\n";
	}
	else
		cout << "Error: No image has been read in.\n\n";
}

/**
* @FunctionName: flipVert
* @Description:
*     Creates a temporary 2D array that is vertically flipped and sets the referenced array equal to it.
* @Params:
*    rgb** &arrImg - 2D array holding rgb values
*    int width - width of image
*    int height - height of image
* @Returns:
*    void
*/
void flipVert(rgb** &arrImg, int width, int height) {

	// A temporary 2D array for changing values.
	rgb **temp;
	if (arrImg) {
		temp = new rgb*[height];
		for (int i = 0;i < height;i++) {
			temp[i] = new rgb[width];
		}

		// Set temp's values to a vertical flip of arrImg
		for (int i = 0;i < height / 2;i++) {
			for (int j = 0;j < width;j++) {
				temp[i][j] = arrImg[height - 1 - i][j];
				temp[height - 1 - i][j] = arrImg[i][j];
			}
		}
		if (height % 2 != 0) //if there are an odd number of rows
			for (int c = 0; c < width; c++) // for every column

				// set temp's middle row equal to arrImg's
				temp[(height / 2)][c] = arrImg[(height / 2)][c];

		// Copy the values of temp to arrImg
		for (int i = 0;i < height;i++) {
			for (int j = 0;j < width;j++) {
				arrImg[i][j] = temp[i][j];
			}
			delete temp[i];
		}
		delete temp;
		cout << "Image flipped vertically.\n\n";
	}
	else
		cout << "Error: No image has been read in.\n\n";
}

/**
* @FunctionName: flipHorz
* @Description:
*     Creates a temporary 2D array that is horizontally flipped and sets the referenced array equal to it.
* @Params:
*    rgb** &arrImg - 2D array holding rgb values
*    int width - width of image
*    int height - height of image
* @Returns:
*    void
*/
void flipHorz(rgb** &arrImg, int width, int height) {

	// A temporary 2D array for changing values.
	rgb **temp;
	if (arrImg) {
		temp = new rgb*[height];
		for (int i = 0;i < height;i++) {
			temp[i] = new rgb[width];
		}

		// Set temp's values to a horizontal flip of arrImg
		for (int i = 0;i < height;i++) {
			for (int j = 0;j < width / 2;j++) {
				temp[i][j] = arrImg[i][width - 1 - j];
				temp[i][width - 1 - j] = arrImg[i][j];
			}
		}
		if (width % 2 != 0) //if there are an odd number of columns
			for (int r = 0; r < height; r++) // for every row

				// set temp's middle column equal to arrImg's
				temp[r][(width / 2)] = arrImg[r][(width / 2)];

		// Copy the values of temp to arrImg
		for (int i = 0;i < height;i++) {
			for (int j = 0;j < width;j++) {
				arrImg[i][j] = temp[i][j];
			}
			delete temp[i];
		}
		delete temp;
		cout << "Image flipped horizontally.\n\n";
	}
	else
		cout << "Error: No image has been read in.\n\n";
}

/**
* @FunctionName: grayScale
* @Description:
*     Loops through a 2D array and turns every RGB value into its grayscale equivalent.
* @Params:
*    rgb** &arrImg - 2D array holding rgb values
*    int width - width of image
*    int height - height of image
* @Returns:
*    void
*/
void grayScale(rgb** &arrImg, int width, int height) {
	int newCol; // The new color value used for grayscale
	if (arrImg) {

		// For each pixel, we set the color channels to the average of all three
		for (int i = 0;i < height;i++) {
			for (int j = 0;j < width;j++) {
				newCol = (arrImg[i][j].r + arrImg[i][j].g + arrImg[i][j].b) / 3;
				arrImg[i][j].r = newCol;
				arrImg[i][j].g = newCol;
				arrImg[i][j].b = newCol;
			}
		}
		cout << "Image converted to grayscale.\n\n";
	}
	else
		cout << "Error: No image has been read in.\n\n";
}

***
