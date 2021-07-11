package hiddendoors.stages;

import java.awt.event.ComponentAdapter;
import java.awt.event.ComponentEvent;
import java.awt.event.ActionListener;
import java.awt.event.ActionEvent;

import hiddendoors.GameFrame;
import hiddendoors.GameStage;

import hiddendoors.actors.Actor;
import hiddendoors.actors.Player;

import hiddendoors.controls.PanelEquipment;
import hiddendoors.controls.PanelHealth;
import hiddendoors.items.Item;
import hiddendoors.items.Weapon;
import hiddendoors.magicks.Magic;
import hiddendoors.powers.Power;

public class StageBattleForm extends GameStage {

    public Player player;
    public Actor enemy;

    /**
     * Creates new form StageBattleForm
     * 
     * @param game GameFrame object to which this stage belongs.
     */
    public StageBattleForm(GameFrame game) {
        // Call the parent constructor
        super(game);

        // Keep track of the player object
        this.player = game.player;

        // Initialize components
        initPanelsPlayer();
        initLblBadGuy();
        initFeedback();
        initComBoxActions();
        initLblActions();
        initBtnActions();
        initFillers();

    }

    public void addMessage(String msg) {
        String log = txtFeedback.getText();
        txtFeedback.setText(log + msg);
    }

    private void lblBadGuyResized() {
        // Set the enemy's idle image
        lblBadGuy.setIcon(LabelImage(enemy.imgsrc + "idle.png", lblBadGuy, true));
    }

    private void lblWeaponResized() {
        Weapon w = (Weapon) comBoxWeapon.getSelectedItem();
        lblWeapon.setIcon(LabelImage(w.image, lblWeapon, true));
    }

    private void weaponSelected() {
        Weapon w = (Weapon) comBoxWeapon.getSelectedItem();
        lblWeapon.setIcon(LabelImage(w.image, lblWeapon, true));
    }

    private void initPanelsPlayer() {
        // Grid Bag Constraints object to configure layout positioning
        java.awt.GridBagConstraints constraints;

        // Creating the Player Equipment panel
        panelEquipment = new PanelEquipment();

        // Positioning the Player Equipment panel in the grid
        constraints = new java.awt.GridBagConstraints();
        constraints.gridx = 0;
        constraints.gridy = 1;
        constraints.fill = java.awt.GridBagConstraints.BOTH;
        constraints.weightx = 0.0938;
        constraints.weighty = 0.3333;
        constraints.insets = new java.awt.Insets(0, 20, 0, 0);
        add(panelEquipment, constraints);

        // Creating the Player HP panel
        panelHealth = new PanelHealth(this, player);

        // Positioning the Player HP panel in the grid
        constraints = new java.awt.GridBagConstraints();
        constraints.gridx = 0;
        constraints.gridy = 0;
        constraints.gridwidth = 4;
        constraints.fill = java.awt.GridBagConstraints.BOTH;
        constraints.weightx = 0.461;
        constraints.weighty = 0.1111;
        constraints.insets = new java.awt.Insets(20, 20, 0, 0);
        add(panelHealth, constraints);
    }

    private void initLblBadGuy() {
        // Grid Bag Constraints object to configure layout positioning
        java.awt.GridBagConstraints constraints;

        // Create the Bad Guy Label
        lblBadGuy = new javax.swing.JLabel();

        // Alignment and size settings
        lblBadGuy.setHorizontalAlignment(javax.swing.SwingConstants.CENTER);
        lblBadGuy.setMaximumSize(new java.awt.Dimension(1200, 1200));
        lblBadGuy.setMinimumSize(new java.awt.Dimension(305, 160));
        lblBadGuy.setPreferredSize(new java.awt.Dimension(305, 160));

        // Layout placement
        constraints = new java.awt.GridBagConstraints();
        constraints.gridx = 4;
        constraints.gridy = 0;
        constraints.gridwidth = 5;
        constraints.gridheight = 2;
        constraints.fill = java.awt.GridBagConstraints.BOTH;
        constraints.weightx = 0.4766;
        constraints.weighty = 0.4444;
        constraints.insets = new java.awt.Insets(20, 0, 0, 20);
        add(lblBadGuy, constraints);

        // Event handlers
        lblBadGuy.addComponentListener(new ComponentAdapter() {
            public void componentResized(ComponentEvent componentEvent) {
                lblBadGuyResized();
            }
        });
    }

