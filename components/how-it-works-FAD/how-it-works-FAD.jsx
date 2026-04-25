import ContainerWrapperFindDoc from '../container-wrapper-find-doc/container-wrapper-find-doc';
import styles from './how-it-works-FAD.module.scss';

import React, { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
// import cards from "../../../public/png/cards.png";
import cards from "public/png/cards.png";
import cards2 from "public/png/cards2.png";
import cards3 from "public/png/cards3.png";
import videoThumbnail1 from "public/png/video_thumbnail1.png";
import videoThumbnail2 from "public/png/video_thumbnail2.png";
import videoThumbnail3 from "public/png/video_thumbnail3.png";
import Slider from "react-slick";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import ImageLoader from "../ImageLoader";

const HowItWorksFindADoctor = () => {

    return (
        <ContainerWrapperFindDoc>
        </ContainerWrapperFindDoc >
    )
}

export default HowItWorksFindADoctor;
