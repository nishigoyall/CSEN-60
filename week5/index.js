// console.log("hello world")
// alert('Hello, world!');
//windows.document.write('<p>Welcome to CSEN 60!<p');

// document.append('<p>This should come after h1</p')

/*
 Function to calculate the sum of the two numbers.
 Inputs: a, b - numbers to be added.
 Output: reutrns the sum of a and b
*/

// TODO: fix this function

/**
 * @description this function adds two numbers
 * @param {*} a 
 * @param {*} b 
 * @returns 
 */

function add(a, b) {
    return a + b;
}

const x = 100;
/* let x => declaration*/
/* x = 2 =? initialization*/
if (true) {
    let x = 200; // Same variable!
}
console.log(x); // Outputs: 200

let y
y = null
let z = 0
console.log(y)

let greeting = "Hello, world!";
let response = `The time is ${new Date().getHours()}`;
console.log(response)

if (age > 18) {
    console.log("You are of age")
} else {
    console.log(`You aren't of age. Please wait ${18-age} years`)
}

let person = {
    name: "John",
    age: 30,
    isStudent: false
  };

console.log(person["age"])
console.log(typeof(person))

alert("This is a important message")

// Strict equality -- 1. are these the same type? 2. Are these the same value?
console.log(3 === '3'); // false

// Loose equality 2. Are these the same value?
console.log(3 === '3'); // true