package hiddendoors.controls;

import java.awt.Dimension;
import java.awt.event.ComponentAdapter;
import java.awt.event.ComponentEvent;
import java.awt.GridBagConstraints;
import java.awt.GridBagLayout;
import java.util.ArrayList;
import javax.swing.JLabel;
import javax.swing.SwingConstants;

import hiddendoors.GameStage;
import hiddendoors.actors.Player;

public class PanelHealth extends javax.swing.JPanel {

    GameStage stage;
    Player player;
    ArrayList<JLabel> heart_labels;

    /**
     * Creates new form PanelHealth
     */
    public PanelHealth(GameStage stage, Player player) {
        // Set variables
        this.player = player;
        this.stage = stage;
        heart_labels = new ArrayList<JLabel>();
        initHeartLabels();

        // Set panel visuals
        setBackground(new java.awt.Color(0, 0, 0));
        setForeground(new java.awt.Color(255, 255, 255));
        setBorder(new javax.swing.border.LineBorder(new java.awt.Color(255, 255, 255), 3, true));

        // Set panel size properties
        setMinimumSize(new Dimension(295, 40));
        setPreferredSize(new Dimension(295, 40));

        // Use the GridBag Layout
        this.setLayout(new GridBagLayout());

        // Event handlers
        addComponentListener(new ComponentAdapter() {
            public void componentResized(ComponentEvent componentEvent) {
                resizedHandler();
            }
        });
    }

    void resizedHandler() {
        for (int i = 0; i < heart_labels.size(); i++) {
            // Make a temporary reference to the heart
            JLabel heart = heart_labels.get(i);
            // Get the appropriate width and height for each label
            int h = (int)(this.getHeight() * .5);
            int w = this.getWidth() / player.maxhp;
            heart.setMaximumSize(new Dimension(1200, 1200));
            heart.setMinimumSize(new Dimension(w, h));
            heart.setPreferredSize(new Dimension(w, h));
            heart.setSize(new Dimension(w, h));
            // Set the icon and scale it properly
            heart.setIcon(stage.LabelImage("/resources/icons/heart.png", heart, true));
        }
    }

    void initHeartLabels() {
        for (int i = 0; i < player.maxhp; i++) {
            // Create the heart and make a temporary reference to it
            JLabel heart = new JLabel();
            // Set some basic properties
            heart.setHorizontalAlignment(SwingConstants.CENTER);
            heart.setVisible(true);
            // Add the label to the panel
            heart_labels.add(heart);
            this.add(heart);

            // Setting each hearts position in the grid
            GridBagConstraints constraints = new GridBagConstraints();
            constraints.gridx = i;
            constraints.gridy = 0;
            constraints.gridwidth = 1;
            constraints.fill = GridBagConstraints.BOTH;
            constraints.weightx = 1.0 / player.maxhp;
            constraints.weighty = 1.0;
            add(heart, constraints);
        }
    }

}
