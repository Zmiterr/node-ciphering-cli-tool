const fs = require('fs');
const { input } = require('./getterArgs');

const readable = process.stdin;

const readFromFile = async () => {
  if (input) {
    try {
      await fs.promises.access(input, fs.constants.F_OK);
      return fs.createReadStream(input);
    } catch (err) {
      process.stderr.write(`File ${input} doesn't exist!\n`);
      process.exit(0);
    }
  }

  return readable;
};

module.exports = {
  readFromFile,
};
