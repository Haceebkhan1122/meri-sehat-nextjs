import { Container } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
// import './NewBanner.css';
import AnimatedBanner from './AnimatedBanner';
import NormalBanner from './NormalBanner';
import { useRouter } from 'next/router';

const NewBanner = (props) => {
    const router = useRouter();
    const { widgetData = [], key } = props;

    const data = [
        // <AnimatedBanner widgetData={widgetData} />,
        <NormalBanner widgetData={widgetData} />
        // <p>lol</p>
    ]


    const [mainFrontRandom, setMainFrontRandom] = useState(null);

    const compDisplay = () => {
        const randomDisplay = Math.floor(Math.random() * data.length);
        setMainFrontRandom(data[randomDisplay])
    }

    useEffect(() => {
        compDisplay()
    }, [])


    return (
        <section className='hk_pt'>
            <Container>
                {router?.pathname === '/' ? (
                    <>
                        {/* {mainFrontRandom} */}
                        <NormalBanner widgetData={widgetData} />
                        {/* <p> LOL </p> */}
                    </>
                ) : null}


            </Container>
        </section >

    )
}

export default NewBanner;






