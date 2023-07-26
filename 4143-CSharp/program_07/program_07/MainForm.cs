/* Program 07: Animated Graphics
 * Author: Jeremy Glebe
 * Date: 11/14/2018
 * File: MainForm.cs
 * Desc: Defines the main form and most of the program's methods. While not
 *     the actual "Main", this is the driving core of the application.
 */

using System;
using System.Windows.Forms;

namespace program_07
{
    public partial class MainForm : Form
    {
        public MainForm()
        {
            InitializeComponent();
        }

        private void AnimationTimer_Tick(object sender, EventArgs e)
        {
            SpacePicture.NextFrame();
            SpacePicture.Invalidate();
        }

        private void AnimationButton_Click(object sender, EventArgs e)
        {
            Button b = (Button)sender;
            if(b.Text == "Animate It!")
            {
                AnimationTimer.Start();
                b.Text = "Stop!";
            }
            else
            {
                AnimationTimer.Stop();
                b.Text = "Animate It!";
            }
        }
    }
}
