import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { isMobile } from 'react-device-detect';


function SectionHeading(props) {
  const { heading, children, colorHeading, icon, link, endText, fetchDoctorByAllFilter,onclick } = props;

  const [fromFad, setFromFad] = useState(false);
 
  let router = useRouter()

  useEffect(() => {
    if (router.pathname == "/find-a-doctor") {
      setFromFad(true)
    }
    else {
      setFromFad(false)
    }
  }, [router.pathname]);

  // const dispatch = useDispatch();
  // const userDetailsInfo = useSelector((state) => state.AuthReducer.user);

  // const mixPanelTracking = () => {
  //   mixpanel.track('Find the best Doctor view all', {
  //     'Name': userDetailsInfo?.name, 'Email': userDetailsInfo?.email, 'Number': userDetailsInfo?.phone
  //   });
  // }


  return (
    <>
    <section className={"findTheBestHealthCare hhhh"}>
      <Container className={fromFad ? "headWrapper__fad_most_searched" : ""}>
        <div className={fromFad ? "section-heading _border_Bottom d-flex row mobile_heading_fad" : "section-heading _border_Bottom d-flex row"}>
          <div onClick={onclick} className={fromFad ? "heading__mobile__fad" : ""} >
            <h2 dir="auto" className="text-initial fw-600 width100">
              {heading || ''}
              <span className="text-lowercase">{colorHeading || ''}</span>
              {endText || ''}
              {/* {heading || ''}<span className='text-lowercase'>{colorHeading && `${colorHeading}.`}</span>{endText || ''} */}
            </h2>
          </div>
          {children && <div className="children">{children || ''}</div>}
          {((fromFad || !fromFad) && !isMobile) && <div className="border_line" />}
          <div className={fromFad ? "btn_icon_box _underline_ancerView mobile__ancer__fad" : "btn_icon_box _underline_ancerView"}
          // onClick={mixPanelTracking}
          >
            {/* dynamic icon */}
            {icon || ''}
            {/* dynamic link */}
            {link || ''}
          </div>
        </div>
        {(fromFad && isMobile ) && <div className="border_line bordering__mobile_fad" />}
      </Container>
    </section>

      
    </>
  );
}
export default SectionHeading;
