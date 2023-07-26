package hiddendoors.stages;

import hiddendoors.GameFrame;
import hiddendoors.GameStage;

/**
 * Main menu for the game.
 * 
 * @author Jeremy Glebe
 */
public class StageMainMenu extends GameStage {

    /**
     * Creates new form StageMainMenu
     */
    public StageMainMenu() {
        super();
        initComponents();
    }

    /**
     * Creates new form StageMainMenu
     * 
     * @param game GameFrame object to which this stage belongs.
     */
    public StageMainMenu(GameFrame game) {
        super(game);
        initComponents();
    }

    private void btnPlayMouseClicked(java.awt.event.MouseEvent evt) {
        // Change the game stage
        // game.SetStage(new StageEntrance(game));
        game.SetStage(new StageBattleTutorial(game));
    }

    private void btnOptionsMouseClicked(java.awt.event.MouseEvent evt) {
        System.out.println("Options button clicked!");
        // Change the game stage
        game.SetStage(new StageOptionsMenu(game));
    }

    private void lblDoorComponentResized(java.awt.event.ComponentEvent evt) {
        lblDoor.setIcon(LabelImage("/resources/icons/basic_door.png", lblDoor, true));
    }

    private javax.swing.JButton btnOptions;
    private javax.swing.JButton btnPlay;
    private javax.swing.Box.Filler fillDoorLeft;
    private javax.swing.Box.Filler fillDoorRight;
    private javax.swing.Box.Filler fillOptDown;
    private javax.swing.Box.Filler fillOptLeft;
    private javax.swing.Box.Filler fillOptRight;
    private javax.swing.Box.Filler fillOptUp;
    private javax.swing.Box.Filler fillOuterLeft;
    private javax.swing.Box.Filler fillOuterRight;
    private javax.swing.JLabel lblDoor;
    private javax.swing.JLabel lblTitle;

