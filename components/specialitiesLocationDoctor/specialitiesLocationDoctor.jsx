import React, { useEffect } from 'react'
import ContainerWrapperFindDoc from '../container-wrapper-find-doc/container-wrapper-find-doc';
import BestDoctorsTopFilter from '../bestDoctorsTopFilter/bestDoctorsTopFilter';
import styles from './specialitiesLocationDoctor.module.scss';
import CititesWithLocation from '../cititesWithLocation/cititesWithLocation';

const SpecialitiesLocationDoctor = () => {


    return (
        <>
            <ContainerWrapperFindDoc>
                {/* <BestDoctorsTopFilter /> */}
            </ContainerWrapperFindDoc>
            <CititesWithLocation />
        </>
    )
}

export default SpecialitiesLocationDoctor;
