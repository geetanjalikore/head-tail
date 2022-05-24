const { headMain } = require('./src/headLib.js');
const fs = require('fs');
const { exit } = require('process');

const main = () => {
  let exitCode;
  try {
    const args = process.argv.slice(2);
    exitCode = headMain(fs.readFileSync, console, ...args);
    exit(exitCode);
  } catch (error) {
    console.error(error.message);
    exit(1);
  }
};

main();
