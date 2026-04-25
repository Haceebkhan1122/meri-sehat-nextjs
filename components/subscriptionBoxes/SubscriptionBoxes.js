/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import HeadingDescSmall from "../headingDescSmall/HeadingDescSmall";
import SubscriptionPakeges from '../subscriptionPakeges/SubscriptionPackages';
import { getSubscription } from '../../utils/api/SubscriptionApi';
// import i18n from '../../../i18n';
// import { useNavigate } from 'react-router-dom';
// import './subscriptionBoxes.css';
import check from '../../public/svg/check.svg'
import star from '../../public/svg/big-star.svg'
import Image from 'next/image';

function SubscriptionBoxes(props) {
  const { widgetData = [], id, widget_id } = props;

  const [loading, setLoading] = useState(true);
  const [subscription, setSubscription] = useState([]);

  // const navigate = useNavigate();

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        setLoading(true);
        let res = await getSubscription();
        if (res.code === 200) {
          setSubscription(res.data);
          setLoading(false);
        } else {
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
      }
    };
    fetchSubscription();
  }, []);

  const buySubs = async (value) => {
    if (value) {
      window.sessionStorage.setItem('subscription', JSON.stringify(value));
      // navigate('/subscription/payment-method');
    }
  }

  return (
    <section
      data-reference_widget_id={widgetData?.id}
      data-widget_id={widgetData?.widget_id}
      className="subscription subscriptionBoxes dynamic-widget"
    >
      <Container>
        <Row>
          <Col md={12}>
            <div className="subsContainer">
              {subscription?.map((item, index) => {
                return (
                  <SubscriptionPakeges
                    bordered={item?.is_starred}
                    themeColor={item?.color_code}
                    key={index}
                    image={item?.is_starred && star}
                    subsName={item?.name}
                    status={'status'}
                    timePeriod={item?.duration_text}
                    detail={
                      <p
                        dangerouslySetInnerHTML={{
                          __html: item?.description
                        }}
                      />
                    }
                    subsPrice={
                      item?.discounted_price
                        ? `Rs. ${item?.discounted_price}`
                        : `Rs. ${item?.price}`
                    }
                    discountedPrice={item?.discounted_price ? `Rs. ${item?.price}` : ''}
                    expiryDate={'expiryDate'}
                    btnText={i18n.t('buy_now')}
                    subsPointsHeading={item?.addon_heading}
                    subsPoints={item?.addon_text?.split(',').map((point) => (
                      <li>
                        <Image
                          style={{ backgroundColor: item?.color_code || '' }}
                          src={check}
                          alt="check"
                        />
                        <HeadingDescSmall text={point} />
                      </li>
                    ))}
                    onClick={() => buySubs(item)}
                  />
                );
              })}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default React.memo(SubscriptionBoxes);
