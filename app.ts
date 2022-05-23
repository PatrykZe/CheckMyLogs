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
  try {
  const Log = fs.readFileSync(LogPath,{encoding:'utf8', flag:'r'});
  return Log;
  } catch (err) {
    console.error(`Error occured while reading single log ${LogPath}!`, err);
  }
}


async function ChoseLog(logs:object) {
  
  for (const log in logs) {
    const LogData = await OpenLog(log);
    console.log(LogData);
  }
}





async function ReadLogs(){
  const logs_array = await ListDir(logFolder);  //Lista ze wszystkimi logami
  const abc = await ChoseLog(logs_array);
  // const logName = logs_array[0];                // TEST
  // const LogPath = `${logFolder}/${logName}`;   //choose single log 
  // const LogData = await OpenLog(LogPath);      //open single log
  // console.log(LogData);
}


ReadLogs();

