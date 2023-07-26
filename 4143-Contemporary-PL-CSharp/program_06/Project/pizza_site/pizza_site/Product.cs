/* Program 06: Caterina's Pizza
 * Author: Jeremy Glebe
 * Date: 11/7/2018
 * File: Products.cs
 * Desc: Defines a class that will store information for items in the shopping
 *     cart of the main application.
 */

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pizza_site
{
    public class Product
    {
        protected string type;
        public string Type { get { return type; } }
        private double cost;
        virtual public double Cost { get { return cost; } }

        public Product()
        {
            type = "product";
            cost = 0.01;
        }

        public Product(string t, double c)
        {
            type = t;
            cost = c;
        }
    }
}
