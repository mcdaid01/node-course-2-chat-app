const moment = require("moment");

const date = moment();
console.log(date.format('DD MMM YYYY'));

console.log(date.format('Do MMM YYYY'));


console.log( moment().format('MMMM Do YYYY, h:mm:ss a'));

console.log(moment().valueOf());// for time stamp


// add subtract

date.add(100,'year').subtract(9,"months");
console.log(date.format("MMM Do, YYYY"));


const date2= moment();
console.log(date2.format("h:mm a"));

const createdAt= 2343420;
const date3=moment(createdAt);
console.log(date3.format("h:mm a"));