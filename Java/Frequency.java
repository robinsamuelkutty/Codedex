
import java.util.Scanner;
public class frequency {

   public static void main(String[] args) {
    String a;
    char ch;
    int i,count=0;
    Scanner sc=new Scanner(System.in);
    System.out.println("enter the string");
    a=sc.nextLine();
    System.out.println("enter the character");
    ch=sc.next().charAt(0);
    int len=a.length();
    for(i=0;i<len;i++){
        if(ch==a.charAt(i)){
            count++;
        }
    }
    System.out.print(count);
   } 
}
