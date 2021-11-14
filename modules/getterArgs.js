const { argv, stderr } = require('process');

const paramsValidator = {
  '-c': {
    isRequired: true,
    validateVal: (val) => {
      if (val) {
        return ['config', val];
      }
      stderr.write('Config flag is empty!\n');
      process.exit(1);
      return [];
    },
  },
  '--config': {
    isRequired: true,
    validateVal: (val) => {
      if (val) {
        return ['config', val];
      }
      stderr.write('Config flag is empty!\n');
      process.exit(1);
      return [];
    },
  },
  '--input': {
    validateVal: (val) => {
      if (typeof val === 'string') {
        return ['input', val];
      }
      return [];
    },
  },
  '-i': {
    validateVal: (val) => {
      if (typeof val === 'string') {
        return ['input', val];
      }
      return [];
    },
  },
  '--output': {
    validateVal: (val) => {
      if (typeof val === 'string') {
        return ['output', val];
      }
      return [];
    },
  },
  '-o': {
    validateVal: (val) => {
      if (typeof val === 'string') {
        return ['output', val];
      }
      return [];
    },
  },
};

const args = argv.slice(2);
if (!args.length) {
  stderr.write('Args is empty!\n');
  process.exit(1);
}

const duplicates = args.filter((item, index) => args.indexOf(item) !== index);
if (duplicates.length) {
  stderr.write(`Args have duplicates: ${duplicates.join(', ')}\n`);
  process.exit(1);
}

const parsedParams = {};

args.forEach((val, index) => {
  const paramValidator = paramsValidator[val];

  if (paramValidator) {
    const [param, value] = paramValidator.validateVal(args[index + 1]);
    if (!paramsValidator[value]) {
      parsedParams[param] = value;
    } else {
      stderr.write('Flag payload is empty!\n');
      process.exit(1);
    }
  }
});

module.exports = parsedParams;
