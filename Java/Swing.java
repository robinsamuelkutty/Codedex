import java.awt.*;
import java.awt.event.*;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JTextField;
public class Swingss extends Thread implements ActionListener{
    JFrame f;
    JTextField tf1,tf2,tf3;
    JButton btn;
    int a,res1,res2;
    JLabel l1,l2,l3;
    Swingss(){
        f=new JFrame("sample one");
        l1=new JLabel("enter the number");
        tf1=new JTextField(20);
        l2=new JLabel("Predessor");
        tf2=new JTextField(20);
        l3=new JLabel("Succesor");
        tf3=new JTextField(20);
        btn=new JButton("Get");
        JPanel p=new JPanel();
        btn.addActionListener(this);
        p.add(l1);
        p.add(tf1);
        p.add(l2);
        p.add(tf2);
        p.add(l3);
        p.add(tf3);
        p.add(btn);
        f.add(p);
        f.setSize(340,400);
        f.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        f.setVisible(true);
    }
    public void actionPerformed(ActionEvent e){
       
        if(e.getSource()==btn){
            a=Integer.parseInt(tf1.getText());
            res1=a+1;
            res2=a-1;
            tf2.setText(""+res2);
            tf3.setText(""+res1);
        }
       
        
    }
    public static void main(String[] args) {
        new Swingss();
    }


    }

