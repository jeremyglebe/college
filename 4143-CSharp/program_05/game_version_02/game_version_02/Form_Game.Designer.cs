namespace game_version_02
{
    partial class Form_Game
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
            this.MStyleManager_Game = new MetroFramework.Components.MetroStyleManager(this.components);
            this.MTextBox_Messenger = new MetroFramework.Controls.MetroTextBox();
            this.MLabel_Messenger = new MetroFramework.Controls.MetroLabel();
            this.MPanel_Grid = new MetroFramework.Controls.MetroPanel();
            this.FileDialog_LevelSelect = new System.Windows.Forms.OpenFileDialog();
            this.MButton_LevelBrowse = new MetroFramework.Controls.MetroButton();
            this.GridButtonFontTemplate = new System.Windows.Forms.Button();
            this.MLabel_Guesses = new MetroFramework.Controls.MetroLabel();
            this.MLabel_Title = new MetroFramework.Controls.MetroLabel();
            this.MTextBox_Description = new MetroFramework.Controls.MetroTextBox();
            this.Label_GameEnd = new System.Windows.Forms.Label();
            this.MPanel_Evidence = new MetroFramework.Controls.MetroPanel();
            this.MLabel_Evidences = new MetroFramework.Controls.MetroLabel();
            this.MButton_Exit = new MetroFramework.Controls.MetroButton();
            this.MPanel_LevelPicker = new MetroFramework.Controls.MetroPanel();
            this.MLabel_BrowseForLevel = new MetroFramework.Controls.MetroLabel();
            this.MLabel_ChooseALevel = new MetroFramework.Controls.MetroLabel();
            this.MTrackBar_ChooseLevel = new MetroFramework.Controls.MetroTrackBar();
            this.MButton_Start = new MetroFramework.Controls.MetroButton();
            ((System.ComponentModel.ISupportInitialize)(this.MStyleManager_Game)).BeginInit();
            this.MPanel_LevelPicker.SuspendLayout();
            this.SuspendLayout();
            // 
            // MStyleManager_Game
            // 
            this.MStyleManager_Game.Owner = this;
            this.MStyleManager_Game.Style = MetroFramework.MetroColorStyle.Green;
            this.MStyleManager_Game.Theme = MetroFramework.MetroThemeStyle.Dark;
            // 
            // MTextBox_Messenger
            // 
            this.MTextBox_Messenger.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Right)));
            this.MTextBox_Messenger.CustomForeColor = true;
            this.MTextBox_Messenger.ForeColor = System.Drawing.Color.LimeGreen;
            this.MTextBox_Messenger.Location = new System.Drawing.Point(885, 82);
            this.MTextBox_Messenger.Multiline = true;
            this.MTextBox_Messenger.Name = "MTextBox_Messenger";
            this.MTextBox_Messenger.ReadOnly = true;
            this.MTextBox_Messenger.ScrollBars = System.Windows.Forms.ScrollBars.Vertical;
            this.MTextBox_Messenger.Size = new System.Drawing.Size(372, 149);
            this.MTextBox_Messenger.TabIndex = 0;
            this.MTextBox_Messenger.Text = "> Chatting with not_a_secret_agent4242, theBigCheese, Forensics4Life ...";
            this.MTextBox_Messenger.Visible = false;
            this.MTextBox_Messenger.Enter += new System.EventHandler(this.MTextBox_Messenger_Enter);
            // 
            // MLabel_Messenger
            // 
            this.MLabel_Messenger.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Right)));
            this.MLabel_Messenger.AutoSize = true;
            this.MLabel_Messenger.CustomForeColor = true;
            this.MLabel_Messenger.ForeColor = System.Drawing.Color.LimeGreen;
            this.MLabel_Messenger.Location = new System.Drawing.Point(885, 60);
            this.MLabel_Messenger.Name = "MLabel_Messenger";
            this.MLabel_Messenger.Size = new System.Drawing.Size(155, 19);
            this.MLabel_Messenger.TabIndex = 1;
            this.MLabel_Messenger.Text = "Terminal Chat Client V3.7";
            this.MLabel_Messenger.Visible = false;
            // 
            // MPanel_Grid
            // 
            this.MPanel_Grid.BackColor = System.Drawing.Color.DimGray;
            this.MPanel_Grid.HorizontalScrollbarBarColor = true;
            this.MPanel_Grid.HorizontalScrollbarHighlightOnWheel = false;
            this.MPanel_Grid.HorizontalScrollbarSize = 10;
            this.MPanel_Grid.Location = new System.Drawing.Point(23, 63);
            this.MPanel_Grid.Name = "MPanel_Grid";
            this.MPanel_Grid.Size = new System.Drawing.Size(500, 500);
            this.MPanel_Grid.TabIndex = 2;
            this.MPanel_Grid.VerticalScrollbarBarColor = true;
            this.MPanel_Grid.VerticalScrollbarHighlightOnWheel = false;
            this.MPanel_Grid.VerticalScrollbarSize = 10;
            this.MPanel_Grid.Visible = false;
            // 
            // FileDialog_LevelSelect
            // 
            this.FileDialog_LevelSelect.DefaultExt = "xml";
            this.FileDialog_LevelSelect.Filter = "XML Level Files|Level_*.xml";
            this.FileDialog_LevelSelect.InitialDirectory = "./";
            this.FileDialog_LevelSelect.RestoreDirectory = true;
            this.FileDialog_LevelSelect.Title = "Select the file of the level you wish to play";
            this.FileDialog_LevelSelect.FileOk += new System.ComponentModel.CancelEventHandler(this.FileDialog_LevelSelect_FileOk);
            // 
            // MButton_LevelBrowse
            // 
            this.MButton_LevelBrowse.Location = new System.Drawing.Point(93, 214);
            this.MButton_LevelBrowse.Name = "MButton_LevelBrowse";
            this.MButton_LevelBrowse.Size = new System.Drawing.Size(91, 22);
            this.MButton_LevelBrowse.TabIndex = 3;
            this.MButton_LevelBrowse.Text = "Browse";
            this.MButton_LevelBrowse.Click += new System.EventHandler(this.MButton_LevelBrowse_Click);
            // 
            // GridButtonFontTemplate
            // 
            this.GridButtonFontTemplate.Font = new System.Drawing.Font("Lucida Console", 8.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.GridButtonFontTemplate.Location = new System.Drawing.Point(25, 65);
            this.GridButtonFontTemplate.Name = "GridButtonFontTemplate";
            this.GridButtonFontTemplate.Size = new System.Drawing.Size(100, 100);
            this.GridButtonFontTemplate.TabIndex = 4;
            this.GridButtonFontTemplate.Text = "Grid Button Font Template";
            this.GridButtonFontTemplate.UseVisualStyleBackColor = true;
            this.GridButtonFontTemplate.Visible = false;
            // 
            // MLabel_Guesses
            // 
            this.MLabel_Guesses.AutoSize = true;
            this.MLabel_Guesses.CustomForeColor = true;
            this.MLabel_Guesses.FontSize = MetroFramework.MetroLabelSize.Tall;
            this.MLabel_Guesses.ForeColor = System.Drawing.Color.LimeGreen;
            this.MLabel_Guesses.Location = new System.Drawing.Point(110, 604);
            this.MLabel_Guesses.Name = "MLabel_Guesses";
            this.MLabel_Guesses.Size = new System.Drawing.Size(103, 25);
            this.MLabel_Guesses.TabIndex = 5;
            this.MLabel_Guesses.Text = "Guesses 0/0";
            this.MLabel_Guesses.Visible = false;
            // 
            // MLabel_Title
            // 
            this.MLabel_Title.AutoSize = true;
            this.MLabel_Title.FontSize = MetroFramework.MetroLabelSize.Tall;
            this.MLabel_Title.FontWeight = MetroFramework.MetroLabelWeight.Bold;
            this.MLabel_Title.Location = new System.Drawing.Point(519, 82);
            this.MLabel_Title.Name = "MLabel_Title";
            this.MLabel_Title.Size = new System.Drawing.Size(66, 25);
            this.MLabel_Title.TabIndex = 6;
            this.MLabel_Title.Text = "Level: ";
            this.MLabel_Title.Visible = false;
            // 
            // MTextBox_Description
            // 
            this.MTextBox_Description.Location = new System.Drawing.Point(519, 110);
            this.MTextBox_Description.Multiline = true;
            this.MTextBox_Description.Name = "MTextBox_Description";
            this.MTextBox_Description.ReadOnly = true;
            this.MTextBox_Description.Size = new System.Drawing.Size(314, 212);
            this.MTextBox_Description.TabIndex = 7;
            this.MTextBox_Description.Text = "...";
            this.MTextBox_Description.Visible = false;
            // 
            // Label_GameEnd
            // 
            this.Label_GameEnd.AutoSize = true;
            this.Label_GameEnd.Font = new System.Drawing.Font("Lucida Console", 48F, ((System.Drawing.FontStyle)((System.Drawing.FontStyle.Bold | System.Drawing.FontStyle.Italic))), System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.Label_GameEnd.ForeColor = System.Drawing.Color.Lime;
            this.Label_GameEnd.Location = new System.Drawing.Point(470, 259);
            this.Label_GameEnd.Name = "Label_GameEnd";
            this.Label_GameEnd.Size = new System.Drawing.Size(548, 65);
            this.Label_GameEnd.TabIndex = 2;
            this.Label_GameEnd.Text = "YOU WIN/LOSE!";
            this.Label_GameEnd.Visible = false;
            // 
            // MPanel_Evidence
            // 
            this.MPanel_Evidence.HorizontalScrollbarBarColor = true;
            this.MPanel_Evidence.HorizontalScrollbarHighlightOnWheel = false;
            this.MPanel_Evidence.HorizontalScrollbarSize = 10;
            this.MPanel_Evidence.Location = new System.Drawing.Point(975, 404);
            this.MPanel_Evidence.Name = "MPanel_Evidence";
            this.MPanel_Evidence.Size = new System.Drawing.Size(200, 200);
            this.MPanel_Evidence.TabIndex = 8;
            this.MPanel_Evidence.VerticalScrollbarBarColor = true;
            this.MPanel_Evidence.VerticalScrollbarHighlightOnWheel = false;
            this.MPanel_Evidence.VerticalScrollbarSize = 10;
            this.MPanel_Evidence.Visible = false;
            // 
            // MLabel_Evidences
            // 
            this.MLabel_Evidences.AutoSize = true;
            this.MLabel_Evidences.CustomForeColor = true;
            this.MLabel_Evidences.ForeColor = System.Drawing.Color.LimeGreen;
            this.MLabel_Evidences.Location = new System.Drawing.Point(1016, 382);
            this.MLabel_Evidences.Name = "MLabel_Evidences";
            this.MLabel_Evidences.Size = new System.Drawing.Size(101, 19);
            this.MLabel_Evidences.TabIndex = 9;
            this.MLabel_Evidences.Text = "Evidence Found";
            this.MLabel_Evidences.Visible = false;
            // 
            // MButton_Exit
            // 
            this.MButton_Exit.Location = new System.Drawing.Point(613, 674);
            this.MButton_Exit.Name = "MButton_Exit";
            this.MButton_Exit.Size = new System.Drawing.Size(75, 23);
            this.MButton_Exit.TabIndex = 10;
            this.MButton_Exit.Text = "Exit";
            this.MButton_Exit.Click += new System.EventHandler(this.MButton_Exit_Click);
            // 
            // MPanel_LevelPicker
            // 
            this.MPanel_LevelPicker.Controls.Add(this.MButton_Start);
            this.MPanel_LevelPicker.Controls.Add(this.MTrackBar_ChooseLevel);
            this.MPanel_LevelPicker.Controls.Add(this.MLabel_ChooseALevel);
            this.MPanel_LevelPicker.Controls.Add(this.MLabel_BrowseForLevel);
            this.MPanel_LevelPicker.Controls.Add(this.MButton_LevelBrowse);
            this.MPanel_LevelPicker.HorizontalScrollbarBarColor = true;
            this.MPanel_LevelPicker.HorizontalScrollbarHighlightOnWheel = false;
            this.MPanel_LevelPicker.HorizontalScrollbarSize = 10;
            this.MPanel_LevelPicker.Location = new System.Drawing.Point(510, 341);
            this.MPanel_LevelPicker.Name = "MPanel_LevelPicker";
            this.MPanel_LevelPicker.Size = new System.Drawing.Size(291, 276);
            this.MPanel_LevelPicker.TabIndex = 2;
            this.MPanel_LevelPicker.VerticalScrollbarBarColor = true;
            this.MPanel_LevelPicker.VerticalScrollbarHighlightOnWheel = false;
            this.MPanel_LevelPicker.VerticalScrollbarSize = 10;
            // 
            // MLabel_BrowseForLevel
            // 
            this.MLabel_BrowseForLevel.AutoSize = true;
            this.MLabel_BrowseForLevel.Location = new System.Drawing.Point(64, 191);
            this.MLabel_BrowseForLevel.Name = "MLabel_BrowseForLevel";
            this.MLabel_BrowseForLevel.Size = new System.Drawing.Size(160, 19);
            this.MLabel_BrowseForLevel.TabIndex = 4;
            this.MLabel_BrowseForLevel.Text = "or browse for a level file...";
            // 
            // MLabel_ChooseALevel
            // 
            this.MLabel_ChooseALevel.AutoSize = true;
            this.MLabel_ChooseALevel.FontSize = MetroFramework.MetroLabelSize.Tall;
            this.MLabel_ChooseALevel.FontWeight = MetroFramework.MetroLabelWeight.Bold;
            this.MLabel_ChooseALevel.Location = new System.Drawing.Point(64, 23);
            this.MLabel_ChooseALevel.Name = "MLabel_ChooseALevel";
            this.MLabel_ChooseALevel.Size = new System.Drawing.Size(144, 25);
            this.MLabel_ChooseALevel.TabIndex = 5;
            this.MLabel_ChooseALevel.Text = "Choose a Level!";
            // 
            // MTrackBar_ChooseLevel
            // 
            this.MTrackBar_ChooseLevel.BackColor = System.Drawing.Color.Transparent;
            this.MTrackBar_ChooseLevel.Location = new System.Drawing.Point(58, 59);
            this.MTrackBar_ChooseLevel.Maximum = 3;
            this.MTrackBar_ChooseLevel.Minimum = 1;
            this.MTrackBar_ChooseLevel.Name = "MTrackBar_ChooseLevel";
            this.MTrackBar_ChooseLevel.Size = new System.Drawing.Size(155, 25);
            this.MTrackBar_ChooseLevel.TabIndex = 6;
            this.MTrackBar_ChooseLevel.Text = "metroTrackBar1";
            this.MTrackBar_ChooseLevel.Value = 1;
            this.MTrackBar_ChooseLevel.Scroll += new System.Windows.Forms.ScrollEventHandler(this.MTrackBar_ChooseLevel_Scroll);
            // 
            // MButton_Start
            // 
            this.MButton_Start.Location = new System.Drawing.Point(93, 90);
            this.MButton_Start.Name = "MButton_Start";
            this.MButton_Start.Size = new System.Drawing.Size(75, 23);
            this.MButton_Start.TabIndex = 7;
            this.MButton_Start.Text = "Start";
            this.MButton_Start.Click += new System.EventHandler(this.MButton_Start_Click);
            // 
            // Form_Game
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(1280, 720);
            this.Controls.Add(this.MPanel_LevelPicker);
            this.Controls.Add(this.MButton_Exit);
            this.Controls.Add(this.MLabel_Evidences);
            this.Controls.Add(this.Label_GameEnd);
            this.Controls.Add(this.MTextBox_Description);
            this.Controls.Add(this.MLabel_Title);
            this.Controls.Add(this.MLabel_Guesses);
            this.Controls.Add(this.GridButtonFontTemplate);
            this.Controls.Add(this.MLabel_Messenger);
            this.Controls.Add(this.MTextBox_Messenger);
            this.Controls.Add(this.MPanel_Grid);
            this.Controls.Add(this.MPanel_Evidence);
            this.Name = "Form_Game";
            this.Text = "Analysis && Investigation: ";
            this.FormClosing += new System.Windows.Forms.FormClosingEventHandler(this.Form_SampleGame_FormClosing);
            ((System.ComponentModel.ISupportInitialize)(this.MStyleManager_Game)).EndInit();
            this.MPanel_LevelPicker.ResumeLayout(false);
            this.MPanel_LevelPicker.PerformLayout();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private MetroFramework.Components.MetroStyleManager MStyleManager_Game;
        private MetroFramework.Controls.MetroTextBox MTextBox_Messenger;
        private MetroFramework.Controls.MetroLabel MLabel_Messenger;
        private MetroFramework.Controls.MetroPanel MPanel_Grid;
        private System.Windows.Forms.OpenFileDialog FileDialog_LevelSelect;
        private MetroFramework.Controls.MetroButton MButton_LevelBrowse;
        private System.Windows.Forms.Button GridButtonFontTemplate;
        private MetroFramework.Controls.MetroLabel MLabel_Guesses;
        private MetroFramework.Controls.MetroLabel MLabel_Title;
        private MetroFramework.Controls.MetroTextBox MTextBox_Description;
        private System.Windows.Forms.Label Label_GameEnd;
        private MetroFramework.Controls.MetroPanel MPanel_Evidence;
        private MetroFramework.Controls.MetroLabel MLabel_Evidences;
        private MetroFramework.Controls.MetroButton MButton_Exit;
        private MetroFramework.Controls.MetroPanel MPanel_LevelPicker;
        private MetroFramework.Controls.MetroLabel MLabel_ChooseALevel;
        private MetroFramework.Controls.MetroLabel MLabel_BrowseForLevel;
        private MetroFramework.Controls.MetroTrackBar MTrackBar_ChooseLevel;
        private MetroFramework.Controls.MetroButton MButton_Start;
    }
}