const fs = require('fs');
const fsPromises = fs.promises;
const logFolder = 'Z:/Projekty/logs/m002/2022_mar';


async function ListDir(path: string) {
  try {
    const DIR = fsPromises.readdir(path);
    return DIR;
  } catch (err) {
    console.error('Error occured while reading directory!', err);
  }
}

async function OpenLog(LogPath:string) {
  
  const regEx = new RegExp("lte", "i");
  const result: string[] = [];
  
  try {
    fs.readFile(LogPath,'utf8', function (err:Error, contents:[]) {
  
    // console.log(contents, typeof(contents));
      let lines:string[] = contents.toString().split("\n");
            lines.forEach(line => {
                if (line && line.search(regEx) >= 0) {
                    console.log('found in file ', line)
                    result.push(line)
                }
            })
            console.log('finished search');
            return result;
  
  })} 
  catch (err) {
    console.error(`Error occured while reading single log ${LogPath}!`, err);
  }
}


// async function ChoseLog(logs:object) {
  
//   for (const log in logs) {
//     const LogData = await OpenLog();
//     console.log(LogData);
//   }
// }





async function ReadLogs(){
  const logs_object = await ListDir(logFolder);        //Lista ze wszystkimi logami
  const logs_array = Object.values(logs_object); 
  const Result = await logs_array.forEach((keys) => {OpenLog(`${logFolder}/${keys}`)});


  // const LogPath = `${logFolder}/${logs_array[0]}`;    //Pierwszy log - Path
  // const Result = await OpenLog(LogPath);
  // console.log(Result);
  


  // const abc = await ChoseLog(logs_array);
  // const logName = logs_array[0];                // Nazwa pierwszego pliku z katalogu
  //   //choose single log 
  // const LogData = await OpenLog(LogPath);      //open single log
  // console.log(LogData);
}


ReadLogs();

