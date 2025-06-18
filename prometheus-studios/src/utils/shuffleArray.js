/**
 * Fisher-Yates shuffle algorithm to randomize array order
 * @param {Array} array - Array to shuffle
 * @returns {Array} - New shuffled array (does not mutate original)
 */
export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};
