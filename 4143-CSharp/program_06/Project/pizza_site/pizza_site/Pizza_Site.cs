/* Program 06: Caterina's Pizza
 * Author: Jeremy Glebe
 * Date: 11/7/2018
 * File: Pizza_Site.cs
 * Desc: Defines the main form and most of the program's methods. While not
 *     the actual "Main", this is the driving core of the application.
 */

using System;
using System.Collections.Generic;
using System.Drawing;
using System.Windows.Forms;
using System.Globalization;

namespace pizza_site
{
    public partial class Form_Caterinas : Form
    {
        /****************************************
         *              VARIABLES               *
         ****************************************/
        //Here is where we will keep track of the user's cart
        public List<Product> cart;
        //The pizza being customized in the custom pizza tab
        public Pizza pizza;
        //The pictures are stacks (for transparency) These are the tops of the
        //left and right stacks
        PictureBox LeftTop;
        PictureBox RightTop;


        /****************************************
         *            FORM METHODS              *
         *   Methods dealing directly with the  *
         *              main form.              *
         ****************************************/

        /* Form_Caterinas Constructor
         * Desc: Initializes all components and variables for the main form and
         *     draws the initial pizza image.
         */
        public Form_Caterinas()
        {
            InitializeComponent();
            //Initialize variables shared by elements of the form
            cart = new List<Product>();
            pizza = new Pizza();
            //Get an initial layered image for the pizza
            UpdatePizzaImage();
        }



        /****************************************
         *           CONTROL HANDLERS           *
         *   Methods handling the events for    *
         *        various form controls         *
         ****************************************/

        /* Form_Caterinas (Main Form)
         * Event Handler: Resize
         * Desc: Resizes and repositions any elements of the website that need
         *     special/proportional adjustment when the form changes size.
         */
        private void Form_Caterinas_Resize(object sender, EventArgs e)
        {
            //Fix the size of the tabs. They should scale with the form.
            Tabs_Pages.ItemSize = new Size((Tabs_Pages.Width / 4) - 1, 0);
        }

        /* Add To Cart Button ("Specialties" tab)
         * Event Handler: Click
         * Desc: When a button in the specialties tab is clicked, it should add
         *     an associated item to the cart
         */
        private void Btn_Add_Special_Click(object sender, EventArgs e)
        {
            string size = Special_Pizza_Size.Text.Split(' ')[0].ToLower();
            switch (size)
            {
                case "personal":
                    cart.Add(new Product("special pizza xs", 6));
                    break;
                case "small":
                    cart.Add(new Product("special pizza s", 7.25));
                    break;
                case "medium":
                    cart.Add(new Product("special pizza m", 9.5));
                    break;
                case "large":
                    cart.Add(new Product("special pizza l", 11));
                    break;
                default:
                    break;
            }
            Tabs_Pages.SelectedTab = Tab_Cart;
        }

        /* Add To Cart Buttons ("Menu" tab)
         * Event Handler: Click
         * Desc: When a button in the menu tab is clicked, it should add an
         *     associated item to the cart
         */
        private void Menu_ToCart_Button_Clicked(object sender, EventArgs e)
        {
            Button b = (Button)sender;
            string item = b.Name.Split('_')[2];
            double cost = 0;
            switch (item)
            {
                case "breadsticks":
                    cost = 3;
                    break;
                case "chicken":
                    cost = 8.5;
                    break;
                case "brownies":
                    cost = 5;
                    break;
                case "soda":
                    //All sodas are the same price so they can just be "soda"
                    //on the invoice
                    cost = 2;
                    break;
                default:
                    break;
            }
            cart.Add(new Product(item, cost));
            Tabs_Pages.SelectedTab = Tab_Cart;
        }

        /* Group_Sizes ("Custom Pizza" tab)
         * Event Handler: RadioButtons Clicked
         * Desc: Every time a radio button inside the sizes group box is
         *     clicked we need to update the pizza's size value.
         */
        private void Size_Clicked(object sender, EventArgs e)
        {
            RadioButton size = (RadioButton)sender;
            string size_name = size.Name.Split('_')[2].ToLower();
            pizza.Size = size_name;
        }

