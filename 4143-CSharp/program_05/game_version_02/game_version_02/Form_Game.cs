/* Analysis & Investigation Game
 * Author: Jeremy Glebe
 * Date: 10/24/18
 * Description: A game in which the player investigates a crime looking for
 *     various samples of evidence or anomalies.
 */
 using System;
using System.ComponentModel;
using System.Drawing;
using System.Linq;
using System.Windows.Forms;
using System.IO;
using Analyzers;

namespace game_version_02
{
    public partial class Form_Game : MetroFramework.Forms.MetroForm
    {
        private Analyzer analyzer;
        private MetroFramework.Forms.MetroForm previous;
        private int gameMode;
        private string levelFile;
        private string[] evidenceImages;

        public Form_Game(MetroFramework.Forms.MetroForm p, int gm)
        {
            InitializeComponent();
            previous = p;
            gameMode = gm;
            InitGameMode(gameMode);
        }

        private void Form_SampleGame_FormClosing(object sender, FormClosingEventArgs e)
        {
            previous.Show();
        }

        private void InitGameMode(int gm)
        {
            //Set a window text
            switch (gm)
            {
                case 1:
                    this.Text += "Fingerprint Analyzer";
                    evidenceImages = new string[] {
                        "./Resources/ev03.png"
                    };
                    levelFile = "./Levels/PrintAnalyzer/Level_1.xml";
                    break;
                case 2:
                    this.Text += "Search Analyzer";
                    evidenceImages = new string[] {
                        "./Resources/ev01.png",
                        "./Resources/ev02.png",
                        "./Resources/ev03.png",
                        "./Resources/evs04.png",
                        "./Resources/evs05.png",
                        "./Resources/evs06.png",
                        "./Resources/evs07.png",
                    };
                    levelFile = "./Levels/SearchAnalyzer/Level_1.xml";
                    break;
                case 3:
                    this.Text += "Blood Analyzer";
                    evidenceImages = new string[] {
                        "./Resources/evs05.png"
                    };
                    levelFile = "./Levels/BloodAnalyzer/Level_1.xml";
                    break;
            }
        }

        private void MTextBox_Messenger_Enter(object sender, EventArgs e)
        {
            ActiveControl = MLabel_Messenger;
        }

        private void LevelSelect()
        {
            FileDialog_LevelSelect.InitialDirectory = Path.GetDirectoryName(Application.ExecutablePath) + "\\Levels";
            FileDialog_LevelSelect.ShowDialog();
        }

        private void FileDialog_LevelSelect_FileOk(object sender, CancelEventArgs e)
        {
            //Set the level file
            levelFile = FileDialog_LevelSelect.FileName;
            LevelStart();
        }

        private void LevelStart()
        {
            //Initialize the analyzer with the selected file
            switch (gameMode)
            {
                case 1:
                    analyzer = new PrintAnalyzer(levelFile);
                    MLabel_Guesses.Text = "0  guesses made.";
                    break;
                case 2:
                    analyzer = new SearchAnalyzer(levelFile);
                    MLabel_Guesses.Text = "0  steps taken.";
                    break;
                case 3:
                    analyzer = new BloodAnalyzer(levelFile);
                    MLabel_Guesses.Text = "0  guesses made.";
                    break;
            }

            if (analyzer.ValidGame())
            {
                //Create the game grid of buttons
                CreateGameGrid();
                //Show Main Controls
                MPanel_Grid.Visible = true;
                ConfigureEvidencePanel();
                MTextBox_Messenger.Visible = true;
                MLabel_Messenger.Visible = true;
                MLabel_Guesses.Visible = true;
                MLabel_Title.Visible = true;
                if(gameMode != 1)
                {
                    MLabel_Evidences.Visible = true;
                }
                MTextBox_Description.Visible = true;
                //Remove Level Select Controls
                MPanel_LevelPicker.Visible = false;
                //Adjust the title
                MLabel_Title.Text += analyzer.Name;
                //Fill in the description
                MTextBox_Description.Text = analyzer.Description;
            }
            else
            {
                MessageBox.Show("Invalid level selection!\n" +
                    "The game cannot be played using this level data...");
            }

            //Bring the window back up, sometimes it disappears
            this.Show();
            ProcessDialog(0);
        }

        private void MButton_LevelBrowse_Click(object sender, EventArgs e)
        {
            LevelSelect();
        }

        private Button[][] gameButtons;
        private void CreateGameGrid()
        {
            int rows = analyzer.Rows;
            int cols = analyzer.Cols;
            gameButtons = new Button[rows][];
            for (int r = 0; r < rows; r++)
            {
                gameButtons[r] = new Button[cols];
                for (int c = 0; c < cols; c++)
                {
                    //Create a button
                    gameButtons[r][c] = new Button();
                    //Add the button to the panel
                    MPanel_Grid.Controls.Add(gameButtons[r][c]);
                    //Change the text
                    gameButtons[r][c].Text = "" + analyzer.Interpret(r, c);
                    //Set a padding between edges of the panel and the buttons
                    int paddingW = (int)(.15 * MPanel_Grid.Width);
                    int paddingH = (int)(.15 * MPanel_Grid.Height);
                    //Change the size to scale with number of buttons
                    gameButtons[r][c].Width = (MPanel_Grid.Width - paddingW) / cols;
                    gameButtons[r][c].Height = (MPanel_Grid.Height - paddingH) / rows;
                    //Change the location
                    gameButtons[r][c].Location = new Point(
                        MPanel_Grid.Location.X + (c * gameButtons[r][c].Width),
                        MPanel_Grid.Location.Y + (r * gameButtons[r][c].Height)
                    );

                    //Adjust the font of the button
                    gameButtons[r][c].Font = GridButtonFontTemplate.Font;
                    int fSize = (int)(.60 * ((gameButtons[r][c].Width + gameButtons[r][c].Height) / 2));
                    gameButtons[r][c].Font = new Font(gameButtons[r][c].Font.FontFamily, fSize);
                    gameButtons[r][c].TextAlign = ContentAlignment.MiddleCenter;

                    //Stylize the button
                    gameButtons[r][c].ForeColor = Color.LimeGreen;
                    gameButtons[r][c].BackColor = Color.Black;
                    gameButtons[r][c].FlatStyle = FlatStyle.Flat;
                    gameButtons[r][c].FlatAppearance.BorderColor = Color.Green;
                    gameButtons[r][c].FlatAppearance.BorderSize = 1;

                    //Set the buttons click event handler
                    gameButtons[r][c].Click += GridButtonClicked;
                    //Set the name (which is also how we'll get each buttons
                    //coordinates)
                    gameButtons[r][c].Name = "Button_" + r.ToString() + "_" + c.ToString();
                }
            }
        }

