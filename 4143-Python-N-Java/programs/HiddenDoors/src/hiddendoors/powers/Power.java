package hiddendoors.powers;

import hiddendoors.actors.Actor;

public abstract class Power {
    public String name;
    public String description;
    public String image;
    public abstract void use(Actor user, Actor target);
    public abstract void fail(Actor user);
}
