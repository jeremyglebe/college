package hiddendoors.items;

import java.util.ArrayList;
import hiddendoors.powers.Power;

public class UnarmedStrike extends Weapon {
    public UnarmedStrike(){
        damage = 1;
        attack = 0;
        name = "Unarmed Strike";
        description = " launches forward with nothing but their fisticuffs!";
        image = "/resources/weapons/unarmed.png";
        // No powers to add to this one
        powers = new ArrayList<Power>();
    }
}
