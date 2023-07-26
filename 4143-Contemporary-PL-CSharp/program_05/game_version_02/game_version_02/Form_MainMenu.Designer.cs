namespace game_version_02
{
    partial class Form_MainMenu
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
            this.MButton_StartGame = new MetroFramework.Controls.MetroButton();
            this.MStyleManager_Menu = new MetroFramework.Components.MetroStyleManager(this.components);
            this.MTrackBar_GameSelect = new MetroFramework.Controls.MetroTrackBar();
            this.MLabel_GameSelectText = new MetroFramework.Controls.MetroLabel();
            this.MPanel_GameModeImage = new MetroFramework.Controls.MetroPanel();
            this.PictureBox_GameModeImage = new System.Windows.Forms.PictureBox();
            this.MButton_Exit = new MetroFramework.Controls.MetroButton();
            ((System.ComponentModel.ISupportInitialize)(this.MStyleManager_Menu)).BeginInit();
            this.MPanel_GameModeImage.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.PictureBox_GameModeImage)).BeginInit();
            this.SuspendLayout();
            // 
            // MButton_StartGame
            // 
            this.MButton_StartGame.Anchor = System.Windows.Forms.AnchorStyles.Bottom;
            this.MButton_StartGame.Location = new System.Drawing.Point(500, 620);
            this.MButton_StartGame.Name = "MButton_StartGame";
            this.MButton_StartGame.Size = new System.Drawing.Size(280, 80);
            this.MButton_StartGame.TabIndex = 1;
            this.MButton_StartGame.Text = "Start Game";
            this.MButton_StartGame.Click += new System.EventHandler(this.MButton_StartGame_Click);
            // 
            // MStyleManager_Menu
            // 
            this.MStyleManager_Menu.Owner = this;
            this.MStyleManager_Menu.Style = MetroFramework.MetroColorStyle.Green;
            this.MStyleManager_Menu.Theme = MetroFramework.MetroThemeStyle.Dark;
            // 
            // MTrackBar_GameSelect
            // 
            this.MTrackBar_GameSelect.Anchor = System.Windows.Forms.AnchorStyles.Bottom;
            this.MTrackBar_GameSelect.BackColor = System.Drawing.Color.Transparent;
            this.MTrackBar_GameSelect.Location = new System.Drawing.Point(140, 560);
            this.MTrackBar_GameSelect.Maximum = 399;
            this.MTrackBar_GameSelect.MouseWheelBarPartitions = 25;
            this.MTrackBar_GameSelect.Name = "MTrackBar_GameSelect";
            this.MTrackBar_GameSelect.Size = new System.Drawing.Size(1000, 50);
            this.MTrackBar_GameSelect.TabIndex = 2;
            this.MTrackBar_GameSelect.Value = 0;
            this.MTrackBar_GameSelect.ValueChanged += new System.EventHandler(this.MTrackBar_GameSelect_ValueChanged);
            // 
            // MLabel_GameSelectText
            // 
            this.MLabel_GameSelectText.Location = new System.Drawing.Point(140, 538);
            this.MLabel_GameSelectText.Name = "MLabel_GameSelectText";
            this.MLabel_GameSelectText.Size = new System.Drawing.Size(1000, 19);
            this.MLabel_GameSelectText.TabIndex = 3;
            this.MLabel_GameSelectText.Text = "Scroll to Select Game Mode...";
            this.MLabel_GameSelectText.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            this.MLabel_GameSelectText.UseStyleColors = true;
            // 
            // MPanel_GameModeImage
            // 
            this.MPanel_GameModeImage.Anchor = System.Windows.Forms.AnchorStyles.Bottom;
            this.MPanel_GameModeImage.BorderStyle = MetroFramework.Drawing.MetroBorderStyle.FixedSingle;
            this.MPanel_GameModeImage.Controls.Add(this.PictureBox_GameModeImage);
            this.MPanel_GameModeImage.HorizontalScrollbarBarColor = true;
            this.MPanel_GameModeImage.HorizontalScrollbarHighlightOnWheel = false;
            this.MPanel_GameModeImage.HorizontalScrollbarSize = 10;
            this.MPanel_GameModeImage.Location = new System.Drawing.Point(440, 100);
            this.MPanel_GameModeImage.Name = "MPanel_GameModeImage";
            this.MPanel_GameModeImage.Size = new System.Drawing.Size(400, 400);
            this.MPanel_GameModeImage.TabIndex = 4;
            this.MPanel_GameModeImage.VerticalScrollbarBarColor = true;
            this.MPanel_GameModeImage.VerticalScrollbarHighlightOnWheel = false;
            this.MPanel_GameModeImage.VerticalScrollbarSize = 10;
            // 
            // PictureBox_GameModeImage
            // 
            this.PictureBox_GameModeImage.BackgroundImageLayout = System.Windows.Forms.ImageLayout.None;
            this.PictureBox_GameModeImage.Location = new System.Drawing.Point(3, 3);
            this.PictureBox_GameModeImage.Name = "PictureBox_GameModeImage";
            this.PictureBox_GameModeImage.Size = new System.Drawing.Size(394, 394);
            this.PictureBox_GameModeImage.SizeMode = System.Windows.Forms.PictureBoxSizeMode.CenterImage;
            this.PictureBox_GameModeImage.TabIndex = 2;
            this.PictureBox_GameModeImage.TabStop = false;
            // 
            // MButton_Exit
            // 
            this.MButton_Exit.Location = new System.Drawing.Point(1182, 677);
            this.MButton_Exit.Name = "MButton_Exit";
            this.MButton_Exit.Size = new System.Drawing.Size(75, 23);
            this.MButton_Exit.TabIndex = 5;
            this.MButton_Exit.Text = "Exit";
            this.MButton_Exit.Click += new System.EventHandler(this.MButton_Exit_Click);
            // 
            // Form_MainMenu
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(1280, 720);
            this.Controls.Add(this.MButton_Exit);
            this.Controls.Add(this.MPanel_GameModeImage);
            this.Controls.Add(this.MLabel_GameSelectText);
            this.Controls.Add(this.MTrackBar_GameSelect);
            this.Controls.Add(this.MButton_StartGame);
            this.Name = "Form_MainMenu";
            this.Text = "Analysis && Investigation: Menu";
            ((System.ComponentModel.ISupportInitialize)(this.MStyleManager_Menu)).EndInit();
            this.MPanel_GameModeImage.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)(this.PictureBox_GameModeImage)).EndInit();
            this.ResumeLayout(false);

        }

        #endregion
        private MetroFramework.Controls.MetroButton MButton_StartGame;
        private MetroFramework.Components.MetroStyleManager MStyleManager_Menu;
        private MetroFramework.Controls.MetroTrackBar MTrackBar_GameSelect;
        private MetroFramework.Controls.MetroLabel MLabel_GameSelectText;
        private MetroFramework.Controls.MetroPanel MPanel_GameModeImage;
        private System.Windows.Forms.PictureBox PictureBox_GameModeImage;
        private MetroFramework.Controls.MetroButton MButton_Exit;
    }
}

