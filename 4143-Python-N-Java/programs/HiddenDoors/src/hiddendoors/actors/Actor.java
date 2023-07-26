package hiddendoors.actors;

import java.util.ArrayList;
import hiddendoors.conditions.Status;

public abstract class Actor {
    public String name;
    public int maxhp;
    public int health;
    public int defense;
    public int strength;
    public int reflex;
    public int soul;
    public ArrayList<Status> status;
    // The path to the actor's images
    public String imgsrc;

    /**
     * Activates each effect found in the "status" list once, and marks down
     * the effects time remaining.
     * @return an ArrayList of String messages describing the applied affects.
     * This would be good for combat feedback.
     */
    public ArrayList<String> affect(){
        ArrayList<String> messages = new ArrayList<String>();
        status.forEach((condition) -> {
            condition.effect(this);
            messages.add(this.name + condition.description);
        });
        return messages;
    }
    
    /**
     * Runs a single AI-controlled turn using the Actor.
     * @param target the opponent or target of the AI's actions
     * @return a String message about what the AI did, this would be good
     * for combat feedback.
     */
    public abstract String aiTurn(Actor target);
}
