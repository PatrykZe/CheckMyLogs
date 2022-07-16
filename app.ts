const yargs = require('yargs/yargs');
const fs = require('fs');
const fsPromises = fs.promises;

const argv = yargs(process.argv.slice(2)).options({
  a: { 
  type: 'string', 
  default: "lte",
  describe: 'Szukany string'},
  l: { 
  type: 'string',
  demand: true,
  alias: 'file',
  describe: 'Ścieżka do logów'},
}).argv;



async function ListDir(path: string) {
  try {
    const DIR = fsPromises.readdir(path);
    return DIR;
  } catch (err) {
    console.error('Error occured while reading directory!', err);
  }
}

async function OpenLog(LogPath: string, Phrase: string) {
  
  const regEx = new RegExp(Phrase, "i");
  const result: string[] = [];
  
  try {
    fs.readFile(LogPath,'utf8', function (err:Error, contents:[]) {
  
    // console.log(contents, typeof(contents));
      let lines:string[] = contents.toString().split("\n");
            lines.forEach(line => {
                if (line && line.search(regEx) >= 0) {
                    // console.log('found in file ', line)   SRV
                    result.push(line)
                }
            })
            // console.log('finished search'); SRV
            return result;
  
  })} 
  catch (err) {
    console.error(`Error occured while reading single log ${LogPath}!`, err);
  }
}


// async function ChoseLog(logs:object) {
  
//   logs.sort(function(a, b) {
//     return a.age - b.age;
//   }); 

// }





async function ReadLogs(Path: string, Phrase: string){
  const logs_object = await ListDir(Path);        //Lista ze wszystkimi logami/ Zmiana zamiast "Log Folder"
  const logs_array = Object.values(logs_object); 
  
  let sortable = [];
for (var string in logs_array) {
    sortable.push(string,logs_array[string]);
}

const keysSorted = Object.keys(logs_array).sort(function(a){return list[b]})
console.log(keysSorted); 

console.log(sortable, typeof(sortable));
 
  
  const Result = logs_array.forEach((keys) => {OpenLog(`${Path}/${keys}`, Phrase)});



  // const LogPath = `${logFolder}/${logs_array[0]}`;    //Pierwszy log - Path
  // const Result = await OpenLog(LogPath);
  // console.log(Result);
  


  // const abc = await ChoseLog(logs_array);
  // const logName = logs_array[0];                // Nazwa pierwszego pliku z katalogu
  //   //choose single log 
  // const LogData = await OpenLog(LogPath);      //open single log
  // console.log(LogData);
}


ReadLogs(argv.l, argv.a);
