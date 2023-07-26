// NAME:  Dr. Stringfellow and Jeremy Glebe
// Homework 3 - 10 points        DUE:  Wednesday, Oct 3, 2018
// INSTRUCTIONS:  You are to draw a diagram representing the 
//    inheritance tree.  You are to fill in ALL the ??? in 
//    this file demonstrating you understand polymophism. 
//    In some cases more than one thing will make the program work, 
//    but I want you to USE polymorphism to the fullest!
// TURN IN:  Your tree, this file and a screen dump of the output.

// This program demonstrates polymorphism by displaying earnings
// for various Employee types.using System;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;

namespace OOPHomework
{
    public partial class EmployeeTestForm : Form
    {
        public EmployeeTestForm()
        {
            InitializeComponent();

            //Construct objects of different types
            Boss boss = new Boss("John", "Smith", 800);

            CommissionWorker commissionWorker =
               new CommissionWorker("Sue", "Jones", 400, 3, 150);

            PieceWorker pieceWorker = new PieceWorker("Bob", "Lewis",
               Convert.ToDecimal(2.5), 200);

            HourlyWorker hourlyWorker = new HourlyWorker("Karen",
               "Price", Convert.ToDecimal(13.75), 50);


            //Declare a reference and use it to process boss object
            Employee employee = boss;
            string output = GetString(employee) + boss + " earned " +
                  boss.Earnings().ToString("C") + "\n\n";

            //Use reference  to process commission Worker object
            employee = commissionWorker;
            output += GetString(employee) + commissionWorker +
               " earned " +
               commissionWorker.Earnings().ToString("C") + "\n\n";

            //Use reference  to process pieceWorker object
            employee = pieceWorker;
            output += GetString(employee) + pieceWorker +
               " earned " + pieceWorker.Earnings().ToString("C") +
               "\n\n";

            //Use reference  to process hourlyWorker object
            employee = hourlyWorker;
            output += GetString(employee) + hourlyWorker +
               " earned " + hourlyWorker.Earnings().ToString("C") +
               "\n\n";

            displayLabel.Text = output;
        }

        // return string that contains Employee information
        public static string GetString(Employee employee)
        {
            return employee.ToString() + " earned " +
               employee.Earnings().ToString("C") + "\n";
        }
    }
}
