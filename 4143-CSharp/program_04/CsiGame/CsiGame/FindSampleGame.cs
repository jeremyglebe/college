using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace CsiGame
{
    static class FindSampleGame
    {
        /// <summary>
        /// The main entry point for the application.
        /// </summary>
        [STAThread]
        static void Main()
        {
            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);
            //Create the scanner
            ScanAnalyzer scanner = new ScanAnalyzer();
            gameForm myGame = new gameForm(scanner);
            Application.Run(myGame);
        }
    }
}
