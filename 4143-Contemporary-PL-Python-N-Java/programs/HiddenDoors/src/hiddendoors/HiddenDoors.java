/** GameStage.java
 * 
 * Hidden Doors is a text-driven, 1-Bit RPG I'm making for a GUI project
 * in Contemporary Programming Languages.
 * 
 * This file is only a launching point for the GUI forms that make up the
 * game.
 * 
 * Author: Jeremy Glebe
 * Professor: Dr. Tina Johnson
 * Due-Date: 
 */
package hiddendoors;

import hiddendoors.stages.StageMainMenu;

/**
 * Launching point for the Hidden Doors game.
 * @author Jeremy Glebe
 */
public class HiddenDoors {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        // Create the game's main frame
        GameFrame game  = new GameFrame();
        // Show the frame to the user
        game.setVisible(true);
        // Sets the starting stage (main menu)
        game.SetStage(new StageMainMenu(game));
    }
    
}
