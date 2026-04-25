import React from "react";
import Link from "next/link";
// import './simpleCard.css';

        function SimpleCard(props) {
        const { bgColor, children, link, fromFad, rightCarding } = props;

        return link ? (
            <Link href={link || "/"}>
            <div
                className={fromFad ? "card_fad_simple " : "card"}
                style={{ backgroundColor: bgColor }}
            >
                {children}
            </div>
            </Link>
        ) : (
            <div
            className={fromFad ? "card_fad_simple" : "card"}
            style={{ backgroundColor: bgColor }}
            >
            {children}
            </div>
        );
        }

        export default React.memo(SimpleCard);
