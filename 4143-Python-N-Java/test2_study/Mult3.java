import java.util.Scanner;

/**
 * Write a Java code segment that will ask the user to enter an integer and
 * will then print all the positive multiples of 3 up to and including the
 * integer entered. You may assumed the user will enter a positive integer >= 3
 * 
 * We'll test the class written in "Complex" in this as well. Its not exactly
 * good practice but they're both just part of the exam review so who cares?
 */

public class Mult3{
    public static void main(String args[]){
        Scanner input = new Scanner(System.in);
        int num;

        System.out.print("Enter an integer now. ");
        num = input.nextInt();
        System.out.println("[MULTIPLES OF 3]");
        for(int i = 3; i <= num; i += 3){
            System.out.println(i);
        }

        Complex c1 = new Complex();
        Complex c2 = new Complex(5, 9);
        Complex c3 = c1.add(c2);
        System.out.println("[COMPLEX NUMBER ADDED IMAGINARY COMPONENT]");
        System.out.println(c3.getImag());
        
        c3.setReal(19);
        System.out.println("[COMPLEX NUMBER SET REAL COMPONENT]");
        System.out.println(c3.getReal());

        input.close();
    }
}