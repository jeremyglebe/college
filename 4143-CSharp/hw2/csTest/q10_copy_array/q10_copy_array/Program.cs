using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace q10_copy_array
{
    class Program
    {
        static void Main(string[] args)
        {
            int[] a = { 1, 2, 3, 4, 5 };
            for (int i = 0; i < a.Length; i++)
            {
                Console.Write(a[i].ToString() + " ");
            }
            Console.WriteLine();

            int[] b = a;
            for (int i = 0; i < a.Length; i++)
            {
                Console.Write(b[i].ToString() + " ");
            }
            Console.WriteLine();

            a[0] = 155;
            for (int i = 0; i < a.Length; i++)
            {
                Console.Write(b[i].ToString() + " ");
            }
            Console.WriteLine();

            Console.Read();
        }
    }
}
