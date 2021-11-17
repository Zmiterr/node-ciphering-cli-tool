const { stderr } = require('process');

function checkCodeFlag(cipherType) {
  switch (cipherType) {
    case 'C1':
      return 1;
    case 'C0':
      return -1;
    case 'R1':
      return 8;
    case 'R0':
      return -8;
    default:
      stderr.write(`Config parameter ${cipherType} is wrong!\n`);
      process.exit(1);
      return 0;
  }
}

module.exports = {
  checkCodeFlag,
};
