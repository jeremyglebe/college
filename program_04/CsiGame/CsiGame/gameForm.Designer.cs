namespace CsiGame
{
    partial class gameForm
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
            this.btnNewGame = new System.Windows.Forms.Button();
            this.btnOK = new System.Windows.Forms.Button();
            this.trackX = new System.Windows.Forms.TrackBar();
            this.trackY = new System.Windows.Forms.TrackBar();
            this.lblXTrack = new System.Windows.Forms.Label();
            this.lblYTrack = new System.Windows.Forms.Label();
            this.gameDisplay = new System.Windows.Forms.TextBox();
            this.contextMenuStrip1 = new System.Windows.Forms.ContextMenuStrip(this.components);
            this.helpText = new System.Windows.Forms.TextBox();
            this.guessLabel = new System.Windows.Forms.Label();
            ((System.ComponentModel.ISupportInitialize)(this.trackX)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.trackY)).BeginInit();
            this.SuspendLayout();
            // 
            // btnNewGame
            // 
            this.btnNewGame.Font = new System.Drawing.Font("Lucida Console", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btnNewGame.Location = new System.Drawing.Point(697, 457);
            this.btnNewGame.Name = "btnNewGame";
            this.btnNewGame.Size = new System.Drawing.Size(75, 75);
            this.btnNewGame.TabIndex = 0;
            this.btnNewGame.Text = "New Game";
            this.btnNewGame.UseVisualStyleBackColor = true;
            this.btnNewGame.Click += new System.EventHandler(this.btnNewGame_Click);
            // 
            // btnOK
            // 
            this.btnOK.Font = new System.Drawing.Font("Lucida Sans Unicode", 18F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btnOK.Location = new System.Drawing.Point(600, 457);
            this.btnOK.Name = "btnOK";
            this.btnOK.Size = new System.Drawing.Size(75, 75);
            this.btnOK.TabIndex = 1;
            this.btnOK.Text = "OK!";
            this.btnOK.UseVisualStyleBackColor = true;
            this.btnOK.Click += new System.EventHandler(this.btnOK_Click);
            // 
            // trackX
            // 
            this.trackX.Location = new System.Drawing.Point(97, 457);
            this.trackX.Maximum = 20;
            this.trackX.Name = "trackX";
            this.trackX.Size = new System.Drawing.Size(481, 45);
            this.trackX.TabIndex = 2;
            this.trackX.Value = 10;
            this.trackX.Scroll += new System.EventHandler(this.trackX_Scroll);
            // 
            // trackY
            // 
            this.trackY.Location = new System.Drawing.Point(97, 487);
            this.trackY.Maximum = 20;
            this.trackY.Name = "trackY";
            this.trackY.Size = new System.Drawing.Size(481, 45);
            this.trackY.TabIndex = 3;
            this.trackY.Value = 10;
            this.trackY.Scroll += new System.EventHandler(this.trackY_Scroll);
            // 
            // lblXTrack
            // 
            this.lblXTrack.AutoSize = true;
            this.lblXTrack.Font = new System.Drawing.Font("Lucida Sans Unicode", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblXTrack.Location = new System.Drawing.Point(28, 457);
            this.lblXTrack.Name = "lblXTrack";
            this.lblXTrack.Size = new System.Drawing.Size(72, 20);
            this.lblXTrack.TabIndex = 4;
            this.lblXTrack.Text = "Row: 10";
            // 
            // lblYTrack
            // 
            this.lblYTrack.AutoSize = true;
            this.lblYTrack.Font = new System.Drawing.Font("Lucida Sans Unicode", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblYTrack.Location = new System.Drawing.Point(0, 486);
            this.lblYTrack.Name = "lblYTrack";
            this.lblYTrack.Size = new System.Drawing.Size(100, 20);
            this.lblYTrack.TabIndex = 5;
            this.lblYTrack.Text = "Column: 10";
            // 
            // gameDisplay
            // 
            this.gameDisplay.Font = new System.Drawing.Font("Lucida Console", 11.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.gameDisplay.Location = new System.Drawing.Point(12, 86);
            this.gameDisplay.Multiline = true;
            this.gameDisplay.Name = "gameDisplay";
            this.gameDisplay.ReadOnly = true;
            this.gameDisplay.Size = new System.Drawing.Size(566, 326);
            this.gameDisplay.TabIndex = 8;
            this.gameDisplay.WordWrap = false;
            // 
            // contextMenuStrip1
            // 
            this.contextMenuStrip1.Name = "contextMenuStrip1";
            this.contextMenuStrip1.Size = new System.Drawing.Size(61, 4);
            // 
            // helpText
            // 
            this.helpText.Font = new System.Drawing.Font("Lucida Console", 11F);
            this.helpText.Location = new System.Drawing.Point(12, 12);
            this.helpText.Multiline = true;
            this.helpText.Name = "helpText";
            this.helpText.ReadOnly = true;
            this.helpText.Size = new System.Drawing.Size(566, 55);
            this.helpText.TabIndex = 11;
            this.helpText.Text = "New Game: Select a game size and hit \"OK!\"";
            // 
            // guessLabel
            // 
            this.guessLabel.AutoSize = true;
            this.guessLabel.Font = new System.Drawing.Font("Lucida Console", 20.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.guessLabel.Location = new System.Drawing.Point(584, 86);
            this.guessLabel.Name = "guessLabel";
            this.guessLabel.Size = new System.Drawing.Size(172, 27);
            this.guessLabel.TabIndex = 12;
            this.guessLabel.Text = "Guesses: 0";
            // 
            // gameForm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(784, 561);
            this.Controls.Add(this.guessLabel);
            this.Controls.Add(this.helpText);
            this.Controls.Add(this.gameDisplay);
            this.Controls.Add(this.lblYTrack);
            this.Controls.Add(this.lblXTrack);
            this.Controls.Add(this.trackY);
            this.Controls.Add(this.trackX);
            this.Controls.Add(this.btnOK);
            this.Controls.Add(this.btnNewGame);
            this.Name = "gameForm";
            this.Text = "CSI: Find the Evidence Sample";
            ((System.ComponentModel.ISupportInitialize)(this.trackX)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.trackY)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Button btnNewGame;
        private System.Windows.Forms.Button btnOK;
        private System.Windows.Forms.TrackBar trackX;
        private System.Windows.Forms.TrackBar trackY;
        private System.Windows.Forms.Label lblXTrack;
        private System.Windows.Forms.Label lblYTrack;
        private System.Windows.Forms.TextBox gameDisplay;
        private System.Windows.Forms.ContextMenuStrip contextMenuStrip1;
        private System.Windows.Forms.TextBox helpText;
        private System.Windows.Forms.Label guessLabel;
    }
}

