import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useMarkdownContent } from '../hooks/useMarkdownContent';

const ContentRenderer = ({ contentFile }) => {
  const { layout, firstHeader, remainingContent, loading, error } = useMarkdownContent(contentFile);

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
    <div className={`container ${layout}`}>
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