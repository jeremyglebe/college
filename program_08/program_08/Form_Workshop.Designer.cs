namespace program_08
{
    partial class Form_Workshop
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
            this.List_Supplies = new System.Windows.Forms.ListBox();
            this.SuspendLayout();
            // 
            // List_Supplies
            // 
            this.List_Supplies.Anchor = ((System.Windows.Forms.AnchorStyles)((((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom) 
            | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.List_Supplies.FormattingEnabled = true;
            this.List_Supplies.Location = new System.Drawing.Point(12, 12);
            this.List_Supplies.Name = "List_Supplies";
            this.List_Supplies.Size = new System.Drawing.Size(337, 264);
            this.List_Supplies.TabIndex = 0;
            // 
            // Form_Workshop
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(361, 330);
            this.Controls.Add(this.List_Supplies);
            this.Name = "Form_Workshop";
            this.Text = "Workshop Form";
            this.Activated += new System.EventHandler(this.Form_Workshop_Activated);
            this.Deactivate += new System.EventHandler(this.Form_Workshop_Deactivate);
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.ListBox List_Supplies;
    }
}