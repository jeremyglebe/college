using System;
using System.Collections.Generic;
using System.Xml;

namespace Analyzers
{
    public abstract class Analyzer
    {
        //Game end and victory
        protected bool gameEnd;
        public bool GameEnd { get { return gameEnd; } }
        protected bool victory;
        public bool Victory { get { return victory; } }
        //Guesses and guesses allowed
        protected int guesses;
        public int Guesses { get { return guesses; } }
        protected int maxGuesses;
        public int MaxGuesses { get { return maxGuesses; } }
        //Number of samples collected
        protected int samples;
        public int Samples { get { return samples; } }
        //Objective number of samples to collect
        protected int goal;
        public int Goal { get { return goal; } }
        //Game grid on which the game is played
        protected char[][] grid;
        public char[][] Grid { get { return grid; } }
        //The name of the level
        protected string name;
        public string Name { get { return name; } }
        //Problem description for the level
        protected string description;
        public string Description { get { return description; } }
        //Various dialogues the "characters" of the game might say.
        //Loaded from the level file. First element should be the tutorial.
        protected List<List<string>> dialogs;
        public List<List<string>> Dialogs { get { return dialogs; } }
        //Number of rows in game grid
        protected int rows;
        public int Rows { get { return rows; } }
        //Number of columns in game grid
        protected int cols;
        public int Cols { get { return cols; } }
        //Mapping unicode chars for easy access without copy/paste
        public Dictionary<string, char> schar;

        /* Analyzer (Default)
         * Desc: Default construtor for Analyzer class
         */
        public Analyzer()
        {
            //Set the number of rows and columns
            rows = 10;
            cols = 10;
            //Initialize the grid
            grid = new char[rows][];
            for (int i = 0; i < grid.Length; i++)
            {
                grid[i] = new char[cols];
            }
            //Set up the special characters
            scharSetup();
        }

        /* Analyzer (Size)
         * Desc: Size-based construtor for Analyzer class
         * Params:
         *     r: number of rows in the game grid
         *     c: number of columns in the game grid
         */
        public Analyzer(int r, int c)
        {
            //Set the number of rows and columns
            rows = r;
            cols = c;
            //Initialize the grid
            grid = new char[rows][];
            for (int i = 0; i < grid.Length; i++)
            {
                grid[i] = new char[cols];
            }
            //Set up the special characters
            scharSetup();
        }

        /* Analyzer (File)
         * Desc: File-based construtor for Analyzer class
         * Params:
         *     file: the file to read from
         * Requirements:
         *     File Format: The file must be an XML file matching the general
         *         format presented in the Level_Test.xml  file found within
         *         the game's Levels folder.
         */
        public Analyzer(string file)
        {
            //Create the XML Document object
            XmlDocument lvlDoc = new XmlDocument();
            try
            {
                lvlDoc.Load(file);
            }
            catch(Exception e)
            {
                throw (e);
            }
            try
            {
                //Set variables based on data from the file
                name = lvlDoc.DocumentElement["Name"].InnerText;
                description = lvlDoc.DocumentElement["Description"].InnerText;
                maxGuesses = Int32.Parse(lvlDoc.DocumentElement["MaxGuesses"].InnerText);
                goal = Int32.Parse(lvlDoc.DocumentElement["Goal"].InnerText);
                //Create the string grid from the XML file
                //We remove whitespace (and end lines with '\') because it makes
                //it easy to view within the XML without the level-maker having to
                //worry about accidental new lines or tabs
                string gridText = lvlDoc.DocumentElement["Grid"].InnerText
                    .Replace("\r\n", string.Empty);
                gridText = gridText.Replace(" ", string.Empty);
                char[] delims = { '\\' };
                string[] strGrid = gridText
                    .Split(delims, StringSplitOptions.RemoveEmptyEntries);
                //Reading in dialogs
                dialogs = new List<List<string>>();
                int ind = 0;
                foreach (XmlNode dialog in lvlDoc.DocumentElement["Dialogues"])
                {
                    dialogs.Add(new List<string>());
                    foreach (XmlNode line in dialog)
                    {
                        dialogs[ind].Add(line.InnerText);
                    }
                    ind++;
                }
                //Setup the size of the grid
                rows = strGrid.Length;
                cols = strGrid[0].Length;
                //Create the character grid
                grid = new char[rows][];
                for (int r = 0; r < rows; r++)
                {
                    grid[r] = new char[cols];
                    for (int c = 0; c < cols; c++)
                    {
                        grid[r][c] = strGrid[r][c];
                    }
                }
            }
            catch(Exception e)
            {
                throw e;
            }
            //Set up the special characters
            scharSetup();
        }

        /* ToString
         * Desc: Returns the character grid as a string equivalent with no
         *     game based interpretation or changes.
         * Returns: multi-line string of characters for game
         */
        override public string ToString()
        {
            string display = "";

            for (int r = 0; r < rows; r++)
            {
                for (int c = 0; c < cols; c++)
                {
                    display += grid[r][c];
                }
                display += '\n';
            }

            return display;
        }

        /* scharSetup
         * Desc: Creates a dictionary of special characters for the analyzer to
         *     make use of.
         */
        private void scharSetup()
        {
            schar = new Dictionary<string, char>();
            schar.Add("wall_v", '│');
            schar.Add("wall_vw", '┤');
            schar.Add("wall_ve", '├');
            schar.Add("wall_h", '─');
            schar.Add("wall_hn", '┴');
            schar.Add("wall_hs", '┬');
            schar.Add("wall_nw", '┌');
            schar.Add("wall_ne", '┐');
            schar.Add("wall_sw", '└');
            schar.Add("wall_se", '┘');
            schar.Add("wall_+", '┼');
            schar.Add("wall_dark", '█');
        }

        /* Guess
         * Desc: Make a guess on the game board as to where a sample may be.
         * Params:
         *     r: the row of the guess
         *     c: the column of the guess
         * Returns:
         *     char: the character at the grid location
         */
        abstract public char Guess(int r, int c);

        /* ValidGame
         * Desc: Determines if the data found in the file is sufficient to play
         *     this gamemode.
         * Returns:
         *     bool: whether the game is valid
         */
        abstract public bool ValidGame();

        /* Interpret
         * Description: Interprets a character in for actual game display.
         *     This must be done per gamemode.
         * Ex: 'X' might mark a goal, but should be represented as '~' so its
         *     hidden from the player.
         * Params:
         *     r: the row of the character to interpret
         *     c: the column of the character to interpret
         * Returns:
         *     char: the character that should be displayed
         */
        abstract public char Interpret(int r, int c);

    }

}
