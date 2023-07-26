namespace program_03
{
    partial class displayWindow
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
            this.inputBox = new System.Windows.Forms.TextBox();
            this.showNumBtn = new System.Windows.Forms.Button();
            this.numText = new System.Windows.Forms.Label();
            this.SuspendLayout();
            // 
            // inputBox
            // 
            this.inputBox.Location = new System.Drawing.Point(12, 107);
            this.inputBox.Name = "inputBox";
            this.inputBox.Size = new System.Drawing.Size(168, 20);
            this.inputBox.TabIndex = 0;
            this.inputBox.Text = "Please enter a 5 digit integer...";
            // 
            // showNumBtn
            // 
            this.showNumBtn.Location = new System.Drawing.Point(186, 104);
            this.showNumBtn.Name = "showNumBtn";
            this.showNumBtn.Size = new System.Drawing.Size(98, 23);
            this.showNumBtn.TabIndex = 1;
            this.showNumBtn.Text = "Display my digits!";
            this.showNumBtn.UseVisualStyleBackColor = true;
            this.showNumBtn.Click += new System.EventHandler(this.showNumBtn_Click);
            // 
            // numText
            // 
            this.numText.AutoSize = true;
            this.numText.Font = new System.Drawing.Font("Segoe Script", 36F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.numText.Location = new System.Drawing.Point(12, 9);
            this.numText.Name = "numText";
            this.numText.Size = new System.Drawing.Size(0, 76);
            this.numText.TabIndex = 2;
            // 
            // displayWindow
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(508, 144);
            this.Controls.Add(this.numText);
            this.Controls.Add(this.showNumBtn);
            this.Controls.Add(this.inputBox);
            this.Name = "displayWindow";
            this.Text = "Display Window";
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.TextBox inputBox;
        private System.Windows.Forms.Button showNumBtn;
        private System.Windows.Forms.Label numText;
    }
}

