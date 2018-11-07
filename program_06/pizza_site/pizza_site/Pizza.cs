using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pizza_site
{
    public class Pizza : Product
    {
        private string size;
        public string Size { get { return size; } set { size = value; } }
        private string sauce;
        public string Sauce { get { return sauce; } set { sauce = value; } }
        private string cheese;
        public string Cheese { get { return cheese; } set { cheese = value; } }
        private List<Product> toppings;
        public List<Product> Toppings { get { return toppings; } }

        public Pizza() : base()
        {
            type = "pizza";
            size = "medium";
            sauce = "tomato";
            cheese = "regular";
            toppings = new List<Product>();
        }

        public void AddTopping(string t, double c)
        {
            toppings.Add(new Product(t, c));
        }

        public void RemoveTopping(string t)
        {
            for (int i = 0; i < toppings.Count; i++)
            {
                if (toppings[i].Type == t)
                {
                    toppings.RemoveAt(i);
                }
            }
        }

        override public double Cost {
            get
            {
                double c = 0;
                //Get the base price from size
                switch (size) {
                    case "personal":
                        c += 5;
                        break;
                    case "small":
                        c += 6.25;
                        break;
                    case "medium":
                        c += 8.50;
                        break;
                    case "large":
                        c += 10;
                        break;
                    default:
                        break;
                }
                //Check if the sauce is premium
                if (sauce == "alfredo")
                    c += 1;
                //Check if the cheese is premium
                if (cheese == "three")
                    c += .5;
                //Traverse the toppings and add their costs
                for (int i = 0; i < toppings.Count; i++)
                {
                    c += toppings[i].Cost;
                }

                return c;
            }
        }
    }
}