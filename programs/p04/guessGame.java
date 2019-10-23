
/**
 * Program 4: Java Number Guessing Game
 * Author: Jeremy Glebe
 * Date: 10/23/2019
 * Professor: Dr. Johnson
 * Description: Plays a number guessing game with the user. Key is between
 * 1 & 100. The program tracks how many guesses user has made.
 */

import java.util.Random;

import javax.swing.BoxLayout;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JTextField;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class guessGame {

    // game logic stuff
    private static int key;
    private static int numGuesses = 0;

    // frame & display stuff
    private static JFrame frame;
    private static JLabel guessLabel;
    private static JLabel hintLabel;
    private static JTextField input;
    private static JButton submit;

    /**
     * Main driver of the program. Calls everything else.
     * 
     * @param args command line arguments, nothing from this is used.
     */
    public static void main(String args[]) {

        // handles all the logic of initially drawing the frame and components
        // this just handles visual stuff, everything else is found in main or
        // submitHandler
        initFrame();

        // random number generator
        Random rnd = new Random();
        key = rnd.nextInt(100) + 1;

        // beginning of the full game log printed to the console
        // just for anyone that wants to look at each of the guesses
        System.out.print("I am thinking of a number between 1 and 100. ");
        System.out.println("Try to guess the number.");

        // creating a function to run when the button is clicked
        submit.addActionListener(new ActionListener() {
            // this function will just call our class's handler
            public void actionPerformed(ActionEvent e) {
                submitHandler();
            }
        });
    }

    /**
     * submitHandler Functionality for the submit button when it is clicked.
     * Determines if user wins & what kind of hint to provide user.
     * 
     * @return void
     */
    private static void submitHandler() {
        // print the guess to the game log in the console for anyone that wants
        // to see a detailed guess-by-guess log of the game
        System.out.println(input.getText());
        // increase the number of guesses and update the guess counter text
        guessLabel.setText("# of Guesses: " + ++numGuesses);
        // parse the input text to get a numeric result
        int g = -1;
        try {
            g = Integer.parseInt(input.getText());
        } catch (Exception e) {
            g = -1;
        }
        // If you guessed the correct number
        if (g == key) {
            hintLabel.setText("Congrats, you win! (after " + numGuesses + " tries)");
            input.setEnabled(false);
            submit.setEnabled(false);
            // print the win message to the game log in the console for anyone
            // that wants to see a detailed guess-by-guess log of the game
            System.out.println("You guessed the number in " + numGuesses + " tries.");
        } else if (g < key) {
            // hint if they need to guess higher
            hintLabel.setText("Higher...");
            // print the hint to the game log in the console for anyone that
            // wants to see a detailed guess-by-guess log of the game
            System.out.println("Higher");
        } else if (g > key) {
            // hint if they need to guess lower
            hintLabel.setText("Lower...");
            // print the hint to the game log in the console for anyone that
            // wants to see a detailed guess-by-guess log of the game
            System.out.println("Lower");
        }
    }

    /**
     * initFrame Creates the initial frame object and adds all of the components to
     * it. (without functionality) Sets size and general display properties.
     * 
     * @return void
     */
    private static void initFrame() {
        // create a frame and its title
        frame = new JFrame("Guess-Me");
        // make it so exiting the frame will exit the program
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        // make it so components are automatically positioned somewhat nicely
        frame.getContentPane().setLayout(new BoxLayout(frame.getContentPane(), BoxLayout.Y_AXIS));

        // reate an inner panel for the instructions (to center it)
        JPanel instrPanel = new JPanel();
        instrPanel.setLayout(new BoxLayout(instrPanel, BoxLayout.X_AXIS));
        // create a label with the game instructions
        JLabel instructions = new JLabel("Guess a number between 1 & 100.");
        // add instructions
        instrPanel.add(instructions);
        frame.add(instrPanel);

        // create an inner panel for the text input (to center it)
        JPanel textpanel = new JPanel();
        textpanel.setLayout(new BoxLayout(textpanel, BoxLayout.X_AXIS));
        // initialize the input field where the user types a guess
        input = new JTextField(5);
        input.setMaximumSize(input.getPreferredSize());
        // add text input field
        textpanel.add(input);
        frame.add(textpanel);

        // reate an inner panel for the guess counter (to center it)
        JPanel guessPanel = new JPanel();
        guessPanel.setLayout(new BoxLayout(guessPanel, BoxLayout.X_AXIS));
        // create a label with the number of guesses
        guessLabel = new JLabel("# of Guesses: 0");
        // add guess label
        guessPanel.add(guessLabel);
        frame.add(guessPanel);

        // create an inner panel for the submit button (to center it)
        JPanel spanel = new JPanel();
        spanel.setLayout(new BoxLayout(spanel, BoxLayout.X_AXIS));
        // create a button to submit the user's guess
        submit = new JButton("Submit Guess");
        // add submit button
        spanel.add(submit);
        frame.add(spanel);

        // create an inner panel for the hint/win text (to center it)
        JPanel hintPanel = new JPanel();
        hintPanel.setLayout(new BoxLayout(hintPanel, BoxLayout.X_AXIS));
        // create a label with hint or victory message
        hintLabel = new JLabel("...");
        // add hint label
        hintPanel.add(hintLabel);
        frame.add(hintPanel);

        // pack the frame content
        frame.pack();
        // set size of the frame
        frame.setSize(250, 150);
        // do not allow the frame to be resized
        frame.setResizable(false);
        // display the frame
        frame.setVisible(true);
    }

}