import java.util.Scanner;

class palindrome {
    public static void main(String[] args) {
        String a, rev = "";
        Scanner sc = new Scanner(System.in);
        System.out.println("enter a string");
        a = sc.nextLine();
        int len = a.length();
        for (int i = len - 1; i >= 0; i--) {
            rev = rev + a.charAt(i);
        }
        if (a.equals(rev)) {
            System.out.println("string is palindrome");
        } else {
            System.out.println("string is not palindrome");
        }
    }
}
