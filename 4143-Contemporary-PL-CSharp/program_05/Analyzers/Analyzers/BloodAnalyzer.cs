using System;

namespace Analyzers
{
    public class BloodAnalyzer : ObscureAnalyzer
    {
        /* BloodAnalyzer (Default)
         * Desc: Default construtor for BloodAnalyzer class
         */
        public BloodAnalyzer() : base()
        {
            for (int r = 0; r < rows; r++)
            {
                for (int c = 0; c < cols; c++)
                {
                    if (grid[r][c] == 'i')
                    {
                        plyRow = r;
                        plyCol = c;
                    }
                }
            }
        }

        /* BloodAnalyzer (File)
         * Desc: File-based construtor for BloodAnalyzer class
         * Params:
         *     file: the file to read from
         */
        public BloodAnalyzer(string file) : base(file)
        {
            for (int r = 0; r < rows; r++)
            {
                for (int c = 0; c < cols; c++)
                {
                    if (grid[r][c] == 'i')
                    {
                        plyRow = r;
                        plyCol = c;
                    }
                }
            }
        }

        /* BloodAnalyzer (Size)
         * Desc: Size-based construtor for BloodAnalyzer class
         * Params:
         *     r: number of rows in the game grid
         *     c: number of columns in the game grid
         */
        public BloodAnalyzer(int r, int c) : base(r, c)
        {
            for (int ri = 0; ri < rows; ri++)
            {
                for (int ci = 0; ci < cols; ci++)
                {
                    if (grid[ri][ci] == 'i')
                    {
                        plyRow = ri;
                        plyCol = ci;
                    }
                }
            }
        }

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
                int pr = plyRow;
                int pc = plyCol;
                char toSpace = grid[r][c];
                char fromSpace = grid[plyRow][plyCol];
                plyMove(r, c);
                switch (toSpace)
                {
                    case 'X':
                        grid[r][c] = '~';
                        samples++;
                        break;
                    default:
                        grid[r][c] = toSpace;
                        break;
                }
                switch (fromSpace)
                {
                    case 'i':
                        grid[pr][pc] = '`';
                        break;
                    default:
                        grid[pr][pc] = fromSpace;
                        break;
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
                return toSpace;
            }
            else
                return 'O';
        }

        /* Obscurred
         * Determine if a specific location is obscurred from the view of the
         *     player based on their location.
         * Params:
         *     r: the row of the location
         *     c: the column of the location
         * Returns: bool, is the location obscured from view?
         */
        public override bool Obscured(int r, int c)
        {
            double distance = Math.Sqrt(
                Math.Pow(plyRow - r, 2)
                + Math.Pow(plyCol - c, 2));
            if (distance > 2)
            {
                return true;
            }
            return false;
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
            if (r == plyRow && c == plyCol)
            {
                return 'i';
            }
            else if (Obscured(r, c))
            {
                return schar["wall_dark"];
            }
            else if (grid[r][c] == '`')
            {
                return ' ';
            }
            else if (grid[r][c] == 'X')
            {
                return '~';
            }
            return grid[r][c];
        }
    }
}
