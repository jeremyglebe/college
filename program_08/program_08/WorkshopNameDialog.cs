using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Drawing;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace program_08
{
    public partial class WorkshopNameDialog : UserControl
    {
        public event DialogEndHandler DialogEnd;
        public EventArgs e = null;
        public delegate void DialogEndHandler(object sender, EventArgs e);

        private string wsname;
        public string WorkshopName { get { return wsname; } }

        public WorkshopNameDialog()
        {
            InitializeComponent();
            this.Hide();
        }

        private void Button_Confirm_Click(object sender, EventArgs e)
        {
            wsname = TextBox_WSName.Text;
            DialogEnd(this, e);
            this.Hide();
        }
    }
}
