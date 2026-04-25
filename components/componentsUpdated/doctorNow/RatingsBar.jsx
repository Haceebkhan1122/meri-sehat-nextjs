import { Col, Container, Row } from 'react-bootstrap';
import styles from './ratingsBar.module.scss';
import parse from 'html-react-parser';

const RatingsBar = (props) => {

    return (
        <section className={(props.page === "sehat-scan" || props.page === "pricing") ? "d-none" : `${styles.ratingsBar} ratingsBar`} >
            <Container className='h-100'>
                <Row className='h-100'>
                    <Col
                        lg={
                            props?.widgetData?.slug === "find-a-doctor-v3"
                                ? 6
                                : (props?.pageName === "corporate-wellness-program-workshop" || props?.pageName === "doctor-now-v3" ? 8 : 12)
                        }
                        className='mx-auto'
                    >
                        <div className={`${styles.wrape_rate} boxRating dd`}>
                            {props?.widgetData?.data?.map((item) => (<>
                                <Col lg={3} className='newBox'>
                                    <div className={`${styles.single_rate} rateMiddle`}>
                                        <h2> {item?.heading && parse(item?.heading)}  </h2>
                                        <span> {item?.description && parse(item?.description)}  </span>
                                    </div>
                                </Col>
                            </>))}
                        </div>
                    </Col>



                </Row>
            </Container>
        </section>
    )
}

export default RatingsBar;