    private void initFeedback() {
        // Grid Bag Constraints object to configure layout positioning
        java.awt.GridBagConstraints constraints;

        // Create the Feedback Text Area (and its scroller)
        scrollFeedback = new javax.swing.JScrollPane();
        txtFeedback = new javax.swing.JTextArea();

        // Configuration
        scrollFeedback.setMinimumSize(new java.awt.Dimension(600, 80));
        scrollFeedback.setPreferredSize(new java.awt.Dimension(600, 80));
        txtFeedback.setEditable(false);
        txtFeedback.setBackground(new java.awt.Color(0, 0, 0));
        txtFeedback.setColumns(20);
        txtFeedback.setFont(new java.awt.Font("NSimSun", 0, 16)); // NOI18N
        txtFeedback.setForeground(new java.awt.Color(255, 255, 255));
        txtFeedback.setLineWrap(true);
        txtFeedback.setRows(5);
        txtFeedback.setBorder(new javax.swing.border.LineBorder(new java.awt.Color(255, 255, 255), 2, true));
        scrollFeedback.setViewportView(txtFeedback);

        // Layout placement
        constraints = new java.awt.GridBagConstraints();
        constraints.gridx = 0;
        constraints.gridy = 2;
        constraints.gridwidth = 9;
        constraints.fill = java.awt.GridBagConstraints.BOTH;
        constraints.weightx = 0.9375;
        constraints.weighty = 0.125;
        constraints.insets = new java.awt.Insets(0, 20, 0, 20);
        add(scrollFeedback, constraints);
    }

