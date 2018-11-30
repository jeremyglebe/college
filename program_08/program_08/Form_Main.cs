using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace program_08
{
    public partial class Form_Main : Form
    {
        public Form_Main()
        {
            InitializeComponent();
        }

        private void Menu_New_Click(object sender, EventArgs e)
        {
            NameDialog.Show();
        }

        private void NameDialog_DialogEnd(object sender, EventArgs e)
        {
            Form child = new Form_Workshop();
            child.MdiParent = this;
            child.Name = "Form_Workshop_" + NameDialog.WorkshopName;
            child.Text = NameDialog.WorkshopName;
            child.Show();
        }

        private void ItemDialog_DialogEnd(object sender, EventArgs e)
        {
            try
            {
                Form_Workshop child = (Form_Workshop)this.ActiveMdiChild;
                child.AddRecord(ItemDialog.Item);
            }
            catch { }
        }

        private void Menu_Item_Click(object sender, EventArgs e)
        {
            ItemDialog.Show();
        }

        private void Menu_Save_Click(object sender, EventArgs e)
        {
            Form_Workshop child = (Form_Workshop)this.ActiveMdiChild;
            child.Save();
        }
    }
}
