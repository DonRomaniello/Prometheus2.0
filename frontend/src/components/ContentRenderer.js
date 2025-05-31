import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

const ContentRenderer = ({ contentFile }) => {
  const [content, setContent] = useState('');
  const [firstHeader, setFirstHeader] = useState('');
  const [remainingContent, setRemainingContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadContent = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Load markdown content from public folder
        const response = await fetch(`/content/${contentFile}.md`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const markdownContent = await response.text();
        
        // Extract first header (h1, h2, h3, adjust second number as needed)
        const headerMatch = markdownContent.match(/^(#{1,3})\s+(.+)$/m);
        
        if (headerMatch) {
          const [fullMatch, hashes, headerText] = headerMatch;
          setFirstHeader(`${hashes} ${headerText}`);
          // Remove the first header from content
          setRemainingContent(markdownContent.replace(fullMatch, '').trim());
        } else {
          setFirstHeader('');
          setRemainingContent(markdownContent);
        }
        
        setContent(markdownContent);
      } catch (err) {
        console.error(`Error loading content file: ${contentFile}.md`, err);
        setError(`Could not load content for ${contentFile}`);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [contentFile]);

  if (loading) {
    return <div className="content-loading">Loading content...</div>;
  }

  if (error) {
    return (
      <div className="content-error">
        <h2>Content Not Found</h2>
        <p>{error}</p>
        <p>Please check that the markdown file exists in the content directory.</p>
      </div>
    );
  }

  return (
    <div className="container content-renderer">
      {firstHeader && (
        <div className="content-header">
          <ReactMarkdown>{firstHeader}</ReactMarkdown>
        </div>
      )}
      <div className="content-body">
        <ReactMarkdown>{remainingContent}</ReactMarkdown>
      </div>
    </div>
  );
};

export default ContentRenderer;