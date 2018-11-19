namespace mdi_and_controls
{
    partial class Form_Child
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
            this.numPad1 = new mdi_and_controls.numPad();
            this.SuspendLayout();
            // 
            // numPad1
            // 
            this.numPad1.Location = new System.Drawing.Point(12, 12);
            this.numPad1.Name = "numPad1";
            this.numPad1.Size = new System.Drawing.Size(96, 125);
            this.numPad1.TabIndex = 0;
            // 
            // Form_Child
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(120, 147);
            this.Controls.Add(this.numPad1);
            this.Name = "Form_Child";
            this.Text = "Fake Calculator";
            this.ResumeLayout(false);

        }

        #endregion

        private numPad numPad1;
    }
}