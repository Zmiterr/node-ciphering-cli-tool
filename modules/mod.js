function mod(char, padding) {
  let n = char;
  const p = padding;
  if (n < 0) {
    n = p - Math.abs(n) % p;
  }

  return n % p;
}

module.exports = {
  mod,
};
