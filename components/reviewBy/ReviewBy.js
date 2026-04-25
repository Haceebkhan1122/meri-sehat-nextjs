import React, { memo } from 'react';
import Image from 'next/image';

function ReviewBy(props) {
    const {
        reviewImg = '',
        reviewBy = '',
        writtenBy = '',
        education = '',
        updateOn = '',
    } = props;

    return (
        <div className="reviewBy hk_rev">
            {reviewImg && (
                <div className="img_box">
                    <Image crossorigin="anonymous" src={reviewImg} alt="reviewImg" width={88} height={88} />
                </div>
            )}
            <div className="review_detail ff-Inter">
                {reviewBy && <p className="review_by ff-Inter dd"> {reviewBy || ''} </p>}
                {education && (
                    <p className="education ff-Inter">
                        {education?.props?.children.map(function (item, index) {
                            return (
                                <span key={`${index}`}>
                                    {index === education?.props?.children.length - 1
                                        ? item?.replaceAll(',', '')
                                        : item}
                                </span>
                            );
                        })}
                    </p>
                )}
                {writtenBy && (
                    <p className="written_by ff-Inter"> {writtenBy || ''} </p>
                )}
                {updateOn && <p className="update_on ff-Inter"> {updateOn || ''} </p>}
            </div>
        </div>
    );
}

export default memo(ReviewBy);
