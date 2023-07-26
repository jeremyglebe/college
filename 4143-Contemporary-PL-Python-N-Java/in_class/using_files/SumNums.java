import java.util.Scanner;

public class SumNums {
    public static void main(String args[]) {
        Scanner input = new Scanner(System.in);
        int sum = 0;
        while (input.hasNext()) {
            sum += input.nextInt();
        }
        input.close();
        System.out.print("Sum = " + sum);
    }
}