const { headMain } = require('./src/headLib.js');
const fs = require('fs');
const { log, error: err } = require('console');
const { exit } = require('process');

const main = () => {
  const args = process.argv.slice(2);
  const exitCode = headMain(fs.readFileSync, { log, err }, ...args);
  exit(exitCode);
};

main();
