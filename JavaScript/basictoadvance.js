// Basic to Advanced JavaScript Concepts

/******************************
 * 1. Variables and Data Types
 ******************************/
let name = "Robin";
const age = 23;
var isDeveloper = true;
let skills = ["JavaScript", "React", "Node.js"];

/********************************
 * 2. Functions (Regular & Arrow)
 ********************************/
function greet(user) {
  return `Hello, ${user}!`;
}

const add = (a, b) => a + b;

/***********************
 * 3. Objects & Classes
 ***********************/
const person = {
  name: "Aida",
  greet() {
    console.log(`Hi, I'm ${this.name}`);
  }
};

class Developer {
  constructor(name, stack) {
    this.name = name;
    this.stack = stack;
  }

  introduce() {
    console.log(`I'm ${this.name}, skilled in ${this.stack.join(", ")}`);
  }
}

/**************************
 * 4. Closures & Callbacks
 **************************/
function outerFunction(x) {
  return function innerFunction(y) {
    return x + y;
  };
}

function asyncTask(callback) {
  setTimeout(() => {
    console.log("Task done!");
    callback();
  }, 1000);
}

/*********************
 * 5. Promises & Async
 *********************/
function doAsyncWork() {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve("Work done!"), 1500);
  });
}

async function handleAsync() {
  try {
    const result = await doAsyncWork();
    console.log(result);
  } catch (error) {
    console.error("Error:", error);
  }
}

/**********************
 * 6. Array Operations
 **********************/
let numbers = [1, 2, 3, 4, 5];
let squared = numbers.map(n => n * n);
let even = numbers.filter(n => n % 2 === 0);
let sum = numbers.reduce((acc, n) => acc + n, 0);

/**********************
 * 7. Destructuring & Spread
 **********************/
const user = { name: "Robin", age: 23 };
const { name: userName, age: userAge } = user;

const newSkills = [...skills, "MongoDB"];
const clonedUser = { ...user, city: "Kerala" };

/*****************
 * 8. DOM & Events
 *****************/
// This only works in the browser environment
// document.getElementById("btn").addEventListener("click", () => alert("Clicked!"));

/*******************
 * 9. Error Handling
 *******************/
try {
  throw new Error("Something went wrong!");
} catch (e) {
  console.error(e.message);
} finally {
  console.log("Cleanup actions");
}

/*****************************
 * 10. Modules (ES6 Example)
 *****************************/
// Exporting (in module file)
// export const PI = 3.14;
// export function circleArea(r) { return PI * r * r; }

// Importing (in main file)
// import { PI, circleArea } from './math';

/*******************************
 * 11. Higher Order Functions
 *******************************/
function customMap(arr, fn) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(fn(arr[i]));
  }
  return result;
}

const doubled = customMap([1, 2, 3], n => n * 2);

/*******************************
 * 12. Advanced: Currying & Compose
 *******************************/
const curry = fn => a => b => fn(a, b);
const addCurried = curry((a, b) => a + b);

const compose = (f, g) => x => f(g(x));
const toUpper = x => x.toUpperCase();
const exclaim = x => `${x}!`;
const shout = compose(exclaim, toUpper);

console.log(shout("hello")); // Output: HELLO!

/*******************************
 * 13. Debounce & Throttle
 *******************************/
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

function throttle(fn, limit) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/*****************
 * Test Execution
 *****************/
console.log(greet("Robin"));
person.greet();
const dev = new Developer("Robin", skills);
dev.introduce();
handleAsync();
console.log(squared, even, sum);
console.log(userName, userAge, newSkills, clonedUser);
console.log(addCurried(2)(3)); // Output: 5
