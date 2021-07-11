package hiddendoors.actors;

import hiddendoors.conditions.Status;
import hiddendoors.items.Item;
import hiddendoors.items.UnarmedStrike;
import hiddendoors.items.Weapon;
import hiddendoors.magicks.Magic;
import java.util.ArrayList;

public class Player extends Actor {
    public ArrayList<Item> inventory;
    public ArrayList<Item> equipment;
    public ArrayList<Magic> magicks;
    public ArrayList<Weapon> weapons;

    /**
     * Constructor, creates a default Player object.
     */
    public Player(){
        name = "The Hero";
        maxhp = 8;
        health = 8;
        defense = 10;
        strength = 1;
        reflex = 1;
        soul = 1;
        inventory = new ArrayList<Item>();
        equipment = new ArrayList<Item>();
        magicks = new ArrayList<Magic>();
        weapons = new ArrayList<Weapon>();
        weapons.add(new UnarmedStrike());
        status = new ArrayList<Status>();
    }
    
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
    public String aiTurn(Actor target){
        return this.name + " does nothing...";
    }
}
