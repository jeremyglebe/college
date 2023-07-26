package hiddendoors.stages;

import hiddendoors.GameFrame;
import hiddendoors.actors.BeholderTutorial;

public class StageBattleTutorial extends StageBattleForm {

    /**
     * Creates new form StageBattleTutorial
     * @param game GameFrame object to which this stage belongs.
     */
    public StageBattleTutorial(GameFrame game) {
        super(game);
        enemy = new BeholderTutorial();
        addMessage("\nA beholder appears before you!");
    }

}