        /* Group_Cheese ("Custom Pizza" tab)
         * Event Handler: RadioButtons Clicked
         * Desc: Every time a radio button inside the cheeses group box is
         *     clicked we need to update the pizza's cheese value
         */
        private void Cheese_Clicked(object sender, EventArgs e)
        {
            RadioButton cheese = (RadioButton)sender;
            string cheese_name = cheese.Name.Split('_')[2].ToLower();
            pizza.Cheese = cheese_name;
            UpdatePizzaImage();
        }

        /* Group_Sauce ("Custom Pizza" tab)
         * Event Handler: RadioButtons Clicked
         * Desc: Every time a radio button inside the sauces group box is
         *     clicked we need to update the pizza's sauce value
         */
        private void Sauce_Clicked(object sender, EventArgs e)
        {
            RadioButton sauce = (RadioButton)sender;
            string sauce_name = sauce.Name.Split('_')[2].ToLower();
            pizza.Sauce = sauce_name;
            UpdatePizzaImage();
        }

        /* ToppingBox Controls ("Custom Pizza" tab)
         * Event Handler: Check Changed
         * Desc: Every ToppingBox contains a CheckBox, this event fires when
         *     the internal CheckBox's "Checked" value changes. This handles
         *     adding/removing the toppings from the pizza's internal list and
         *     then re-drawing the pizza.
         */
        private void Toppings_CheckBox_Changed(object sender, EventArgs e)
        {
            ToppingBox topping = (ToppingBox)sender;
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
            UpdatePizzaImage();
        }

        /* ToppingBox Controls ("Custom Pizza" tab)
         * Event Handler: Half Changed
         * Desc: ToppingBox controls keep track of whether the topping should
         *     be on the left or right as well. This event just updates the
         *     pizza image when the user chooses a different left/right/whole
         *     setting by clicking one of the icons.
         */
        private void Topping_Half_Changed(object sender, EventArgs e)
        {
            UpdatePizzaImage();
        }

        /* Btn_Clear ("Custom Pizza" tab)
         * Event Handler: Click
         * Desc: Starts a new custom pizza and resets the selections to default
         */
        private void Btn_Clear_Click(object sender, EventArgs e)
        {
            //Create a new pizza
            pizza = new Pizza();
            //Reset the selection controls
            _ResetSelections();
            //Update the pizza image
            UpdatePizzaImage();
        }

        /* Btn_AddToCart ("Custom Pizza" tab)
         * Event Handler: Click
         * Desc: Sends the pizza to the cart, starts a new custom pizza, and
         *     changes to the cart tab.
         */
        private void Btn_AddToCart_Click(object sender, EventArgs e)
        {
            cart.Add(pizza);
            pizza = new Pizza();
            _ResetSelections();
            //Update the pizza image
            UpdatePizzaImage();
            Tabs_Pages.SelectedTab = Tab_Cart;
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
                if (cart[i].Type == "pizza")
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

            if (cart.Count == 0)
            {
                Btn_Confirm.Enabled = false;
                Btn_Cancel.Enabled = false;
            }
            else
            {
                Btn_Confirm.Enabled = true;
                Btn_Cancel.Enabled = true;
            }
        }

        /* Btn_Confirm ("Cart" tab)
         * Event Handler: Click
         * Desc: This is just a mock-website. So if they try to place the order
         *     we will claim that Caterina's is closed.
         * Official Caterina's Hours:
         *     MON-SAT: Closed
         *     SUN: Open 12:00:32 AM - 12:00:33 AM
         * (Just kidding it won't work then either)
         */
        private void Btn_Confirm_Click(object sender, EventArgs e)
        {
            MessageBox.Show("Sorry! Caterina's Pizza is closed. Try again tomorrow!");
        }

