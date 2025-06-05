import java.util.Scanner;
import java.io.FileReader;
import java.io.FileWriter;
public class Filereadwriter {
    public static void main(String[] args) {
        try{
            java.util.Scanner sc=new Scanner(System.in);
            System.out.println("enter the content:");
            String str=sc.nextLine();
            FileWriter fw=new FileWriter("FilewriteSample.txt");
            fw.write(str);
            fw.close();
        }catch(Exception e){
            System.out.println("Error occured");
            e.printStackTrace();
        }
        try{
            char ch[]=new char[100];
            System.out.println("Reading file");
            FileReader fr=new FileReader("FilewriteSample.txt");
            fr.read(ch);
            fr.close();
            System.out.println("the content of the file is:");
            System.out.println(ch);
        }catch(Exception e){
            System.out.println("error occurs");
            e.printStackTrace();
        }

    }
    
}
