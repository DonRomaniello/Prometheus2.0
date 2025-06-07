/**
 * Parses markdown for people-grid entries.
 * Each entry is expected to be:
 * ![Person Name](image_url)
 * ## Person Name
 * bio text (can be multiline)
 *
 * @param {string} markdown
 * @returns {Array<{name: string, slug: string, image: string, bio: string}>}
 */
import { generateSlug } from './generateSlug';

function parseMarkdownPeople(markdown) {
  const personRegex = /!\[([^\]]*)\]\(([^)]+)\)\s*##\s*([^\n]+)\n+([\s\S]*?)(?=!?\[|$)/g;
  const people = [];
  let match;
  while ((match = personRegex.exec(markdown)) !== null) {
    const name = match[3].trim();
    people.push({
      name,
      slug: generateSlug(name),
      image: match[2].trim(),
      bio: match[4].trim()
    });
  }
  return people;
}

export default parseMarkdownPeople;
