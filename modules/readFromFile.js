const fs = require('fs');
const { input } = require('./getterArgs');

const readable = process.stdin;

const readFromFile = () => {
  if (input) {
    return new Promise((resolve) => {
      fs.access(input, fs.constants.F_OK, (err) => {
        if (!err) {
          resolve(fs.createReadStream(input));
        } else {
          process.stderr.write(`File ${input} doesn't exist!\n`);
          process.exit(1);
        }
      });
    });
  }

  return readable;
};

module.exports = {
  readFromFile,
};
