const fs = require('fs')

fs.mkdirSync('data')

for (let i = 97; i <= 122; i++){
    const letter = String.fromCharCode(i);
    fs.mkdirSync(`data/${letter}`)
    console.log(`folder ${letter} created`)
}