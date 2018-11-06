/* Analysis & Investigation Game
 * Author: Jeremy Glebe
 * Date: 10/24/18
 * Description: A game in which the player investigates a crime looking for
 *     various samples of evidence or anomalies.
 */
using System;
using System.Drawing;

namespace game_version_02
{
    public partial class Form_MainMenu : MetroFramework.Forms.MetroForm
    {
        //Main menu's Game Mode Select texts
        protected string[] gameModeTexts;
        //Main menu's Game Mode Select image files
        protected string[] gameModeImgs;

        public Form_MainMenu()
        {
            InitializeComponent();
            //Initialize the style manager
            this.StyleManager = MStyleManager_Menu;
            //Set the gamemode description text for the main menu
            SetText();
            //Set the image for the main menu
            SetImage();
            //Show the form, sometimes it instantly minimizes...
            this.Show();
        }

        private void MTrackBar_GameSelect_ValueChanged(object sender, EventArgs e)
        {
            SetText();
            SetImage();
        }

        private void MButton_StartGame_Click(object sender, EventArgs e)
        {
            if ((MTrackBar_GameSelect.Value / 100) > 0
                && (MTrackBar_GameSelect.Value / 100) < 5)
            {
                this.Hide();
                Form_Game game = new Form_Game(
                    this,
                    MTrackBar_GameSelect.Value / 100
                    );
                game.Show();
            }
        }

        private void SetImage()
        {
            string img;
            switch (MTrackBar_GameSelect.Value / 100)
            {
                case 1:
                    img = "./Resources/fingerprint.png";
                    break;
                case 2:
                    img = "./Resources/crime_scene.png";
                    break;
                case 3:
                    img = "./Resources/blood_splatter.png";
                    break;
                default:
                    img = "./Resources/detective.png";
                    break;
            }
            PictureBox_GameModeImage.Image = Image.FromFile(img);
        }

        private void SetText()
        {
            string msg;
            switch (MTrackBar_GameSelect.Value / 100)
            {
                case 1:
                    msg = "Break out the magnifying glass. Analyze a "
                + "surface for fingerprints";
                    break;
                case 2:
                    msg = "Go boots-on-the-ground as a detective at the "
                + "crime scene. Collect DNA samples in an enclosed room.";
                    break;
                case 3:
                    msg = "Play as a forensics analyst in the lab. Examin"
                + "e a blood sample under the microscope for anomalies.";
                    break;
                default:
                    msg = "Scroll to Select Game Mode...";
                    break;
            }
            MLabel_GameSelectText.Text = msg;
        }

        private void MButton_Exit_Click(object sender, EventArgs e)
        {
            this.Close();
        }
    }
}
