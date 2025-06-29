import React from 'react';
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
  return (
    <div
      className={`person-card${isExpanded ? ' expanded' : ''}`}
      onClick={() => onToggleExpanded(index)}
      style={{ cursor: 'pointer' }}
    >
      <div className={`person-content${isExpanded ? ' expanded' : ''}`}>
        <img
          src={person.image}
          alt={person.name}
          className={`person-image${isExpanded ? ' expanded' : ''}`}
        />
        {isExpanded && person.bio && (
          <div className="person-bio">
            <ReactMarkdown>{person.bio}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonCard;
