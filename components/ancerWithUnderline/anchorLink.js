import Link from 'next/link';
import React, { useState } from 'react';
import Cookies from 'js-cookie';


function AnchorLink(props) {

    const { text, to, target, differentSite, fromFad } = props;

    const onModalShow = () => {
        Cookies.set('specModal', 1)
        // Trigger a custom event to notify other components about the change
        const event = new Event('specModalCookieChange');
        window.dispatchEvent(event);
    }

    return (
        <div>
            {!fromFad ? (
                <>
                    {differentSite ? (
                        <a className='underline_ancer' href={to || '#'}>
                            {text || ''}
                        </a>
                    ) : (
                        <Link className='underline_ancer' target={target} href={to || ''}>
                            {text || ''}
                        </Link>
                    )}

                </>
            ) : (
                <>
                    <span className='underline_ancer' onClick={onModalShow} style={{ cursor: 'pointer' }}>
                        View All
                    </span>
                </>
            )}

        </div>
    );
}

export default AnchorLink;
