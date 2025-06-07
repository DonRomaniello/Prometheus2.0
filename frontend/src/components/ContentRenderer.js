import { useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import {
  useMarkdownContent,
  useFillPeopleGrid,
  useExpandableGrid,
  useContentBodyClass,
  useIsMobile
} from '../hooks';
import '../styles/layouts/content-renderer.css';
import '../styles/layouts/people.css';
import '../styles/layouts/layout-two-column.css';
import '../styles/layouts/layout-three-equal.css';
import '../styles/layouts/grid-auto-fit.css';
import { FillerContent } from './';

const ContentRenderer = ({ contentFile, content }) => {
  const { layout, firstHeader, remainingContent, loading, error, fillerContent, people } = useMarkdownContent(contentFile);
  const contentBodyRef = useRef(null);
  const isPeopleGrid = layout.includes('people-grid');
  const { gridRef, fillerNeeded } = useFillPeopleGrid({
    fillerContent: Array.isArray(fillerContent) ? fillerContent : [],
  });
  const { isMobile, isSmallMobile } = useIsMobile(768);
  const { toggleExpanded, isExpanded, orderedItems } = useExpandableGrid(people, gridRef);
  const contentBodyClass = useContentBodyClass(layout, isMobile, isSmallMobile);

  // If content is provided directly, use it instead of loading from file
  if (content) {
    return (
      <div className="container content-renderer">
        <div className="content-body">
          <ReactMarkdown>{content}</ReactMarkdown>
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
      {firstHeader && (
        <div className={`content-header ${isPeopleGrid ? 'people-header' : ''}`}>
          <ReactMarkdown>{firstHeader}</ReactMarkdown>
        </div>
      )}
      <div
        className={contentBodyClass}
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
 */