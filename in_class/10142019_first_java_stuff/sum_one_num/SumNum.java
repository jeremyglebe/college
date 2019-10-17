import java.util.Scanner;
import java.io.IOException;
import java.lang.Runtime;
import java.lang.Process;
import java.lang.ProcessBuilder;

public class SumNum {
    public static void main(String args[]) {

        if (isWindows()) {
            winStart(args);
        }

        Scanner input = new Scanner(System.in);
        System.out.println("Caculate and print ∑(1,k).");
        System.out.print("k = ? ");
        int num = input.nextInt();
        int sum = num * (num + 1) / 2;
        // print answer with unicode and ansi colors and ooh so fancy
        System.out.println("\033[32m∑(1," + num + ") = " + sum + "\033[0m");

        if (isWindows()) {
            winStop();
        }

    }

    /**
     * Determines if the current operating system is Windows
     * 
     * @return bool true if the OS is Windows
     */
    public static boolean isWindows() {
        return System.getProperty("os.name").contains("Windows");
    }

    /**
     * Configures the Windows CMD terminal and restarts the program to ensure UTF-8
     * and ANSI support.
     * 
     * @param args The same arguments passed to the main program.
     */
    private static void winStart(String args[]) {
        try {
            // First we create a process to run a Windows command changing the
            // terminal to code page 65001. (UTF-8) inheritIO ensures that the
            // new process runs in the same terminal we currently have open.
            ProcessBuilder pb = new ProcessBuilder("cmd.exe", "/c", "chcp", "65001", ">nul").inheritIO();
            Process p = pb.start();
            p.waitFor();
            // Search the arguments. If "no-restart" is among the arguments, we
            // can assume either it was already re-launched from this function
            // or the user is intentionally choosing to view it without UTF-8.
            // In this case we will end the function early, before the restart.
            for (int i = 0; i < args.length; i++) {
                if (args[i].contains("no-restart")) {
                    return;
                }
            }
            // This process restarts the main process (in the same terminal)
            // allowing for the previous settings change (Code Page 65001) to
            // take effect. We pass in "no-restart" to prevent the program from
            // doing this multiple times.
            ProcessBuilder newConsole = new ProcessBuilder("java", "-Dfile.encoding=UTF-8", "SumNum", "no-restart")
                    .inheritIO();
            newConsole.start().waitFor();
            System.exit(0);
        } catch (IOException ioe) {
            System.out.println(ioe.getMessage());
        } catch (InterruptedException ine) {
            System.out.println(ine.getMessage());
        }
    }

    /**
     * Resets Windows' code page to the default (437) in case the user doesn't want
     * UTF-8 support after the program ends.
     */
    private static void winStop() {
        try {
            // command changes code page to 437 and inheritIO ensures we change
            // the setting for the current terminal
            ProcessBuilder pb = new ProcessBuilder("cmd.exe", "/c", "chcp", "437", ">nul").inheritIO();
            Process p = pb.start();
            p.waitFor();
        } catch (IOException ioe) {
            System.out.println(ioe.getMessage());
        } catch (InterruptedException ine) {
            System.out.println(ine.getMessage());
        }
    }

}