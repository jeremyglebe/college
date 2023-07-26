/** GameStage.java
 * 
 * Hidden Doors is a text-driven, 1-Bit RPG I'm making for a GUI project
 * in Contemporary Programming Languages.
 * 
 * This file contains an inheritable class which represents a single
 * stage of the game.
 * 
 * Author: Jeremy Glebe
 * Professor: Dr. Tina Johnson
 * Due-Date: 
 */
package hiddendoors;

import java.awt.Image;

import javax.swing.ImageIcon;
import javax.swing.JLabel;

/** 
 * Class representing a single stage of the game. These hold independent
 * screens such as levels or main menus.
 * @author Jeremy Glebe
 */
public class GameStage extends javax.swing.JPanel {
    
    // Reference to the GameFrame object for communication between stages
    public GameFrame game;

    /**
     * Creates new form GameStage
     */
    public GameStage() {
        // Visual settings
        setBackground(new java.awt.Color(0, 0, 0));
        setForeground(new java.awt.Color(255, 255, 255));
        setCursor(new java.awt.Cursor(java.awt.Cursor.DEFAULT_CURSOR));
        setFont(new java.awt.Font("Consolas", 1, 36)); // NOI18N

        // Control settings
        setFocusable(false);

        // Size and layout settings
        setMaximumSize(new java.awt.Dimension(1920, 1080));
        setMinimumSize(new java.awt.Dimension(640, 360));
        setPreferredSize(new java.awt.Dimension(640, 360));
        setLayout(new java.awt.GridBagLayout());
    }
    
    /**
     * Creates new form GameStage and sets its game object.
     * The GameFrame is stored for communication between stages.
     * @param game GameFrame object to which this stage belongs.
     */
    public GameStage(GameFrame game){
        // Keep a reference to the GameFrame object for communication between
        // stages
        this.game = game;
        
        // Visual settings
        setBackground(new java.awt.Color(0, 0, 0));
        setForeground(new java.awt.Color(255, 255, 255));
        setCursor(new java.awt.Cursor(java.awt.Cursor.DEFAULT_CURSOR));
        setFont(new java.awt.Font("Consolas", 1, 36)); // NOI18N

        // Control settings
        setFocusable(false);

        // Size and layout settings
        setMaximumSize(new java.awt.Dimension(1920, 1080));
        setMinimumSize(new java.awt.Dimension(640, 360));
        setPreferredSize(new java.awt.Dimension(640, 360));
        setLayout(new java.awt.GridBagLayout());
    }

    /**
     * Loads an image from a file, scales it to the size of a label, and
     * then returns the image as an ImageIcon for use in a label.
     * @param file the image file to load
     * @param label the label to scale to
     * @return a scaled ImageIcon
     */
    public ImageIcon LabelImage(String file, JLabel label){
        return LabelImage(file, label, false);
    }

    /**
     * Loads an image from a file, scales it to the size of a label, and
     * then returns the image as an ImageIcon for use in a label.
     * @param file the image file to load
     * @param label the label to scale to
     * @param square whether we should force the Image to a square aspect ratio
     * @return a scaled ImageIcon
     */
    public ImageIcon LabelImage(String file, JLabel label, boolean square){
        int w = label.getSize().width;
        int h = label.getSize().height;
        if (w <= 0){
            w = label.getPreferredSize().width;
        }
        if (h <= 0){
            h = label.getPreferredSize().height;
        }
        if (square){
            if (w > h){
                w = h;
            }else if (h > w){
                h = w;
            }
        }
        ImageIcon icon = new ImageIcon(getClass().getResource(file));
        Image img = icon.getImage().getScaledInstance(w, h, Image.SCALE_DEFAULT);
        icon = new ImageIcon(img);
        return icon;
    }

}
