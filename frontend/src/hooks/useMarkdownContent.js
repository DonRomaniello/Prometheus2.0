import { useState, useEffect } from 'react';

/**
 * Custom hook to fetch and parse markdown content with optional JSON layout block and header extraction.
 * @param {string} contentFile - The markdown file name (without extension) to fetch from /content/.
 * @returns {object} { layout, firstHeader, remainingContent, fillerContent, loading, error }
 */
export function useMarkdownContent(contentFile) {
  const [layout, setLayout] = useState('content-renderer');
  const [firstHeader, setFirstHeader] = useState('');
  const [remainingContent, setRemainingContent] = useState('');
  const [fillerContent, setFillerContent] = useState([]); // Add this state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadContent = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`/content/${contentFile}.md`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const markdownContent = await response.text();
        
        // Extract first JSON code block
        const jsonBlockMatch = markdownContent.match(/```json\s*([\s\S]*?)```/);
        let contentWithoutJsonBlock = markdownContent;
        
        if (jsonBlockMatch) {
          try {
            const parsed = JSON.parse(jsonBlockMatch[1]);
            
            // Set layout
            if (parsed.layout && Array.isArray(parsed.layout)) {
              setLayout(parsed.layout.join(' '));
            } else {
              setLayout('content-renderer');
            }
            
            // Extract filler content
            if (parsed.filler && Array.isArray(parsed.filler)) {
              setFillerContent(parsed.filler);
            } else {
              setFillerContent([]);
            }
            
          } catch (e) {
            console.error('Invalid JSON in code block:', e);
            setLayout('content-renderer');
            setFillerContent([]);
          }
          contentWithoutJsonBlock = markdownContent.replace(jsonBlockMatch[0], '').trim();
        } else {
          setLayout('content-renderer');
          setFillerContent([]);
        }
        
        // Extract first header (h1, h2, h3)
        const headerMatch = contentWithoutJsonBlock.match(/^(#{1,3})\s+(.+)$/m);
        if (headerMatch) {
          const [fullMatch, hashes, headerText] = headerMatch;
          setFirstHeader(`${hashes} ${headerText}`);
          setRemainingContent(contentWithoutJsonBlock.replace(fullMatch, '').trim());
        } else {
          setFirstHeader('');
          setRemainingContent(contentWithoutJsonBlock);
        }
      } catch (err) {
        console.error(`Error loading content file: ${contentFile}.md`, err);
        setError(`Could not load content for ${contentFile}`);
      } finally {
        setLoading(false);
      }
    };
    loadContent();
  }, [contentFile]);

  return { layout, firstHeader, remainingContent, fillerContent, loading, error };
}
