const { pipeline } = require('stream');
const { stderr } = require('process');
const { input, output } = require('./modules/getterArgs');
const { readFromFile } = require('./modules/readFromFile');
const { writeToFile } = require('./modules/writeToFile');
const { transform } = require('./modules/transform');

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
