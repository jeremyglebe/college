/* Program 06: Caterina's Pizza
 * Author: Jeremy Glebe
 * Date: 11/7/2018
 * File: Program.cs
 * Desc: Just starts the application. Short and simple Main()
 */

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace pizza_site
{
    static class Program
    {
        /// <summary>
        /// The main entry point for the application.
        /// </summary>
        [STAThread]
        static void Main()
        {
            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);
            Application.Run(new Form_Caterinas());
        }
    }
}
