import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import AnchorLink from "../ancerWithUnderline/anchorLink";
import SimpleCard from "../simpleCard/SimpleCard";
import SectionInnerHeading from "../sectionInnerHeading/SectionInnerHeading";
import RightArrowWithBorder from "../rightArrowWithBorder/RightArrowWithBorder";
import SectionHeading from "../SectionHeading/SectionHeading";
import Image from 'next/image';
import { useRouter } from 'next/router';
import Cookies from "js-cookie";


function MostSearchedSpeciality(props) {
  const { widgetData = [], id, widget_id, specialtiesModal, setSpecialtiesModal, fetchDoctorByAllFilter } = props;
  const [fromFad, setFromFad] = useState(false);
  let router = useRouter()
  const [selectedCityCookie, setSelectedCityCookie] = useState()
  const [initialFetchDone, setInitialFetchDone] = useState(false);

  var storedCity = Cookies.get('selectedCity');
  useEffect(() => {
    try {
      if (storedCity) {
        const selectedCityFromCookie = JSON.parse(storedCity);
        setSelectedCityCookie(selectedCityFromCookie);
      } else {
        console.log('Cookie not found');
      }
    } catch (error) {
      console.error('Error parsing JSON from the cookie:', error);
    }

    // Set the flag to indicate that the initial fetch is done
    setInitialFetchDone(true);
  }, [storedCity]); // Include storedCity in the dependency array


  useEffect(() => {
    if (router.pathname == "/find-a-doctor") {
      setFromFad(true)
    }
    else {
      setFromFad(false)
    }
  }, [router.pathname]);


  return (
    <section
      data-reference_widget_id={widgetData?.id}
      data-widget_id={widgetData?.widget_id}
      className="mostSearchedSpeciality dynamic-widget"
    >
      <Container className={fromFad ? "container__fad_most_searched" : ""}>
        {widgetData?.data?.length > 0 && (
          <>
            <SectionHeading
              heading={widgetData?.heading}
              icon={<RightArrowWithBorder />}
              link={
                <AnchorLink fromFad={fromFad} to={widgetData?.redirect_url} setSpecialtiesModal={setSpecialtiesModal} text={`View All`} />
              }
            />
            <div className="mostSearchedSpecialityRow">
              {widgetData?.data?.slice(0, 5).map((item, index) => {
                return (
                  <div className={fromFad ? "mostSearchedSpecialityBox_carding_fad " : "mostSearchedSpecialityBox"} key={index}>
                    <SimpleCard link={fromFad ? `/doctors/${selectedCityCookie?.name}/${item?.speciality?.name.toLowerCase()}?page=1` : item?.speciality?.redirect_url}>
                      {item?.speciality?.image && (
                        <div className={fromFad ? "img_box_fad" : "imgBox "}>
                          <Image crossorigin="anonymous" src={item?.speciality?.image} alt="docImg" width={90} height={90} />
                        </div>
                      )}
                      {item?.speciality?.name && (
                        <div className="cardBody">
                          <SectionInnerHeading text={item?.speciality?.name} fromFad={true} />
                        </div>
                      )}
                    </SimpleCard>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </Container>
    </section>
  );
}

export default MostSearchedSpeciality;
