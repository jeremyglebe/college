/* Program 03: Digit display
 * Author: Jeremy Glebe
 * Date: 9/12/18
 * Description: Displays the digits of a 5 digit integer with spaces in between
 * Answers to questions:
 * 1) When you attempt to use a <5 digit number, it displays the numbers with
 *     '0's in front.
 * 2) When you attempt to use a >5 digit number, it displays only the last 5
 *     digits.
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

namespace program_03
{
    public partial class displayWindow : Form
    {
        public displayWindow()
        {
            InitializeComponent();
        }

        private void showNumBtn_Click(object sender, EventArgs e)
        {
            //Reset the text box
            numText.Text = "";
            int integer; //This is the number whose digits we're displaying
            //Try to parse the input string into an integer
            if (int.TryParse(inputBox.Text, out integer))
            {
                //Loop for all of the 5 digits
                for(int i = 0; i < 5; i++)
                {
                    //Get the string version of the LAST digit of the integer
                    string nextDigit = (integer % 10).ToString() + "   ";
                    //Add the digit to the front of the text
                    numText.Text = nextDigit + numText.Text;
                    //Remove the last digit of the integer
                    integer /= 10;
                }
            }
            //If the parse fails, we need to show an error
            else
            {
                string error = "ERROR: The input could not be parsed!";
                error += " (Did you use non-numeric characters?)";
                numText.Text = "Parse failed!";
                MessageBox.Show(error, "Parse Error", MessageBoxButtons.OK,
                    MessageBoxIcon.Exclamation);
            }
        }
    }
}
