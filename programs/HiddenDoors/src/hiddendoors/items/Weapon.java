package hiddendoors.items;

import java.util.ArrayList;
import hiddendoors.powers.Power;

public abstract class Weapon {
    public int damage;
    public int attack;
    public String name;
    public String description;
    public String image;
    public ArrayList<Power> powers;
    @Override
    public String toString()
    {
        return name;
    }

}
