import React from 'react';
import logo from '../../public/svg/meri-sehat-logo.svg'
import Image from 'next/image';



function HeaderLogo() {
  return (
    <div className="headerLogo">

      <Image priority src={logo} alt="logo" />

    </div >
  );
}

export default HeaderLogo;
