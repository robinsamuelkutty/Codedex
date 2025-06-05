import java.util.Scanner;
public class Account {
    int balance;
    public Account(){
         balance=0;
    }
    public Account(int ammount){
        balance=balance+ammount;
    }
    public void credit(Scanner sc){
        int crd;
        System.out.println("amount to credit");
        crd=sc.nextInt();
        balance=balance+crd;
        System.out.println("balance after credit");
        System.out.println(balance);
    }
    public void debit(Scanner sc){
        int dbt;
        System.out.println("amount to debit");
        dbt=sc.nextInt();
        if(balance<dbt){
            System.out.println("insuffient balance");
        }
        else{
            balance=balance-dbt;
            System.out.println("balance after debit:"+balance);
            
        }
    }
    public static void main(String[] args) {
        Scanner sc=new Scanner(System.in);
        int amt;
        System.out.println("enter the amount in the accoount");
        amt=sc.nextInt();
        Account acc=new Account(amt);
        acc.credit(sc);
        acc.debit(sc);
    }
}
