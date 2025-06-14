import { useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import {
  useMarkdownContent,
  useFillPeopleGrid,
  useExpandableGrid,
  useDynamicTitle,
  useIsMobile
} from '../hooks';
import { FillerContent } from './';

const ContentRenderer = ({ contentFile, content, initialExpandedSlug = null, onPersonExpand = null }) => {
  const { layout, firstHeader, remainingContent, loading, error, fillerContent, people } = useMarkdownContent(contentFile);
  const contentBodyRef = useRef(null);
  const isPeopleGrid = layout.includes('people-grid');
  const { gridRef, fillerNeeded } = useFillPeopleGrid({
    fillerContent: Array.isArray(fillerContent) ? fillerContent : [],
  });
  const { isMobile, isSmallMobile } = useIsMobile(768);
  const { toggleExpanded, isExpanded, orderedItems, expandedItem } = useExpandableGrid(
    people, 
    gridRef, 
    initialExpandedSlug, 
    onPersonExpand
  );
  
  // Use dynamic title - show person name when expanded, otherwise show default header
  const displayTitle = useDynamicTitle(firstHeader, expandedItem);

  // If content is provided directly, use it instead of loading from file
  if (content) {
    return (
      <div className="container">
        <div className="content-body">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>
    );
  }

  if (loading) {
    return <div>Loading content...</div>;
  }

  if (error) {
    return (
      <div>
        <h2>Content Not Found</h2>
        <p>{error}</p>
        <p>Please check that the markdown file exists in the content directory.</p>
      </div>
    );
  }

  return (
    <div className={`container ${isPeopleGrid ? 'people-grid' : ''}`}>
      {displayTitle && (
        <div>
          <ReactMarkdown>{displayTitle}</ReactMarkdown>
        </div>
      )}
      <div
        className="content-body"
        ref={isPeopleGrid ? gridRef : contentBodyRef}
      >
        {isPeopleGrid ? (
          <>
            {Array.isArray(orderedItems) && orderedItems.map((person, idx) => (
              <div
                className={`person-card${isExpanded(idx) ? ' expanded' : ''}`}
                key={person.name + idx}
                onClick={() => toggleExpanded(idx)}
                style={{ cursor: 'pointer' }}
              >
                <img
                  src={person.image}
                  alt={person.name}
                  className={`person-image${isExpanded(idx) ? ' expanded' : ''}`}
                />
              </div>
            ))}
            {Array.isArray(fillerContent) && fillerContent.length > 0 && fillerNeeded > 0 &&
              fillerContent.slice(0, fillerNeeded).map((filler, idx) => (
                <FillerContent key={`filler-${idx}`} filler={filler} idx={idx} />
              ))
            }
          </>
        ) : (
          <ReactMarkdown>{remainingContent}</ReactMarkdown>
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