using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace q12_bool_short_circuit
{
    class Program
    {
        static void Main(string[] args)
        {
            bool testFun()
            {
                Console.WriteLine("testFun was executed.");
                return true;
            }

            if (false && testFun())
            {
                Console.WriteLine("This will never run.");
            }

            Console.Read();
        }
    }
}
