using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CsiGame
{
    class ScanAnalyzer
    {
        //Number of grid rows
        private int rows;
        //Number of grid columns
        private int cols;
        //The grid for the game
        private char[][] grid;
        //Hidden evidence sample locations
        private loc[] secret;
        //Number of guesses made
        private int guesses;

        //Location structure for holding x,y pairs
        public struct loc
        {
            int x, y;
            public loc(int nx, int ny)
            {
                x = nx;
                y = ny;
            }
        }
        
        /* ScanAnalyzer Constructor
         * Params:
         *     - int r  The # of rows for the ScanAnalyzer's grid
         *     - int c  The # of columns for the ScanAnalyzer's grid
         */
        public ScanAnalyzer(int r, int c)
        {
            //Set the grid dimensions
            rows = r;
            cols = c;
            //Generate the array
            grid = new char[rows][];
            for (int i = 0; i < r; i++)
            {
                grid[i] = new char[cols];
                for (int j = 0; j < c; j++)
                {
                    grid[i][j] = '~';
                }
            }
            //Randomly select secret locations
            Random rnd = new Random();
            secret = new loc[2];
            secret[0] = new loc(rnd.Next(0, cols), rnd.Next(0, rows));
            secret[1] = new loc(rnd.Next(0, cols), rnd.Next(0, rows));
            //Set the guess counter to 0
            guesses = 0;
            //Exit the method
            return;
        }
        /* Method: DisplayGrid
         * Desc: Returns the grid as a string meant for display in a TextBox.
         * Params:
         */
        public string DisplayGrid()
        {
            //The string we want to place the grid into (presumably a text box)
            string text = "";
            //Traverse the grid, adding characters
            for (int i = 0; i < grid.Length; i++)
            {
                for (int j = 0; j < grid[i].Length; j++)
                {
                    text += grid[i][j];
                }
                text += "\r\n";
            }
            //Exit the function
            return text;
        }
    }
}