        private void GridButtonClicked(object sender, EventArgs e)
        {
            //Get the sender as a button
            Button b = (Button)sender;
            //Get the row and column of the button
            int r = int.Parse(b.Name.Split(new char[] { '_' })[1]);
            int c = int.Parse(b.Name.Split(new char[] { '_' })[2]);
            char searched = analyzer.Guess(r, c);
            if (searched == 'X')
            {
                Random rnd = new Random();
                evidences[evCurRow][evCurCol].Image = Image.FromFile(
                    evidenceImages[rnd.Next(evidenceImages.Length)]);
                IncrEvs();
            }
            UpdateGameGrid();
            if (gameMode == 2)
            {
                MLabel_Guesses.Text = analyzer.Guesses + "  out of  "
                    + analyzer.MaxGuesses + "  steps taken.";
            }
            else
            {
                MLabel_Guesses.Text = analyzer.Guesses + "  out of  "
                   + analyzer.MaxGuesses + "  guesses made.";
            }
            if (analyzer.GameEnd)
            {
                Label_GameEnd.Visible = true;
                Label_GameEnd.BringToFront();
                if (analyzer.Victory)
                {
                    Label_GameEnd.Text = "YOU WIN!";
                }
                else
                {
                    Label_GameEnd.Text = "YOU LOSE!";
                }
            }
        }

        private void UpdateGameGrid()
        {
            foreach (Button b
                in MPanel_Grid.Controls.OfType<Button>())
            {
                //Get the row and column of the button
                int r = int.Parse(b.Name.Split(new char[] { '_' })[1]);
                int c = int.Parse(b.Name.Split(new char[] { '_' })[2]);
                b.Text = "" + analyzer.Interpret(r, c);
            }
        }

        //Integers representing the current row and column of the evidence panel
        private int evCurRow, evCurCol;
        private PictureBox[][] evidences;
        private void ConfigureEvidencePanel()
        {
            if (gameMode != 1)
            {
                evCurRow = 0;
                evCurCol = 0;
                int total = analyzer.Goal;
                int sideLength = (int)Math.Round(Math.Sqrt(total));
                evidences = new PictureBox[sideLength][];
                int k = 0;
                for (int i = 0; i < sideLength; i++)
                {
                    evidences[i] = new PictureBox[sideLength];
                    for (int j = 0; j < sideLength; j++)
                    {
                        if (k < total)
                        {
                            evidences[i][j] = new PictureBox();
                            //Add the button to the panel
                            MPanel_Evidence.Controls.Add(evidences[i][j]);
                            //
                            evidences[i][j].Size = new Size(
                                (int)(0.85 * MPanel_Evidence.Width / sideLength),
                                (int)(0.85 * MPanel_Evidence.Height / sideLength));
                            evidences[i][j].Location = new Point(//0,0
                                j * evidences[i][j].Width + (int)(.05 * MPanel_Evidence.Width),
                                i * evidences[i][j].Height + (int)(.05 * MPanel_Evidence.Height)
                            );
                            evidences[i][j].Image = Image.FromFile("./Resources/icon_x.png");
                            evidences[i][j].SizeMode = PictureBoxSizeMode.StretchImage;
                            k++;
                        }
                    }
                }
                MPanel_Evidence.Visible = true;
            }
        }

        private void MButton_Exit_Click(object sender, EventArgs e)
        {
            this.Close();
        }

        private void MButton_Start_Click(object sender, EventArgs e)
        {
            LevelStart();
        }

        private void MTrackBar_ChooseLevel_Scroll(object sender, ScrollEventArgs e)
        {
            levelFile = "./Levels/";
            switch (gameMode)
            {
                case 1:
                    levelFile += "PrintAnalyzer/";
                    break;
                case 2:
                    levelFile += "SearchAnalyzer/";
                    break;
                case 3:
                    levelFile += "BloodAnalyzer/";
                    break;
            }
            int val = MTrackBar_ChooseLevel.Value;
            switch (val)
            {
                case 1:
                    levelFile += "Level_1.xml";
                    break;
                case 2:
                    levelFile += "Level_2.xml";
                    break;
                default:
                    levelFile += "Level_3.xml";
                    break;
            }
        }

        private void IncrEvs()
        {
            if (evCurCol < evidences.Length - 1)
            {
                evCurCol++;
            }
            else
            {
                evCurCol = 0;
                evCurRow++;
            }
        }

        private void RandomDialog()
        {
            Random rnd = new Random();
            int i = rnd.Next(analyzer.Dialogs.Count());
            ProcessDialog(i);
        }
        private void ProcessDialog(int i)
        {
            foreach (string line in analyzer.Dialogs[i])
            {
                MTextBox_Messenger.Text += "\r\n" + line;
            }
        }
    }
}
