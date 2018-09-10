/* Program: Smallest, Largest, Average, & Sum Calculator
 * Author: Jeremy Glebe
 * Date: 9/10/18
 * Description: Really simple program that calculates the sume, average,
 * smallest, and largest number out of 3 integers.
*/

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace program_02
{
    class Program
    {
        static void Main(string[] args)
        {
            //Variable to store the integers
            int[] num = new int[3];
            //Variables for results
            int sum, avg, sml, lrg;

            //A header, Smallest, Largest, Average, & Sum Calculator
            Console.WriteLine("┌───────────────────┐");
            Console.WriteLine("|S.L.A.S. Calculator|");
            Console.WriteLine("└───────────────────┘");

            //Instructions for the user
            Console.WriteLine("Hello! Please submit three integer numbers!");
            Console.WriteLine("(Integers are numbers that lack any partial or fraction values)\n");
            Console.WriteLine("Type one integer at a time, followed by ENTER or RETURN");
            //Loop to get the three inputs
            for(int i = 0; i < num.Length; i++)
            {
                Console.Write("Integer #{0}> ", i+1);
                while (!Int32.TryParse(Console.ReadLine(), out num[i]));
            }
            //Calculate the sum
            sum = num.Sum();
            //Calculate the average
            avg = sum / num.Length;
            //Sort the array
            Array.Sort(num);
            //Smallest is at the front
            sml = num[0];
            //Largest is at the back
            lrg = num[num.Length - 1];

            //Output the results
            Console.WriteLine("\nSum: {0}\nAverage: {1}", sum, avg);
            Console.WriteLine("Smallest: {0}\nLargest: {1}", sml, lrg);

            //Closing the program
            Console.WriteLine("\nPress any key to exit...");
            Console.ReadKey();
        }
    }
}
