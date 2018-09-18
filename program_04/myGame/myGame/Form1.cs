using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace myGame
{
    public partial class GameForm : Form
    {
        Grid gameGrid;

        public GameForm()
        {
            InitializeComponent();
        }

        private void btnStart_Click(object sender, EventArgs e)
        {
            //Default grid size
            gameGrid = new Grid(52,28);
            //Display the grid as text
            txtGrid.Text = gameGrid.asString();
        }
    }
}
