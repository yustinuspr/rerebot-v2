/**
 * Function to return coinflip result
 * 1 = Head, 0 = Tail
 * @author ReachYourDream
 * @returns {string}
 */
function coinFlip() {
  const result = Math.round(Math.random());
  return result ? 'Head': 'Tail';
}

/**
 * Function to choose one of the input given
 *
 * @author ReachYourDream
 * @param {Array<string>} inputs
 * @returns {string}
 */
function choose(inputs = []) {
  const randomFloat = Math.random() * inputs.length;
  const randomInt = Math.floor(randomFloat);

  return inputs[randomInt];
}

module.exports = {
  choose,
  coinFlip,
};
