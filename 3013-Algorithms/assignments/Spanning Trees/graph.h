///////////////////////////////////////////////////////////////////////////////
// Title:            Spanning Trees
// Files:            main.cpp
//					 graph.h
//					 distance.h
//					 edge_heap.h
//					 csv.h
// Semester:         3013 Algorithms Spring 2018
//
// Author:           Jeremy Glebe
// Email:            jeremyglebe@gmail.com
// Description:
//       This program reads in cities from a file and then inserts them into a 
//       graph. It connects the graph using a specified # of edges per city.
/////////////////////////////////////////////////////////////////////////////////

/* Notes:
** I changed a LOT in this file but I've commented all my changes for the most
** part so they should be able to be followed.
*/

#pragma once
#include <algorithm>
#include <vector>
#include <queue>
#include <map>
#include <iostream>
#include <fstream>
#include <string>
#include "edge_heap.h"
#include "distance.h"
#include "csv.h"
using namespace std;
// Might use as a lookup from city name to ID.
// And to filter duplicate cities.
typedef map<string, int> strMapInt;

/* Function: progress
** Description: Displays the progress of the program at the moment, originally
**     I was just using this for debugging but as it turns out I think it looks
**     kinda nice so I left it in.
*/
void progress(double soFar, double total) {
	cout << flush;
	system("CLS");
	cout << "Cities Visited: " << '(' << soFar << '/' << total << ") -- " << ((soFar / total) * 100) << '%' << endl;
}

/* A latitude/longitude location structure
** made by Dr. Griffin and unchanged
*/
struct latlon
{
	double lat;
	double lon;
	latlon()
	{
		lat = 0.0;
		lon = 0.0;
	}

	latlon(double y, double x)
	{
		lat = y;
		lon = x;
	}

	/**
	 * operator= - overload assignment for latlon
	 * Params:
	 *     const latlon ll     - lat lon to assign
	 * Returns
	 *     reference to assignment for chaining (e.g. a = b = c )
	 */
	latlon &operator=(const latlon &ll)
	{
		// do the copy
		lat = ll.lat;
		lon = ll.lon;

		// return the existing object so we can chain this operator
		return *this;
	}

	/**
	 * operator<< - overload cout for latlon
	 * Params:
	 *     const latlon ll     - lat lon to print
	 * Returns
	 *     formatted output for a latlon
	 */
	friend ostream &operator<<(ostream &output, const latlon &ll)
	{
		output << "(" << ll.lat << "," << ll.lon << ")";
		return output;
	}
};

/**
 * vertex - represents a vertex in a graph.
 * I added lat() lon() dist() and connected()
 */
struct vertex
{
	int ID;
	string city;
	string state;
	latlon loc;
	vector<edge> E;
	bool visited;

	/**
	 * vertex<< - overload cout for vertex
	 * Params:
	 *     const vertex v     - vertex to print
	 * Returns
	 *     formatted output for a vertex
	 */
	vertex(int id, string c, string s, latlon ll = latlon())
	{
		ID = id;
		city = c;
		state = s;
		loc = ll;
		visited = false;
	}

	/* Method: lat
	*/
	double lat() {
		return loc.lat;
	}

	/* Method: lon
	*/
	double lon() {
		return loc.lon;
	}

	/* Method: dist
	** Description: Gets distance from a vertex, just reuses distanceEarth
	*/
	double dist(vertex other) {
		return distanceEarth(lat(), lon(), other.lat(), other.lon());
	}

	/* Method: connected
	** Description: Determines if there is a connection to the vertex #id
	** Param: id, the id of the vertex we're checking if we're connected to
	** Return: bool, is the vertex connected to this vertex
	*/
	bool connected(int id) {
		for (int i = 0; i < E.size(); i++) {
			if (E[i].toID == id) {
				return true;
			}
		}
		return false;
	}

	/**
	 * operator<< - overload cout for vertex
	 * Params:
	 *     const vertex v     - vertex to print
	 * Returns
	 *     formatted output for a vertex
	 */
	friend ostream &operator<<(ostream &output, const vertex &v)
	{
		output << "(ID:" << v.ID << " C: " << v.city << " S: " << v.state << " L: " << v.loc << " Edges:" << v.E.size() << ")";
		return output;
	}
};

