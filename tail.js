const fs = require('fs');
const { exit } = require('process');
const { tailMain } = require('./src/tailLib.js');

const main = () => {
  try {
    console.log(tailMain(fs.readFileSync, ...process.argv.slice(2)));
  } catch (error) {
    console.log(error.message);
    exit(1);
  }
};

main();
