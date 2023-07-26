/* Program 08: MDI
 * Author: Jeremy Glebe
 * Date: 11/30/2018
 * File: WorkshopNameDialog.cs
 * Desc: A dialog for creating a new Workshop and giving it a name.
 */

using System;
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

        /// <summary>
        /// When confirmed, set the name and fire an event
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void Button_Confirm_Click(object sender, EventArgs e)
        {
            wsname = TextBox_WSName.Text;
            DialogEnd(this, e);
            this.Hide();
        }

        /// <summary>
        /// Cancel the dialog
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void Button_Cancel_Click(object sender, EventArgs e)
        {
            this.Hide();
        }
    }
}
