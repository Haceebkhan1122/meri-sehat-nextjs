import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Logo from "../../public/svg/meri-sehat-logo.svg";
import styles from './headerOnlyLogo.module.css';
import HeaderLogo from '../layout/HeaderLogo';
import LogoHeader from '../../public/svg/meri-sehat-logo.svg'
import call from "../../public/svg/call.svg";
import { useRouter } from 'next/router'
import useMediaQuery from '@mui/material/useMediaQuery';
import Image from 'next/image';
import Link from 'next/link';


const HeaderOnlyLogo = ({ toastAnnouce }) => {
  const isMobile = useMediaQuery('(max-width:768px)');
  const [uanNumber, setUanNumber] = useState("");
  const [hideAnnouncement, setHideAnnouncement] = useState(false);
  const [inFad, setInFad] = useState(false);
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== "undefined") {
      const number = window.localStorage.getItem("uan_number");
      if (number) {
        setUanNumber(number);
      }
    }
  }, []);

  useEffect(() => {
    let path = router.pathname;
    if (path === "/labs-payment-process") {
      setHideAnnouncement(true)
    }
    if (path === "/doctor-review") {
      setInFad(true)
    }

  }, [router.pathname])





  return (
    <div className={styles.wrapperHeaderOnlyWithUi}>
      {(hideAnnouncement && !isMobile) && <div className={styles.toastUiWrapper} style={!toastAnnouce ? { display: "none" } : {}}>
        {uanNumber && (
          <a
            href={`tel:${uanNumber}`}
            className={styles.UanNumberHeader}
          >
            <Image src={call} alt="close-icon" className={`me-2 ${styles.call_image}`} />
            <span> {uanNumber} </span>
          </a>
        )}
      </div>
      }
      {!hideAnnouncement && <div className={styles.toastUiWrapper} style={!toastAnnouce ? { display: "none" } : {}}>
        {uanNumber && (
          <a
            href={`tel:${uanNumber}`}
            className={styles.UanNumberHeader}
          >
            <Image src={call} alt="close-icon" className={`me-2 ${styles.call_image}`} />
            <span> {uanNumber} </span>
          </a>
        )}
      </div>
      }
      {!isMobile
        ?
        <Link href="/"><div className={inFad ? `${styles.wrapperHeaderOnly} ${styles.wrapperHeaderOnlyFad}` : styles.wrapperHeaderOnly} >
          <Image src={LogoHeader} alt='logo-header-only' className={styles.logoHeaderOnly} />
        </div></Link>
        :
        <div className={styles.wrapperHeaderOnlyMobile}>
          {isMobile && <div className={styles.wrapper_icon_left}> <span className={styles.svgBackIcon} onClick={() => router.back()}>  </span> </div>}
          {!inFad && <div className={styles.wrapper_icon_left_image}><Image src={LogoHeader} alt='logo-header-only' className={styles.logoHeaderOnlyMobile} /></div>}
          {inFad &&
            <div className={styles.skipDiv}>
              <span className={styles.reviewSkiping}> Review </span>
              <span className={styles.skipTxt}> Skip </span>
            </div>
          }
        </div>
      }
    </div>
  )
}

export default HeaderOnlyLogo;

