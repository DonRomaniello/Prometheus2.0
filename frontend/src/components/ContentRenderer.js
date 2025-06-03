import React, { useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { useMarkdownContent } from '../hooks/useMarkdownContent';
import { useFillPeopleGrid } from '../hooks/useFillPeopleGrid';
import '../styles/layouts/content-renderer.css';
import '../styles/layouts/people.css';
import '../styles/layouts/layout-two-column.css';
import '../styles/layouts/layout-three-equal.css';
import '../styles/layouts/grid-auto-fit.css';

const ContentRenderer = ({ contentFile }) => {
  const { layout, firstHeader, remainingContent, loading, error, fillerContent } = useMarkdownContent(contentFile);
  const contentBodyRef = useRef(null);
  const isPeopleGrid = layout.includes('people-grid');
  const { gridRef, fillerNeeded } = useFillPeopleGrid({
    fillerContent: Array.isArray(fillerContent) ? fillerContent : [],
  });

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
      <div
        className="content-body"
        ref={isPeopleGrid ? gridRef : contentBodyRef}
      >
        <ReactMarkdown>{remainingContent}</ReactMarkdown>
        {isPeopleGrid && Array.isArray(fillerContent) && fillerContent.length > 0 && fillerNeeded > 0 && 
          fillerContent.slice(0, fillerNeeded).map((filler, idx) => (
            <div 
              key={`filler-${idx}`} 
              className="person-square filler-content"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              {filler.quote && filler.attribution ? (
                <div className="filler-quote">
                  <blockquote>"{filler.quote}"</blockquote>
                  <cite>&mdash; {filler.attribution}</cite>
                </div>
              ) : filler.text ? (
                <div className="filler-text">{filler.text}</div>
              ) : (
                <div className="filler-empty"></div>
              )}
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default ContentRenderer;