class Employee {
    void displayname(){
        System.out.println("Employee name:");
    }
    void printsalary(){
        System.out.println("the salary of employee:");
    }
}
class Engineer extends Employee{
    void displayname(){
        super.displayname();
        System.out.println("Robin ");
    }
    void printsalary(){
        super.printsalary();
        System.out.println("1 crore per month");
    }
}

public class inheritance {
    public static void main(String[] args) {
        Engineer er=new Engineer();
        er.displayname();
        er.printsalary();
    }
    
}
