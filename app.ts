const fs = require('fs');

const logFolder = 'Z:/Projekty/logs/m002/2022_mar';

function GetFiles(Location:string){
    return new Promise(function(resolve, reject) {
    fs.readdir(Location, (err: ErrorConstructor, files: string[]) => {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        else {
            resolve(files);
            console.log(files);
        }
    });
});
    
}

GetFiles(logFolder); 

