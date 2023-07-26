using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace DisplayingLists
{
    public partial class Form1 : Form
    {
        public List<string> myList;

        public Form1()
        {
            InitializeComponent();
            myList = new List<string>();
            myList.Add("Hello!");
            myList.Add("World!");
            myList.Add("Hello World!");

            foreach(string s in myList)
            {
                ListBox_Lists.Items.Add(s);
                ComboBox_Lists.Items.Add(s);
            }
        }

        private void SelectionsChanged(object sender, EventArgs e)
        {
            TextBox_Lists.Text = "";
            TextBox_Lists.Text += ListBox_Lists.SelectedItem + " ";
            TextBox_Lists.Text += ComboBox_Lists.SelectedItem;
        }

        private void Button_ToList_Click(object sender, EventArgs e)
        {
            ListBox_ToList.Items.Add(TextBox_ToList.Text);
            TextBox_ToList.Text = "Enter a string...";
        }
    }
}