    private void initComBoxActions() {
        // Grid Bag Constraints object to configure layout positioning
        java.awt.GridBagConstraints constraints;

        // Create the Action Combo Boxes
        comBoxWeapon = new javax.swing.JComboBox<>();
        comBoxMagic = new javax.swing.JComboBox<>();
        comBoxItem = new javax.swing.JComboBox<>();
        comBoxPower = new javax.swing.JComboBox<>();

        // Add all weapons to the weapon box
        for (int i = 0; i < player.weapons.size(); i++) {
            comBoxWeapon.addItem(player.weapons.get(i));
        }
        // Listener for a weapon being selected to update the icon
        comBoxWeapon.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                weaponSelected();
            }
        });

        // Configuration
        comBoxWeapon.setBackground(new java.awt.Color(0, 0, 0));
        comBoxWeapon.setFont(new java.awt.Font("NSimSun", 1, 14)); // NOI18N
        comBoxWeapon.setForeground(new java.awt.Color(255, 255, 255));
        comBoxWeapon.setFocusable(false);
        comBoxWeapon.setMinimumSize(new java.awt.Dimension(160, 60));
        comBoxWeapon.setPreferredSize(new java.awt.Dimension(160, 60));

        comBoxMagic.setBackground(new java.awt.Color(0, 0, 0));
        comBoxMagic.setFont(new java.awt.Font("NSimSun", 1, 14)); // NOI18N
        comBoxMagic.setForeground(new java.awt.Color(255, 255, 255));
        comBoxMagic.setFocusable(false);
        comBoxMagic.setMinimumSize(new java.awt.Dimension(160, 60));
        comBoxMagic.setPreferredSize(new java.awt.Dimension(160, 60));

        comBoxItem.setBackground(new java.awt.Color(0, 0, 0));
        comBoxItem.setFont(new java.awt.Font("NSimSun", 1, 14)); // NOI18N
        comBoxItem.setForeground(new java.awt.Color(255, 255, 255));
        comBoxItem.setFocusable(false);
        comBoxItem.setMinimumSize(new java.awt.Dimension(160, 60));
        comBoxItem.setPreferredSize(new java.awt.Dimension(160, 60));

        comBoxPower.setBackground(new java.awt.Color(0, 0, 0));
        comBoxPower.setFont(new java.awt.Font("NSimSun", 1, 14)); // NOI18N
        comBoxPower.setForeground(new java.awt.Color(255, 255, 255));
        comBoxPower.setFocusable(false);
        comBoxPower.setMinimumSize(new java.awt.Dimension(160, 60));
        comBoxPower.setPreferredSize(new java.awt.Dimension(160, 60));

        // Layout placement
        constraints = new java.awt.GridBagConstraints();
        constraints.gridx = 0;
        constraints.gridy = 3;
        constraints.gridwidth = 2;
        constraints.fill = java.awt.GridBagConstraints.BOTH;
        constraints.weightx = 0.25;
        constraints.weighty = 0.1667;
        constraints.insets = new java.awt.Insets(0, 20, 0, 0);
        add(comBoxWeapon, constraints);

        constraints = new java.awt.GridBagConstraints();
        constraints.gridx = 0;
        constraints.gridy = 5;
        constraints.gridwidth = 2;
        constraints.fill = java.awt.GridBagConstraints.BOTH;
        constraints.weightx = 0.25;
        constraints.weighty = 0.1667;
        constraints.insets = new java.awt.Insets(0, 20, 20, 0);
        add(comBoxMagic, constraints);

        constraints = new java.awt.GridBagConstraints();
        constraints.gridx = 5;
        constraints.gridy = 5;
        constraints.gridwidth = 2;
        constraints.fill = java.awt.GridBagConstraints.BOTH;
        constraints.weightx = 0.25;
        constraints.weighty = 0.1667;
        constraints.insets = new java.awt.Insets(0, 0, 20, 0);
        add(comBoxItem, constraints);

        constraints = new java.awt.GridBagConstraints();
        constraints.gridx = 5;
        constraints.gridy = 3;
        constraints.gridwidth = 2;
        constraints.fill = java.awt.GridBagConstraints.BOTH;
        constraints.weightx = 0.25;
        constraints.weighty = 0.1667;
        add(comBoxPower, constraints);
    }

    private void initLblActions() {
        // Grid Bag Constraints object to configure layout positioning
        java.awt.GridBagConstraints constraints;

        // Create the Action Icon Labels
        lblWeapon = new javax.swing.JLabel();
        lblPower = new javax.swing.JLabel();
        lblItem = new javax.swing.JLabel();
        lblMagic = new javax.swing.JLabel();

        // Configuration
        lblWeapon.setHorizontalAlignment(javax.swing.SwingConstants.CENTER);
        lblWeapon.setMaximumSize(new java.awt.Dimension(1200, 1200));
        lblWeapon.setMinimumSize(new java.awt.Dimension(80, 60));
        lblWeapon.setPreferredSize(new java.awt.Dimension(80, 60));
        lblWeapon.addComponentListener(new ComponentAdapter() {
            public void componentResized(ComponentEvent componentEvent) {
                lblWeaponResized();
            }
        });

        lblPower.setHorizontalAlignment(javax.swing.SwingConstants.CENTER);
        lblPower.setMaximumSize(new java.awt.Dimension(1200, 1200));
        lblPower.setMinimumSize(new java.awt.Dimension(80, 60));
        lblPower.setPreferredSize(new java.awt.Dimension(80, 60));

        lblItem.setHorizontalAlignment(javax.swing.SwingConstants.CENTER);
        lblItem.setMaximumSize(new java.awt.Dimension(1200, 1200));
        lblItem.setMinimumSize(new java.awt.Dimension(80, 60));
        lblItem.setPreferredSize(new java.awt.Dimension(80, 60));

        lblMagic.setHorizontalAlignment(javax.swing.SwingConstants.CENTER);
        lblMagic.setMaximumSize(new java.awt.Dimension(1200, 1200));
        lblMagic.setMinimumSize(new java.awt.Dimension(80, 60));
        lblMagic.setPreferredSize(new java.awt.Dimension(80, 60));

        // Layout placement
        constraints = new java.awt.GridBagConstraints();
        constraints.gridx = 2;
        constraints.gridy = 3;
        constraints.fill = java.awt.GridBagConstraints.BOTH;
        constraints.weightx = 0.125;
        constraints.weighty = 0.1667;
        add(lblWeapon, constraints);

        constraints = new java.awt.GridBagConstraints();
        constraints.gridx = 7;
        constraints.gridy = 3;
        constraints.fill = java.awt.GridBagConstraints.BOTH;
        constraints.weightx = 0.125;
        constraints.weighty = 0.1667;
        add(lblPower, constraints);

        constraints = new java.awt.GridBagConstraints();
        constraints.gridx = 7;
        constraints.gridy = 5;
        constraints.fill = java.awt.GridBagConstraints.BOTH;
        constraints.weightx = 0.125;
        constraints.weighty = 0.1667;
        constraints.insets = new java.awt.Insets(0, 0, 20, 0);
        add(lblItem, constraints);

        constraints = new java.awt.GridBagConstraints();
        constraints.gridx = 2;
        constraints.gridy = 5;
        constraints.fill = java.awt.GridBagConstraints.BOTH;
        constraints.weightx = 0.125;
        constraints.weighty = 0.1667;
        constraints.insets = new java.awt.Insets(0, 0, 20, 0);
        add(lblMagic, constraints);
    }

    private void initBtnActions() {
        // Grid Bag Constraints object to configure layout positioning
        java.awt.GridBagConstraints constraints;

        // Create the Action Buttons
        btnAttack = new javax.swing.JButton();
        btnPower = new javax.swing.JButton();
        btnItem = new javax.swing.JButton();
        btnMagic = new javax.swing.JButton();
        
        // Listener for the attack button
        btnAttack.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                Weapon wep = (Weapon)comBoxWeapon.getSelectedItem();
                addMessage('\n' + player.name + wep.description);
                addMessage('\n' + enemy.aiTurn(player));
            }
        });

        // Configuration
        btnAttack.setBackground(new java.awt.Color(0, 0, 0));
        btnAttack.setFont(new java.awt.Font("NSimSun", 1, 14)); // NOI18N
        btnAttack.setForeground(new java.awt.Color(255, 255, 255));
        btnAttack.setText("Attack");
        btnAttack.setBorder(new javax.swing.border.LineBorder(new java.awt.Color(255, 255, 255), 2, true));
        btnAttack.setMargin(new java.awt.Insets(2, 2, 2, 2));
        btnAttack.setMaximumSize(new java.awt.Dimension(550, 600));
        btnAttack.setMinimumSize(new java.awt.Dimension(55, 60));
        btnAttack.setPreferredSize(new java.awt.Dimension(55, 60));

        btnPower.setBackground(new java.awt.Color(0, 0, 0));
        btnPower.setFont(new java.awt.Font("NSimSun", 1, 14)); // NOI18N
        btnPower.setForeground(new java.awt.Color(255, 255, 255));
        btnPower.setText("<html>Power<br>Attack</html>");
        btnPower.setBorder(new javax.swing.border.LineBorder(new java.awt.Color(255, 255, 255), 2, true));
        btnPower.setFocusable(false);
        btnPower.setMargin(new java.awt.Insets(2, 2, 2, 2));
        btnPower.setMaximumSize(new java.awt.Dimension(550, 600));
        btnPower.setMinimumSize(new java.awt.Dimension(55, 60));
        btnPower.setPreferredSize(new java.awt.Dimension(55, 60));

        btnItem.setBackground(new java.awt.Color(0, 0, 0));
        btnItem.setFont(new java.awt.Font("NSimSun", 1, 14)); // NOI18N
        btnItem.setForeground(new java.awt.Color(255, 255, 255));
        btnItem.setText("Use");
        btnItem.setBorder(new javax.swing.border.LineBorder(new java.awt.Color(255, 255, 255), 2, true));
        btnItem.setMargin(new java.awt.Insets(2, 2, 2, 2));
        btnItem.setMaximumSize(new java.awt.Dimension(550, 600));
        btnItem.setMinimumSize(new java.awt.Dimension(55, 60));
        btnItem.setPreferredSize(new java.awt.Dimension(55, 60));

        btnMagic.setBackground(new java.awt.Color(0, 0, 0));
        btnMagic.setFont(new java.awt.Font("NSimSun", 1, 14)); // NOI18N
        btnMagic.setForeground(new java.awt.Color(255, 255, 255));
        btnMagic.setText("Cast");
        btnMagic.setBorder(new javax.swing.border.LineBorder(new java.awt.Color(255, 255, 255), 2, true));
        btnMagic.setMargin(new java.awt.Insets(2, 2, 2, 2));
        btnMagic.setMaximumSize(new java.awt.Dimension(550, 600));
        btnMagic.setMinimumSize(new java.awt.Dimension(55, 60));
        btnMagic.setPreferredSize(new java.awt.Dimension(55, 60));

        // Layout placement
        constraints = new java.awt.GridBagConstraints();
        constraints.gridx = 3;
        constraints.gridy = 3;
        constraints.fill = java.awt.GridBagConstraints.BOTH;
        constraints.weightx = 0.0859;
        constraints.weighty = 0.1667;
        add(btnAttack, constraints);

        constraints = new java.awt.GridBagConstraints();
        constraints.gridx = 8;
        constraints.gridy = 3;
        constraints.fill = java.awt.GridBagConstraints.BOTH;
        constraints.weightx = 0.0859;
        constraints.weighty = 0.1667;
        constraints.insets = new java.awt.Insets(0, 0, 0, 20);
        add(btnPower, constraints);

        constraints = new java.awt.GridBagConstraints();
        constraints.gridx = 8;
        constraints.gridy = 5;
        constraints.fill = java.awt.GridBagConstraints.BOTH;
        constraints.weightx = 0.0859;
        constraints.weighty = 0.1667;
        constraints.insets = new java.awt.Insets(0, 0, 20, 20);
        add(btnItem, constraints);

        constraints = new java.awt.GridBagConstraints();
        constraints.gridx = 3;
        constraints.gridy = 5;
        constraints.fill = java.awt.GridBagConstraints.BOTH;
        constraints.weightx = 0.0859;
        constraints.weighty = 0.1667;
        constraints.insets = new java.awt.Insets(0, 0, 20, 0);
        add(btnMagic, constraints);
    }

    private void initFillers() {
        // Grid Bag Constraints object to configure layout positioning
        java.awt.GridBagConstraints constraints;

        // Create the fillers
        filler04 = new javax.swing.Box.Filler(new java.awt.Dimension(10, 60), new java.awt.Dimension(10, 60),
                new java.awt.Dimension(32767, 32767));
        filler05 = new javax.swing.Box.Filler(new java.awt.Dimension(600, 10), new java.awt.Dimension(600, 10),
                new java.awt.Dimension(32767, 32767));
        filler06 = new javax.swing.Box.Filler(new java.awt.Dimension(10, 60), new java.awt.Dimension(10, 60),
                new java.awt.Dimension(32767, 32767));

        // Layout placement
        constraints = new java.awt.GridBagConstraints();
        constraints.gridx = 4;
        constraints.gridy = 3;
        constraints.fill = java.awt.GridBagConstraints.BOTH;
        constraints.weightx = 0.0167;
        constraints.weighty = 0.1667;
        add(filler04, constraints);
        constraints = new java.awt.GridBagConstraints();
        constraints.gridx = 0;
        constraints.gridy = 4;
        constraints.gridwidth = 9;
        constraints.fill = java.awt.GridBagConstraints.BOTH;
        constraints.weightx = 0.9375;
        constraints.weighty = 0.0278;
        constraints.insets = new java.awt.Insets(0, 20, 0, 20);
        add(filler05, constraints);
        constraints = new java.awt.GridBagConstraints();
        constraints.gridx = 4;
        constraints.gridy = 5;
        constraints.fill = java.awt.GridBagConstraints.BOTH;
        constraints.weightx = 0.0167;
        constraints.weighty = 0.1667;
        constraints.insets = new java.awt.Insets(0, 0, 20, 0);
        add(filler06, constraints);
    }

    private javax.swing.JButton btnAttack;
    private javax.swing.JButton btnItem;
    private javax.swing.JButton btnMagic;
    private javax.swing.JButton btnPower;
    private javax.swing.JComboBox<Item> comBoxItem;
    private javax.swing.JComboBox<Magic> comBoxMagic;
    private javax.swing.JComboBox<Power> comBoxPower;
    private javax.swing.JComboBox<Weapon> comBoxWeapon;
    private javax.swing.Box.Filler filler04;
    private javax.swing.Box.Filler filler05;
    private javax.swing.Box.Filler filler06;
    private javax.swing.JLabel lblBadGuy;
    private javax.swing.JLabel lblItem;
    private javax.swing.JLabel lblMagic;
    private javax.swing.JLabel lblPower;
    private javax.swing.JLabel lblWeapon;
    private PanelEquipment panelEquipment;
    private PanelHealth panelHealth;
    private javax.swing.JScrollPane scrollFeedback;
    private javax.swing.JTextArea txtFeedback;
}
