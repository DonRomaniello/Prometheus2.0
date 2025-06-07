import React from 'react';

/**
 * FillerContent renders a person-square filler for the people grid.
 * @param {object} props
 * @param {object} props.filler - The filler object (quote/attribution or text)
 * @param {number} props.idx - The index for animation delay
 */
const FillerContent = ({ filler, idx }) => (
  <div 
    className="person-square filler-content"
    data-idx={idx}
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
);

export default FillerContent;
