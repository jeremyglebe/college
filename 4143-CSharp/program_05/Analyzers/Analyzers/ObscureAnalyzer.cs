namespace Analyzers
{
    public abstract class ObscureAnalyzer : Analyzer
    {
        //The row the player's piece currently resides on
        protected int plyRow;
        //The column the player's piece currently resides on
        protected int plyCol;

        /* ObscureAnalyzer (Default)
         * Desc: Default construtor for ObscureAnalyzer class
         */
        public ObscureAnalyzer() : base() { }

        /* ObscureAnalyzer (File)
         * Desc: File-based construtor for ObscureAnalyzer class
         * Params:
         *     file: the file to read from
         */
        public ObscureAnalyzer(string file) : base(file) { }

        /* ObscureAnalyzer (Size)
         * Desc: Size-based construtor for ObscureAnalyzer class
         * Params:
         *     r: number of rows in the game grid
         *     c: number of columns in the game grid
         */
        public ObscureAnalyzer(int r, int c) : base(r, c) { }

        /* ValidGame
         * Desc: Determines if the data found in the file is sufficient to play
         *     this gamemode.
         * Returns:
         *     bool: whether the game is valid
         */
        public override bool ValidGame()
        {
            bool hasSamples = false;
            bool hasInvestigator = false;

            for (int r = 0; r < rows; r++)
            {
                for (int c = 0; c < cols; c++)
                {
                    if (grid[r][c] == 'X')
                    {
                        hasSamples = true;
                    }
                    else if (grid[r][c] == 'i')
                    {
                        hasInvestigator = true;
                    }
                }
            }

            return (hasSamples && hasInvestigator);
        }

        /* plyMove
         * Desc: moves the play on the grid in gamemodes which have a player
         *     character.
         * Params:
         *     r: the row to move to
         *     c: the column to move to
         * Returns:
         *     bool: whether the player successfully moved
         */
        public bool plyMove(int r, int c)
        {
            try
            {
                grid[r][c] = 'i';
                grid[plyRow][plyCol] = '`';
                plyRow = r;
                plyCol = c;
                return true;
            }
            catch
            {
                return false;
            }
        }

        /* Obscured
         * Determine if a specific location is obscurred from the view of the
         *     player based on their location.
         * Params:
         *     r: the row of the location
         *     c: the column of the location
         * Returns: bool, is the location obscured from view?
         */
        abstract public bool Obscured(int r, int c);

    }
}
