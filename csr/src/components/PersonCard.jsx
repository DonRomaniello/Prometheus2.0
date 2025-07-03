import useIsMobile from '../hooks/useIsMobile';
import ReactMarkdown from 'react-markdown';

/**
 * PersonCard renders an individual person card with expansion capability
 * @param {object} props
 * @param {object} props.person - The person object {name, slug, image, bio}
 * @param {number} props.index - The index of this person in the grid
 * @param {boolean} props.isExpanded - Whether this card is currently expanded
 * @param {function} props.onToggleExpanded - Callback to toggle expansion state
 */
const PersonCard = ({ person, index, isExpanded, onToggleExpanded }) => {
  const { isMobile } = useIsMobile();
  return (
    <div
      className={`person-card${isExpanded ? ' expanded' : ''}${isMobile ? ' mobile' : ''}`}
      onClick={() => onToggleExpanded(index)}
      style={{ cursor: 'pointer' }}
    >
      <div className={`person-content${isExpanded ? ' expanded' : ''}${isMobile ? ' mobile' : ''}`}>
        <img
          src={person.image}
          alt={person.name}
          className={`person-image${isExpanded ? ' expanded' : ''}${isMobile ? ' mobile' : ''}`}
        />
        {isExpanded && person.bio && (
          <div className={`person-bio${isMobile ? ' mobile' : ''}`}>
            <ReactMarkdown>{person.bio}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonCard;
