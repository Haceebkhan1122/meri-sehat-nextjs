import React from 'react';

function BulletLink(props) {
  const { text, link, linkText } = props;
  return (
    <li>
      <div className="text">{text || ''}</div>
      {link && <a target="_blank" href={link || '/'}> {linkText || ''} </a>}
    </li>
  );
}

export default BulletLink;