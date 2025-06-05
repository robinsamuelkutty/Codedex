import java.io.*;
import java.io.FileReader;
public class lab2 {
    public static void main(String[] args) {
        char ch[]=new char[100];
        try{
            FileReader fr=new FileReader("lap2.txt");
            System.out.println("Reading content in the file:");
           
            fr.read(ch);
            System.out.println("reading completed");
            System.out.println(ch);

        }catch(Exception e){
            e.printStackTrace();
            System.out.println("error occured");
        }try{
            String rev="";
            FileWriter fw=new FileWriter("lab2cp.txt");
            for(int i=ch.length-1;i>=0;i--){
                    rev=rev+ch[i];
            }
            System.out.println(rev);
            fw.write(rev);
            fw.close();
            System.out.println("succesfully reversed");
            

        }
        catch(Exception e){
            e.printStackTrace();
            System.out.println("error occured");
        }
    }
}
