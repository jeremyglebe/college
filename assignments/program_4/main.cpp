#include<iostream>
#include<string>
#include"graph.h"
using namespace std;

graph loadGraphCSV(string, int);

int main(int argc, char** argv) {

	graph g(loadGraphCSV("filtered_cities.csv", 0));
	//graph g(loadGraphCSV("test.csv", 0));

	////
	//Make sure state adjaceny reference is working
	for (auto subject : g.stateRef) {
		for (auto adjacents : g.stateRef[subject.first]) {
			cout << adjacents << '\t';
		}
		cout << endl;
	}

	//g.createSpanningTree(g.cityLookup["HoltsvilleNY"], 3);
	g.createSpanningTree(g.cityLookup["BrooksvilleME"], 3);

	return 0;
}

/**
* loadGraphCSV - loads a graph with the given csv
* Params:
*     string filename  - filename to open
* Returns
*     graph
*/
graph loadGraphCSV(string filename, int max = 0)
{
	int zip;
	double lat;
	double lon;
	string city;
	string state;
	string county;


	strMapInt cityCheck;

	int i = 0;

	graph G;

	ifstream file(filename);

	for (CSVIterator loop(file); loop != CSVIterator(); ++loop)
	{
		zip = stoi((*loop)[0]);
		if ((*loop)[1].length() > 0)
		{
			lat = stod((*loop)[1]);
		}
		else
		{
			lat = 0.0;
		}

		if ((*loop)[2].length() > 0)
		{
			lon = stod((*loop)[2]);
		}
		else
		{
			lon = 0.0;
		}

		city = (*loop)[3];
		state = (*loop)[4];
		county = (*loop)[5];


		if (cityCheck.find(city) == cityCheck.end())
		{
			// Add the city as a key to the map.
			cityCheck[city] = 0;

			if (state != "PR") {
				G.addVertex(city, state, lat, lon);
				i++;
			}
		}

		if (i > max && max != 0) {
			return G;
		}

	}

	return G;
}