import React from 'react';

function SectionHeadingMed(props) {
  const { text, color, className } = props;
  const initialClass = "text-initial fontSizeMobile fw-600 border-bottom-0";
  return (
    <div className='section-med '>
      <h2 dir="auto" className={`${initialClass} ${className}`} style={{ color }}>
        {text || ''}
      </h2>
    </div>
  );
}

export default SectionHeadingMed;
