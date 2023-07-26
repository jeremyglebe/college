namespace DisplayingLists
{
    partial class Form1
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            System.Windows.Forms.ListViewItem listViewItem1 = new System.Windows.Forms.ListViewItem("Apple");
            System.Windows.Forms.ListViewItem listViewItem2 = new System.Windows.Forms.ListViewItem("Orange");
            System.Windows.Forms.ListViewItem listViewItem3 = new System.Windows.Forms.ListViewItem("Banana");
            System.Windows.Forms.ListViewItem listViewItem4 = new System.Windows.Forms.ListViewItem("Pear");
            System.Windows.Forms.TreeNode treeNode1 = new System.Windows.Forms.TreeNode("Green Apple");
            System.Windows.Forms.TreeNode treeNode2 = new System.Windows.Forms.TreeNode("Red Apple");
            System.Windows.Forms.TreeNode treeNode3 = new System.Windows.Forms.TreeNode("Apple", new System.Windows.Forms.TreeNode[] {
            treeNode1,
            treeNode2});
            System.Windows.Forms.TreeNode treeNode4 = new System.Windows.Forms.TreeNode("Mango");
            System.Windows.Forms.TreeNode treeNode5 = new System.Windows.Forms.TreeNode("Orange", new System.Windows.Forms.TreeNode[] {
            treeNode4});
            System.Windows.Forms.TreeNode treeNode6 = new System.Windows.Forms.TreeNode("Banana");
            System.Windows.Forms.TreeNode treeNode7 = new System.Windows.Forms.TreeNode("Pear");
            this.ListBox_Lists = new System.Windows.Forms.ListBox();
            this.ComboBox_Lists = new System.Windows.Forms.ComboBox();
            this.TextBox_Lists = new System.Windows.Forms.TextBox();
            this.listBox1 = new System.Windows.Forms.ListBox();
            this.listView1 = new System.Windows.Forms.ListView();
            this.treeView1 = new System.Windows.Forms.TreeView();
            this.TextBox_ToList = new System.Windows.Forms.TextBox();
            this.ListBox_ToList = new System.Windows.Forms.ListBox();
            this.Button_ToList = new System.Windows.Forms.Button();
            this.SuspendLayout();
            // 
            // ListBox_Lists
            // 
            this.ListBox_Lists.FormattingEnabled = true;
            this.ListBox_Lists.Location = new System.Drawing.Point(12, 12);
            this.ListBox_Lists.Name = "ListBox_Lists";
            this.ListBox_Lists.Size = new System.Drawing.Size(120, 95);
            this.ListBox_Lists.TabIndex = 0;
            this.ListBox_Lists.SelectedIndexChanged += new System.EventHandler(this.SelectionsChanged);
            // 
            // ComboBox_Lists
            // 
            this.ComboBox_Lists.FormattingEnabled = true;
            this.ComboBox_Lists.Location = new System.Drawing.Point(138, 12);
            this.ComboBox_Lists.Name = "ComboBox_Lists";
            this.ComboBox_Lists.Size = new System.Drawing.Size(121, 21);
            this.ComboBox_Lists.TabIndex = 1;
            this.ComboBox_Lists.SelectedIndexChanged += new System.EventHandler(this.SelectionsChanged);
            // 
            // TextBox_Lists
            // 
            this.TextBox_Lists.Font = new System.Drawing.Font("Microsoft Sans Serif", 15.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.TextBox_Lists.Location = new System.Drawing.Point(12, 113);
            this.TextBox_Lists.Multiline = true;
            this.TextBox_Lists.Name = "TextBox_Lists";
            this.TextBox_Lists.ReadOnly = true;
            this.TextBox_Lists.Size = new System.Drawing.Size(247, 45);
            this.TextBox_Lists.TabIndex = 2;
            // 
            // listBox1
            // 
            this.listBox1.FormattingEnabled = true;
            this.listBox1.Items.AddRange(new object[] {
            "Apple",
            "Orange",
            "Banana",
            "Pear"});
            this.listBox1.Location = new System.Drawing.Point(12, 343);
            this.listBox1.Name = "listBox1";
            this.listBox1.Size = new System.Drawing.Size(120, 95);
            this.listBox1.TabIndex = 3;
            // 
            // listView1
            // 
            this.listView1.Items.AddRange(new System.Windows.Forms.ListViewItem[] {
            listViewItem1,
            listViewItem2,
            listViewItem3,
            listViewItem4});
            this.listView1.Location = new System.Drawing.Point(138, 341);
            this.listView1.Name = "listView1";
            this.listView1.Size = new System.Drawing.Size(121, 97);
            this.listView1.TabIndex = 4;
            this.listView1.UseCompatibleStateImageBehavior = false;
            // 
            // treeView1
            // 
            this.treeView1.Location = new System.Drawing.Point(265, 341);
            this.treeView1.Name = "treeView1";
            treeNode1.Name = "Node4";
            treeNode1.Text = "Green Apple";
            treeNode2.Name = "Node5";
            treeNode2.Text = "Red Apple";
            treeNode3.Name = "Node0";
            treeNode3.Text = "Apple";
            treeNode4.Name = "Node6";
            treeNode4.Text = "Mango";
            treeNode4.ToolTipText = "Are mangos related to oranges?";
            treeNode5.Name = "Node1";
            treeNode5.Text = "Orange";
            treeNode6.Name = "Node2";
            treeNode6.Text = "Banana";
            treeNode7.Name = "Node3";
            treeNode7.Text = "Pear";
            this.treeView1.Nodes.AddRange(new System.Windows.Forms.TreeNode[] {
            treeNode3,
            treeNode5,
            treeNode6,
            treeNode7});
            this.treeView1.Size = new System.Drawing.Size(121, 97);
            this.treeView1.TabIndex = 5;
            // 
            // TextBox_ToList
            // 
            this.TextBox_ToList.Location = new System.Drawing.Point(581, 13);
            this.TextBox_ToList.Name = "TextBox_ToList";
            this.TextBox_ToList.Size = new System.Drawing.Size(162, 20);
            this.TextBox_ToList.TabIndex = 6;
            this.TextBox_ToList.Text = "Enter a string...";
            // 
            // ListBox_ToList
            // 
            this.ListBox_ToList.FormattingEnabled = true;
            this.ListBox_ToList.Location = new System.Drawing.Point(539, 96);
            this.ListBox_ToList.Name = "ListBox_ToList";
            this.ListBox_ToList.Size = new System.Drawing.Size(249, 342);
            this.ListBox_ToList.TabIndex = 7;
            // 
            // Button_ToList
            // 
            this.Button_ToList.Location = new System.Drawing.Point(597, 39);
            this.Button_ToList.Name = "Button_ToList";
            this.Button_ToList.Size = new System.Drawing.Size(128, 39);
            this.Button_ToList.TabIndex = 8;
            this.Button_ToList.Text = "Add to List!";
            this.Button_ToList.UseVisualStyleBackColor = true;
            this.Button_ToList.Click += new System.EventHandler(this.Button_ToList_Click);
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(800, 450);
            this.Controls.Add(this.Button_ToList);
            this.Controls.Add(this.ListBox_ToList);
            this.Controls.Add(this.TextBox_ToList);
            this.Controls.Add(this.treeView1);
            this.Controls.Add(this.listView1);
            this.Controls.Add(this.listBox1);
            this.Controls.Add(this.TextBox_Lists);
            this.Controls.Add(this.ComboBox_Lists);
            this.Controls.Add(this.ListBox_Lists);
            this.Name = "Form1";
            this.Text = "Form1";
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.ListBox ListBox_Lists;
        private System.Windows.Forms.ComboBox ComboBox_Lists;
        private System.Windows.Forms.TextBox TextBox_Lists;
        private System.Windows.Forms.ListBox listBox1;
        private System.Windows.Forms.ListView listView1;
        private System.Windows.Forms.TreeView treeView1;
        private System.Windows.Forms.TextBox TextBox_ToList;
        private System.Windows.Forms.ListBox ListBox_ToList;
        private System.Windows.Forms.Button Button_ToList;
    }
}

