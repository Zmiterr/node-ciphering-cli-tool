const { Transform, pipeline } = require('stream');
const { stderr } = require('process');
const { config, input, output } = require('./modules/getterArgs');
const atbash = require('./modules/athash');
const { shiftString } = require('./modules/shiftString');
const { checkCodeFlag } = require('./modules/checkCodeFlag');
const { readFromFile } = require('./modules/readFromFile');
const { writeToFile } = require('./modules/writeToFile');

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

async function returnCodeResult() {
  pipeline(
    await readFromFile(),
    transform,
    await writeToFile(),
    (err) => {
      stderr.write(`Transform error: ${err}\n`);
      process.exit(1);
    },
  );
}
returnCodeResult().then(() => {
  if (input && output) {
    process.exit(1);
  }
});
