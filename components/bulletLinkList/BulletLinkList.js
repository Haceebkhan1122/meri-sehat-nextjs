import React from 'react';
import { checkLink } from '../../utils/powerFunctions';
import BulletLink from '../bulletLink/BulletLink';

function BulletLinkList(props) {
  const { points = [] } = props;
  return (
    <div className="bulletLinks">
      <ul>
        {points?.length > 0 && points?.map((item, index) => {
          return (
            <BulletLink
              key={index}
              text={item?.name}
              link={checkLink(item?.url)}
              linkText={item?.url}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default BulletLinkList;
