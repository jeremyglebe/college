package hiddendoors.conditions;

import hiddendoors.actors.Actor;

public abstract class Status {
    public String name;
    public String description;
    public String image;
    public int roundsTotal;
    public int roundsLeft;
    public abstract void effect(Actor affected);
}
