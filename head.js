const fs = require('fs');
const { headMain } = require('./src/headLib.js');

const main = (args) => {
  const { log, error } = console;
  try {
    process.exitCode = headMain(fs.readFileSync, { log, error }, ...args);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
};

main(process.argv.slice(2));
