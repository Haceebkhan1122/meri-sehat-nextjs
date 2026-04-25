import React, { useEffect, useState } from 'react'
import ContainerWrapperFindDoc from '../container-wrapper-find-doc/container-wrapper-find-doc';
import styles from './cititesWithLocation.module.scss';
import CitiesModalFAD from '../modalCitiesFAD/ModalCities';
import Cookies from 'js-cookie';
import LoaderAssets from "../../public/gif/asset_loader.gif";
import Image from 'next/image';
import { Col, Container, Row } from 'react-bootstrap';

const CititesWithLocation = ({ loadingLast, getAllCitiesSpec, handleOtherCities, handleSingleSpecByCity, setSelectedCity, selectedCity, myCities, citiesModal, setCitiesModal, searchFindDocByCity, selectedCityCookie }) => {
    var OtherCitiesSelected = Cookies.get('OtherCities');
    var findaspecialist = Cookies.get('findASpecialist');
    var speciality = Cookies.get('speciality');

    return (
        <>{loadingLast ? (
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
        ) : (
            <>
                {
                    <section className={`${styles.citySpecialities} citySpecialities`}>
                        <Container>
                            <Row>
                                <Col lg={12}>
                                    <div className={styles.allInfoDetails}>
                                        <h3> Best Specialists In <span className="colorBlue"> {selectedCityCookie?.name}  </span> <span className={`${styles.editIcon} d-none`} onClick={() => setCitiesModal(true)}> </span></h3>
                                        <div className={styles.listParent}>
                                            <ul>
                                                {searchFindDocByCity?.filter((filterItem) => filterItem.tag == 'speciality').map((item) => (
                                                    <li onClick={() => handleSingleSpecByCity(item)}> {`Best ${item?.name} in ${selectedCityCookie?.name}`} </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </section>
                }
                {OtherCitiesSelected && <div className={styles.wrapper}>
                    <ContainerWrapperFindDoc>
                        <div className={styles.allInfoDetails}>
                            <h3> Best Specialists In <span> Other Cities  </span> <span className={styles.editIcon} onClick={() => setCitiesModal(true)}> </span></h3>
                            <div className={styles.listParent}>
                                <ul>
                                    {getAllCitiesSpec?.filter((filterItem) => filterItem?.city?.name !== 'Karachi' && filterItem?.city?.name !== 'Lahore' && filterItem?.city?.name !== 'Islamabad').map((item) => (
                                        <>
                                            <li onClick={() => handleOtherCities(item)}> {`Best ${item?.speciality[0]?.name} in ${item?.city?.name}`} </li>
                                        </>

                                    ))}
                                </ul>
                            </div>
                        </div>


                    </ContainerWrapperFindDoc>
                </div>}
            </>
        )}
            <CitiesModalFAD myCities={myCities} setSelectedCity={setSelectedCity} selectedCity={selectedCity} citiesModal={citiesModal} setCitiesModal={setCitiesModal} />
        </>
    )
}

export default CititesWithLocation;
