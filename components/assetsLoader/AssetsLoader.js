import Image from 'next/image'
import React from 'react'
import LoaderAssets from "../../public/gif/asset_loader.gif";

const AssetsLoader = () => {
    return (
        <>
            <div className="flex_center">
                <Image
                    className="loading_gif m-auto"
                    src={LoaderAssets}
                    alt="loader"
                    width={90}
                    height={90}
                />
            </div>
        </>
    )
}


export default AssetsLoader