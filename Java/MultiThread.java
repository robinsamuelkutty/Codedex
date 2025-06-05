import java.util.Random;

class RandomNo extends Thread{
    public void run(){
        Random r=new Random();
        for(int i=0;i<10;i++){
            int n= r.nextInt(100);
            if(n%2==0){
                new Even(n).start();
            }else{
                new Odd(n).start();
            }
        }
    }
}
class Even extends Thread{
    private int num;
    Even(int n){
        this.num=n;
    }public void run(){
        System.out.println("the Number "+num+" is even\nSquare:"+num*num);
    }

}
class Odd extends Thread{
    private int num;
    Odd(int n){
        this.num=n;
    }public void run(){
        System.out.println("the Number "+num+" is odd\nCube:"+num*num*num);
    }

}

public class MultiThread {
    public static void main(String[] args) {
        RandomNo rn=new RandomNo();
        rn.start();
    }
    
}