        /* Btn_Cancel ("Carts" tab)
         * Event Handler: Click
         * Desc: Clear the cart of its contents if the user cancels and take
         *     them to the menu so that they can make a new order.
         */
        private void Btn_Cancel_Click(object sender, EventArgs e)
        {
            cart.Clear();
            Tabs_Pages.SelectedTab = Tab_Menu;
        }

        /* Tree_Cart ("Cart" tab)
         * Event Handler: Before Collapse
         * Desc: The tree isn't supposed to collapse here, I'm using the tree
         *     for its nice layout. So we just cancel the collapse.
         */
        private void Tree_Cart_BeforeCollapse(object sender, TreeViewCancelEventArgs e)
        {
            e.Cancel = true;
        }



        /****************************************
         *       DEEP BACKGROUND METHODS        *
         * Methods doing a bunch of background  *
         *     work and comparisons. These      *
         *   methods are ugly but necessary.    *
         ****************************************/

        /* MyCapitalize
         * Desc: Capitalizes first letter of every word in a string
         * Params:
         *     myString: Some string to apply capitalization to
         * Returns:
         *     string: a capitalized string
         */
        private string MyCapitalize(string myString)
        {
            return new CultureInfo("en-US").TextInfo.ToTitleCase(myString);
        }

        /* _ResetSelections
         * Desc: Sets all of the various radio buttons and check boxes on the
         *     "Custom Pizza" tab to their default settings. Used when starting
         *     a new custom pizza.
         */
        private void _ResetSelections()
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
            Topping_Pepperoni.Checked = false;
            Topping_Sausage.Checked = false;
            Topping_Chicken.Checked = false;
            //Clear the veggies
            Topping_Mushroom.Checked = false;
            Topping_Olives.Checked = false;
            Topping_Spinach.Checked = false;
            //Set the default options
            Radio_Size_Medium.Checked = true;
            Radio_Sauce_Tomato.Checked = true;
        }

