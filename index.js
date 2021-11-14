// const fs = require('fs');
// fs.existsSync(filePath) - проверка на наличие файла
const { Transform, pipeline } = require('stream');
const { stderr } = require('process');
const CLIParsedParams = require('./modules/getterArgs');
const atbash = require('./modules/athash');
const { shiftString } = require('./modules/shiftString');
const { checkCodeFlag } = require('./modules/checkCodeFlag');

/** ****** read from console */
const readable = process.stdin;
const writable = process.stdout;

const transform = new Transform({
  transform(chunk, encoding, callback) {
    let result = chunk.toString().trim();
    CLIParsedParams.config.split('-').forEach((cipherType) => {
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

pipeline(
  readable,
  transform,
  writable,
  (err) => {
    stderr.write(`Transform error: ${err}\n`);
    process.exit(1);
  },
);

// function getInputText() {
//   try {
//     const data = fs.readFileSync('input.txt', 'utf8');
//     // fc.createWriteStream()
//     // process.stdin
//     console.log(data);
//     return data;
//   } catch (err) {
//     console.error(err);
//   }
//   return '';
// }
//
// const stream = fs.createWriteStream('output.txt');
// stream.once('open', (fd) => {
//   stream.write(`${getInputText()}\n`);
//   stream.write('My second row\n');
//   stream.write(String(fd));
//   stream.end();
// });
