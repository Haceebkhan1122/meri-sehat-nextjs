import React from 'react'
import rightArrow from '../../public/svg/sachan1.svg'
import Image from 'next/image';

const RightArrowWithoutBorder = () => {
  return (
    <div>
      <Image className='without-border-arrow' src={rightArrow} alt='arrow' />
    </div>
  )
}

export default RightArrowWithoutBorder