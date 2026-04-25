import React from 'react';
import { Popover } from 'antd';
// import './customPopOver.css';

const CustomPopOver = (props) => {
    const {
        children,
        content,
        overlayClassName,
        placement,
        onHover = () => { },
        trigger,
        onClick = () => { }
    } = props;

    return (
        <Popover
            onVisibleChange={onHover}
            trigger={trigger}
            placement="bottom"
            overlayClassName={`popOverContainer ${overlayClassName}`}
            content={content}
        >
            <button onClick={onClick} className="popOverBtn">{children}</button>
        </Popover>
    );
};

export default CustomPopOver;
