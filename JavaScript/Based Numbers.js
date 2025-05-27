const myNumber = 3;
let binary = "";


for (let i = myNumber; i >= 1 ; i = Math.floor(i/2)) {
  if (i % 2 == 0) {
    binary = "0" + binary;
  } else {
    binary = "1" + binary;
  }
}
console.log('With for loop: ' + binary);
