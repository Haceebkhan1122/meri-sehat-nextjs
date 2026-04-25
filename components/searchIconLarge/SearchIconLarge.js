import React from 'react';
import searchIcon from '../../public/svg/search-icon-large.svg'
import Image from 'next/image';

const searchIconLarge = () => (
  <div>
    <Image src={searchIcon} alt="searchIcon" />
  </div>
);

export default searchIconLarge;
