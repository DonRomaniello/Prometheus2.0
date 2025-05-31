import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import matter from 'gray-matter';

const ContentRenderer = ({ contentFile }) => {
  const [firstHeader, setFirstHeader] = useState('');
  const [remainingContent, setRemainingContent] = useState('');
  const [frontmatter, setFrontmatter] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadContent = async () => {
      try {
        setLoading(true);
        setError(null);

        // Dynamic import of markdown file using gray-matter-loader
        const rawContent = await import(`../content/${contentFile}.md`);
        const parsed = matter(rawContent.default)
        console.log
        
        
        setFrontmatter(data);
        
        // Extract first header (h1, h2, h3)
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

  // Determine layout from frontmatter (default to 'default')
  const layout = frontmatter.layout || 'default';
  
  // Render based on layout
  const renderContent = () => {
    switch (layout) {
      case 'two-column':
        return (
          <div className="layout-two-column">
            {firstHeader && (
              <div className="content-header">
                <ReactMarkdown>{firstHeader}</ReactMarkdown>
              </div>
            )}
            <main className="area-main">
              <div className="container">
                <ReactMarkdown>{remainingContent}</ReactMarkdown>
              </div>
            </main>
            <aside className="area-sidebar">
              <div className="container">
                {frontmatter.sidebar && <ReactMarkdown>{frontmatter.sidebar}</ReactMarkdown>}
                {!frontmatter.sidebar && (
                  <div>
                    <h3>Navigation</h3>
                    <p>Additional content could go here.</p>
                  </div>
                )}
              </div>
            </aside>
          </div>
        );
        
      case 'three-column':
        return (
          <div className="layout-three-equal">
            {firstHeader && (
              <div className="content-header">
                <ReactMarkdown>{firstHeader}</ReactMarkdown>
              </div>
            )}
            <div className="area-left">
              <div className="container">
                <ReactMarkdown>{frontmatter.leftColumn || remainingContent}</ReactMarkdown>
              </div>
            </div>
            <div className="area-center">
              <div className="container">
                <ReactMarkdown>{frontmatter.centerColumn || ''}</ReactMarkdown>
              </div>
            </div>
            <div className="area-right">
              <div className="container">
                <ReactMarkdown>{frontmatter.rightColumn || ''}</ReactMarkdown>
              </div>
            </div>
          </div>
        );
        
      case 'full-width':
        return (
          <div className="content-renderer">
            {firstHeader && (
              <div className="content-header full-width">
                <ReactMarkdown>{firstHeader}</ReactMarkdown>
              </div>
            )}
            <div className="content-container full-width">
              <ReactMarkdown>{remainingContent}</ReactMarkdown>
            </div>
          </div>
        );
        
      default:
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
    }
  };

  return renderContent();
};

export default ContentRenderer;