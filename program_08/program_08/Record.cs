using System;

namespace program_08
{
    [Serializable]
    public class Record
    {
        public int Quantity { get; set; }
        public double Price { get; set; }
        public string Name { get; set; }

        public Record()
        {
            Quantity = 0;
            Price = 0;
            Name = "";
        }

        public Record(int quantity, double price, string name)
        {
            Quantity = quantity;
            Price = price;
            Name = name;
        }

        override public string ToString()
        {
            return "Name: " + Name
                + " Quantity: " + Quantity.ToString()
                + " Price: " + Price.ToString();
        }

    }
}
