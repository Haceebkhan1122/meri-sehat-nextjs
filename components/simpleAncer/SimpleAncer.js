import Link from 'next/link';
// import './simpleAncer.css';
import React from 'react';
import styles from "../../styles/SimpleAncer.module.css";

function SimpleAncer(props) {
  const { text, to, children, bgColor, customClass } = props;
  function getColorType(type) {
    if (type === 'green') {
      return '#72d54a';
    } else if (type === 'yellow') {
      return '#f5d730';
    } else if (type === 'pink') {
      return '#ef6286';
    } else if (type === 'blue') {
      return '#29bcc1';
    } else if (type === 'orange') {
      return '#ff8900';
    } else {
      return type;
    }
  }
  return (
    <div>
      <Link
        className={`${styles.simple_ancer} ${customClass}`}
        href={to || '/'}
        style={{ backgroundColor: getColorType(bgColor) }}
        redirectTo={props?.redirectTo}
      >
        {children}
        <div>{text || ''}</div>
      </Link>
    </div>
  );
}

export default SimpleAncer;
