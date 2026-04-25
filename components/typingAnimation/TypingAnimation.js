import React from 'react';
import Typed from 'react-typed';
// import './typingAnimation.css';


function TypingAnimation(props) {
    const { textArry = [], endText } = props;

    const defaultText = ['health care', 'doctor'];

    return (
        <div className="typingAnimation">
            <Typed
                strings={textArry?.length > 0 && textArry.map(item => item) || defaultText}
                typeSpeed={70}
                backSpeed={60}
                loop
            />
            <span>{endText}</span>
        </div>
    );
}
export default React.memo(TypingAnimation);