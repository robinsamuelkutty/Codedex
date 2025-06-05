import java.awt.Color;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.SwingConstants;

public class Calculator implements ActionListener{
JFrame jf;
JLabel dl;
JButton seven;
JButton eight;
JButton nine;
JButton four;
JButton five;
JButton six;
JButton one;
JButton two;
JButton three;
JButton dot;
JButton zero;
JButton equal;
JButton div;
JButton sub;
JButton mul;
JButton add,clear;

double first;
double second;
String operations="";
String answer="";

 Calculator() {
    jf=new JFrame("Calculator");
    jf.setSize(600,500);
    jf.setLayout(null);
    jf.setVisible(true);
    jf.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    jf.setLocation(400,150);
   
    dl=new JLabel("");
    dl.setBounds(30, 50, 540, 40);
    dl.setBackground(Color.LIGHT_GRAY);
    dl.setOpaque(true);
    jf.add(dl);
    dl.setHorizontalAlignment(SwingConstants.RIGHT);
   
    seven=new JButton("7");
    seven.setBounds(30, 130, 60, 60);
    jf.add(seven);
    seven.addActionListener(this);
   
    eight=new JButton("8");
    eight.setBounds(110, 130, 60, 60);
    jf.add(eight);
    eight.addActionListener(this);
   
    nine=new JButton("9");
    nine.setBounds(190, 130, 60, 60);
    jf.add(nine);
    nine.addActionListener(this);
   
    four=new JButton("4");
    four.setBounds(30, 210, 60, 60);
    jf.add(four);
    four.addActionListener(this);
   
    five=new JButton("5");
    five.setBounds(110, 210, 60, 60);
    jf.add(five);
    five.addActionListener(this);
   
    six=new JButton("6");
    six.setBounds(190, 210, 60, 60);
    jf.add(six);
    six.addActionListener(this);
   
    one=new JButton("1");
    one.setBounds(30, 290, 60, 60);
    jf.add(one);
    one.addActionListener(this);
   
    two=new JButton("2");
    two.setBounds(110, 290, 60, 60);
    jf.add(two);
    two.addActionListener(this);
   
    three=new JButton("3");
    three.setBounds(190, 290, 60, 60);
    jf.add(three);
    three.addActionListener(this);
   
    dot=new JButton(".");
    dot.setBounds(30, 370, 60, 60);
    jf.add(dot);
    dot.addActionListener(this);
   
    zero=new JButton("0");
    zero.setBounds(110, 370, 60, 60);
    jf.add(zero);
    zero.addActionListener(this);
   
    equal=new JButton("=");
    equal.setBackground(Color.RED);
    equal.setOpaque(true);
    equal.setBounds(190, 370, 60, 60);
    jf.add(equal);
    equal.addActionListener(this);
   

    div=new JButton("/");
    div.setBackground(Color.orange);
    div.setOpaque(true);
    div.setBounds(270, 130, 60, 60);
    jf.add(div);
    div.addActionListener(this);
   
    mul=new JButton("*");
    mul.setBackground(Color.orange);
    mul.setOpaque(true);
    mul.setBounds(270, 210, 60, 60);
    jf.add(mul);
    mul.addActionListener(this);
   
    sub=new JButton("-");
    sub.setBackground(Color.orange);
    sub.setOpaque(true);
    sub.setBounds(270, 290, 60, 60);
    jf.add(sub);
    sub.addActionListener(this);
   
    add=new JButton("+");
    add.setBackground(Color.orange);
    add.setOpaque(true);
    add.setBounds(270, 370, 60, 60);
    jf.add(add);
    add.addActionListener(this);
 
    clear=new JButton("C");
    clear.setBackground(Color.orange);
    clear.setOpaque(true);
    clear.setBounds(350, 130, 60, 60);
    jf.add(clear);
    clear.addActionListener(this);
 
 
   }
 public static void main(String[] args) {

new Calculator();
  }

public void actionPerformed(ActionEvent e) {
if(e.getSource()==seven) {
   dl.setText(dl.getText()+"7");
}else if(e.getSource()==eight) {
dl.setText(dl.getText()+"8");
}else if(e.getSource()==nine) {
dl.setText(dl.getText()+"9");
}else if(e.getSource()==four) {
dl.setText(dl.getText()+"4");
}else if(e.getSource()==five) {
dl.setText(dl.getText()+"5");
}else if(e.getSource()==six) {
dl.setText(dl.getText()+"6");
}else if(e.getSource()==one) {
dl.setText(dl.getText()+"1");
}else if(e.getSource()==two) {
dl.setText(dl.getText()+"2");
}else if(e.getSource()==three) {
dl.setText(dl.getText()+"3");
}else if(e.getSource()==dot) {
dl.setText(dl.getText()+".");
}else if(e.getSource()==zero) {
dl.setText(dl.getText()+"0");
}else if(e.getSource()==equal) {
double result;
second=Double.parseDouble(dl.getText());
if(operations=="+") {
result=first+second;
answer=String.valueOf(result);
dl.setText(answer);
}
else if(operations=="/") {
result=first/second;
answer=String.valueOf(result);
dl.setText(answer); }

else if(operations=="-") {
result=first-second;
answer=String.valueOf(result);
dl.setText(answer); }

else if(operations=="*") {
result=first*second;
answer=String.valueOf(result);
dl.setText(answer); }


}else if(e.getSource()==div) {

first=Double.parseDouble(dl.getText());
dl.setText("");
operations="/";
}else if(e.getSource()==mul) {

first=Double.parseDouble(dl.getText());
dl.setText("");
operations="*";
}else if(e.getSource()==sub) {

first=Double.parseDouble(dl.getText());
dl.setText("");
operations="-";
}else if(e.getSource()==add) {

first=Double.parseDouble(dl.getText());
dl.setText("");
operations="+";
}else if(e.getSource()==clear){
dl.setText("");
}

}
}
