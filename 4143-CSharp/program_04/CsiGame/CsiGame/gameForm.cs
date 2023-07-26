/* Program 04: CSI
 * Description: A game in which you find DNA samples of a crime based on random
 *     guessing.
 * Author: Jeremy Glebe
 * Date: 10/1/18
 */

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
        //Scanner runs most of the game
        ScanAnalyzer scanner;
        //We need to know if the game has already started
        bool gameStarted;
        //Create the gameForm and pass in the scanner
        public gameForm(ScanAnalyzer new_scanner)
        {
            scanner = new_scanner;
            gameStarted = false;
            InitializeComponent();
        }

        private void trackX_Scroll(object sender, EventArgs e)
        {
            //Set the label text to match the track value
            lblXTrack.Text = "Row: " + trackX.Value.ToString();
        }

        private void trackY_Scroll(object sender, EventArgs e)
        {
            lblYTrack.Text = "Column: " + trackY.Value.ToString();
        }

        private void btnNewGame_Click(object sender, EventArgs e)
        {
            //Set the user instructions
            helpText.Text = "Find the murderer!\r\n\r\n"
                + "New Game: Select a game size and hit \"OK!\"";
            //Let the user choose up to 20x20
            trackX.Minimum = 2;
            trackY.Minimum = 2;
            trackX.Maximum = 20;
            trackY.Maximum = 20;
            //Set the trackers back to zero until the user adjusts them
            trackX.Value = 2;
            trackY.Value = 2;
            //Set the label text to match the track value
            lblXTrack.Text = "Row: " + trackX.Value.ToString();
            lblYTrack.Text = "Column: " + trackY.Value.ToString();
            //Set the game started flag to false
            gameStarted = false;
        }

        private void btnOK_Click(object sender, EventArgs e)
        {
            //If the user is making a guess (when the game has already started)
            if (gameStarted)
            {
                //Update the grid based on the guess
                scanner.EvaluateGuess(trackX.Value, trackY.Value);
                //Update the grid display
                gameDisplay.Text = scanner.DisplayGrid();
                //Update the guesses text
                guessLabel.Text = "Guesses: " + scanner.Guesses.ToString()
                    + "/" + scanner.MaxGuesses.ToString();
                if (scanner.Winner)
                {
                    helpText.Text = "Success! You have found both DNA"
                        + " samples!\r\nYou guessed "
                        + scanner.Guesses.ToString() + " times.";
                }
                else if (scanner.Guesses >= scanner.MaxGuesses)
                {
                    helpText.Text = "You've made too many guesses!\r\nYou've"
                        + " damaged the evidence and the criminal got away!"
                        + "\r\nYou lose!";
                }
            }
            //If the user is choosing a new game size
            else
            {
                //Create a new scanner and display the new grid
                scanner = new ScanAnalyzer(trackX.Value, trackY.Value);
                gameDisplay.Text = scanner.DisplayGrid();
                //Only let the user choose guesses in the range of the grid
                trackX.Minimum = 0;
                trackY.Minimum = 0;
                trackX.Maximum = trackX.Value - 1;
                trackY.Maximum = trackY.Value - 1;
                //Set the trackers back to zero until the user adjusts them
                trackX.Value = 0;
                trackY.Value = 0;
                //Set the label text to match the track value
                lblXTrack.Text = "Row: " + trackX.Value.ToString();
                lblYTrack.Text = "Column: " + trackY.Value.ToString();
                //Set the instruction text
                helpText.Text = "Guessing: Choose the row and column of your" +
                " guess, then hit \"OK!\" The Scan Analyzer will draw an " +
                "arrow pointing towards the hidden sample.";
                //Update the guesses text
                guessLabel.Text = "Guesses: " + scanner.Guesses.ToString()
                    + "/" + scanner.MaxGuesses.ToString();
                //The game has started
                gameStarted = true;
            }
        }
    }
}
