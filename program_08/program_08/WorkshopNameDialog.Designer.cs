namespace program_08
{
    partial class WorkshopNameDialog
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
            this.TextBox_WSName = new System.Windows.Forms.TextBox();
            this.Label_WSNamePrompt = new System.Windows.Forms.Label();
            this.Button_Confirm = new System.Windows.Forms.Button();
            this.Button_Cancel = new System.Windows.Forms.Button();
            this.SuspendLayout();
            // 
            // TextBox_WSName
            // 
            this.TextBox_WSName.Location = new System.Drawing.Point(85, 205);
            this.TextBox_WSName.Name = "TextBox_WSName";
            this.TextBox_WSName.Size = new System.Drawing.Size(228, 20);
            this.TextBox_WSName.TabIndex = 0;
            // 
            // Label_WSNamePrompt
            // 
            this.Label_WSNamePrompt.AutoSize = true;
            this.Label_WSNamePrompt.Font = new System.Drawing.Font("Microsoft Sans Serif", 15.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.Label_WSNamePrompt.Location = new System.Drawing.Point(12, 177);
            this.Label_WSNamePrompt.Name = "Label_WSNamePrompt";
            this.Label_WSNamePrompt.Size = new System.Drawing.Size(375, 25);
            this.Label_WSNamePrompt.TabIndex = 1;
            this.Label_WSNamePrompt.Text = "Please enter a name for the workshop";
            // 
            // Button_Confirm
            // 
            this.Button_Confirm.Location = new System.Drawing.Point(47, 241);
            this.Button_Confirm.Name = "Button_Confirm";
            this.Button_Confirm.Size = new System.Drawing.Size(142, 46);
            this.Button_Confirm.TabIndex = 2;
            this.Button_Confirm.Text = "Confirm";
            this.Button_Confirm.UseVisualStyleBackColor = true;
            this.Button_Confirm.Click += new System.EventHandler(this.Button_Confirm_Click);
            // 
            // Button_Cancel
            // 
            this.Button_Cancel.Location = new System.Drawing.Point(212, 241);
            this.Button_Cancel.Name = "Button_Cancel";
            this.Button_Cancel.Size = new System.Drawing.Size(142, 46);
            this.Button_Cancel.TabIndex = 3;
            this.Button_Cancel.Text = "Cancel";
            this.Button_Cancel.UseVisualStyleBackColor = true;
            // 
            // WorkshopNameDialog
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.Controls.Add(this.Button_Cancel);
            this.Controls.Add(this.Button_Confirm);
            this.Controls.Add(this.Label_WSNamePrompt);
            this.Controls.Add(this.TextBox_WSName);
            this.Name = "WorkshopNameDialog";
            this.Size = new System.Drawing.Size(400, 300);
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.TextBox TextBox_WSName;
        private System.Windows.Forms.Label Label_WSNamePrompt;
        private System.Windows.Forms.Button Button_Confirm;
        private System.Windows.Forms.Button Button_Cancel;
    }
}
