import Link from 'next/link';
// import './ancerWithUnderlineSmall.css';
import React from 'react';

function AncerWithUnderlineSmall(props) {
    const { text, to, customclass, target, targetblank } = props;
    return (
        <div className="underline_ancer_smallContainer">
            {target ? (
                <a
                    target={target}
                    className={`underline_ancer_small ${customclass || ''}`}
                    href={to || ''}
                    {...props}
                >
                    {text || ''}
                </a>
            ) : (
                <Link
                    target={targetblank}
                    className={`underline_ancer_small ${customclass || ''}`}
                    href={to || ''}
                    {...props}
                >
                    {text || ''}
                </Link>
            )}
        </div>
    );
}

export default AncerWithUnderlineSmall;