        /* UpdatePizzaImage
         * Desc: Clears the current pizza image and places down various layers
         *     of images creating the new pizza image.
         */
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
            _SetToppings();
        }

        /* _SetSauce
         * Desc: Backend operation of UpdatePizzaImage
         *     Selects a sauce image and attaches it to both halves of the
         *     pizza image. Updates the image stack.
         */
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

        /* _SetCheese
         * Desc: Backend operation of UpdatePizzaImage
         *     Selects a cheese image and attaches it to both halves of the
         *     pizza image. Updates the image stack.
         */
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

        /* _SetToppings
         * Desc: Backend operation of UpdatePizzaImage
         *     For every toppingbox, determines if the topping needs to be
         *     added to the image, left, right, or both. Adds the appropriate
         *     images and updates the image stacks.
         * Note: This method is VERY ugly and could definitely be made better
         *     by processing each possible topping in a more generic way. There
         *     is one unavoidable limitation to this, however. I cannot do that
         *     unless all topping images are perfectly uniform so I don't have
         *     to set every property of every possible image. I can't do this
         *     because I do not have the skills or resources to edit photos to
         *     ensure this uniform-ness while still keeping the images display
         *     worthy. If we learn photo editing at some point I may go back
         *     and change this, but thats not likely to be in the material for
         *     a computer science course.
         */
        private void _SetToppings()
        {
            if (Topping_Pepperoni.Checked)
            {
                if (Topping_Pepperoni.OnLeft)
                {
                    PictureBox l = new PictureBox();
                    l.BackColor = Color.Transparent;
                    l.Location = new Point(16, 7);
                    l.Size = new Size(160, 320);
                    l.Image = pizza_site.Properties.Resources.pepperoni_l;
                    LeftTop.Controls.Add(l);
                    LeftTop = l;
                }
                if (Topping_Pepperoni.OnRight)
                {
                    PictureBox r = new PictureBox();
                    r.BackColor = Color.Transparent;
                    r.Location = new Point(0, 7);
                    r.Size = new Size(160, 320);
                    r.Image = pizza_site.Properties.Resources.pepperoni_r;
                    RightTop.Controls.Add(r);
                    RightTop = r;
                }
            }
            if (Topping_Sausage.Checked)
            {
                if (Topping_Sausage.OnLeft)
                {
                    PictureBox l = new PictureBox();
                    l.BackColor = Color.Transparent;
                    l.Location = new Point(0, 0);
                    l.Size = new Size(300, 300);
                    l.Image = pizza_site.Properties.Resources.sausage_l;
                    LeftTop.Controls.Add(l);
                    LeftTop = l;
                }
                if (Topping_Sausage.OnRight)
                {
                    PictureBox r = new PictureBox();
                    r.BackColor = Color.Transparent;
                    r.Location = new Point(0, 0);
                    r.Size = new Size(300, 300);
                    r.Image = pizza_site.Properties.Resources.sausage_r;
                    RightTop.Controls.Add(r);
                    RightTop = r;
                }
            }
            if (Topping_Chicken.Checked)
            {
                if (Topping_Chicken.OnLeft)
                {
                    PictureBox l = new PictureBox();
                    l.BackColor = Color.Transparent;
                    l.Location = new Point(0, 0);
                    l.Size = new Size(300, 300);
                    l.Image = pizza_site.Properties.Resources.chicken_l;
                    LeftTop.Controls.Add(l);
                    LeftTop = l;
                }
                if (Topping_Chicken.OnRight)
                {
                    PictureBox r = new PictureBox();
                    r.BackColor = Color.Transparent;
                    r.Location = new Point(0, 0);
                    r.Size = new Size(300, 300);
                    r.Image = pizza_site.Properties.Resources.chicken_r;
                    RightTop.Controls.Add(r);
                    RightTop = r;
                }
            }
            if (Topping_Mushroom.Checked)
            {
                if (Topping_Mushroom.OnLeft)
                {
                    PictureBox l = new PictureBox();
                    l.BackColor = Color.Transparent;
                    l.Location = new Point(0, 0);
                    l.Size = new Size(300, 300);
                    l.Image = pizza_site.Properties.Resources.mushrooms_l;
                    LeftTop.Controls.Add(l);
                    LeftTop = l;
                }
                if (Topping_Mushroom.OnRight)
                {
                    PictureBox r = new PictureBox();
                    r.BackColor = Color.Transparent;
                    r.Location = new Point(0, 0);
                    r.Size = new Size(300, 300);
                    r.Image = pizza_site.Properties.Resources.mushrooms_r;
                    RightTop.Controls.Add(r);
                    RightTop = r;
                }
            }
            if (Topping_Olives.Checked)
            {
                if (Topping_Olives.OnLeft)
                {
                    PictureBox l = new PictureBox();
                    l.BackColor = Color.Transparent;
                    l.Location = new Point(0, 0);
                    l.Size = new Size(300, 300);
                    l.Image = pizza_site.Properties.Resources.olives_l;
                    LeftTop.Controls.Add(l);
                    LeftTop = l;
                }
                if (Topping_Olives.OnRight)
                {
                    PictureBox r = new PictureBox();
                    r.BackColor = Color.Transparent;
                    r.Location = new Point(0, 0);
                    r.Size = new Size(300, 300);
                    r.Image = pizza_site.Properties.Resources.olives_r;
                    RightTop.Controls.Add(r);
                    RightTop = r;
                }
            }
            if (Topping_Spinach.Checked)
            {
                if (Topping_Spinach.OnLeft)
                {
                    PictureBox l = new PictureBox();
                    l.BackColor = Color.Transparent;
                    l.Location = new Point(0, 0);
                    l.Size = new Size(300, 300);
                    l.Image = pizza_site.Properties.Resources.spinach_l;
                    LeftTop.Controls.Add(l);
                    LeftTop = l;
                }
                if (Topping_Spinach.OnRight)
                {
                    PictureBox r = new PictureBox();
                    r.BackColor = Color.Transparent;
                    r.Location = new Point(0, 0);
                    r.Size = new Size(300, 300);
                    r.Image = pizza_site.Properties.Resources.spinach_r;
                    RightTop.Controls.Add(r);
                    RightTop = r;
                }
            }
        }
        
    }
}
