using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Globalization;

namespace pizza_site
{
    public partial class Form_Caterinas : Form
    {
        //Here is where we will keep track of the user's cart
        public List<Product> cart;
        //The pizza being customized in the custom pizza tab
        public Pizza pizza;

        public Form_Caterinas()
        {
            InitializeComponent();
            //Initialize variables shared by elements of the form
            cart = new List<Product>();
            pizza = new Pizza();
            //Get an initial layered image for the pizza
            UpdatePizzaImage();
        }

        /* Form_Caterinas
         * Event Handler: Resize
         * Desc: Resizes and repositions the various elements of the website
         *     when the form itself is resized.
         */
        private void Form_Caterinas_Resize(object sender, EventArgs e)
        {
            //Fix the size of the tabs. They should scale with the form.
            Tabs_Pages.ItemSize = new Size((Tabs_Pages.Width / 4) - 1, 0);
        }

        private void Btn_Clear_Click(object sender, EventArgs e)
        {
            //Create a new pizza
            pizza = new Pizza();
            //Reset the selection controls
            ResetSelections();
        }

        private void Btn_AddToCart_Click(object sender, EventArgs e)
        {
            cart.Add(pizza);
            pizza = new Pizza();
            ResetSelections();
            Tabs_Pages.SelectedTab = Tab_Cart;
        }

        private void ResetSelections()
        {
            //Clear the sizes
            Radio_Size_Personal.Checked = false;
            Radio_Size_Small.Checked = false;
            Radio_Size_Large.Checked = false;
            //Clear the sauces
            Radio_Sauce_Alfredo.Checked = false;
            //Clear the cheeses
            Radio_Cheese_Regular.Checked = false;
            Radio_Cheese_Mozzarela.Checked = false;
            Radio_Cheese_Three.Checked = false;
            //Clear the meats
            Check_Pepperoni.Checked = false;
            Check_Sausage.Checked = false;
            Check_Chicken.Checked = false;
            //Clear the veggies
            Check_Mushroom.Checked = false;
            Check_Olives.Checked = false;
            Check_Spinach.Checked = false;
            //Set the default options
            Radio_Size_Medium.Checked = true;
            Radio_Sauce_Tomato.Checked = true;
        }

        private void Toppings_CheckBox_Changed(object sender, EventArgs e)
        {
            CheckBox topping = (CheckBox)sender;
            string tname = topping.Name.Split('_')[1].ToLower();
            //If the box was checked and we're adding a topping
            if (topping.Checked)
            {
                double price;
                switch (tname)
                {
                    case "pepperoni":
                    case "sausage":
                    case "spinach":
                        price = .5;
                        break;
                    case "chicken":
                        price = .75;
                        break;
                    case "mushroom":
                        price = 1;
                        break;
                    case "olives":
                        price = 1.5;
                        break;
                    default:
                        price = 0;
                        break;
                }
                pizza.AddTopping(tname, price);
            }
            else
            {
                pizza.RemoveTopping(tname);
            }
            
        }

        private void Size_Clicked(object sender, EventArgs e)
        {
            RadioButton size = (RadioButton)sender;
            string size_name = size.Name.Split('_')[2].ToLower();
            pizza.Size = size_name;
        }

        private void Cheese_Clicked(object sender, EventArgs e)
        {
            RadioButton cheese = (RadioButton)sender;
            string cheese_name = cheese.Name.Split('_')[2].ToLower();
            pizza.Cheese = cheese_name;
            UpdatePizzaImage();
        }

        private void Sauce_Clicked(object sender, EventArgs e)
        {
            RadioButton sauce = (RadioButton)sender;
            string sauce_name = sauce.Name.Split('_')[2].ToLower();
            pizza.Sauce = sauce_name;
            UpdatePizzaImage();
        }

