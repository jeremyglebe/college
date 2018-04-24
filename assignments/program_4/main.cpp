#include<iostream>
#include<string>
#include<fstream>
#include"graph.h"
using namespace std;

graph loadGraphCSV(string filename, int max = 0, string filter = "PR", bool filterout = true);

int main(int argc, char** argv) {
	ofstream outfile;
	ofstream graphfile;
	outfile.open("output.txt");
	graphfile.open("prgraph.txt");

	graph KS(loadGraphCSV("filtered_cities.csv"));
	int KSc = KS.createSpanningTree(KS.cityLookup["LebanonKS"], 3);
	outfile << "- Lebanon, Kansas\n\t" << KS.totalWeight << " miles "
		<< KS.num_edges << " edges " << endl;
	outfile << '\t' << ((double(KSc) / KS.id) * 100) << "% connected" << endl;

	graph FL(loadGraphCSV("filtered_cities.csv"));
	int FLc = FL.createSpanningTree(FL.cityLookup["Miami BeachFL"], 3);
	outfile << "- Miami Beach, Florida\n\t" << FL.totalWeight << " miles "
		<< FL.num_edges << " edges " << endl;
	outfile << '\t' << ((double(FLc) / FL.id) * 100) << "% connected" << endl;

	graph TX(loadGraphCSV("filtered_cities.csv"));
	int TXc = TX.createSpanningTree(TX.cityLookup["Lake DallasTX"], 3);
	outfile << "- Lake Dallas, Texas\n\t" << TX.totalWeight << " miles "
		<< TX.num_edges << " edges " << endl;
	outfile << '\t' << ((double(TXc) / TX.id) * 100) << "% connected" << endl;

	graph MA(loadGraphCSV("filtered_cities.csv"));
	int MAc = MA.createSpanningTree(MA.cityLookup["BostonMA"], 3);
	outfile << "- Boston, Massachussets\n\t" << MA.totalWeight << " miles "
		<< MA.num_edges << " edges " << endl;
	outfile << '\t' << ((double(MAc) / MA.id) * 100) << "% connected" << endl;

	graph PR(loadGraphCSV("filtered_cities.csv", 0, "PR", false));
	int PRc = PR.createSpanningTree(PR.cityLookup["San JuanPR"], 3);
	outfile << "- San Juan, Puerto Rico\n\t" << PR.totalWeight << " miles "
		<< PR.num_edges << " edges " << endl;
	outfile << '\t' << ((double(PRc) / PR.id) * 100) << "% connected" << endl;
	graphfile << PR.graphViz();

	outfile.close();
	graphfile.close();
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