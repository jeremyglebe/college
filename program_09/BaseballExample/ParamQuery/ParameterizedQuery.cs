using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace ParamQuery
{
    public partial class ParameterizedQuery : Form
    {
        public ParameterizedQuery()
        {
            InitializeComponent();
        }

        private void playersBindingNavigatorSaveItem_Click(object sender, EventArgs e)
        {
            this.Validate();
            this.playersBindingSource.EndEdit();
            this.tableAdapterManager.UpdateAll(this.baseballDataSet);

        }

        private void ParameterizedQuery_Load(object sender, EventArgs e)
        {
            // TODO: This line of code loads data into the 'baseballDataSet.Players' table. You can move, or remove it, as needed.
            this.playersTableAdapter.Fill(this.baseballDataSet.Players);

        }

        private void QueryFindButton_Click(object sender, EventArgs e)
        {
            playersTableAdapter
                .FillByLastName(baseballDataSet.Players, QueryTextBox.Text);
        }

        private void BrowseAllButton_Click(object sender, EventArgs e)
        {
            playersTableAdapter.Fill(baseballDataSet.Players);
            QueryTextBox.Text = "";
        }
    }
}
