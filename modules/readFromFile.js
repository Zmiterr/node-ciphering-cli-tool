const fs = require('fs');
const path = require('path');
const { input } = require('./getterArgs');

const readable = process.stdin;

const readFromFile = async () => {
  if (input) {
    try {
      await fs.promises.access(input, fs.constants.F_OK);
      return fs.createReadStream(path.resolve(input));
    } catch (err) {
      process.stderr.write(`File ${input} doesn't exist!\n`);
      process.exit(1);
    }
  }

  return readable;
};

module.exports = {
  readFromFile,
};
