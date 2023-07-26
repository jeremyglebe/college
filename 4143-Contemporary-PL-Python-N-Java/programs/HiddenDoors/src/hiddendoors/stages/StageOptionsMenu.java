package hiddendoors.stages;

import hiddendoors.GameFrame;
import hiddendoors.GameStage;
import hiddendoors.stages.StageMainMenu;
import javax.swing.JFrame;
import javax.swing.JCheckBox;
import java.awt.Dimension;
import java.awt.Toolkit;

/**
 * Options menu, you can set the game to full-screen here.
 * 
 * @author Jeremy Glebe
 */
public class StageOptionsMenu extends GameStage {

    /**
     * Creates new form StageOptionsMenu
     */
    public StageOptionsMenu() {
        super();
        initComponents();
    }

    /**
     * Creates new form StageOptionsMenu
     * 
     * @param game GameFrame object to which this stage belongs.
     */
    public StageOptionsMenu(GameFrame game) {
        super(game);
        initComponents();
    }

    private void checkFullscreenActionPerformed(java.awt.event.ActionEvent evt) {// GEN-FIRST:event_checkFullscreenActionPerformed
        if (checkFullscreen.isSelected()) {
            game.dispose();
            game.setUndecorated(true);
            Dimension screenSize = Toolkit.getDefaultToolkit().getScreenSize();
            game.setSize(screenSize);
            game.setLocation(0, 0);
            game.setVisible(true);
            // set our variable that tracks whether we're in fullscreen
            game.fullscreen = true;
        } else {
            game.dispose();
            game.setUndecorated(false);
            game.setExtendedState(JFrame.NORMAL);
            game.pack();
            game.setVisible(true);
            // set our variable that tracks whether we're in fullscreen
            game.fullscreen = false;
        }
    }

    private void btnOkayActionPerformed(java.awt.event.ActionEvent evt) {// GEN-FIRST:event_btnOkayActionPerformed
        game.SetStage(new StageMainMenu(game));
    }

    private javax.swing.JButton btnOkay;
    private JCheckBox checkFullscreen;

    /**
     * Initializes the form and its components.
     */
    protected void initComponents() {

        checkFullscreen = new JCheckBox();
        btnOkay = new javax.swing.JButton();

        checkFullscreen.setFont(new java.awt.Font("NSimSun", 1, 24)); // NOI18N
        checkFullscreen.setForeground(new java.awt.Color(255, 255, 255));
        checkFullscreen.setSelected(game.fullscreen);
        checkFullscreen.setText("Fullscreen");
        checkFullscreen.setToolTipText("");
        checkFullscreen.setContentAreaFilled(false);
        checkFullscreen.setMaximumSize(new java.awt.Dimension(1000, 200));
        checkFullscreen.setMinimumSize(new java.awt.Dimension(200, 40));
        checkFullscreen.setPreferredSize(new java.awt.Dimension(200, 40));
        checkFullscreen.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                checkFullscreenActionPerformed(evt);
            }
        });

        btnOkay.setBackground(new java.awt.Color(0, 0, 0));
        btnOkay.setFont(new java.awt.Font("NSimSun", 1, 24)); // NOI18N
        btnOkay.setForeground(new java.awt.Color(255, 255, 255));
        btnOkay.setText("Okay!");
        btnOkay.setBorder(new javax.swing.border.LineBorder(new java.awt.Color(255, 255, 255), 3, true));
        btnOkay.setContentAreaFilled(false);
        btnOkay.setFocusable(false);
        btnOkay.setMaximumSize(new java.awt.Dimension(120, 70));
        btnOkay.setMinimumSize(new java.awt.Dimension(120, 70));
        btnOkay.setPreferredSize(new java.awt.Dimension(120, 40));
        btnOkay.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                btnOkayActionPerformed(evt);
            }
        });

        javax.swing.GroupLayout layout = new javax.swing.GroupLayout(this);
        this.setLayout(layout);
        layout.setHorizontalGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                .addGroup(layout.createSequentialGroup().addGap(44, 44, 44)
                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                                .addComponent(checkFullscreen, javax.swing.GroupLayout.PREFERRED_SIZE,
                                        javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                                .addComponent(btnOkay, javax.swing.GroupLayout.DEFAULT_SIZE,
                                        javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))
                        .addContainerGap(396, Short.MAX_VALUE)));
        layout.setVerticalGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                .addGroup(layout.createSequentialGroup().addGap(40, 40, 40)
                        .addComponent(checkFullscreen, javax.swing.GroupLayout.PREFERRED_SIZE,
                                javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addComponent(btnOkay, javax.swing.GroupLayout.PREFERRED_SIZE,
                                javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addContainerGap(368, Short.MAX_VALUE)));
    }

}
