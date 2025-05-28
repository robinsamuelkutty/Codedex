
const generateBtn = document.getElementById("generateButton");

generateBtn.addEventListener("click",()=>{
  randomNumberPromise().then(()=>{
    console.log("Resolve: Number is less than 5")
  })
  .catch(()=>{
    console.log("Reject: Number is Greater than 5")
  });
)}; 



function randomNumberPromise(){
      const randomNumber = Math.floor(Math.random() * 10) + 1;
  console.log("Generated Number:", randomNumber);
  return new Promise((resolve,reject)=>{
    if(randomNumber<=5){
      resolve();
    }else{
      reject();
    }
  });
}

// Promises are objects that represent asynchronous operations that are either successful or unsuccessful.

// They come in three states:

// A "pending" state for an unfinished operation (default).
// A "fulfilled" state for a successful operation.
// A "rejected" state for an unsuccessful operation.
