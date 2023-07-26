using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace csTestStuff
{
    class Whatever
    {
        public int i;
    }


    class Program
    {
        static void Main(string[] args)
        {
            Whatever test = new Whatever();
            Console.WriteLine(test.i);
            Console.Read();
        }
    }
}
