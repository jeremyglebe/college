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

        public void AddRecord (Record new_record)
        {
            records.Add(new_record);
            List_Supplies.Items.Add(new_record.ToString());
        }

        public void Save()
        {
            if (fs != null)
            {
                fs.Close();
            }
            fs = new FileStream(Text + ".sup", FileMode.OpenOrCreate, FileAccess.Write);
            foreach(Record r in records)
            {
                bf.Serialize(fs, r);
            }
        }

    }
}
