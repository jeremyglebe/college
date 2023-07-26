namespace program_08
{
    partial class Form_Main
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
            this.Menu = new System.Windows.Forms.MenuStrip();
            this.fileToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.Menu_New = new System.Windows.Forms.ToolStripMenuItem();
            this.Menu_Open = new System.Windows.Forms.ToolStripMenuItem();
            this.Menu_Save = new System.Windows.Forms.ToolStripMenuItem();
            this.Menu_Exit = new System.Windows.Forms.ToolStripMenuItem();
            this.editToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.Menu_Insert = new System.Windows.Forms.ToolStripMenuItem();
            this.Menu_Delete = new System.Windows.Forms.ToolStripMenuItem();
            this.MenuAbout = new System.Windows.Forms.ToolStripMenuItem();
            this.OpenFile = new System.Windows.Forms.OpenFileDialog();
            this.ItemDialog = new program_08.NewItemDialog();
            this.NameDialog = new program_08.WorkshopNameDialog();
            this.Menu.SuspendLayout();
            this.SuspendLayout();
            // 
            // Menu
            // 
            this.Menu.Items.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.fileToolStripMenuItem,
            this.editToolStripMenuItem,
            this.MenuAbout});
            this.Menu.Location = new System.Drawing.Point(0, 0);
            this.Menu.Name = "Menu";
            this.Menu.Size = new System.Drawing.Size(784, 24);
            this.Menu.TabIndex = 0;
            this.Menu.Text = "menuStrip1";
            // 
            // fileToolStripMenuItem
            // 
            this.fileToolStripMenuItem.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.Menu_New,
            this.Menu_Open,
            this.Menu_Save,
            this.Menu_Exit});
            this.fileToolStripMenuItem.Name = "fileToolStripMenuItem";
            this.fileToolStripMenuItem.Size = new System.Drawing.Size(37, 20);
            this.fileToolStripMenuItem.Text = "File";
            // 
            // Menu_New
            // 
            this.Menu_New.Name = "Menu_New";
            this.Menu_New.Size = new System.Drawing.Size(180, 22);
            this.Menu_New.Text = "New";
            this.Menu_New.Click += new System.EventHandler(this.Menu_New_Click);
            // 
            // Menu_Open
            // 
            this.Menu_Open.Name = "Menu_Open";
            this.Menu_Open.Size = new System.Drawing.Size(180, 22);
            this.Menu_Open.Text = "Open";
            this.Menu_Open.Click += new System.EventHandler(this.Menu_Open_Click);
            // 
            // Menu_Save
            // 
            this.Menu_Save.Enabled = false;
            this.Menu_Save.Name = "Menu_Save";
            this.Menu_Save.Size = new System.Drawing.Size(180, 22);
            this.Menu_Save.Text = "Save";
            this.Menu_Save.Click += new System.EventHandler(this.Menu_Save_Click);
            // 
            // Menu_Exit
            // 
            this.Menu_Exit.Name = "Menu_Exit";
            this.Menu_Exit.Size = new System.Drawing.Size(180, 22);
            this.Menu_Exit.Text = "Exit";
            this.Menu_Exit.Click += new System.EventHandler(this.Menu_Exit_Click);
            // 
            // editToolStripMenuItem
            // 
            this.editToolStripMenuItem.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.Menu_Insert,
            this.Menu_Delete});
            this.editToolStripMenuItem.Name = "editToolStripMenuItem";
            this.editToolStripMenuItem.Size = new System.Drawing.Size(39, 20);
            this.editToolStripMenuItem.Text = "Edit";
            // 
            // Menu_Insert
            // 
            this.Menu_Insert.Enabled = false;
            this.Menu_Insert.Name = "Menu_Insert";
            this.Menu_Insert.Size = new System.Drawing.Size(107, 22);
            this.Menu_Insert.Text = "Insert";
            this.Menu_Insert.Click += new System.EventHandler(this.Menu_Insert_Click);
            // 
            // Menu_Delete
            // 
            this.Menu_Delete.Enabled = false;
            this.Menu_Delete.Name = "Menu_Delete";
            this.Menu_Delete.Size = new System.Drawing.Size(107, 22);
            this.Menu_Delete.Text = "Delete";
            this.Menu_Delete.Click += new System.EventHandler(this.Menu_Delete_Click);
            // 
            // MenuAbout
            // 
            this.MenuAbout.Name = "MenuAbout";
            this.MenuAbout.Size = new System.Drawing.Size(52, 20);
            this.MenuAbout.Text = "About";
            this.MenuAbout.Click += new System.EventHandler(this.MenuAbout_Click);
            // 
            // OpenFile
            // 
            this.OpenFile.FileName = "openFileDialog1";
            // 
            // ItemDialog
            // 
            this.ItemDialog.Anchor = ((System.Windows.Forms.AnchorStyles)((((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom) 
            | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.ItemDialog.Location = new System.Drawing.Point(191, 134);
            this.ItemDialog.Name = "ItemDialog";
            this.ItemDialog.Size = new System.Drawing.Size(400, 300);
            this.ItemDialog.TabIndex = 4;
            this.ItemDialog.Visible = false;
            this.ItemDialog.DialogEnd += new program_08.NewItemDialog.DialogEndHandler(this.ItemDialog_DialogEnd);
            // 
            // NameDialog
            // 
            this.NameDialog.Anchor = ((System.Windows.Forms.AnchorStyles)((((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom) 
            | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.NameDialog.Location = new System.Drawing.Point(191, 134);
            this.NameDialog.Name = "NameDialog";
            this.NameDialog.Size = new System.Drawing.Size(400, 300);
            this.NameDialog.TabIndex = 2;
            this.NameDialog.Visible = false;
            this.NameDialog.DialogEnd += new program_08.WorkshopNameDialog.DialogEndHandler(this.NameDialog_DialogEnd);
            // 
            // Form_Main
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(784, 561);
            this.Controls.Add(this.ItemDialog);
            this.Controls.Add(this.NameDialog);
            this.Controls.Add(this.Menu);
            this.IsMdiContainer = true;
            this.Name = "Form_Main";
            this.Text = "Math, Science, & U";
            this.Menu.ResumeLayout(false);
            this.Menu.PerformLayout();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.MenuStrip Menu;
        private System.Windows.Forms.ToolStripMenuItem fileToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem Menu_New;
        private System.Windows.Forms.ToolStripMenuItem Menu_Open;
        private System.Windows.Forms.ToolStripMenuItem Menu_Save;
        private System.Windows.Forms.ToolStripMenuItem Menu_Exit;
        private System.Windows.Forms.ToolStripMenuItem editToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem Menu_Insert;
        private System.Windows.Forms.ToolStripMenuItem Menu_Delete;
        private WorkshopNameDialog NameDialog;
        private NewItemDialog ItemDialog;
        private System.Windows.Forms.OpenFileDialog OpenFile;
        private System.Windows.Forms.ToolStripMenuItem MenuAbout;
    }
}

