/* Program 08: MDI
 * Author: Jeremy Glebe
 * Date: 11/30/2018
 * File: Record.cs
 * Desc: Serializable record for storing item information.
 */

using System;

namespace program_08
{
    [Serializable]
    public class Record
    {
        public int Quantity { get; set; }
        public double Price { get; set; }
        public string Name { get; set; }

        /// <summary>
        /// Constructor
        /// </summary>
        public Record()
        {
            Quantity = 0;
            Price = 0;
            Name = "";
        }

        /// <summary>
        /// Parameterized constructor
        /// </summary>
        /// <param name="quantity"></param>
        /// <param name="price"></param>
        /// <param name="name"></param>
        public Record(int quantity, double price, string name)
        {
            Quantity = quantity;
            Price = price;
            Name = name;
        }

        /// <summary>
        /// String representation of a Record
        /// </summary>
        /// <returns></returns>
        override public string ToString()
        {
            return "Name: " + Name
                + "\tQuantity: " + Quantity.ToString()
                + "\tPrice: " + Price.ToString();
        }

    }
}
