/**
 * Parses markdown for people-grid entries.
 * Each entry is expected to be:
 * ![Person Name](image_url)
 * ## Person Name
 * bio text (can be multiline)
 *
 * @param {string} markdown
 * @returns {Array<{name: string, image: string, bio: string}>}
 */
function parseMarkdownPeople(markdown) {
  const personRegex = /!\[([^\]]*)\]\(([^)]+)\)\s*##\s*([^\n]+)\n+([\s\S]*?)(?=!?\[|$)/g;
  const people = [];
  let match;
  while ((match = personRegex.exec(markdown)) !== null) {
    people.push({
      name: match[3].trim(),
      image: match[2].trim(),
      bio: match[4].trim()
    });
  }
  return people;
}

export default parseMarkdownPeople;
