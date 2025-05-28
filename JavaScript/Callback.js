const subscribeBtn = document.getElementById("subscribeBtn");
const message = document.getElementById("message");

subscribeBtn.addEventListener("click" ,()=>{
  subscribeBtn.innerText="Subscribed";
  message.classList.remove("hidden");
  setTimeout(()=>message.classList.add("hidden"),3000);
});
//Callback functions are passed as arguments into a parent function. We don't execute these functions directly. Instead, they are called in the parent function under some conditions
