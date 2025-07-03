import { useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import {
  useMarkdownContent,
  useFillPeopleGrid,
  useExpandableGrid,
  useContentBodyClass,
  useDynamicTitle,
  useIsMobile
} from '../hooks';
import '../styles/layouts/content-renderer.css';
import '../styles/layouts/people.css';
import { FillerContent, PersonCard } from './';


// Helper to detect external links
function isExternalLink(href) {
  return /^https?:\/\//.test(href);
}

const ContentRenderer = ({ contentFile, content, initialExpandedSlug = null, onPersonExpand = null }) => {
  const { layout, firstHeader, remainingContent, loading, error, fillerContent, people } = useMarkdownContent(contentFile);
  const contentBodyRef = useRef(null);
  const isPeopleGrid = layout.includes('people-grid');
  const { gridRef, fillerNeeded } = useFillPeopleGrid({
    fillerContent: Array.isArray(fillerContent) ? fillerContent : [],
  });
  const { isMobile, isSmallMobile } = useIsMobile();
  const { toggleExpanded, isExpanded, orderedItems, expandedItem } = useExpandableGrid(
    people, 
    gridRef, 
    initialExpandedSlug, 
    onPersonExpand
  );
  const contentBodyClass = useContentBodyClass(layout, isMobile, isSmallMobile);
  
  // Use dynamic title - show person name when expanded, otherwise show default header
  const displayTitle = useDynamicTitle(firstHeader, expandedItem);

  // Custom link renderer for ReactMarkdown
  const markdownComponents = {
    a: ({ node, ...props }) => (
      <a
        {...props}
        target={isExternalLink(props.href) ? '_blank' : undefined}
        rel={isExternalLink(props.href) ? 'noopener noreferrer' : undefined}
        onClick={e => {
          e.stopPropagation();
          if (isExternalLink(props.href)) {
            // Let browser handle opening in new tab
          } else {
            // For internal links, allow default behavior
          }
        }}
      >
        {props.children}
      </a>
    )
  };

  // If content is provided directly, use it instead of loading from file
  if (content) {
    return (
      <div className="container content-renderer">
        <div className="content-body">
          <ReactMarkdown components={markdownComponents}>{content}</ReactMarkdown>
        </div>
      </div>
    );
  }

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
      {displayTitle && (
        <div className={`content-header ${isPeopleGrid ? 'people-header' : ''}`}>
          <ReactMarkdown components={markdownComponents}>{displayTitle}</ReactMarkdown>
        </div>
      )}
      <div
        className={contentBodyClass}
        ref={isPeopleGrid ? gridRef : contentBodyRef}
      >
        {isPeopleGrid ? (
          <>
            {Array.isArray(orderedItems) && orderedItems.map((person, idx) => (
              <PersonCard
                key={person.name + idx}
                person={person}
                index={idx}
                isExpanded={isExpanded(idx)}
                onToggleExpanded={toggleExpanded}
              />
            ))}
            {Array.isArray(fillerContent) && fillerContent.length > 0 && fillerNeeded > 0 &&
              fillerContent.slice(0, fillerNeeded).map((filler, idx) => (
                <FillerContent key={`filler-${idx}`} filler={filler} idx={idx} />
              ))
            }
          </>
        ) : (
          <ReactMarkdown components={markdownComponents}>{remainingContent}</ReactMarkdown>
        )}
      </div>
    </div>
  );
};

export default ContentRenderer;

/**
 * ContentRenderer renders markdown content with optional people grid and filler logic.
 * @param {object} props
 * @param {string} [props.contentFile] - Path to markdown file
 * @param {string} [props.content] - Direct markdown content
 * @param {string} [props.initialExpandedSlug] - Slug of person to expand initially (for URL routing)
 * @param {function} [props.onPersonExpand] - Callback when person expansion changes (receives slug or null)
 */