/**
 * graph - set of vertices and edges
 *
 * Methods (private):
 *     vertex* createVertex(string city,string state)
 * Methods (public):
 *     graph()
 * I modified: createSpanningTree(), I implemented it, addVertex(), addEdge(),
 *     and maybe a few others
 * I added: state reference stuff, total weight, valid(), and neighbors()
 */
class graph
{
public:
	int id;                      // id counter for new vertices
	int num_edges;               // edge count
	double totalWeight; //distance the edges add up to
	vector<vertex *> vertexList; // vector to hold vertices
	strMapInt cityLookup;
	//ID lists for specifc states
	map<string, vector<int>> stateList;
	//Reference for state adjacency
	map<string, vector<string>> stateRef;
	//File stream to get state adjacency information
	ifstream state_adj;
	//String to store read in values from state_adj
	string line;
	//String to store the current state when generating adjacency reference
	string state;

	/**
	 * private: createVertex - returns a new vertex with unique id.
	 * Params:
	 *     string city
	 *     string state
	 */
	vertex *createVertex(string city, string state, latlon ll)
	{
		return new vertex(id++, city, state, ll);
	}

	/**
	 * graph - constructor
	 */
	graph()
	{
		id = 0;
		num_edges = 0;

		totalWeight = 0;
		//Generate a state adjacency reference
		//state_adj.txt MUST be in the SAME folder as program_4.exe
		state_adj.open("state_adj.txt");
		//Get a new line of state adjacency
		getline(state_adj, line);
		//Establish what state we're now on
		state = line.substr(0, 2);
		do {
			//Push every state that is adjacent to the current states set
			for (int i = 0; i < line.length(); i += 3) {
				//cout << line.substr(i, 2);
				stateRef[state].push_back(line.substr(i, 2));
			}
			//Get a new line of state adjacency
			getline(state_adj, line);
			//Establish what state we're now on
			state = line.substr(0, 2);
		} while (!state_adj.eof());
		state_adj.close();
	}

	graph(const graph &G)
	{
		id = G.id;
		num_edges = G.num_edges;
		vertexList = G.vertexList;
		cityLookup = G.cityLookup;

		totalWeight = G.totalWeight;
		//Generate a state adjacency reference
		//state_adj.txt MUST be in the SAME folder as program_4.exe
		state_adj.open("state_adj.txt");
		//Get a new line of state adjacency
		getline(state_adj, line);
		//Establish what state we're now on
		state = line.substr(0, 2);
		do {
			//Push every state that is adjacent to the current states set
			for (int i = 0; i < line.length(); i += 3) {
				//cout << line.substr(i, 2);
				stateRef[state].push_back(line.substr(i, 2));
			}
			//Get a new line of state adjacency
			getline(state_adj, line);
			//Establish what state we're now on
			state = line.substr(0, 2);
		} while (!state_adj.eof());
		state_adj.close();
	}

	/**
	 * addVertex - adds a vertex to the graph
	 * Params:
	 *     string   city     - name of city
	 *     string   state    - two letter abbr of state
	 *     double   lat      - latitude
	 *     double   lon      - longitude
	 * Returns
	 *     void
	 */
	int addVertex(string city, string state, double lat = 0.0, double lon = 0.0)
	{
		//I modified this to use state, borrowed from Shady's code on slack ofc
		if (cityLookup.find(city + state) == cityLookup.end())
		{
			// Add the city as a key to the map.
			cityLookup[city + state] = 0;
		}
		else
		{
			return -1;
		}

		vertex *temp = createVertex(city, state, latlon(lat, lon));
		vertexList.push_back(temp);
		//update the value that city points to.
		cityLookup[city + state] = temp->ID;
		return temp->ID;
	}

	/**
	 * addEdge - adds a relationship between two vertices to the graph
	 * Params:
	 *     int      fromID   - the ID of the vertex in which the edge is leaving
	 *     int      toID     - ID of the receiving vertex
	 *     double   weight   - weight of the edge if any
	 *     bool     directed - is the edge directed or not
	 * Returns
	 *     void
	 */
	void addEdge(int fromID, int toID, double weight = 0, bool directed = false)
	{
		edge e1(toID, weight);
		vertexList[fromID]->E.push_back(e1);
		num_edges++;
		//Just included total weight cumulation here
		totalWeight += weight;
		//cout << "adding " << fromID << " to " << toID << endl;
		if (!directed)
		{
			edge e2(fromID, weight);
			vertexList[toID]->E.push_back(e2);
			//cout << "adding " << toID << " to " << fromID << endl;
			num_edges++;
		}
	}

