using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Validation;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace DisplayTable
{
    public partial class DisplayPlayersTable : Form
    {
        public DisplayPlayersTable()
        {
            InitializeComponent();
        }

        private BaseballExample.BaseballEntities dbcontext = new BaseballExample.BaseballEntities();

        private void DisplayPlayersTable_Load(object sender, EventArgs e)
        {
            dbcontext.Players
                .OrderBy(player => player.LastName)
                .ThenBy(player => player.FirstName)
                .Load();

            playerBindingSource.DataSource = dbcontext.Players.Local;
        }

        private void playerBindingNavigatorSaveItem_Click(object sender, EventArgs e)
        {
            Validate();
            playerBindingSource.EndEdit();
            try
            {
                dbcontext.SaveChanges();
            }
            catch (DbEntityValidationException)
            {
                MessageBox.Show("Values entered are not valid!");
            }
        }
    }
}
