const fs = require('fs');
const fsPromises = fs.promises;
const logFolder = 'Z:/Projekty/logs/m002/2022_mar';


async function listDir(path: string) {
  try {
    const DIR = fsPromises.readdir(path);
    return DIR;
  } catch (err) {
    console.error('Error occured while reading directory!', err);
  }
}

async function OpenLog(LogPath:string) {
  const Log = fs.readFileSync(LogPath,{encoding:'utf8', flag:'r'});
  return Log; 
}

async function ReadLogs(){
  const ABC = await listDir(logFolder); 
  const logName = ABC[0];
  const LogPath = `${logFolder}/${logName}`;
  const LogData = await OpenLog(LogPath);
  console.log(LogData);
}


ReadLogs();