	/**
	 * printGraph - prints the graph out for debugging purposes
	 * Params:
	 *     void
	 */
	void printGraph()
	{

		vector<vertex *>::iterator vit;
		vector<edge>::iterator eit;

		for (vit = vertexList.begin(); vit != vertexList.end(); vit++)
		{
			cout << *(*vit) << endl;

			if ((*vit)->E.size() > 0)
			{
				for (eit = (*vit)->E.begin(); eit != (*vit)->E.end(); eit++)
				{
					cout << "\t" << (*eit) << endl;
				}
			}
		}
	}

	/* Method: mylower
	** Description: Not my lower, rather, Dr. Griffin's mylower
	*/
	string mylower(string s) {
		for (int i = 0; i < s.length(); i++) {
			if (s[i] >= 'A' && s[i] <= 'Z') {
				s[i] += 32;
			}
		}
		return s;
	}

	/* Method: searchGraph
	** Description: searches the graph and returns the string back if found
	**     also not mine. Haven't changed it any.
	*/
	string searchGraph(string c)
	{

		vector<vertex *>::iterator i;
		vector<edge>::iterator eit;

		for (i = vertexList.begin(); i != vertexList.end(); i++)
		{
			if (mylower((*i)->city) == mylower(c)) {
				cout << *(*i) << endl;
				return (*i)->city;
			}
		}
		return "";
	}

	/* Method: valid
	** Description: Determines if a vertex can be considered
	**     in creating a spanning tree
	** Parameters:
	**     cid - the id of the city we are drawing edges from
	**     vid - the id of the city we are validating
	**     max_edges - the maximum edges that a city should have
	*/
	bool valid(int cid, int vid, int max_edges) {
		//A valid vertex is not already connected to the city
		if (vertexList[cid]->connected(vid))
			return false;
		//A valid vertex has less than max_edges edges
		if (vertexList[vid]->E.size() >= max_edges)
			return false;
		//A valid vertex is NOT the same city looking for neighbors
		if (vid == cid)
			return false;
		return true;
	}

	/* Method: neighbors
	** Description: Finds the nearest valid neighbors and returns a vector of
	**     their ids
	** Params:
	**     cid - the id of the city we are drawing edges from
	**     num_get - how many neighbors the city needs
	**     max_edges - how many edges a city can have
	*/
	vector<int> neighbors(int cid, int num_get, int max_edges) {
		//vertex holding the neighbors
		vector<int> nb;
		//iterator
		vector<int>::iterator it;
		//Basically this goes through the state reference and uses every near
		// enough state
		for (int l = 0; l < stateRef[vertexList[cid]->state].size(); l++) {
			//this sets our current state so we can access its list
			string st = stateRef[vertexList[cid]->state][l];
			//This loops through all the city ids in this states list
			for (int i = 0; i < stateList[st].size(); i++) {
				//If the neighbor list is empty, and we have a valid city, push it
				if (valid(cid, stateList[st][i], max_edges) && nb.size() == 0) {
					nb.push_back(stateList[st][i]);
				}
				else if (valid(cid, stateList[st][i], max_edges)) {
					//placement once theres stuff there is slightly more complicated
					//but I'm basically just using a vector as a heap
					bool placed = false;
					for (int j = 0; j < nb.size(); j++) {
						it = nb.begin() + j;
						if (vertexList[cid]->dist(*vertexList[stateList[st][i]]) < vertexList[cid]->dist(*vertexList[nb[j]])) {
							nb.insert(it, stateList[st][i]);
							j = nb.size() + 1;
							placed = true;
						}
					}
					//If it didn't find a place before any items, and the list
					//still isn't at the objective size, just push it to the back
					if (placed == false && nb.size() < num_get) {
						nb.push_back(stateList[st][i]);
					}
				}
				//Don't forget, we need to keep it under num_get
				if (nb.size() > num_get) {
					nb.pop_back();
				}
			}
		}
		return nb;
	}

