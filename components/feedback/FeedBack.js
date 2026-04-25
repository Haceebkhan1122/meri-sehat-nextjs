import React, { useState, useEffect } from 'react';
import { Radio } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/fontawesome-free-solid';
import { SectionHeadingSmall } from '../SectionHeadingSmall';
import { useSelector } from 'react-redux';


function FeedBack(props) {
    const { onValueChange = () => { } } = props;
    const [value, setValue] = useState(0);
    const [color, setColor] = useState(0);

    const onChange = (e) => {
        const { value } = e.target;
        setValue(value);
        if (!value) return;
        onValueChange(value);
        setColor(value)
        setValue(0);
    };

    const [i18nData, setI18nData] = useState(null);
    let i18nDataTwo = useSelector((state) => state.translation.i18n);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setI18nData(i18nDataTwo);
        }
    }, [i18nDataTwo]);

    return (
        <section className="dynamic-widget">
            <div className="feedBack">
                <div className="feedBackTitleBox">
                    <SectionHeadingSmall text={i18nData?.article_helpful} />
                </div>
                <Radio.Group onChange={onChange} value={value}>
                    <Radio
                        value={1}
                        style={{ backgroundColor: color === 1 ? '#7CC14B' : '#19B3B5' }}
                         className='like'
                    >

                        <FontAwesomeIcon icon={faThumbsUp} />
                    </Radio>
                    <Radio
                        value={2}
                        className='dislike'
                        style={{ backgroundColor: color === 2 ? '#ef6286' : '#19B3B5' }}
                    >
                        <FontAwesomeIcon icon={faThumbsDown} />
                    </Radio>
                </Radio.Group>
            </div>
        </section>
    );
}


export default FeedBack;
