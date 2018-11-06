using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace quiz1
{

    abstract public class A
    {
        protected string hello;
        abstract public string Hello
        {
            get;
            set;
        }
    }

    public class I : A
    {
        public override string Hello
        {
            get
            {
                return hello;
            }
            set
            {
                hello = value;
            }
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
        }
    }
}
