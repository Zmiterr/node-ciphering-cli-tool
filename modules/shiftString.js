const { mod } = require('./mod');

function shiftString(msg, stingKey) {
  const key = parseInt(stingKey, 10);
  let encMsg = '';

  for (let i = 0; i < msg.length; i++) {
    let code = msg.charCodeAt(i);

    // Encrypt only letters in 'A' ... 'Z' interval
    if (code >= 65 && code <= 65 + 26 - 1) {
      code -= 65;
      code = mod(code + key, 26);
      code += 65;
    }
    // Encrypt only letters in 'a' ... 'z' interval
    if (code >= 97 && code <= 97 + 26 - 1) {
      code -= 97;
      code = mod(code + key, 26);
      code += 97;
    }

    encMsg += String.fromCharCode(code);
  }

  return encMsg;
}

module.exports = {
  shiftString,
};
