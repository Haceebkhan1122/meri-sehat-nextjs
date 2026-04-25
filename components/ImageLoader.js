import React from 'react';
import loader from '../public/gif/asset_loader.gif';
import Image from 'next/image';

const ImageLoader = ({ width, height }) => {
    return (
        <>
            <div className='text-center' >
                <Image
                    width={110}
                    height={height}
                    src={loader}
                    class="gif"
                    alt="loader" />
            </div>
        </>
    )
}

export default ImageLoader