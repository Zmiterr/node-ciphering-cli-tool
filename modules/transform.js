const { Transform } = require('stream');

const { config } = require('./getterArgs');
const atbash = require('./athash');
const { shiftString } = require('./shiftString');
const { checkCodeFlag } = require('./checkCodeFlag');

const transform = new Transform({
  transform(chunk, encoding, callback) {
    let result = chunk.toString().trim();
    config.split('-').forEach((cipherType) => {
      if (cipherType.includes('A')) {
        cipherType.split('').forEach(() => {
          result = atbash.crypt(result);
        });
      }
      if (cipherType.includes('R')) {
        result = shiftString(result, checkCodeFlag(cipherType));
      }
      if (cipherType.includes('C')) {
        result = shiftString(result, checkCodeFlag(cipherType));
      }
    });

    callback(null, `${result}\n`);
  },
});

module.exports = {
  transform,
};
