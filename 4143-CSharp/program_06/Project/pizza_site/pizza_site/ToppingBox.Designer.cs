namespace pizza_site
{
    partial class ToppingBox
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

        #region Component Designer generated code

        /// <summary> 
        /// Required method for Designer support - do not modify 
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.box = new System.Windows.Forms.CheckBox();
            this.picR = new System.Windows.Forms.PictureBox();
            this.picW = new System.Windows.Forms.PictureBox();
            this.picL = new System.Windows.Forms.PictureBox();
            ((System.ComponentModel.ISupportInitialize)(this.picR)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.picW)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.picL)).BeginInit();
            this.SuspendLayout();
            // 
            // box
            // 
            this.box.AutoSize = true;
            this.box.Location = new System.Drawing.Point(3, 3);
            this.box.Name = "box";
            this.box.Size = new System.Drawing.Size(67, 17);
            this.box.TabIndex = 0;
            this.box.Text = "(topping)";
            this.box.UseVisualStyleBackColor = true;
            this.box.CheckedChanged += new System.EventHandler(this.box_CheckedChanged);
            // 
            // picR
            // 
            this.picR.Image = global::pizza_site.Properties.Resources.icon_right;
            this.picR.Location = new System.Drawing.Point(140, 7);
            this.picR.Name = "picR";
            this.picR.Size = new System.Drawing.Size(10, 10);
            this.picR.SizeMode = System.Windows.Forms.PictureBoxSizeMode.Zoom;
            this.picR.TabIndex = 3;
            this.picR.TabStop = false;
            this.picR.Click += new System.EventHandler(this.picR_Click);
            // 
            // picW
            // 
            this.picW.Image = global::pizza_site.Properties.Resources.blue_icon_full;
            this.picW.Location = new System.Drawing.Point(124, 7);
            this.picW.Name = "picW";
            this.picW.Size = new System.Drawing.Size(10, 10);
            this.picW.SizeMode = System.Windows.Forms.PictureBoxSizeMode.Zoom;
            this.picW.TabIndex = 2;
            this.picW.TabStop = false;
            this.picW.Click += new System.EventHandler(this.picW_Click);
            // 
            // picL
            // 
            this.picL.Image = global::pizza_site.Properties.Resources.icon_left;
            this.picL.Location = new System.Drawing.Point(108, 7);
            this.picL.Name = "picL";
            this.picL.Size = new System.Drawing.Size(10, 10);
            this.picL.SizeMode = System.Windows.Forms.PictureBoxSizeMode.Zoom;
            this.picL.TabIndex = 1;
            this.picL.TabStop = false;
            this.picL.Click += new System.EventHandler(this.picL_Click);
            // 
            // ToppingBox
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.Controls.Add(this.picR);
            this.Controls.Add(this.picW);
            this.Controls.Add(this.picL);
            this.Controls.Add(this.box);
            this.Name = "ToppingBox";
            this.Size = new System.Drawing.Size(153, 24);
            ((System.ComponentModel.ISupportInitialize)(this.picR)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.picW)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.picL)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.CheckBox box;
        private System.Windows.Forms.PictureBox picL;
        private System.Windows.Forms.PictureBox picW;
        private System.Windows.Forms.PictureBox picR;
    }
}
