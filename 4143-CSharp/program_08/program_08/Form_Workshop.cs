/* Program 08: MDI
 * Author: Jeremy Glebe
 * Date: 11/30/2018
 * File: Form_Workshop.cs
 * Desc: Every document that is opened or edited is a Workshop form. The form
 *     is capable of saving and opening, editing, etc. Everything needed.
 */

using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Runtime.Serialization;
using System.Runtime.Serialization.Formatters.Binary;
using System.Windows.Forms;

namespace program_08
{
    public partial class Form_Workshop : Form
    {
        public List<Record> records;
        public FileStream fs;
        public BinaryFormatter bf;

        public Form_Workshop()
        {
            InitializeComponent();
            records = new List<Record>();
            bf = new BinaryFormatter();
        }

        /// <summary>
        /// Add a record to the list
        /// </summary>
        /// <param name="new_record"></param>
        public void AddRecord(Record new_record)
        {
            records.Add(new_record);
            UpdateList();
        }

        /// <summary>
        /// Delete selected record from the list
        /// </summary>
        public void DeleteRecord()
        {
            string record_name = List_Supplies.SelectedItem.ToString().Split()[1];
            foreach (Record r in records)
            {
                if (r.Name == record_name)
                {
                    records.Remove(r);
                    UpdateList();
                    break;
                }
            }
        }

        /// <summary>
        /// Save to WORKSHOP_NAME.sup
        /// </summary>
        public void Save()
        {
            if (fs != null)
            {
                fs.Close();
            }
            fs = new FileStream(Text + ".sup", FileMode.OpenOrCreate, FileAccess.Write);
            foreach (Record r in records)
            {
                bf.Serialize(fs, r);
            }
        }

        /// <summary>
        /// Open from filepath
        /// </summary>
        /// <param name="filepath"></param>
        public void Open(string filepath)
        {
            try
            {
                if (fs != null)
                {
                    fs.Close();
                }
                fs = new FileStream(filepath, FileMode.OpenOrCreate, FileAccess.Read);
                while (true)
                {
                    Record r = (Record)bf.Deserialize(fs);
                    AddRecord(r);
                }
            }
            catch (SerializationException)
            {
                fs.Close();
            }
            catch
            {
                MessageBox.Show("There was a problem reading the file!");
            }
        }

        /// <summary>
        /// Update the list to reflect the current records
        /// </summary>
        public void UpdateList()
        {
            List_Supplies.Items.Clear();
            foreach (Record r in records)
            {
                if (!List_Supplies.Items.Contains(r.ToString()))
                {
                    List_Supplies.Items.Add(r.ToString());
                }
            }
            Sort();
        }

        /// <summary>
        /// Sort the list and make sure its in alphabetical order
        /// </summary>
        public void Sort()
        {
            ArrayList q = new ArrayList();
            foreach (string s in List_Supplies.Items)
            {
                q.Add(s);
            }
            q.Sort();
            List_Supplies.Items.Clear();
            foreach (string s in q)
            {
                List_Supplies.Items.Add(s);
            }
        }

        /// <summary>
        /// Enable buttons when some child is selected
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void Form_Workshop_Activated(object sender, System.EventArgs e)
        {
            ((Form_Main)this.MdiParent).NowActive();
        }

        /// <summary>
        /// Disable buttons when some child is not selected
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void Form_Workshop_Deactivate(object sender, System.EventArgs e)
        {
            if(this.MdiParent.ActiveMdiChild == null)
            {
                ((Form_Main)this.MdiParent).NotActive();
            }
        }
    }
}
