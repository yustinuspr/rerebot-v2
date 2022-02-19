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

module.exports = {
  coinFlip,
};