class Display {
    public synchronized void print(String msg){
        System.out.print("["+msg);
        try{
            Thread.sleep(1000);
        }catch(Exception e){
            e.printStackTrace();
            System.out.println("error occured");
        }
        System.out.print("]");
    }
}
class SynchThread extends Thread{
    private Display d;
    private String msg;
    public SynchThread(Display d,String msg){
        this.d=d;
        this.msg=msg;
    }
        public void run(){
            d.print(msg);
        }
}

public class ThreadSynch {
    public static void main(String[] args) {
        Display d=new Display();
        SynchThread t1=new SynchThread(d, "Hello");
        SynchThread t2=new SynchThread(d, "Aida robin");
        t1.start();
        t2.start();
    }
    
}

