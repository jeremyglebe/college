/* Program 08: MDI
 * Author: Jeremy Glebe
 * Date: 11/30/2018
 * File: NewItemDialog.cs
 * Desc: A dialog for creating a new item.
 */

using System;
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

        /// <summary>
        /// Constructor
        /// </summary>
        public NewItemDialog()
        {
            InitializeComponent();
            this.Hide();
        }

        /// <summary>
        /// When confirmed, fire off an event and set the record
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void Button_Confirm_Click(object sender, EventArgs e)
        {
            int q = Int32.Parse(TextBox_Quantity.Text);
            double p = Double.Parse(TextBox_Price.Text);
            string n = TextBox_Name.Text;
            item = new Record(q, p, n);
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
