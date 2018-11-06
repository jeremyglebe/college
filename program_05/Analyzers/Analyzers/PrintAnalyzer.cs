using System;

namespace Analyzers
{
    public class PrintAnalyzer : Analyzer
    {
        /* PrintAnalyzer (Default)
         * Desc: Default construtor for PrintAnalyzer class
         */
        public PrintAnalyzer() : base() { }

        /* PrintAnalyzer (File)
         * Desc: File-based construtor for PrintAnalyzer class
         * Params:
         *     file: the file to read from
         */
        public PrintAnalyzer(string file) : base(file) { }

        /* PrintAnalyzer (Size)
         * Desc: Size-based construtor for PrintAnalyzer class
         * Params:
         *     r: number of rows in the game grid
         *     c: number of columns in the game grid
         */
        public PrintAnalyzer(int r, int c) : base(r, c) { }

        /* Guess
         * Desc: Make a guess on the game board as to where a sample may be.
         * Params:
         *     r: the row of the guess
         *     c: the column of the guess
         * Returns:
         *     char: the character at the grid location
         */
        public override char Guess(int r, int c)
        {
            if (!gameEnd)
            {
                if (grid[r][c] == 'X')
                {
                    grid[r][c] = '@';
                    samples++;
                }
                else if (grid[r][c] != '@')
                {
                    int lr = -1;
                    int lc = -1;
                    double GetDistance(int tr, int tc)
                    {
                        return Math.Sqrt(
                            Math.Pow(tr - r, 2)
                            + Math.Pow(tc - c, 2));
                    }
                    //Get the nearest sample
                    for (int rr = 0; rr < rows; rr++)
                    {
                        for (int cc = 0; cc < cols; cc++)
                        {
                            if (grid[rr][cc] == 'X' || grid[rr][cc] == '@')
                            {
                                if (lr != -1 && lc != -1)
                                {
                                    if (GetDistance(rr, cc) < GetDistance(lr, lc))
                                    {
                                        lr = rr;
                                        lc = cc;
                                    }
                                }
                                else
                                {
                                    lr = rr;
                                    lc = cc;
                                }
                            }
                        }
                    }
                    //Point an arrow to it
                    //NW
                    if (lr < r && lc < c)
                    {
                        grid[r][c] = '↖';
                    }
                    //NE
                    else if (lr < r && lc > c)
                    {
                        grid[r][c] = '↗';
                    }
                    //SW
                    else if (lr > r && lc < c)
                    {
                        grid[r][c] = '↙';
                    }
                    //SE
                    else if (lr > r && lc > c)
                    {
                        grid[r][c] = '↘';
                    }
                    //N
                    else if (lr < r)
                    {
                        grid[r][c] = '↑';
                    }
                    //S
                    else if (lr > r)
                    {
                        grid[r][c] = '↓';
                    }
                    //W
                    else if (lc < c)
                    {
                        grid[r][c] = '←';
                    }
                    //E
                    else if (lc > c)
                    {
                        grid[r][c] = '→';
                    }
                }
                guesses++;
                //Check game over conditions
                if (guesses >= maxGuesses || samples >= goal)
                {
                    gameEnd = true;
                    if (samples >= goal)
                    {
                        victory = true;
                    }
                }
                return grid[r][c];
            }
            return 'O';
        }

        /* ValidGame
         * Desc: Determines if the data found in the file is sufficient to play
         *     this gamemode.
         * Returns:
         *     bool: whether the game is valid
         */
        public override bool ValidGame()
        {
            bool hasSamples = false;
            for (int r = 0; r < rows; r++)
            {
                for (int c = 0; c < cols; c++)
                {
                    if (grid[r][c] == 'X')
                    {
                        hasSamples = true;
                    }
                }
            }
            return hasSamples;
        }

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
        public override char Interpret(int r, int c)
        {
            switch (grid[r][c])
            {
                case 'X':
                case '`':
                    return '~';
                default:
                    return grid[r][c];
            }
        }
    }
}
