const fs = require('fs');

//Synchronous way
const files = fs.readdirSync('./')
console.log(files);

//Asynchornous way
fs.readdir('./', function (err, files) {
    if (err) console.log(`Error: ${err}`);
    else {
        console.log(files);
    }
})