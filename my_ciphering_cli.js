const { pipeline } = require('stream');
const { stderr } = require('process');
const { readFromFile } = require('./modules/readFromFile');
const { writeToFile } = require('./modules/writeToFile');
const { transform } = require('./modules/transform');

(async function returnCodeResult() {
  pipeline(
    await readFromFile(),
    transform,
    await writeToFile(),
    (err) => {
      if (err) {
        stderr.write(`Transform error: ${err}\n`);
        process.exit(1);
      }
    },
  );
}());
