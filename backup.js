import { spawn } from "child_process";
import moment from "moment";

const dbName = "agendaDB";
const compressionType = "--gzip";

// Function to backup the database
const backupDatabase = async () => {
  return new Promise((resolve, reject) => {
    // Get the current date and time formatted as YYYY-MM-DD_HH-mm-ss
    const currentDateTime = moment().format("YYYY-MM-DD_HH-mm-ss");

    // Set up the mongodump command with parameters
    const backupProcess = spawn("mongodump", [
      `--db=${dbName}`,
      `--archive=./backup-${currentDateTime}.gz`, // Include date and time in the filename
      compressionType,
    ]);

    // Handle the exit event of the backup process
    backupProcess.on("exit", (code, signal) => {
      if (code) {
        reject(new Error(`Backup process exited with code ${code}`));
      } else if (signal) {
        reject(new Error(`Backup process terminated with signal ${signal}`));
      } else {
        console.log(`Database "${dbName}" successfully backed up`);
        resolve();
      }
    });
  });
};

// Initiate the database backup
backupDatabase();

