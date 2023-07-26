using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace quiz2
{
    public class Point
    {
        private int x, y;
        public Point(int nx, int ny)
        {
            x = nx;
            y = ny;
        }
    }

    public class Circle : Point
    {
        private double r;
        public Circle(int nx, int ny, double nr) : base(nx, ny)
        {
            r = nr;
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            Point point1 = new Point(30, 50);
            Circle circle1 = new Circle(120, 89, 2.7);
            Point point3 = new Point(10, 20);
            Point point4 = new Point(15, 17);

            Point point2 = circle1;
            //Circle circle2 = point3;
            //Circle circle2 = (Circle) point4;
            //circle2 = (Circle) point1;
            Point point5 = (Point)circle1;

            Console.Write("Press [ENTER] to continue...");
            Console.Read();
        }
    }
}
