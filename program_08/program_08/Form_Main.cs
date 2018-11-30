/* Program 08: MDI
 * Author: Jeremy Glebe
 * Date: 11/30/2018
 * File: Form_Main.cs
 * Desc: Driving form of the program and parent that holds all documents being
 *     viewed or edited.
 */

using System;
using System.Windows.Forms;

namespace program_08
{
    public partial class Form_Main : Form
    {
        /// <summary>
        /// Constructor
        /// </summary>
        public Form_Main()
        {
            InitializeComponent();
        }

        /// <summary>
        /// When the new button is clicked, get the name
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void Menu_New_Click(object sender, EventArgs e)
        {
            NameDialog.Show();
        }

        /// <summary>
        /// When the name dialog is over, create the new document
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void NameDialog_DialogEnd(object sender, EventArgs e)
        {
            Form child = new Form_Workshop();
            child.MdiParent = this;
            child.Name = "Form_Workshop_" + NameDialog.WorkshopName;
            child.Text = NameDialog.WorkshopName;
            child.Show();
        }

        /// <summary>
        /// When the item dialog is over, add it to the form.
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void ItemDialog_DialogEnd(object sender, EventArgs e)
        {
            try
            {
                Form_Workshop child = (Form_Workshop)this.ActiveMdiChild;
                child.AddRecord(ItemDialog.Item);
            }
            catch { }
        }

        /// <summary>
        /// Show the item dialog when the user trys to store an item
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void Menu_Insert_Click(object sender, EventArgs e)
        {
            ItemDialog.Show();
        }

        /// <summary>
        /// Save the document when the user clicks save
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void Menu_Save_Click(object sender, EventArgs e)
        {
            Form_Workshop child = (Form_Workshop)this.ActiveMdiChild;
            child.Save();
        }

        /// <summary>
        /// Exit the program when the user clicks exit
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void Menu_Exit_Click(object sender, EventArgs e)
        {
            this.Close();
        }

        /// <summary>
        /// Open document dialog when the user clicks open
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void Menu_Open_Click(object sender, EventArgs e)
        {
            DialogResult result = OpenFile.ShowDialog();
            if (result != DialogResult.Cancel)
            {
                Form_Workshop child = new Form_Workshop();
                child.MdiParent = this;
                char[] delim = { '.' };
                string[] name = OpenFile.FileName.Split(delim);
                child.Name = "Form_Workshop_" + name[0];
                child.Text = name[0];
                child.Open(OpenFile.FileName);
                child.Show();
            }
        }

        /// <summary>
        /// Delete the selected item from the list when the user clicks delete
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void Menu_Delete_Click(object sender, EventArgs e)
        {
            Form_Workshop child = (Form_Workshop)this.ActiveMdiChild;
            child.DeleteRecord();
        }

        /// <summary>
        /// Do this when a child form becomes active. Enable buttons.
        /// </summary>
        public void NowActive()
        {
            Menu_Insert.Enabled = true;
            Menu_Delete.Enabled = true;
            Menu_Save.Enabled = true;
        }

        /// <summary>
        /// When a child form is not active, disable relevant buttons.
        /// </summary>
        public void NotActive()
        {
            Menu_Insert.Enabled = false;
            Menu_Delete.Enabled = false;
            Menu_Save.Enabled = false;
        }

        /// <summary>
        /// Show the about form.
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void MenuAbout_Click(object sender, EventArgs e)
        {
            Form child = new About();
            child.MdiParent = this;
            child.Show();
        }
    }
}
