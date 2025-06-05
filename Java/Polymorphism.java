abstract class poly {
    abstract void noOfSides();
    
}
class Rectangle extends poly{
    void noOfSides(){
        System.out.println("no of sides:4");
    }
}
class Triangle extends poly{
    void noOfSides(){
        System.out.println("no of sides:3");
    }
}
class Hexagon extends poly{
    void noOfSides(){
        System.out.println("no of sides:6");
    }
}

public class Polymorphism {
    public static void main(String[] args) {
        Rectangle r=new Rectangle();
        Triangle t=new Triangle();
        Hexagon h=new Hexagon();
        r.noOfSides();
        t.noOfSides();
        h.noOfSides();
    }
    
}