	/* Method: createSpanningTree
	** Params:
	**     cid - id of the starting city
	**     max_edges - number of edges each vertex can have
	** Returns: the number of successfully connected cities
	*/
	int createSpanningTree(int cid, int max_edges)
	{
		int debComp = 0; //debugging - count the number of cities connected
		//CREATE STATE BASED CITY ID LISTS
		//I honestly have no idea why this has to be located here but it
		//doesn't work anywhere else and using state reference greatly improves
		//performance time so its here to stay
		for (int i = 0; i < vertexList.size(); i++) {
			stateList[vertexList[i]->state].push_back(i);
		}

		//The city queue
		queue<int> q;
		//The current selected city
		int city;
		q.push(cid);
		vertexList[cid]->visited = true;
		////
		debComp++;
		progress(debComp, vertexList.size());
		do {
			city = q.front();
			q.pop();
			int numNbs = max_edges - vertexList[city]->E.size();
			vector<int> nbs = neighbors(city, numNbs, max_edges);
			for (int i = 0; i < nbs.size(); i++) {
				//draw an edge
				addEdge(city, nbs[i], vertexList[city]->dist(*vertexList[nbs[i]]));
				//queue them & mark visited
				if (!vertexList[nbs[i]]->visited) {
					q.push(nbs[i]);
					vertexList[nbs[i]]->visited = true;
					////
					debComp++;
					progress(debComp, vertexList.size());
				}
			}
		} while (!q.empty());
		return debComp;
	}

	/* Method: printVids
	** Description: I do not know the purpose or functionality of this method
	**     Seems to print ids. Makes sense given the name.
	*/
	void printVids() {
		vector<vertex *>::iterator vit;
		vector<edge>::iterator eit;

		for (vit = vertexList.begin(); vit != vertexList.end(); vit++)
		{
			cout << (*vit)->ID << endl;
		}
	}

	/* Method: graphViz
	** Description: This is really cool but I couldn't comment it if I tried
	*/
	string graphViz(bool directed = true) {
		vector<vertex *>::iterator vit;
		vector<edge>::iterator eit;

		// [label="hi", weight=100];

		string viz = "";
		string labels = "";
		string conns = "";
		int weight = 0;
		string arrow = "";

		if (directed) {
			viz = "digraph G {\n";
			arrow = "->";

		}
		else {
			viz = "graph G {\n";
			arrow = "--";
		}

		for (vit = vertexList.begin(); vit != vertexList.end(); vit++)
		{
			if ((*vit)->E.size() > 0)
			{
				labels += "\t" + to_string((*vit)->ID) + " [label=\"" + (*vit)->city + ", " + (*vit)->state + "\"]\n";

				for (eit = (*vit)->E.begin(); eit != (*vit)->E.end(); eit++)
				{


					labels += "\t" + to_string(eit->toID) + " [label=\"" + vertexList[eit->toID]->city + ", " + vertexList[eit->toID]->state + "\"]\n";

					weight = eit->weight;
					conns += "\t" + to_string((*vit)->ID) + arrow
						+ to_string(eit->toID) + " [weight=" + to_string(weight) + ", label=" + to_string(weight) + "]\n";
				}
			}
		}

		viz += labels;
		viz += conns;
		viz += "}\n";

		return viz;
	}

	/**
	 * maxID - returns the max id assigned to any vertex
	 * Params:
	 *     void
	 * Returns:
	 *     int
	 */
	int maxID()
	{
		return id;
	}

	/**
	 * graphSize - returns the number of vertices and edges
	 * Params:
	 *     void
	 * Returns:
	 *     int
	 */
	int* graphSize() {
		int* vals = new int[2];
		vals[0] = vertexList.size();
		vals[1] = num_edges;
		return vals;
	}

	/**
	 * operator= - overload assignment for Graph
	 * NOT DONE
	 * Params:
	 *     const latlon ll     - lat lon to assign
	 * Returns
	 *     reference to assignment for chaining (e.g. a = b = c )
	 */
	graph &operator=(const graph &g)
	{
		// do the copy
		vertexList = g.vertexList;
		id = g.id;

		// return the existing object so we can chain this operator
		return *this;
	}
};