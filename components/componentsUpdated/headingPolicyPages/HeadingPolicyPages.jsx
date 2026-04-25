import React from 'react'
import styles from './headingPolicyPages.module.scss'
import MiniHeart from "../../../public/svg/newPages/miniHeart.svg";
import Image from "next/image";


const HeadingPolicyPages = (props) => {
    const { text, color } = props;

  return (
    <div className={`${styles.HeadingPolicyPages} HeadingPolicyPages`}>
        <div className={`${styles.groupedHeading} d-flex align-items-center`}>
            <Image src={MiniHeart} width={36} height={34} alt="Icon" className='' />
        <h1 className='ms-4'>
           {text} </h1>
        </div>
        </div>
  )
}


export default HeadingPolicyPages