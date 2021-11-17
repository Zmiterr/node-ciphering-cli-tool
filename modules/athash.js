const fixedKey = 'zyxwvutsrqponmlkjihgfedcba';

function isUpperCase(letter) {
  const charCode = letter.charCodeAt(0);
  return charCode >= 65 && charCode <= 90;
}

function isLowerCase(letter) {
  const charCode = letter.charCodeAt(0);
  return charCode >= 97 && charCode <= 122;
}

function crypt(text) {
  let encrypted = '';
  for (let i = 0; i < text.length; i++) {
    let index = 0;

    if (isUpperCase(text[i])) {
      let reversedIndex = 0;

      const lower = text[i].toLowerCase();
      index = fixedKey.indexOf(lower);

      if (index < 0 && index >= -27) {
        reversedIndex = index * (-1);
      } else {
        reversedIndex = index;
      }

      let tempIndex = reversedIndex - 1 - 24;
      if (tempIndex < 0) {
        tempIndex *= (-1);
      } else {
        // eslint-disable-next-line no-self-assign
        tempIndex = tempIndex;
      }

      const reversedChar = fixedKey[tempIndex];

      encrypted += reversedChar.toUpperCase();
    } else if (isLowerCase(text[i])) {
      let reversedIndex = 0;

      const lower = text[i].toLowerCase();
      index = fixedKey.indexOf(lower);

      if (index < 0 && index >= -27) {
        reversedIndex = index * (-1);
      } else {
        reversedIndex = index;
      }

      let tempIndex = reversedIndex - 1 - 24;
      if (tempIndex < 0) {
        tempIndex *= (-1);
      } else {
        // eslint-disable-next-line no-self-assign
        tempIndex = tempIndex;
      }

      const reversedChar = fixedKey[tempIndex];
      encrypted += reversedChar;
    } else {
      encrypted += text[i];
    }
  }

  return encrypted;
}

module.exports = {
  crypt,
};
