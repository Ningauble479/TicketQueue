const prompt = require('prompt-sync')();
const filePath = prompt('Enter the path of the file: ');

const fs = require('fs');

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(data);
});