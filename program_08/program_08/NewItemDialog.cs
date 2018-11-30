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
    public partial class NewItemDialog : UserControl
    {
        public event DialogEndHandler DialogEnd;
        public EventArgs e = null;
        public delegate void DialogEndHandler(object sender, EventArgs e);

        private Record item;
        public Record Item { get { return item; } }

        public NewItemDialog()
        {
            InitializeComponent();
            this.Hide();
        }

        private void Button_Confirm_Click(object sender, EventArgs e)
        {
            int q = Int32.Parse(TextBox_Quantity.Text);
            double p = Double.Parse(TextBox_Price.Text);
            string n = TextBox_Name.Text;
            item = new Record(q, p, n);
            DialogEnd(this, e);
            this.Hide();
        }
    }
}
