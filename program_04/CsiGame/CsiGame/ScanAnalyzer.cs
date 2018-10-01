using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CsiGame
{
    public class ScanAnalyzer
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
            public int x, y;
            public loc(int nx, int ny)
            {
                x = nx;
                y = ny;
            }
        }

        /* ScanAnalyzer Default Constructor
         */
        public ScanAnalyzer()
        {
            //Set the grid dimensions
            rows = 10;
            cols = 10;
            //Generate the array
            grid = new char[rows][];
            for (int i = 0; i < 10; i++)
            {
                grid[i] = new char[cols];
                for (int j = 0; j < 10; j++)
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

        /* ScanAnalyzer Parameterized Constructor
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
         * Returns: String of the grid intended to be used in a text box with
         * a uniform width font.
         */
        public string DisplayGrid()
        {
            //The string we want to place the grid into (presumably a text box)
            string text = "  ";
            //Add the position numbers for the columns
            for (int i = 0; i < cols; i++)
            {
                if (i < 10)
                {
                    text += "0";
                }
                text += i.ToString() + " ";
            }
            text += "\r\n";
            for (int i = 0; i < rows; i++)
            {
                //Add the position numbers for each row
                if (i < 10)
                {
                    text += "0";
                }
                text += i.ToString() + " ";
                //Traverse the grid, adding characters to each row
                for (int j = 0; j < cols; j++)
                {
                    text += grid[i][j] + "  ";
                }
                text += "\r\n";
            }
            //Exit the function
            return text;
        }

        /* Method: Guess
         * Desc: Changes the grid to reflect a guess made.
         */
        public void Guess(int r, int c)
        {
            //Are we looking for the first or second sample?
            int sample = grid[secret[0].y][secret[0].x] == 'X' ? 1 : 0;

            //Determine what direction the sample is in from the guess
            //We don't REALLY need this, but it makes it easier to read the
            //behaviors rather than having each one under a bunch of conditions
            string direction = "";
            if (secret[sample].y > r)
            {
                direction += "s";
            } else if (secret[sample].y < r)
            {
                direction += "n";
            }
            if (secret[sample].x > c)
            {
                direction += "e";
            }
            else if (secret[sample].x < c)
            {
                direction += "w";
            }

            //Behaviors based on direction
            switch (direction)
            {
                case "n":
                    grid[r][c] = '╧';
                    for (int i = 0; i < grid[r].Length; i++)
                    {
                        if (grid[r][i] == '~')
                        {
                            grid[r][i] = '═';
                        }
                    }
                    break;
                case "s":
                    grid[r][c] = '╤';
                    for (int i = 0; i < grid[r].Length; i++)
                    {
                        if (grid[r][i] == '~')
                        {
                            grid[r][i] = '═';
                        }
                    }
                    break;
                case "w":
                    grid[r][c] = '╢';
                    for (int i = 0; i < grid.Length; i++)
                    {
                        if (grid[i][c] == '~')
                        {
                            grid[i][c] = '║';
                        }
                    }
                    break;
                case "e":
                    grid[r][c] = '╟';
                    for (int i = 0; i < grid.Length; i++)
                    {
                        if (grid[i][c] == '~')
                        {
                            grid[i][c] = '║';
                        }
                    }
                    break;
                case "nw":
                    grid[r][c] = '╝';
                    break;
                case "ne":
                    grid[r][c] = '╚';
                    break;
                case "sw":
                    grid[r][c] = '╗';
                    break;
                case "se":
                    grid[r][c] = '╔';
                    break;
                default:
                    grid[r][c] = 'X';
                    for (int i = 0; i < rows; i++)
                    {
                        for (int j = 0; j < cols; j++)
                        {
                            if (grid[i][j] != '~' && grid[i][j] != 'X')
                            {
                                grid[i][j] = '~';
                            }
                        }
                    }
                    break;
            }
        }
    }
}
