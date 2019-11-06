import java.util.ArrayList;

public class TestingArrays {
    public static void main(String args[]) {
        // during the exam I couldn't remember how/if ArrayLists printed
        // decided to just test it out
        int[] array1 = {1,3,5};
        int[] array2 = {2,4,6};
        ArrayList<Integer> array3 = new ArrayList<>();
        for(int i = 0; i < 3; i++){
            array3.add(array1[i]);
            array3.add(array2[i]);
        }
        System.out.println(array3);
    }
}