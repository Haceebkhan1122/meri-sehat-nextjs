import React from 'react'
import MainBanner from '../../components/componentsUpdated/mainBanner/MainBanner';
import ToplogoSectionSehat from '../../components/componentsUpdated/SehatA-Z/toplogoSectionSehat/ToplogoSectionSehat';
import bannerImage from '/public/png/new-images/bannerSehatAz.png';
import DiabitiesSehat from '../../components/componentsUpdated/SehatA-Z/diabities/Diabities';
import ExploreDiabetes from '../../components/componentsUpdated/SehatA-Z/exploreDiabetes/ExploreDiabetes';
import HealthArticles from '@/components/componentsUpdated/SehatA-Z/healthArticles/HealthArticles';
import SliderLimitedOffer from '@/components/componentsUpdated/SehatA-Z/limitedOffer/LimitedOffer';
import Faqs from '@/components/componentsUpdated/homePage/faqs/faqs';

const DiabitiesPage = () => {
    return (
        <div className='diabitiesSehatPage'>
            <MainBanner heading="Pakistan’s largest disease library" subtext="Now available in four regional languages and sign language" bannerImage={bannerImage} page={"sehat-az"} bg="#F9DED6" />
            <ToplogoSectionSehat />
            <DiabitiesSehat />
            <HealthArticles />
            <SliderLimitedOffer />
            <ExploreDiabetes />
            <Faqs />
        </div>
    )
}

export default DiabitiesPage;
