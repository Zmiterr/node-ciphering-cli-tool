const fs = require('fs');
const { output } = require('./getterArgs');

const writable = process.stdout;

const writeToFile = async () => {
  if (output) {
    try {
      await fs.promises.access(output, fs.constants.F_OK);
      return fs.createWriteStream(output, { flags: 'a' });
    } catch (err) {
      process.stderr.write(`File ${output} doesn't exist!\n`);
      process.exit(0);
    }
  }

  return writable;
};

module.exports = {
  writeToFile,
};
