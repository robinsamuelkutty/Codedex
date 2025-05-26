
let player=0;
let computer =Math.floor(Math.random() * 3);
const choice=["Rocks","Paper","Scissors"];
console.log("Player Picked: " + choice[player])
console.log("Computer Picked: " + choice[computer])
if (player==0 && computer==2 || player==2 && computer==1 || player==1 && computer==0){
  console.log("The Player Won")
}else if(player==computer){
  console.log("Draw")
}else{
  console.log("The Computer won")
}





