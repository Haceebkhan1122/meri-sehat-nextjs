/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
// import './nutritionTopReads.css';
// import i18n from '../../../i18n';
import SectionHeading from '../SectionHeading/SectionHeading';
import AnchorLink from "../ancerWithUnderline/anchorLink";
import RightArrowWithBorder from '../rightArrowWithBorder/RightArrowWithBorder';
import ArticleItemLists from '../articleItemLists/ArticleItemLists';
// import core_ad from '../../public/png/core_ad.png'
// import core_ad1 from '../../public/png/core_ad1.png'
// import core_ad2 from '../../public/png/core_ad2.png'
// import core_ad3 from '../../public/png/core_ad3.png'
import Image from 'next/image';


function NutritionTopReads(props) {

  const [imageCollection, setImageCollection] = useState([
    { image: '../../public/png/core_ad.png', link: 'https://getzpharma.com/product/core24/?c=pakistan&utm_source=MS&utm_medium=Banner&utm_campaign=MeriSehat' },
    { image: '../../public/png/core_ad1.png', link: 'https://getzpharma.com/product/livity/?c=pakistan&utm_source=MS&utm_medium=Banner&utm_campaign=MeriSehat' },
    { image: '../../public/png/core_ad2.png', link: 'https://getzpharma.com/product/agnar/?c=pakistan&utm_source=MS&utm_medium=Banner&utm_campaign=MeriSehat' },
    { image: '../../public/png/core_ad3.png', link: 'https://getzpharma.com/product/olcuf/?c=pakistan&utm_source=MS&utm_medium=Banner&utm_campaign=MeriSehat' },

  ])

  const [imageIndexToShow, setImageIndexToShow] = useState(null);

  useEffect(() => {
    setImageIndexToShow(Math.floor(Math.random() * imageCollection.length));
  }, [])


  const { widgetData = [], key } = props;

  const articleArr = widgetData?.data;

  const hasRedirect = widgetData?.redirect_url ? true : false;

  return (
    <section
      key={key}
      data-reference_widget_id={widgetData?.id}
      data-widget_id={widgetData?.widget_id}
      className="top_reads nutrition article dynamic-widget onlyParaShowPage aw"
    >
      <Container>
        <SectionHeading
          heading={widgetData?.heading}
          icon={hasRedirect && <RightArrowWithBorder />}
          link={
            hasRedirect && (
              <AnchorLink
                to={widgetData?.redirect_url}
                text={i18n.t('view_all')}
              />
            )
          }
        />
        <hr style={{ borderBottom: '0.3px solid #70707050', marginBottom: '30px' }} />
        <Row>
          <Col lg={9} md={12}>
            {articleArr?.map((item, index) => (
              <ArticleItemLists
                key={index}
                link={item?.data?.redirect_url}
                image={item?.data?.image}
                status={[]}
                heading={item?.data?.name}
                desc={item?.data?.descripton}
                btnText={
                  // i18n.t('read_more')
                  `Read more`
                }
                label={item?.data?.label}
              />
            ))}
          </Col>
          <Col md={3} className="pe-lg-0">
            <div className="add">
              <a href={imageCollection[imageIndexToShow]?.link} target='blank' ><Image src={imageCollection[imageIndexToShow]?.image} alt="advertisement" className='img-fluid w-100' /></a>
            </div>
            {/* <Image src={'../src/assets/images/png/core_ad' + parseInt(Math.floor(Math.random() * 4) + 1) + '.png'} className='img-fluid w-100' /> */}
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default NutritionTopReads;
