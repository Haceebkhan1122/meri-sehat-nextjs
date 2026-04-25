import React from 'react';

function SectionInnerHeading(props) {
  const { text, color, fromFad } = props;
  return (
    <div>
      <h3
        dir="auto"
        className={fromFad ? "sectionInnerHeading section_heading_fad" : "sectionInnerHeading"}
        style={{ color: color || '' }}
      >
        {text || ''}
      </h3>
    </div>
  );
}

export default SectionInnerHeading;
