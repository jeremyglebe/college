/* Program 06: Caterina's Pizza
 * Author: Jeremy Glebe
 * Date: 11/7/2018
 * File: ToppingBox.cs
 * Desc: Defines a user control that combines check boxes with images so that
 *     a user can choose to put their topping on the left, right, or whole.
 */

using System;
using System.Windows.Forms;

namespace pizza_site
{
    public partial class ToppingBox : UserControl
    {
        private bool onleft, onright;
        public bool OnLeft { get { return onleft; } }
        public bool OnRight { get { return onright; } }
        public string Txt
        {
            get { return this.box.Text; }
            set { this.box.Text = value; }
        }
        public bool Checked
        {
            get { return box.Checked; }
            set { box.Checked = value; }
        }
        public event EventHandler Marked;
        public event EventHandler HalfChanged;

        public ToppingBox()
        {
            InitializeComponent();
            onleft = true;
            onright = true;
        }
        
        private void picL_Click(object sender, EventArgs e)
        {
            onleft = true;
            onright = false;
            picL.Image = pizza_site.Properties.Resources.blue_icon_left;
            picW.Image = pizza_site.Properties.Resources.icon_full;
            picR.Image = pizza_site.Properties.Resources.icon_right;
            if (HalfChanged != null)
                this.HalfChanged(this, e);
        }

        private void picW_Click(object sender, EventArgs e)
        {
            onleft = true;
            onright = true;
            picL.Image = pizza_site.Properties.Resources.icon_left;
            picW.Image = pizza_site.Properties.Resources.blue_icon_full;
            picR.Image = pizza_site.Properties.Resources.icon_right;
            if (HalfChanged != null)
                this.HalfChanged(this, e);
        }

        private void box_CheckedChanged(object sender, EventArgs e)
        {
            if (Marked != null)
                this.Marked(this, e);
        }

        private void picR_Click(object sender, EventArgs e)
        {
            onleft = false;
            onright = true;
            picL.Image = pizza_site.Properties.Resources.icon_left;
            picW.Image = pizza_site.Properties.Resources.icon_full;
            picR.Image = pizza_site.Properties.Resources.blue_icon_right;
            if (HalfChanged != null)
                this.HalfChanged(this, e);
        }

    }
}
