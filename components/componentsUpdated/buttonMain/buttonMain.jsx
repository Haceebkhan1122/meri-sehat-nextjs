import React, { useState } from 'react'
import styles from '../buttonMain/buttonMain.module.scss'
import Router, { useRouter } from 'next/router';
import QRModal from '../qRModal/QRModal';
import { isMobile } from 'react-device-detect';

function buttonMain({ text, backgroundcolor, redirection, pageName }) {
   const router = useRouter()
   const [qRModalIsShow, setQRModalIsShow] = useState(false);

   const QrModalHandler = () => {
      setQRModalIsShow(true)
   }

   const handleRedirect = () => {
      router.push(redirection)
   }


   return (
      <>
         {pageName !== "ambulatory" ? (
            <>
               <button onClick={text && text == "TRY NOW" ? QrModalHandler : () => handleRedirect()} style={{ backgroundColor: backgroundcolor }} className={`${styles.button01} buttonWidth buttonWithBgColor_hover`}><span className='iconcall'></span>{text} <span className='arrowIcon'></span></button>
            </>
         ) : (
            <>
               {isMobile ? (
                  <>
                        <a href='tel:021111111111' style={{ backgroundColor: backgroundcolor }} className={`${styles.button01} buttonWidth buttonWithBgColor_hover`}><span className='iconcall'></span>{text} <span className='arrowIcon'></span></a>
                  </>
               ) : (
                  <>
                           <button onClick={() => QrModalHandler()} style={{ backgroundColor: backgroundcolor }} className={`${styles.button01} buttonWidth buttonWithBgColor_hover`}><span className='iconcall'></span>{text} <span className='arrowIcon'></span></button>
                  </>
               )}
            </>
         )}
         <QRModal pageName={pageName} qRModalIsShow={qRModalIsShow} setQRModalIsShow={setQRModalIsShow} />
      </>
   )
}

export default buttonMain