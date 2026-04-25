import React from 'react';
import styles from "./trustBox.module.scss"
import Image from "next/image";
import parse from 'html-react-parser';

export default function TrustBox({ workshop }) {
    return (
        <div className={`${styles.trustBox} trustBoxGlobal `}>
            <h2>{workshop?.widgets?.[0]?.data?.[0]?.heading && parse(workshop?.widgets?.[0]?.data?.[0]?.heading)}</h2>
            <Image src={workshop?.widgets?.[0]?.data?.[0]?.image} width={442} height={82} />
            <div className={`${styles.boxLogoes}`}>
                {/* {workshop?.widgets?.[0]?.data?.map((item) => {
                    return (
                        <div>
                            <Image src={item?.image} width={70} height={70} />
                        </div>
                    )
                })} */}

            </div>
        </div>
    )
}
