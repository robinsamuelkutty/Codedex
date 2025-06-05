import java.io.*;
public class FileCopy {
    public static void main(String[] args) {
        try{
            FileReader fr=new FileReader("filetextcp.txt");
            FileWriter fw=new FileWriter("copy.txt");
            int i;
            while((i=fr.read())!=-1){
                fw.write(i);
            }
            fr.close();
            fw.close();
        }catch(Exception e){
            e.printStackTrace();
            System.out.println("error occured");
        }
    }
}
