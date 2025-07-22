const price = 2.50;
let campers = 15;
const taxRate = .08;
const budget = 40;

console.log(price);
console.log(campers);
console.log(taxRate);

const total = (price * (1 + taxRate)) * campers;
console.log(total);

const totalExceedsBudget = total > budget;
console.log("Total Exceeds Budget? " + totalExceedsBudget);

const taxApplied = total > (price * campers);
console.log("Tax Applied? " + taxApplied);