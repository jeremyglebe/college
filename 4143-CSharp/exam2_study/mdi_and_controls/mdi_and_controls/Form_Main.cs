using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace mdi_and_controls
{
    public partial class Form_Main : Form
    {
        public Form_Main()
        {
            InitializeComponent();
        }

        private void Button_ShowChild_Click(object sender, EventArgs e)
        {
            Form_Child child = new Form_Child();
            child.MdiParent = this;
            child.Show();
        }

        private void dontShowTabsToolStripMenuItem_Click(object sender, EventArgs e)
        {
            tabControl1.Visible = false;
        }

        private void showTabsToolStripMenuItem_Click(object sender, EventArgs e)
        {
            tabControl1.Visible = true;
        }
    }
}
