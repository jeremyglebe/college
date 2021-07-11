package hiddendoors.items;

import hiddendoors.actors.Actor;

public abstract class Item {
    public boolean canEquip;
    public String image;
    public abstract void equip(Actor user);
    public abstract void dequip(Actor user);
    public abstract void use(Actor target);
}
