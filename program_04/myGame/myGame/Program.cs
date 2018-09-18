using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace myGame
{
    static class Program
    {
        /// <summary>
        /// The main entry point for the application.
        /// </summary>
        [STAThread]
        static void Main()
        {
            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);
            Application.Run(new GameForm());
        }

    }

    public class Grid
    {
        private char[][] grid;
        private int hiddenX, hiddenY;

        /* Method: Grid Constructor
         * Desc: Generates a grid of a set size and randomly places a piece of
         * hidden evidence inside of it.
         * Params:
         *     int xSize: The highest x coordinate, number of columns, size of
         *         the x-axis.
         *     int ySize: The highest y coordinate, number of rows, size of the
         *         y-axis.
         */
        public Grid(int xSize, int ySize)
        {
            //Number of rows
            grid = new char[ySize][];
            for (int i = 0; i < grid.Length; i++)
            {
                //Number of columns
                grid[i] = new char[xSize];
                //Set the actual characters
                for (int j = 0; j < grid[i].Length; j++)
                {
                    grid[i][j] = '~';
                }
            }
            //We need random coordinates
            Random rnd = new Random();
            //Set the hidden evidence's location
            hiddenX = rnd.Next(0, xSize);
            hiddenY = rnd.Next(0, ySize);
            //Exit the function
            return;
        }

        /* Method: GetHidden
         * Desc: Gets the location of the hidden evidence.
         * Returns: Array of integers where index 0 contains the x coordinate
         *     and index 1 contains the y coordinate.
         */
        public int[] GetHidden()
        {
            int[] loc = new int[2];
            loc[0] = hiddenX;
            loc[1] = hiddenY;
            return loc;
        }

        /* Method: asString
         * Desc: Presents the grid as a single string.
         * Returns: A string in which there is a newline between rows.
         */
        public string asString()
        {
            //The text representation of the grid
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
