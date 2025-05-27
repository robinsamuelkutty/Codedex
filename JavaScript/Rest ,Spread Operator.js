function planVacation(destinationOne, destinationTwo, ...otherDestinations) {
  return [destinationOne, destinationTwo, ...otherDestinations];
}


const vacationPlan = planVacation(
  "Paris 🇫🇷",
  "Tokyo 🇯🇵",
  "Cape Town 🇿🇦",
  "Rio de Janeiro 🇧🇷",
  "Sydney 🇦🇺"
);

console.log("Intercontinental Vacation Plan:", vacationPlan);
