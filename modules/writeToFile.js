const fs = require('fs');
const { output } = require('./getterArgs');

const writable = process.stdout;

const writeToFile = () => {
  if (output) {
    return new Promise((resolve) => {
      fs.access(output, fs.constants.F_OK, (err) => {
        if (!err) {
          resolve(fs.createWriteStream(output, { flags: 'a' }));
        } else {
          process.stderr.write(`File ${output} doesn't exist!\n`);
          process.exit(0);
        }
      });
    });
  }

  return writable;
};

module.exports = {
  writeToFile,
};
