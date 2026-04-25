import React from "react";
import styles from "../../styles/FooterLogo.module.css";
import logo from "../../public/svg/meri-sehat-logo.svg";
import Image from "next/image";

function FooterLogo() {
  return (
    <div className={`${styles.footerLogo}`}>
      <Image src={logo} alt="logo" width={245} height={56} />
    </div>
  );
}

export default FooterLogo;
