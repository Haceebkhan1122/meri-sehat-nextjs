import React from 'react'
import styles from '../appLogo/appLogo.module.scss'
import Image from "next/image";
function appLogo({ iconAndLinks }) {
    return (
        <div className={`${styles.appLogoes} logoes`}>
            <button>
                <a href={iconAndLinks?.card_2_link} target="blank">
                    <Image src={iconAndLinks?.card_2_icon} height={70} width={209} className='img-fluid' alt="apple store"></Image>
                </a>
            </button>
            <a href={iconAndLinks?.card_3_link} target="blank">
                <button><Image src={iconAndLinks?.card_3_icon} height={70} width={236} className='img-fluid' alt="google store"></Image></button>
            </a>
        </div>
    )
}
export default appLogo;