package hiddendoors.magicks;

import hiddendoors.actors.Actor;

public abstract class Magic {
    public int cost;
    public String name;
    public String description;
    public String image;
    public abstract void use(Actor user, Actor target);
}
