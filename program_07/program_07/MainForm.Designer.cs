namespace program_07
{
    partial class MainForm
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
            this.components = new System.ComponentModel.Container();
            this.AnimationTimer = new System.Windows.Forms.Timer(this.components);
            this.SpacePicture = new program_07.Space();
            this.AnimationButton = new System.Windows.Forms.Button();
            this.SuspendLayout();
            // 
            // AnimationTimer
            // 
            this.AnimationTimer.Interval = 50;
            this.AnimationTimer.Tick += new System.EventHandler(this.AnimationTimer_Tick);
            // 
            // SpacePicture
            // 
            this.SpacePicture.Location = new System.Drawing.Point(70, 12);
            this.SpacePicture.Name = "SpacePicture";
            this.SpacePicture.Size = new System.Drawing.Size(640, 480);
            this.SpacePicture.TabIndex = 0;
            // 
            // AnimationButton
            // 
            this.AnimationButton.Location = new System.Drawing.Point(250, 500);
            this.AnimationButton.Name = "AnimationButton";
            this.AnimationButton.Size = new System.Drawing.Size(286, 56);
            this.AnimationButton.TabIndex = 1;
            this.AnimationButton.Text = "Animate It!";
            this.AnimationButton.UseVisualStyleBackColor = true;
            this.AnimationButton.Click += new System.EventHandler(this.AnimationButton_Click);
            // 
            // MainForm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(784, 561);
            this.Controls.Add(this.AnimationButton);
            this.Controls.Add(this.SpacePicture);
            this.Name = "MainForm";
            this.Text = "Graphics Program";
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.Timer AnimationTimer;
        private Space SpacePicture;
        private System.Windows.Forms.Button AnimationButton;
    }
}