    /**
     * Initializes the form and its components.
     */
    protected void initComponents() {
        java.awt.GridBagConstraints gridBagConstraints;

        lblTitle = new javax.swing.JLabel();
        btnPlay = new javax.swing.JButton();
        btnOptions = new javax.swing.JButton();
        fillOuterLeft = new javax.swing.Box.Filler(new java.awt.Dimension(140, 250), new java.awt.Dimension(140, 250),
                new java.awt.Dimension(32767, 32767));
        fillOuterRight = new javax.swing.Box.Filler(new java.awt.Dimension(140, 250), new java.awt.Dimension(140, 250),
                new java.awt.Dimension(32767, 32767));
        fillDoorLeft = new javax.swing.Box.Filler(new java.awt.Dimension(120, 110), new java.awt.Dimension(120, 110),
                new java.awt.Dimension(32767, 32767));
        fillDoorRight = new javax.swing.Box.Filler(new java.awt.Dimension(120, 110), new java.awt.Dimension(120, 110),
                new java.awt.Dimension(32767, 32767));
        lblDoor = new javax.swing.JLabel();
        fillOptUp = new javax.swing.Box.Filler(new java.awt.Dimension(320, 10), new java.awt.Dimension(320, 10),
                new java.awt.Dimension(32767, 32767));
        fillOptDown = new javax.swing.Box.Filler(new java.awt.Dimension(140, 40), new java.awt.Dimension(140, 40),
                new java.awt.Dimension(32767, 32767));
        fillOptLeft = new javax.swing.Box.Filler(new java.awt.Dimension(90, 70), new java.awt.Dimension(90, 70),
                new java.awt.Dimension(32767, 32767));
        fillOptRight = new javax.swing.Box.Filler(new java.awt.Dimension(90, 70), new java.awt.Dimension(90, 70),
                new java.awt.Dimension(32767, 32767));

        lblTitle.setBackground(new java.awt.Color(0, 0, 0));
        lblTitle.setFont(new java.awt.Font("NSimSun", 1, 48)); // NOI18N
        lblTitle.setForeground(new java.awt.Color(255, 255, 255));
        lblTitle.setHorizontalAlignment(javax.swing.SwingConstants.CENTER);
        lblTitle.setText("Hidden Doors");
        lblTitle.setBorder(new javax.swing.border.LineBorder(new java.awt.Color(255, 255, 255), 3, true));
        lblTitle.setFocusable(false);
        lblTitle.setMaximumSize(new java.awt.Dimension(2400, 280));
        lblTitle.setMinimumSize(new java.awt.Dimension(600, 70));
        lblTitle.setPreferredSize(new java.awt.Dimension(600, 70));
        lblTitle.setRequestFocusEnabled(false);
        gridBagConstraints = new java.awt.GridBagConstraints();
        gridBagConstraints.gridx = 0;
        gridBagConstraints.gridy = 0;
        gridBagConstraints.gridwidth = 7;
        gridBagConstraints.fill = java.awt.GridBagConstraints.BOTH;
        gridBagConstraints.anchor = java.awt.GridBagConstraints.NORTHWEST;
        gridBagConstraints.weightx = 0.9375;
        gridBagConstraints.weighty = 0.1944;
        gridBagConstraints.insets = new java.awt.Insets(20, 20, 0, 20);
        add(lblTitle, gridBagConstraints);

        btnPlay.setBackground(new java.awt.Color(0, 0, 0));
        btnPlay.setFont(new java.awt.Font("NSimSun", 1, 36)); // NOI18N
        btnPlay.setForeground(new java.awt.Color(255, 255, 255));
        btnPlay.setText("Play");
        btnPlay.setBorder(new javax.swing.border.LineBorder(new java.awt.Color(255, 255, 255), 3, true));
        btnPlay.setFocusable(false);
        btnPlay.setMaximumSize(new java.awt.Dimension(1280, 480));
        btnPlay.setMinimumSize(new java.awt.Dimension(320, 60));
        btnPlay.setPreferredSize(new java.awt.Dimension(320, 60));
        btnPlay.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseClicked(java.awt.event.MouseEvent evt) {
                btnPlayMouseClicked(evt);
            }
        });
        gridBagConstraints = new java.awt.GridBagConstraints();
        gridBagConstraints.gridx = 1;
        gridBagConstraints.gridy = 2;
        gridBagConstraints.gridwidth = 5;
        gridBagConstraints.fill = java.awt.GridBagConstraints.BOTH;
        gridBagConstraints.anchor = java.awt.GridBagConstraints.NORTHWEST;
        gridBagConstraints.weightx = 0.5;
        gridBagConstraints.weighty = 0.1667;
        add(btnPlay, gridBagConstraints);

        btnOptions.setBackground(new java.awt.Color(0, 0, 0));
        btnOptions.setFont(new java.awt.Font("NSimSun", 1, 18)); // NOI18N
        btnOptions.setForeground(new java.awt.Color(255, 255, 255));
        btnOptions.setText("Options");
        btnOptions.setBorder(new javax.swing.border.LineBorder(new java.awt.Color(255, 255, 255), 3, true));
        btnOptions.setFocusable(false);
        btnOptions.setMaximumSize(new java.awt.Dimension(520, 480));
        btnOptions.setMinimumSize(new java.awt.Dimension(140, 30));
        btnOptions.setPreferredSize(new java.awt.Dimension(140, 30));
        btnOptions.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseClicked(java.awt.event.MouseEvent evt) {
                btnOptionsMouseClicked(evt);
            }
        });
        gridBagConstraints = new java.awt.GridBagConstraints();
        gridBagConstraints.gridx = 2;
        gridBagConstraints.gridy = 4;
        gridBagConstraints.gridwidth = 3;
        gridBagConstraints.fill = java.awt.GridBagConstraints.BOTH;
        gridBagConstraints.anchor = java.awt.GridBagConstraints.NORTHWEST;
        gridBagConstraints.weightx = 0.2188;
        gridBagConstraints.weighty = 0.0833;
        add(btnOptions, gridBagConstraints);

        fillOuterLeft.setBackground(new java.awt.Color(255, 255, 255));
        gridBagConstraints = new java.awt.GridBagConstraints();
        gridBagConstraints.gridx = 0;
        gridBagConstraints.gridy = 1;
        gridBagConstraints.gridheight = 5;
        gridBagConstraints.fill = java.awt.GridBagConstraints.BOTH;
        gridBagConstraints.weightx = 0.2188;
        gridBagConstraints.weighty = 0.6944;
        gridBagConstraints.insets = new java.awt.Insets(0, 20, 20, 0);
        add(fillOuterLeft, gridBagConstraints);

        fillOuterRight.setBackground(new java.awt.Color(255, 255, 255));
        gridBagConstraints = new java.awt.GridBagConstraints();
        gridBagConstraints.gridx = 6;
        gridBagConstraints.gridy = 1;
        gridBagConstraints.gridheight = 5;
        gridBagConstraints.fill = java.awt.GridBagConstraints.BOTH;
        gridBagConstraints.weightx = 0.2188;
        gridBagConstraints.weighty = 0.6944;
        gridBagConstraints.insets = new java.awt.Insets(0, 0, 20, 20);
        add(fillOuterRight, gridBagConstraints);

        fillDoorLeft.setBackground(new java.awt.Color(255, 255, 255));
        gridBagConstraints = new java.awt.GridBagConstraints();
        gridBagConstraints.gridx = 1;
        gridBagConstraints.gridy = 1;
        gridBagConstraints.gridwidth = 2;
        gridBagConstraints.fill = java.awt.GridBagConstraints.BOTH;
        gridBagConstraints.weightx = 0.1875;
        gridBagConstraints.weighty = 0.3056;
        add(fillDoorLeft, gridBagConstraints);

        fillDoorRight.setBackground(new java.awt.Color(255, 255, 255));
        gridBagConstraints = new java.awt.GridBagConstraints();
        gridBagConstraints.gridx = 4;
        gridBagConstraints.gridy = 1;
        gridBagConstraints.gridwidth = 2;
        gridBagConstraints.fill = java.awt.GridBagConstraints.BOTH;
        gridBagConstraints.weightx = 0.1875;
        gridBagConstraints.weighty = 0.3056;
        add(fillDoorRight, gridBagConstraints);

        lblDoor.setFont(new java.awt.Font("NSimSun", 1, 24)); // NOI18N
        lblDoor.setHorizontalAlignment(javax.swing.SwingConstants.CENTER);
        lblDoor.setMaximumSize(new java.awt.Dimension(320, 440));
        lblDoor.setMinimumSize(new java.awt.Dimension(80, 110));
        lblDoor.setPreferredSize(new java.awt.Dimension(80, 110));
        lblDoor.addComponentListener(new java.awt.event.ComponentAdapter() {
            public void componentResized(java.awt.event.ComponentEvent evt) {
                lblDoorComponentResized(evt);
            }
        });
        gridBagConstraints = new java.awt.GridBagConstraints();
        gridBagConstraints.gridx = 3;
        gridBagConstraints.gridy = 1;
        gridBagConstraints.fill = java.awt.GridBagConstraints.BOTH;
        gridBagConstraints.weightx = 0.125;
        gridBagConstraints.weighty = 0.3056;
        add(lblDoor, gridBagConstraints);

        fillOptUp.setBackground(new java.awt.Color(255, 255, 255));
        gridBagConstraints = new java.awt.GridBagConstraints();
        gridBagConstraints.gridx = 1;
        gridBagConstraints.gridy = 3;
        gridBagConstraints.gridwidth = 5;
        gridBagConstraints.fill = java.awt.GridBagConstraints.BOTH;
        gridBagConstraints.weightx = 0.5;
        gridBagConstraints.weighty = 0.0278;
        add(fillOptUp, gridBagConstraints);

        fillOptDown.setBackground(new java.awt.Color(255, 255, 255));
        gridBagConstraints = new java.awt.GridBagConstraints();
        gridBagConstraints.gridx = 2;
        gridBagConstraints.gridy = 5;
        gridBagConstraints.gridwidth = 3;
        gridBagConstraints.fill = java.awt.GridBagConstraints.BOTH;
        gridBagConstraints.weightx = 0.2188;
        gridBagConstraints.weighty = 0.1111;
        gridBagConstraints.insets = new java.awt.Insets(0, 0, 20, 0);
        add(fillOptDown, gridBagConstraints);

        fillOptLeft.setBackground(new java.awt.Color(255, 255, 255));
        gridBagConstraints = new java.awt.GridBagConstraints();
        gridBagConstraints.gridx = 1;
        gridBagConstraints.gridy = 4;
        gridBagConstraints.gridheight = 2;
        gridBagConstraints.fill = java.awt.GridBagConstraints.BOTH;
        gridBagConstraints.weightx = 0.1406;
        gridBagConstraints.weighty = 0.1944;
        gridBagConstraints.insets = new java.awt.Insets(0, 0, 20, 0);
        add(fillOptLeft, gridBagConstraints);

        fillOptRight.setBackground(new java.awt.Color(255, 255, 255));
        gridBagConstraints = new java.awt.GridBagConstraints();
        gridBagConstraints.gridx = 5;
        gridBagConstraints.gridy = 4;
        gridBagConstraints.gridheight = 2;
        gridBagConstraints.fill = java.awt.GridBagConstraints.BOTH;
        gridBagConstraints.weightx = 0.1406;
        gridBagConstraints.weighty = 0.1944;
        gridBagConstraints.insets = new java.awt.Insets(0, 0, 20, 0);
        add(fillOptRight, gridBagConstraints);
    }

}
