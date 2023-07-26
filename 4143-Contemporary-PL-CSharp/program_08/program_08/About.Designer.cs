namespace program_08
{
    partial class About
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
            this.Group_Info = new System.Windows.Forms.GroupBox();
            this.Label_Name = new System.Windows.Forms.Label();
            this.Label_Version = new System.Windows.Forms.Label();
            this.Label_Author = new System.Windows.Forms.Label();
            this.Group_Info.SuspendLayout();
            this.SuspendLayout();
            // 
            // Group_Info
            // 
            this.Group_Info.Controls.Add(this.Label_Author);
            this.Group_Info.Controls.Add(this.Label_Version);
            this.Group_Info.Controls.Add(this.Label_Name);
            this.Group_Info.Location = new System.Drawing.Point(12, 12);
            this.Group_Info.Name = "Group_Info";
            this.Group_Info.Size = new System.Drawing.Size(324, 209);
            this.Group_Info.TabIndex = 0;
            this.Group_Info.TabStop = false;
            this.Group_Info.Text = "Program Info";
            // 
            // Label_Name
            // 
            this.Label_Name.AutoSize = true;
            this.Label_Name.Font = new System.Drawing.Font("Microsoft Sans Serif", 15.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.Label_Name.Location = new System.Drawing.Point(34, 74);
            this.Label_Name.Name = "Label_Name";
            this.Label_Name.Size = new System.Drawing.Size(262, 25);
            this.Label_Name.TabIndex = 0;
            this.Label_Name.Text = "Program: Supply Manager";
            // 
            // Label_Version
            // 
            this.Label_Version.AutoSize = true;
            this.Label_Version.Font = new System.Drawing.Font("Microsoft Sans Serif", 15.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.Label_Version.Location = new System.Drawing.Point(43, 105);
            this.Label_Version.Name = "Label_Version";
            this.Label_Version.Size = new System.Drawing.Size(121, 25);
            this.Label_Version.TabIndex = 1;
            this.Label_Version.Text = "Version: 42";
            // 
            // Label_Author
            // 
            this.Label_Author.AutoSize = true;
            this.Label_Author.Font = new System.Drawing.Font("Microsoft Sans Serif", 15.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.Label_Author.Location = new System.Drawing.Point(53, 134);
            this.Label_Author.Name = "Label_Author";
            this.Label_Author.Size = new System.Drawing.Size(220, 25);
            this.Label_Author.TabIndex = 2;
            this.Label_Author.Text = "Author: Jeremy Glebe";
            // 
            // About
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(348, 233);
            this.Controls.Add(this.Group_Info);
            this.Name = "About";
            this.Text = "About";
            this.Group_Info.ResumeLayout(false);
            this.Group_Info.PerformLayout();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.GroupBox Group_Info;
        private System.Windows.Forms.Label Label_Author;
        private System.Windows.Forms.Label Label_Version;
        private System.Windows.Forms.Label Label_Name;
    }
}