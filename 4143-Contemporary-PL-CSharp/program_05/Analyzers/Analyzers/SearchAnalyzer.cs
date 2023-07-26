namespace Analyzers
{
    public class SearchAnalyzer : ObscureAnalyzer
    {

        /* SearchAnalyzer (Default)
         * Desc: Default construtor for SearchAnalyzer class
         */
        public SearchAnalyzer() : base()
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

        /* SearchAnalyzer (File)
         * Desc: File-based construtor for SearchAnalyzer class
         * Params:
         *     file: the file to read from
         */
        public SearchAnalyzer(string file) : base(file)
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

        /* SearchAnalyzer (Size)
         * Desc: Size-based construtor for SearchAnalyzer class
         * Params:
         *     r: number of rows in the game grid
         *     c: number of columns in the game grid
         */
        public SearchAnalyzer(int r, int c) : base(r, c)
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
                char result;
                //In this gamemode, you can move a space at a time
                if (r > plyRow + 1 || r < plyRow - 1
                    || c > plyCol + 1 || c < plyCol - 1)
                {
                    result = ' ';
                }
                else
                {
                    //We found evidence
                    if (grid[r][c] == 'X')
                    {
                        plyMove(r, c);
                        guesses++;
                        samples++;
                        result = 'X';
                    }
                    //We found fake evidence
                    else if (grid[r][c] == '~')
                    {
                        plyMove(r, c);
                        guesses++;
                        result = '~';
                    }
                    //We are trying an empty space
                    else if (grid[r][c] == '`')
                    {
                        plyMove(r, c);
                        guesses++;
                        result = '`';
                    }
                    else
                    {
                        result = ' ';
                    }
                }
                //Check game over conditions
                if (guesses >= maxGuesses || samples >= goal)
                {
                    gameEnd = true;
                    if (samples >= goal)
                    {
                        victory = true;
                    }
                }
                return result;
            }
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
            if (r > plyRow)
            {
                bool wall;
                switch (grid[r][c])
                {
                    case '`':
                    case 'X':
                    case '~':
                        wall = false;
                        break;
                    default:
                        wall = true;
                        break;
                }

                for (int i = plyRow + 1; i < r; i++)
                {
                    switch (grid[i][c])
                    {
                        case '`':
                        case 'X':
                        case '~':
                            wall = false;
                            break;
                        default:
                            if (!wall)
                                return true;
                            else
                                break;
                    }
                }
            }
            if (r < plyRow)
            {
                bool wall;
                switch (grid[r][c])
                {
                    case '`':
                    case 'X':
                    case '~':
                        wall = false;
                        break;
                    default:
                        wall = true;
                        break;
                }

                for (int i = r + 1; i < plyRow; i++)
                {
                    switch (grid[i][c])
                    {
                        case '`':
                        case 'X':
                        case '~':
                            wall = false;
                            break;
                        default:
                            if (!wall)
                                return true;
                            else
                                break;
                    }
                }
            }
            if (c > plyCol)
            {
                bool wall;
                switch (grid[r][c])
                {
                    case '`':
                    case 'X':
                    case '~':
                        wall = false;
                        break;
                    default:
                        wall = true;
                        break;
                }

                for (int i = plyCol + 1; i < c; i++)
                {
                    switch (grid[r][i])
                    {
                        case '`':
                        case 'X':
                        case '~':
                            wall = false;
                            break;
                        default:
                            if (!wall)
                                return true;
                            else
                                break;
                    }
                }
            }
            if (c < plyCol)
            {
                bool wall;
                switch (grid[r][c])
                {
                    case '`':
                    case 'X':
                    case '~':
                        wall = false;
                        break;
                    default:
                        wall = true;
                        break;
                }

                for (int i = c + 1; i < plyCol; i++)
                {
                    switch (grid[r][i])
                    {
                        case '`':
                        case 'X':
                        case '~':
                            wall = false;
                            break;
                        default:
                            if (!wall)
                                return true;
                            else
                                break;
                    }
                }
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
            if (Obscured(r, c))
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
