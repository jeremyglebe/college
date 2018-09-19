using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace CsiGame
{
    public partial class gameForm : Form
    {
        ScanAnalyzer scanner;
        bool gameStarted;

        public gameForm(ScanAnalyzer new_scanner)
        {
            scanner = new_scanner;
            gameStarted = false;
            InitializeComponent();
        }

        private void trackX_Scroll(object sender, EventArgs e)
        {
            //Set the label text to match the track value
            lblXTrack.Text = "Row: " + trackX.Value.ToString() ;
        }

        private void trackY_Scroll(object sender, EventArgs e)
        {
            lblYTrack.Text = "Column: " + trackY .Value.ToString();
        }

        private void btnNewGame_Click(object sender, EventArgs e)
        {
            //Set the user instructions
            helpText.Text = "New Game: Select a game size and hit \"OK!\"";
            //Let the user choose up to 20x20
            trackX.Maximum = 20;
            trackY.Maximum = 20;
            //Set the game started flag to false
            gameStarted = false;
        }

        private void btnOK_Click(object sender, EventArgs e)
        {
            //If the user is making a guess (when the game has already started)
            if (gameStarted)
            {
                //Update the grid based on the guess
                scanner.Guess(trackX.Value, trackY.Value);
                //Update the grid display
                gameDisplay.Text = scanner.DisplayGrid();
            }
            //If the user is choosing a new game size
            else
            {
                //Create a new scanner and display the new grid
                scanner = new ScanAnalyzer(trackX.Value, trackY.Value);
                gameDisplay.Text = scanner.DisplayGrid();
                //Only let the user choose guesses in the range of the grid
                trackX.Maximum = trackX.Value - 1;
                trackY.Maximum = trackY.Value - 1;
                //Set the instruction text
                helpText.Text = "Guessing: Choose the row and column of your" +
                    " guess, then hit \"OK!\"\r\nThe Scan Analyzer will draw a" +
                    " box around the hidden sample";
                //The game has started
                gameStarted = true;
            }
        }
    }
}
