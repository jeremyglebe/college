/* Program 04: CSI
 * Description: A game in which you find DNA samples of a crime based on random
 *     guessing.
 * Author: Jeremy Glebe
 * Date: 10/1/18
 */
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
        //Whether the player has found both samples
        private bool winner;
        //Number of guesses made
        private int guesses;
        //Maximum guesses
        private int maxGuesses;
        //Guesses property
        public int Guesses
        {
            get
            {
                return guesses;
            }
        }
        //MaxGuesses property
        public int MaxGuesses
        {
            get
            {
                return maxGuesses;
            }
        }
        //Winner property
        public bool Winner
        {
            get
            {
                return winner;
            }
        }

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
            //Set the maximum guesses
            maxGuesses = (int)Math.Sqrt(rows * cols) * 2;
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
            //Set the maximum guesses
            maxGuesses = (int)Math.Sqrt(rows * cols) * 2;
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
            do
            {
                secret[1] = new loc(rnd.Next(0, cols), rnd.Next(0, rows));
            } while (secret[1].x == secret[0].x && secret[1].y == secret[0].y);
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
        public void EvaluateGuess(int r, int c)
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
            }
            else if (secret[sample].y < r)
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

            if (grid[r][c] != 'X' && !winner && guesses < maxGuesses)
            {
                //Behaviors based on direction
                switch (direction)
                {
                    case "n":
                        grid[r][c] = '^';
                        break;
                    case "s":
                        grid[r][c] = 'V';
                        break;
                    case "w":
                        grid[r][c] = '<';
                        break;
                    case "e":
                        grid[r][c] = '>';
                        break;
                    case "nw":
                        grid[r][c] = (guesses % 2) < 1 ? '<' : '^';
                        break;
                    case "ne":
                        grid[r][c] = (guesses % 2) < 1 ? '>' : '^';
                        break;
                    case "sw":
                        grid[r][c] = (guesses % 2) < 1 ? '<' : 'V';
                        break;
                    case "se":
                        grid[r][c] = (guesses % 2) < 1 ? '>' : 'V';
                        break;
                    default:
                        grid[r][c] = 'X';
                        if (sample == 0)
                        {
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
                        }
                        else
                        {
                            winner = true;
                        }
                        break;
                }
                guesses++;
            }
        }
    }
}
