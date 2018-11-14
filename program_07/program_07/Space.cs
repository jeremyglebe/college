/* Program 07: Animated Graphics
 * Author: Jeremy Glebe
 * Date: 11/14/2018
 * File: Space.cs
 * Desc: A "space panel" that inherits from a regular panel. It handles the
 *     animation of the rocket and has an overridden OnPaint method.
 */

using System.Drawing;
using System.Windows.Forms;

namespace program_07
{
    /// <summary>
    /// Space Panel that comes with some space-y graphics when it paints
    /// </summary>
    class Space : Panel
    {
        //Variables for the picture
        Rectangle planet;
        Point shipPos;
        bool init = false;
        int flameFrame = -1;

        /// <summary>
        /// Overridden OnPaint taht creates the objects of a Space Panel
        /// </summary>
        /// <param name="e"></param>
        protected override void OnPaint(PaintEventArgs e)
        {
            if (!init) { _initObjects(); }
            base.OnPaint(e);
            //Brushes
            SolidBrush black = new SolidBrush(Color.Black);
            SolidBrush seagreen = new SolidBrush(Color.SeaGreen);
            //Space is like a panel, but dark also a dark and spooky void
            e.Graphics.FillRectangle(black, 0, 0, this.Width, this.Height);
            //Draw Home Planet
            e.Graphics.FillEllipse(seagreen, planet);
            //Draw the rocket ship
            DrawRocket(e, 1.5, shipPos.X, shipPos.Y);
            //Draw the "flames"
            DrawFlame(e, 1.5);
        }

        /// <summary>
        /// Progresses the animation frame of the Space Panel by one.
        /// </summary>
        public void NextFrame()
        {
            if (shipPos.Y < (int)(.1 * this.Height) && planet.Y <= this.Height)
            {
                planet.Y += 5;
            }
            else if (shipPos.Y >= (int)(.1 * this.Height))
            {
                shipPos.Y -= 5;
            }
            //Control the flame
            flameFrame = (flameFrame + 1) % 5;
        }

        /// <summary>
        /// Draws a rocket ship on a space panel
        /// </summary>
        /// <param name="e"></param>
        /// <param name="scale"></param>
        /// <param name="x"></param>
        /// <param name="y"></param>
        private void DrawRocket(PaintEventArgs e, double scale, int x, int y)
        {
            //Declare colorful brushes
            SolidBrush black = new SolidBrush(Color.Black);
            SolidBrush white = new SolidBrush(Color.White);
            SolidBrush gray = new SolidBrush(Color.Gray);
            SolidBrush red = new SolidBrush(Color.Red);
            //Create the spaceship main body
            Rectangle body =
                new Rectangle(x + ((int)(60 * scale) / 2),
                y + (int)(.45 * (int)(100 * scale)),
                (int)(60 * scale), (int)(100 * scale));
            e.Graphics.FillRectangle(white, body);
            //Create the window of the ship
            Rectangle window = new Rectangle(body.X + (body.Width / 4),
                body.Y + (body.Height / 8), body.Width / 2, body.Width / 2);
            e.Graphics.FillRectangle(gray, window);
            //Create the triangle at the end of the ship
            Point[] point = new Point[3];
            point[0] = new Point(body.X, body.Y);
            point[1] = new Point(body.X + body.Width, body.Y);
            point[2] = new Point(body.X + (body.Width / 2), (int)(body.Y - (.45 * body.Height)));
            e.Graphics.FillPolygon(red, point);
            //Left and right wings
            Point[] lWing = new Point[3];
            lWing[0] = new Point(body.X, body.Y + body.Height);
            lWing[1] = new Point(body.X, body.Y + (int)(body.Height - (.45 * body.Height)));
            lWing[2] = new Point(body.X - (body.Width / 2), body.Y + body.Height);
            Point[] rWing = new Point[3];
            rWing[0] = new Point(body.X + body.Width, body.Y + body.Height);
            rWing[1] = new Point(body.X + body.Width, body.Y + (int)(body.Height - (.45 * body.Height)));
            rWing[2] = new Point(body.X + body.Width + (body.Width / 2), body.Y + body.Height);
            e.Graphics.FillPolygon(red, lWing);
            e.Graphics.FillPolygon(red, rWing);
            //Write the emblem 
            FontFamily family = new FontFamily("Arial");
            Font emblem = new Font(family, 14.0f, FontStyle.Bold);
            e.Graphics.DrawString("HOME", emblem, black, body.X + (int)(.15 * body.Width), body.Y + (int)(.55 * body.Height));
        }

        /// <summary>
        /// Draws the flame of a rocket ship on a space panel
        /// </summary>
        /// <param name="e"></param>
        /// <param name="scale"></param>
        private void DrawFlame(PaintEventArgs e, double scale)
        {
            switch (flameFrame)
            {
                case 0:
                    Image frame = program_07.Properties.Resources._000;
              
                    e.Graphics.DrawImage(frame, shipPos.X + (int)(scale * 30), shipPos.Y + (int)(scale * 145), (int)(scale * 60), (int)(scale * 60));
                    break;
                case 1:
                    frame = program_07.Properties.Resources._001;
                    e.Graphics.DrawImage(frame, shipPos.X + (int)(scale * 30), shipPos.Y + (int)(scale * 145), (int)(scale * 60), (int)(scale * 60));
                    break;
                case 2:
                    frame = program_07.Properties.Resources._002;
                    e.Graphics.DrawImage(frame, shipPos.X + (int)(scale * 30), shipPos.Y + (int)(scale * 145), (int)(scale * 60), (int)(scale * 60));
                    break;
                case 3:
                    frame = program_07.Properties.Resources._003;
                    e.Graphics.DrawImage(frame, shipPos.X + (int)(scale * 30), shipPos.Y + (int)(scale * 145), (int)(scale * 60), (int)(scale * 60));
                    break;
                case 4:
                    frame = program_07.Properties.Resources._004;
                    e.Graphics.DrawImage(frame, shipPos.X + (int)(scale * 30), shipPos.Y + (int)(scale * 145), (int)(scale * 60), (int)(scale * 60));
                    break;
                default:
                    break;
            }
        }

        /// <summary>
        /// Initializes the location of all the graphics in the space panel.
        /// Must be done after constructor due to the timing of the first
        /// constructor being after the first paint.
        /// </summary>
        private void _initObjects()
        {
            //Initial bounds of the planet
            planet = new Rectangle((int)(.08 * this.Width),
                (int)(.75 * this.Height),
                (int)(.85 * this.Width),
                (int)(.85 * this.Width));
            //Initial point of the rocket
            shipPos = new Point((int)(.37 * this.Width), (int)(.45 * this.Height));
            init = true;
        }
    }
}
