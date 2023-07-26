using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;

namespace Files
{
    class Program
    {
        static void Main(string[] args)
        {

            FileStream fs = new FileStream("./text.txt", 
                FileMode.OpenOrCreate, FileAccess.Write);
            StreamWriter writer = new StreamWriter(fs);
            writer.WriteLine("This is my text");
            //writer.Flush();
            writer.WriteLine("I love my text.");
            writer.Close();

            fs = new FileStream("./text.txt",
                FileMode.OpenOrCreate, FileAccess.Read);
            StreamReader reader = new StreamReader(fs);
            while (!reader.EndOfStream)
            {
                Console.WriteLine(reader.ReadLine());
            }
            reader.Close();

            Console.Read();
        }
    }
}
