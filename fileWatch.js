const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname,"template");

module.exports = ()=>{
    fs.watch(rootDir,{encoding:"UTF-8"},(eventType,fileName)=>{
        console.log(eventType)
    })
}