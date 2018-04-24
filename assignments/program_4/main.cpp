#include<iostream>
#include<string>
#include<fstream>
#include"graph.h"
using namespace std;

graph loadGraphCSV(string filename, int max = 0, string filter = "PR", bool filterout = true);

int main(int argc, char** argv) {
	ofstream outfile;
	ofstream graphfile;

	graph KS(loadGraphCSV("filtered_cities.csv"));
	KS.createSpanningTree(KS.cityLookup["LebanonKS"], 3);

	graph FL(loadGraphCSV("filtered_cities.csv"));
	FL.createSpanningTree(FL.cityLookup["Miami BeachFL"], 3);

	graph TX(loadGraphCSV("filtered_cities.csv"));
	TX.createSpanningTree(TX.cityLookup["Lake DallasTX"], 3);

	graph MA(loadGraphCSV("filtered_cities.csv"));
	MA.createSpanningTree(MA.cityLookup["BostonMA"], 3);

	graph PR(loadGraphCSV("filtered_cities.csv", 0, "PR", false));
	PR.createSpanningTree(PR.cityLookup["San JuanPR"], 3);

	return 0;
}

/**
* loadGraphCSV - loads a graph with the given csv
* Params:
*     string filename  - filename to open
*     string filter - state to include/exclude
*     bool filterout - if true, don't include the filtered state, if false,
*                      ONLY include the filtered state
* Returns
*     graph
*/
graph loadGraphCSV(string filename, int max, string filter, bool filterout)
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

			//I changed this to allow for filtering OUT a specific state
			//OR filtering to ONLY INCLUDE a certain state
			if ((filterout && state != filter) || (!filterout && state == filter)) {
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