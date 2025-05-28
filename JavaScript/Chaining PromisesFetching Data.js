const jokeContainer = document.getElementById("jokeContainer");
const getJokeBtn = document.getElementById("getJokeBtn");

function fetchJoke() {
  fetch("https://official-joke-api.appspot.com/random_joke")
    .then((response)=>response.json())
    .then((data)=>{
    const joke = `<p>${data.setup}</p><p>${data.punchline}</p>`;
      jokeContainer.innerHTML=joke;
  })
  .catch((error)=>{
    console.error("Error fetching joke:", error);
      jokeContainer.innerHTML = "<p>Failed to fetch joke. Please try again later.</p>";
  })
}

getJokeBtn.addEventListener("click", fetchJoke);
