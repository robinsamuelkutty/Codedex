import java.util.Scanner;
import java.util.StringTokenizer;
public class StringToken {
    public static void main(String[] args) {
        
        Scanner sc=new Scanner(System.in);
        System.out.println("enter the string");
        String str=sc.nextLine();
        StringTokenizer str1=new StringTokenizer(str," ");
        int sum=0;
        
        while (str1.hasMoreTokens()) {
            int x=Integer.parseInt(str1.nextToken());
            System.out.println(x);
            sum=sum+x;
            
            
        }
        System.out.println("sum:"+sum);
    }
}
