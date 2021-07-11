/** GameFrame.java
 * 
 * Hidden Doors is a text-driven, 1-Bit RPG I'm making for a GUI project
 * in Contemporary Programming Languages.
 * 
 * This file contains the main class where game-related data is stored
 * and communication between game stages is maintained.
 * 
 * Author: Jeremy Glebe
 * Professor: Dr. Tina Johnson
 * Due-Date: 
 */
package hiddendoors;

import hiddendoors.actors.Player;

/**
 * Main game-driver class which launches all stages and maintains
 * communication between them.
 * @author Jeremy Glebe
 */
public class GameFrame extends javax.swing.JFrame {
    
    public Player player;
    public boolean fullscreen = false;
    
    /**
     * Creates new form GameFrame
     */
    public GameFrame() {
        // Create the player object
        player = new Player();

        // Identifying information
        setTitle("Hidden Doors");
        setName("GameFrame"); // NOI18N

        // Frame usage setup
        setDefaultCloseOperation(javax.swing.WindowConstants.EXIT_ON_CLOSE);
        setCursor(new java.awt.Cursor(java.awt.Cursor.DEFAULT_CURSOR));
        
        // Size bounds for the frame
        setMaximumSize(new java.awt.Dimension(1920, 1080));
        setMinimumSize(new java.awt.Dimension(640, 360));
        // User can't manually resize, done in the options menu
        setResizable(false);


        // Layout management
        getContentPane().setLayout(new java.awt.GridBagLayout());
        getContentPane().setMinimumSize(new java.awt.Dimension(640,360));

        // Pack the frame
        pack();
    }

    /**
     * Sets the current stage of the game.
     * Stages should only include fully isolated screens that will not be
     * frequently opened/closed. Think levels, not inventories.
     * @param stage the GameStage object we should change to
     */
    public void SetStage(GameStage stage){
        // GameStage inherits from panel, so we just change the content
        // pane to change the stage.
        this.setContentPane(stage);
        // Update the frame's display
        this.setVisible(true);
    }

}
