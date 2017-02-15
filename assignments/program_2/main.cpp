/**
* @ProgramName: Image Class Editor - ADT Program 2
* @Author: Jeremy Glebe
* @Description:
*     Uses a class to store and manipulate .txt image data.
* @Course: 1063 Data Structures
* @Semester: Spring 2017
* @Date: 02 15 2016
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

class ImageManip {
private:
	rgb** image;
	int width;
	int height;
	ifstream ifile;
	ofstream ofile;
	string ifile_name;
	string ofile_name;

	/**
	* @FunctionName: readFile
	* @Description:
	*     Reads in a .txt space delimited format image into a 2D array
	* @Params:
	*    N/A
	* @Returns:
	*    void
	*/
	void readFile() {
		ifile.open(ifile_name);
		if (ifile) {

			// Using pointers to create a 2D array to hold our image
			ifile >> width >> height;
			image = new rgb*[height];
			for (int i = 0;i < height;i++) {
				image[i] = new rgb[width];
			}

			// Read in values for each pixel in the image
			for (int i = 0;i < height;i++) {
				for (int j = 0;j < width;j++) {
					ifile >> image[i][j].r >> image[i][j].g >> image[i][j].b;
				}
			}
			ifile.close();
			cout << "Read in the image \"" << ifile_name << "\"\n\n";
		}
		else {
			ifile.clear();
			cout << "Error: \"" << ifile_name << "\" failed to read in.\n\n";
		}
		ifile.close();
	}

	/**
	* @FunctionName: writeFile
	* @Description:
	*    Saves a 2D array of rgb values as a .txt space delimited image
	* @Params:
	*    N/A
	* @Returns:
	*    void
	*/
	void writeFile() {
		ofile.open(ofile_name);
		if (image) { // If an image has been read in
											  // Saves the first two values to file (width, height)
			ofile << width << " " << height << endl;

			// Loop traverses the image and saves the rgb values of each pixel to the file
			for (int i = 0;i < height;i++) {
				for (int j = 0;j < width;j++) {
					ofile << image[i][j].r << " " << image[i][j].g << " " << image[i][j].b << " ";
				}
				ofile << endl;
			}
			ofile.close();
			cout << "Image saved as \"" << ofile_name << "\"\n\n";
		}
		else
			cout << "Error: No image has been read in.\n\n";
		ofile.close();
	}

public:
	ImageManip() {
	}

	/**
	* @FunctionName: flipVert
	* @Description:
	*     Vertically flips a 2D array of rgb values
	* @Params:
	*    string readFrom - the name of the file being read in
	*    string writeTo - the name of the file function is writing to
	* @Returns:
	*    void
	*/
	void flipVert(string readFrom, string writeTo) {
		ifile_name = readFrom;
		ofile_name = writeTo;
		readFile();
		if (image) {

			for (int i = 0; i < height / 2; i++) {
				for (int j = 0; j < width; j++) {
					// Initiate two temporary rgb values for the top and bottom pixels
					rgb tempUp, tempDown;
					tempUp = image[i][j];
					tempDown = image[height - 1 - i][j];

					// Assign the original rgb values to their opposite
					image[i][j] = tempDown;
					image[height - 1 - i][j] = tempUp;
				}
			}
			cout << "Image flipped vertically.\n\n";
		}
		else
			cout << "Error: No image has been read in.\n\n";
		writeFile();
	}

	/**
	* @FunctionName: flipHorz
	* @Description:
	*     Horizontally flips a 2D array of rgb values
	* @Params:
	*    string readFrom - the name of the file being read in
	*    string writeTo - the name of the file function is writing to
	* @Returns:
	*    void
	*/
	void flipHorz(string readFrom, string writeTo) {
		ifile_name = readFrom;
		ofile_name = writeTo;
		readFile();
		if (image) {

			for (int i = 0; i < height; i++) {
				for (int j = 0; j < width / 2; j++) {
					// Initiate two temporary rgb values for the left and right pixels
					rgb tempLeft, tempRight;
					tempLeft = image[i][j];
					tempRight = image[i][width - 1 - j];

					// Assign the original rgb values to their opposite
					image[i][j] = tempRight;
					image[i][width - 1 - j] = tempLeft;
				}
			}

			cout << "Image flipped horizontally.\n\n";
		}
		else
			cout << "Error: No image has been read in.\n\n";
		writeFile();
	}

	void grayScale(string readFrom, string writeTo) {
		ifile_name = readFrom;
		ofile_name = writeTo;
		readFile();
		int newCol; // The new color value used for grayscale
		if (image) {

			// For each pixel, we set the color channels to the average of all three
			for (int i = 0;i < height;i++) {
				for (int j = 0;j < width;j++) {
					newCol = (image[i][j].r + image[i][j].g + image[i][j].b) / 3;
					image[i][j].r = newCol;
					image[i][j].g = newCol;
					image[i][j].b = newCol;
				}
			}
			cout << "Image converted to grayscale.\n\n";
		}
		else
			cout << "Error: No image has been read in.\n\n";
		writeFile();
	}

	~ImageManip() {
	}
};

int main() {
	// I tested this using an image of the twitter logo, hence the file name
	ImageManip myImage;
	myImage.flipVert("twitter.txt", "edited_twitter.txt");
	// It's important to call the following functions reading in the edited
	// file if we want the final product to include all the edits.
	myImage.flipHorz("edited_twitter.txt","edited_twitter.txt");
	myImage.grayScale("edited_twitter.txt", "edited_twitter.txt");
	return 0;
}