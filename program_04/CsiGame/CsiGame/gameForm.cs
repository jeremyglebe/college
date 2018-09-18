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
        public gameForm()
        {
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
            ScanAnalyzer game = new ScanAnalyzer(10, 10);
            gameDisplay.Text = game.DisplayGrid();
        }
    }
}
