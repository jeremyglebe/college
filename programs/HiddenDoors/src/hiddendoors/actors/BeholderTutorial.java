package hiddendoors.actors;

import hiddendoors.conditions.Status;
import java.util.ArrayList;

public class BeholderTutorial extends Actor {

    public BeholderTutorial(){
        name = "Beholder";
        maxhp = 999;
        health = 999;
        defense = 100;
        strength = 10;
        reflex = 10;
        soul = 10;
        status = new ArrayList<Status>();
        imgsrc = "/resources/beholder/";
    }

    /**
     * Runs a single AI-controlled turn using the Actor.
     * @param target the opponent or target of the AI's actions
     * @return a String message about what the AI did, this would be good
     * for combat feedback.
     */
    public String aiTurn(Actor target){
        return "The beholder peers at you curiously...";
    }
}