        /* Tab_Cart
         * Event Handler: Enter
         * Desc: The cart should update when you switch to it, in case items
         *     have been added.
         */
        private void Tab_Cart_Enter(object sender, EventArgs e)
        {
            double total = 0;
            Tree_Cart.Nodes.Clear();
            for (int i = 0; i < cart.Count; i++)
            {
                Tree_Cart.Nodes.Add(MyCapitalize(cart[i].Type));
                if(cart[i].Type == "pizza")
                {
                    Pizza p = (Pizza)cart[i];
                    for (int j = 0; j < p.Toppings.Count; j++)
                    {
                        string top_string = MyCapitalize(p.Toppings[j].Type)
                            + " ($" + string.Format("{0:0.00}",
                            p.Toppings[j].Cost) + ")";
                        Tree_Cart.Nodes[i].Nodes.Add(top_string);
                    }
                }
                Tree_Cart.Nodes[i].Nodes.Add("$" + string.Format("{0:0.00}",
                    cart[i].Cost));
                Tree_Cart.Nodes[i].ExpandAll();
                total += cart[i].Cost;
            }
            Tree_Cart.Nodes.Add("TOTAL: $"
                + string.Format("{0:0.00}", total)
            );
        }

        private string MyCapitalize(string myString)
        {
            return new CultureInfo("en-US").TextInfo.ToTitleCase(myString);
        }

        private void Tree_Cart_BeforeCollapse(object sender, TreeViewCancelEventArgs e)
        {
            //We just don't want this tree to collapse, its supposed to show
            //the items at all times
            e.Cancel = true;
        }

        private void Btn_Confirm_Click(object sender, EventArgs e)
        {
            MessageBox.Show("Sorry! Caterina's Pizza is closed. Try again tomorrow!");
        }

        private void Btn_Cancel_Click(object sender, EventArgs e)
        {
            cart.Clear();
            Tabs_Pages.SelectedTab = Tab_Menu;
        }

        PictureBox LeftTop;
        PictureBox RightTop;
        private void UpdatePizzaImage()
        {
            //Clear the current layered images
            Pic_Pizza_Left.Controls.Clear();
            Pic_Pizza_Right.Controls.Clear();
            //Set the top image
            LeftTop = Pic_Pizza_Left;
            RightTop = Pic_Pizza_Right;
            //Add appropriate sauce image
            _SetSauce();
            //Add the appropriate cheese image
            _SetCheese();
            //Add images for every topping
        }

        private void _SetSauce()
        {
            PictureBox sauce_left = new PictureBox();
            sauce_left.BackColor = Color.Transparent;
            sauce_left.Location = new Point(24, 21);
            sauce_left.Size = new Size(163, 321);
            PictureBox sauce_right = new PictureBox();
            sauce_right.BackColor = Color.Transparent;
            sauce_right.Location = new Point(0, 21);
            sauce_right.Size = new Size(163, 321);
            if (Radio_Sauce_Tomato.Checked)
            {
                sauce_left.Image = pizza_site.Properties.Resources.marinara_l;
                sauce_right.Image = pizza_site.Properties.Resources.marinara_r;
            }
            else
            {
                sauce_left.Image = pizza_site.Properties.Resources.alfredo_l;
                sauce_right.Image = pizza_site.Properties.Resources.alfredo_r;
            }
            LeftTop.Controls.Add(sauce_left);
            RightTop.Controls.Add(sauce_right);
            //Set the image stack top references
            LeftTop = sauce_left;
            RightTop = sauce_right;
        }

        private void _SetCheese()
        {
            PictureBox cheese_left = new PictureBox();
            cheese_left.BackColor = Color.Transparent;
            cheese_left.Location = new Point(16, 7);
            cheese_left.Size = new Size(160, 320);
            PictureBox cheese_right = new PictureBox();
            cheese_right.BackColor = Color.Transparent;
            cheese_right.Location = new Point(0, 7);
            cheese_right.Size = new Size(160, 320);
            if (Radio_Cheese_Regular.Checked)
            {
                cheese_left.Image = pizza_site.Properties.Resources.regular_l;
                cheese_right.Image = pizza_site.Properties.Resources.regular_r;
            }
            else if (Radio_Cheese_Mozzarela.Checked)
            {
                cheese_left.Image = pizza_site.Properties.Resources.mozzarella_l;
                cheese_right.Image = pizza_site.Properties.Resources.mozzarella_r;
            }
            else if (Radio_Cheese_Three.Checked)
            {
                cheese_left.Image = pizza_site.Properties.Resources.three_l;
                cheese_right.Image = pizza_site.Properties.Resources.three_r;
            }
            LeftTop.Controls.Add(cheese_left);
            RightTop.Controls.Add(cheese_right);
            //Set the image stack top references
            LeftTop = cheese_left;
            RightTop = cheese_right;
        }

    }
}
