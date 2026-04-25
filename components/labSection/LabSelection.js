
import React, { useEffect, useState } from 'react';
import { Col, Container, Form, Row, Nav, Tab, Button } from 'react-bootstrap';
import { Select, Modal } from "antd";
import Image from "next/image";
import location from "../../public/png/location.png"
import clander from "../../public/svg/clander.svg"
import search1 from "../../public/png/search.png"
import close from "../../public/png/close.png"
import cart01 from "../../public/png/cart01.png"
import Labs from './Labs';
import LabDropdown from "../../components/labSection/LabDropdown"
import SingleTests from "../../components/labSection/SingleTests"
import SearchTestAndPackages from "../../components/labSection/SearchTestAndPackages"
import SearchLabsPartners from "../../components/labSection/SearchLabsPartners"
import Package from "../../components/labSection/Package"
import CartItem from "../../components/cart/CartItem"
import Cookies from 'js-cookie';
import AssetsLoader from '../../components/assetsLoader/AssetsLoader'
import { useSelector, useDispatch } from 'react-redux';
import { fetchCart } from '@/store/myCartSlice';
import { useRouter } from 'next/router';
import emptyCart from "../../public/svg/cartIcon.svg"

const { Option } = Select;
const labSelect = ({ listnerIfCartHasItem, defaultCity, runForwhenChangeOnlyCity, popularLabsPackages, guestIDValue, popularLabsTests, popularLabs, setSearch, search, switchCartFunc, emptyCartFunc, setIsModalVisible, isModalVisible, setInstructionsModalListner, instructionsModalListner, setRemoveModal, removeModal, removeToCartFunc, listnerForLabTest, setListnerForLabTest, myCartApiCalled, setMyCartApiCalled, addToCartFunc, loadingLast, effectHasRun, nextCitySelectedListner, singleLabsDetails, fetchSingleLabDetails, citiesLabs, setLocationModal, labsByCities, selectedLocation }) => {

    const router = useRouter();
    const dispatch = useDispatch();
    const [selectedName, setSelectedName] = useState(''); // To track the selected name
    const [selectedCity, setSelectedCity] = useState(null);
    const [selectedNameCity, setSelectedNameCity] = useState(''); // To track the selected name City
    let myCart = useSelector((state) => state.cart.myCartData);
    const [isMobile, setIsMobile] = useState(false);
    const [modalsearch, setModalsearch] = useState(false);
    const [modalsearchTest, setModalsearchTest] = useState(false);
    const [searchVal, setSearchVal] = useState('');
    const [searchValTests, setSearchValTests] = useState('');
    const [filteredLabs, setFilteredLabs] = useState([]);
    const [filteredLabsTests, setFilteredLabsTests] = useState([]);
    const [filteredLabsPackages, setFilteredLabsPackages] = useState([]);


    const getCityId = Cookies.get("locationLabs");
    const auth = Cookies.get('Authorization')


    useEffect(() => {
        import("react-device-detect").then((item) => {
            setIsMobile(item.isMobile);
        });
    }, []);

    useEffect(() => {
        if (!myCartApiCalled) {
            dispatch(fetchCart());
            setMyCartApiCalled(true);
        }
    }, [dispatch, myCartApiCalled]);

    useEffect(() => {
        if (citiesLabs?.length > 0) {
            setSelectedCity(citiesLabs);
        }
    }, [selectedCity, citiesLabs])


    const handleNameChange = (e, lab) => {
        setSelectedName(e.target.value);
        fetchSingleLabDetails(lab?.id)
        if (!auth) {
            setTimeout(() => {
                if (Cookies.get("guestId") !== 'undefined' || Cookies.get("guestId") !== null) {
                    let guestIDValue = Cookies.get("guestId")
                    switchCartFunc(lab?.id, guestIDValue);
                }
            }, 3000)
        } else {
            switchCartFunc(lab?.id);
        }
        if (search === true) {
            setSearch('')
        }
    };

    const handleSearch = (e) => {
        setSelectedName(false);
        if (isMobile) {
            setModalsearch(true)
        } else {
            setSearch(true);
        }
    };

    const handleSearchClose = (e) => {
        setSearch('')
        setSelectedName('');
    };

    useEffect(() => {
        if (selectedCity && selectedCity.length > 0 && getCityId) {
            try {
                const parsedCityId = JSON.parse(getCityId);
                const items = citiesLabs?.find(item => item?.id === parsedCityId);
                setSelectedNameCity(items);

            } catch (error) {
                console.error("Error parsing getCityId as JSON:", error);
            }
        }
    }, [selectedCity, getCityId]);

    const handleEventListnerLabs = () => {
        setListnerForLabTest(true)
        setInstructionsModalListner(false)
    }

    const handleEventListnerPackages = () => {
        setListnerForLabTest(false)
        setInstructionsModalListner(false)
    }

    useEffect(() => {
        setListnerForLabTest(true)
        setInstructionsModalListner(false)
    }, [])

    const goForCheckout = () => {
        router.push("/lab-details")
    }

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            filterLabs(searchVal);
        }, 1000);

        return () => clearTimeout(timeoutId); // Cleanup on unmount or when searchVal changes
    }, [searchVal]);

    const filterLabs = (value) => {
        if (value.length <= 0) {
            setFilteredLabs([]); // Set to an empty array if searchVal is empty or has a length not greater than 0
            return;
        }

        const filteredPopularLabs = popularLabs.filter((lab) =>
            lab.lab_name.toLowerCase().includes(value.toLowerCase())
        );

        const filteredLabsByCities = Array.isArray(labsByCities)
            ? labsByCities.filter((lab) =>
                lab.lab_name.toLowerCase().includes(value.toLowerCase())
            )
            : [];

        const uniqueLabIds = new Set();

        const deduplicatedFilteredPopularLabs = filteredPopularLabs.filter((lab) => {
            if (!uniqueLabIds.has(lab.id)) {
                uniqueLabIds.add(lab.id);
                return true;
            }
            return false;
        });

        const deduplicatedFilteredLabsByCities = filteredLabsByCities.filter((lab) => {
            if (!uniqueLabIds.has(lab.id)) {
                uniqueLabIds.add(lab.id);
                return true;
            }
            return false;
        });

        const combinedResults = [...deduplicatedFilteredPopularLabs, ...deduplicatedFilteredLabsByCities];
        setFilteredLabs(combinedResults);
    };

    useEffect(() => {
        let timeoutId;
        if (!listnerForLabTest) {
            timeoutId = setTimeout(() => {
                filterLabsPackages(searchValTests);
            }, 1000);
        } else {
            timeoutId = setTimeout(() => {
                filterLabsTests(searchValTests);
            }, 1000);
        }
        return () => clearTimeout(timeoutId); // Cleanup on unmount or when searchVal changes
    }, [searchValTests, listnerForLabTest]);

    const filterLabsTests = (value) => {
        if (value.length <= 0) {
            setFilteredLabsTests([]); // Set to an empty array if searchVal is empty or has a length not greater than 0
            return;
        }

        const filteredPopularLabsTests = popularLabsTests?.filter((lab) =>
            lab.lab_test.toLowerCase().includes(value.toLowerCase())
        );

        const filteredLabsByCities = Array.isArray(singleLabsDetails)
            ? singleLabsDetails?.[0]?.lab_test.filter((lab) =>
                lab.lab_test.toLowerCase().includes(value.toLowerCase())
            )
            : [];

        const uniqueLabIds = new Set();

        const deduplicatedFilteredPopularLabs = filteredPopularLabsTests.filter((lab) => {
            if (!uniqueLabIds.has(lab.id)) {
                uniqueLabIds.add(lab.id);
                return true;
            }
            return false;
        });

        const deduplicatedFilteredLabsByCities = filteredLabsByCities.filter((lab) => {
            if (!uniqueLabIds.has(lab.id)) {
                uniqueLabIds.add(lab.id);
                return true;
            }
            return false;
        });

        const combinedResults = [...deduplicatedFilteredPopularLabs, ...deduplicatedFilteredLabsByCities];
        setFilteredLabsTests(combinedResults);
    };

    const filterLabsPackages = (value) => {
        if (value.length <= 0) {
            setFilteredLabsPackages([]); // Set to an empty array if searchVal is empty or has a length not greater than 0
            return;
        }

        const filteredPopularLabsPackages = popularLabsPackages?.filter((lab) =>
            lab.package?.name.toLowerCase().includes(value.toLowerCase())
        );

        const filteredLabsByCities = Array.isArray(singleLabsDetails)
            ? singleLabsDetails?.[0]?.lab_package.filter((lab) =>
                lab?.package?.name?.toLowerCase().includes(value.toLowerCase())
            )
            : [];

        const uniqueLabIds = new Set();

        const deduplicatedFilteredPopularLabs = filteredPopularLabsPackages.filter((lab) => {
            if (!uniqueLabIds.has(lab.id)) {
                uniqueLabIds.add(lab.id);
                return true;
            }
            return false;
        });

        const deduplicatedFilteredLabsByCities = filteredLabsByCities.filter((lab) => {
            if (!uniqueLabIds.has(lab.id)) {
                uniqueLabIds.add(lab.id);
                return true;
            }
            return false;
        });

        const combinedResults = [...deduplicatedFilteredPopularLabs, ...deduplicatedFilteredLabsByCities];
        setFilteredLabsPackages(combinedResults);
    };

    useEffect(() => {
        if (isMobile && singleLabsDetails?.length > 0) {
            setModalsearch(false)
        }
    }, [singleLabsDetails, modalsearch])

    return (
        <>
            <section className='labselectbox'>
                <Container >
                    <Row>
                        <Col className={myCart?.lab_cart?.length > 0 ? 'col-md-9' : 'col-md-12'}>
                            <div className='box_labs h-100 left_side_box'>
                                {isMobile && !singleLabsDetails?.length > 0 ? (
                                    <>
                                        <div className='mob_style_header'>
                                            <Row className='px-4 align-items-center'>
                                                <Col className='' md={6} xs={4}>
                                                    {search === "" ? (
                                                        <h4>
                                                            Select a Lab
                                                        </h4>
                                                    ) : (
                                                        <h4 className='search_text'>
                                                            <Button onClick={handleSearchClose} className='btn-close1'><Image src={close} width={13} height={13} ></Image></Button>  Search results
                                                        </h4>
                                                    )}

                                                </Col>
                                                <Col className='text-end' md={6} xs={8}>
                                                    <div className='d-flex align-items-center justify-content-end'>
                                                        <div className='location d-flex align-items-center' onClick={() => setLocationModal(true)}>
                                                            <Image src={location} className='img-fluid'></Image>
                                                            <p style={{ textTransform: 'capitalize' }}>
                                                                {defaultCity === true && runForwhenChangeOnlyCity === false && listnerIfCartHasItem === false ? (
                                                                    <>karachi</>
                                                                ) : null}
                                                                {!myCart?.lab_cart?.length > 0 && runForwhenChangeOnlyCity ? (
                                                                    <>
                                                                        {selectedNameCity?.name}
                                                                    </>
                                                                ) : null}

                                                                {myCart?.lab_cart?.length > 0 ? (
                                                                    <>
                                                                        {myCart?.lab?.lab_city?.city?.name}
                                                                    </>
                                                                ) : null}
                                                            </p>
                                                        </div>
                                                        <div className='search'>
                                                            <Form>
                                                                <Form.Group className="position-relative d-lg-block d-none">
                                                                    <Image src={search1} className='img-fluid searchIcon'></Image>
                                                                    <Form.Control type="search" placeholder="Search" className="searchfield" onClick={handleSearch} />
                                                                </Form.Group>

                                                                <Form.Group className="position-relative d-lg-none d-block">

                                                                    <Image src={search1} className='img-fluid searchIcon'></Image>
                                                                    <Form.Control type="search" placeholder="Search fdfdfd" className="searchfield" onClick={handleSearch} />

                                                                </Form.Group>
                                                            </Form>
                                                        </div>
                                                        <div className='clander'>
                                                            <Image src={clander} className='img-fluid'></Image>
                                                        </div>
                                                    </div>

                                                </Col>
                                                <Col className='' md={12}>
                                                    <hr className='hr1 mb-0'></hr>
                                                </Col>
                                            </Row>
                                        </div>
                                    </>
                                ) : !isMobile ? (
                                    <>
                                        <div className='mob_style_header'>
                                            <Row className='px-4 align-items-center'>
                                                <Col className='' md={6} xs={4}>
                                                    {search === "" ? (
                                                        <h4>
                                                            {!search && !nextCitySelectedListner && labsByCities?.length > 0 && singleLabsDetails?.length > 0 ? (
                                                                <>
                                                                    Select Lab Tests
                                                                </>
                                                            ) : (
                                                                <>
                                                                    Select a Lab
                                                                </>
                                                            )}
                                                        </h4>
                                                    ) : (
                                                        <h4 className='search_text'>
                                                            <Button onClick={handleSearchClose} className='btn-close1'><Image src={close} width={13} height={13} ></Image></Button>  Search results
                                                        </h4>
                                                    )}

                                                </Col>
                                                <Col className='text-end' md={6} xs={8}>
                                                    <div className='d-flex align-items-center justify-content-end'>
                                                        <div className='location d-flex align-items-center' onClick={() => setLocationModal(true)}>
                                                            <Image src={location} className='img-fluid'></Image>
                                                            <p style={{ textTransform: 'capitalize' }}>
                                                                {defaultCity === true && runForwhenChangeOnlyCity === false && listnerIfCartHasItem === false ? (
                                                                    <>karachi</>
                                                                ) : null}
                                                                {!myCart?.lab_cart?.length > 0 && runForwhenChangeOnlyCity ? (
                                                                    <>
                                                                        {selectedNameCity?.name}
                                                                    </>
                                                                ) : null}

                                                                {myCart?.lab_cart?.length > 0 ? (
                                                                    <>
                                                                        {myCart?.lab?.lab_city?.city?.name}
                                                                    </>
                                                                ) : null}
                                                            </p>
                                                        </div>
                                                        <div className='search'>
                                                            <Form>
                                                                <Form.Group className="position-relative d-lg-block d-none">
                                                                    <Image src={search1} className='img-fluid searchIcon'></Image>
                                                                    {singleLabsDetails?.length > 0 && !nextCitySelectedListner ? (
                                                                        <>
                                                                            <Form.Control
                                                                                type="text"
                                                                                placeholder="Search Tests"
                                                                                value={searchValTests}
                                                                                onChange={(e) => setSearchValTests(e.target.value)}
                                                                                onClick={handleSearch}
                                                                                className="searchfield"
                                                                            />
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            <Form.Control
                                                                                type="text"
                                                                                placeholder="Search"
                                                                                value={searchVal}
                                                                                onChange={(e) => setSearchVal(e.target.value)}
                                                                                onClick={handleSearch}
                                                                                className="searchfield"
                                                                            />
                                                                        </>
                                                                    )}

                                                                </Form.Group>
                                                                <Form.Group className="position-relative d-lg-none d-block">
                                                                    <Image src={search1} className='img-fluid searchIcon'></Image>
                                                                    <Form.Control type="search" placeholder="Search" className="searchfield" onClick={handleSearch}
                                                                    />
                                                                </Form.Group>
                                                            </Form>
                                                        </div>
                                                        <div className='clander'>
                                                            <Image src={clander} className='img-fluid'></Image>
                                                        </div>
                                                    </div>

                                                </Col>
                                                <Col className='' md={12}>
                                                    <hr className='hr1 mb-0'></hr>
                                                </Col>
                                            </Row>
                                        </div>
                                    </>
                                ) : null}
                                <Row>
                                    <Col className='' md={12}>
                                        <Form className=' px-4'>
                                            {search === '' ? (
                                                <div>

                                                </div>
                                            ) : (
                                                <div className='search_box'>
                                                    <div className='form_labs'>
                                                        <Row>
                                                            {singleLabsDetails?.length > 0 && !nextCitySelectedListner ? (
                                                                <>
                                                                    <SearchTestAndPackages instructionsModalListner={instructionsModalListner} setInstructionsModalListner={setInstructionsModalListner} filteredLabsPackages={filteredLabsPackages} popularLabsPackages={popularLabsPackages} filteredLabsTests={filteredLabsTests} popularLabsTests={popularLabsTests} removeToCartFunc={removeToCartFunc} listnerForLabTest={listnerForLabTest} setListnerForLabTest={setListnerForLabTest} myCart={myCart} addToCartFunc={addToCartFunc} LabsTest={singleLabsDetails?.[0]?.lab_test} searchValTests={searchValTests} />
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <SearchLabsPartners filteredLabs={filteredLabs} handleNameChange={handleNameChange} popularLabs={popularLabs} removeToCartFunc={removeToCartFunc} listnerForLabTest={listnerForLabTest} setListnerForLabTest={setListnerForLabTest} myCart={myCart} addToCartFunc={addToCartFunc} LabsTest={singleLabsDetails?.[0]?.lab_test} />
                                                                </>
                                                            )}
                                                        </Row>
                                                    </div>
                                                </div>
                                            )}
                                            {loadingLast ? (
                                                <div className="flex_center">
                                                    <AssetsLoader />
                                                </div>
                                            ) : (!search && nextCitySelectedListner && labsByCities?.length > 0 ? (
                                                <>
                                                    {/* <div className='form_labs'>
                                                             <div className="row mt-4">
                                                                 <Labs myCart={myCart} handleNameChange={handleNameChange} labsByCities={labsByCities} />
                                                             </div>
                                                        </div> */}
                                                </>
                                            ) : !search && !nextCitySelectedListner && labsByCities?.length > 0 && singleLabsDetails?.length > 0 ? singleLabsDetails?.map((item) => (
                                                <>
                                                    <div className="show_after_check">
                                                        <div className='d-lg-none d-block'>
                                                            <h2 className='select_test mb-3'>Select Lab Tests</h2>
                                                            <hr className='hr1 mt-0 d-block d-lg-none mb-4'></hr>
                                                            <div className={`city_cart d-flex align-items-center ${myCart?.lab_cart?.length > 0 ? 'item_num_show' : ''}`}>
                                                                <Col xs={myCart?.lab_cart?.length > 0 ? '8' : '10'} >
                                                                    <div className='location' onClick={() => setLocationModal(true)}>
                                                                        <Image src={location} className='img-fluid'></Image>
                                                                        <p style={{ textTransform: 'capitalize' }}>
                                                                            {defaultCity === true && runForwhenChangeOnlyCity === false && listnerIfCartHasItem === false ? (
                                                                                <>karachi</>
                                                                            ) : null}
                                                                            {!myCart?.lab_cart?.length > 0 && runForwhenChangeOnlyCity ? (
                                                                                <>
                                                                                    {selectedNameCity?.name}
                                                                                </>
                                                                            ) : null}

                                                                            {myCart?.lab_cart?.length > 0 ? (
                                                                                <>
                                                                                    {myCart?.lab?.lab_city?.city?.name}
                                                                                </>
                                                                            ) : null}
                                                                        </p>
                                                                    </div>
                                                                </Col>
                                                                <Col xs={myCart?.lab_cart?.length > 0 ? '4' : '2'} className='text-center' >
                                                                    {myCart?.lab_cart?.length > 0 ? (

                                                                        <span className='cart_icon_btn'><Image src={cart01} className='img-fluid'></Image> <i>{myCart?.lab_cart?.length > 0 && myCart?.lab_cart?.length == 1 ? `${myCart?.lab_cart?.length} Test` : `${myCart?.lab_cart?.length} Tests`}  </i></span>
                                                                    ) : <Image style={{ marginLeft: '1.4rem' }} src={emptyCart} className='img-fluid' />}
                                                                </Col>
                                                            </div>
                                                            <Col lg={12} className='d-lg-none d-block'>
                                                                <div className='search'>
                                                                    <Form>
                                                                        <Form.Group className="position-relative"  >
                                                                            <Image src={search1} className='img-fluid searchIcon'></Image>
                                                                            <Form.Control type="search" placeholder="Search Tests" className="searchfield" onClick={() => setModalsearchTest(true)} />
                                                                        </Form.Group>
                                                                    </Form>
                                                                    <Modal
                                                                        title=" "
                                                                        centered
                                                                        open={modalsearchTest}
                                                                        onOk={() => setModalsearchTest(false)}
                                                                        onCancel={() => setModalsearchTest(false)}
                                                                        className='modal_search'
                                                                    >
                                                                        <div className='box_search'>
                                                                            <SearchTestAndPackages nextCitySelectedListner={nextCitySelectedListner} singleLabsDetails={singleLabsDetails} searchValTests={searchValTests} setSearchValTests={setSearchValTests} instructionsModalListner={instructionsModalListner} setInstructionsModalListner={setInstructionsModalListner} filteredLabsPackages={filteredLabsPackages} popularLabsPackages={popularLabsPackages} filteredLabsTests={filteredLabsTests} popularLabsTests={popularLabsTests} removeToCartFunc={removeToCartFunc} listnerForLabTest={listnerForLabTest} setListnerForLabTest={setListnerForLabTest} myCart={myCart} addToCartFunc={addToCartFunc} LabsTest={singleLabsDetails?.[0]?.lab_test} />
                                                                        </div>
                                                                    </Modal>
                                                                </div>
                                                            </Col>

                                                        </div>
                                                        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                                                            <div className='mob_tabs'>
                                                                <Row className='sticky'>

                                                                    <Col lg={12}>
                                                                        <div className='d-flex align-items-center'>
                                                                            <div className='d-lg-block d-none'>
                                                                                <LabDropdown effectHasRun={effectHasRun} guestIDValue={guestIDValue} switchCartFunc={switchCartFunc} emptyCartFunc={emptyCartFunc} setIsModalVisible={setIsModalVisible} isModalVisible={isModalVisible} myCart={myCart} singleLabsDetails={singleLabsDetails} fetchSingleLabDetails={fetchSingleLabDetails} labsByCities={labsByCities} />
                                                                            </div>

                                                                            <div className='tabings_test'>
                                                                                <Nav className="flex-column">
                                                                                    <Nav.Item>
                                                                                        <Nav.Link eventKey="first" onClick={handleEventListnerLabs}>Single Tests</Nav.Link>
                                                                                    </Nav.Item>
                                                                                    <Nav.Item>
                                                                                        <Nav.Link eventKey="second" onClick={handleEventListnerPackages}>Packages  </Nav.Link>
                                                                                    </Nav.Item>
                                                                                </Nav>
                                                                            </div>
                                                                        </div>
                                                                        <hr className='hr1 mt-0 d-none d-lg-block'></hr>
                                                                        <div className='d-lg-none d-block'>
                                                                            <LabDropdown effectHasRun={effectHasRun} guestIDValue={guestIDValue} switchCartFunc={switchCartFunc} emptyCartFunc={emptyCartFunc} setIsModalVisible={setIsModalVisible} isModalVisible={isModalVisible} myCart={myCart} singleLabsDetails={singleLabsDetails} fetchSingleLabDetails={fetchSingleLabDetails} labsByCities={labsByCities} />
                                                                        </div>
                                                                    </Col>
                                                                    <Col lg={12} className="px-xs-0 paddingRightOfScroll">
                                                                        <div className='form_labs'>
                                                                            <Tab.Content className='labs_content'>
                                                                                <Tab.Pane eventKey="first">
                                                                                    <Row>  <SingleTests setInstructionsModalListner={setInstructionsModalListner} instructionsModalListner={instructionsModalListner} removeToCartFunc={removeToCartFunc} listnerForLabTest={listnerForLabTest} setListnerForLabTest={setListnerForLabTest} myCart={myCart} addToCartFunc={addToCartFunc} LabsTest={item?.lab_test} /></Row>
                                                                                </Tab.Pane>
                                                                                <Tab.Pane eventKey="second">
                                                                                    <Row>  <Package setInstructionsModalListner={setInstructionsModalListner} instructionsModalListner={instructionsModalListner} removeToCartFunc={removeToCartFunc} myCart={myCart} addToCartFunc={addToCartFunc} LabsPackages={item?.lab_package} labsbyCities={labsByCities} /></Row>
                                                                                </Tab.Pane>
                                                                            </Tab.Content>
                                                                        </div>
                                                                    </Col>
                                                                </Row>
                                                            </div>
                                                        </Tab.Container>
                                                    </div>
                                                </>
                                            )) : !labsByCities?.length > 0 ? (
                                                <>
                                                    <div className='d-lg-none d-block no_labs_packages_found'>
                                                        <h2 className='select_test mb-3'>Select Test</h2>
                                                        <hr className='hr1 mt-0 d-block d-lg-none mb-4'></hr>
                                                        <div className={`city_cart d-flex align-items-center justify-content-between item_num_show`}>
                                                            <div className='location' onClick={() => setLocationModal(true)}>
                                                                <Image src={location} className='img-fluid'></Image>
                                                                <p style={{ textTransform: 'capitalize' }}>
                                                                    {defaultCity === true && runForwhenChangeOnlyCity === false && listnerIfCartHasItem === false ? (
                                                                        <>karachi</>
                                                                    ) : null}
                                                                    {!myCart?.lab_cart?.length > 0 && runForwhenChangeOnlyCity ? (
                                                                        <>
                                                                            {selectedNameCity?.name}
                                                                        </>
                                                                    ) : null}

                                                                    {myCart?.lab_cart?.length > 0 ? (
                                                                        <>
                                                                            {myCart?.lab?.lab_city?.city?.name}
                                                                        </>
                                                                    ) : null}
                                                                </p>
                                                            </div>
                                                            <span className='cart_icon_btn'><Image src={cart01} className='img-fluid'></Image></span>
                                                        </div>
                                                    </div>
                                                    <h1 className='no_labs_packages_found d-flex align-items-center justify-content-center pt-4'>
                                                        No Labs Found
                                                    </h1>
                                                </>
                                            ) : null)}
                                        </Form>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                        <Col className={myCart?.lab_cart?.length > 0 ? 'd-block' : 'd-none'} lg="3">
                            <div className='box_labs myCartSpaceLeft h-100'>
                                <Row className={isMobile ? '' : 'px-4'}>
                                    {isMobile ?
                                        (
                                            <>
                                            </>
                                        )
                                        : (
                                            <>
                                                <Col className='' md={6}>
                                                    <h4 className='cartHeading'>
                                                        My Cart
                                                    </h4>
                                                </Col>
                                                <Col className='text-end' md={6}>
                                                    <div className='d-flex align-items-center  clanderTest'>
                                                        <Image src={clander} className='img-fluid'></Image>
                                                        <p>{myCart?.lab_cart?.length > 0 && myCart?.lab_cart?.length == 1 ? `${myCart?.lab_cart?.length} Test` : `${myCart?.lab_cart?.length} Tests`} </p>
                                                    </div>
                                                </Col>
                                                <Col className='d-lg-block d-none' md={12}>
                                                    <hr className='hr1 mb-0'></hr>
                                                </Col>
                                                <Col className='cartTopItems' md={12}>
                                                    <div className='form_labs1 pt-3 small_cart pe-2'>
                                                        <CartItem labsByCities={labsByCities} removeToCartFunc={removeToCartFunc} listnerForLabTest={listnerForLabTest} setRemoveModal={setRemoveModal} removeModal={removeModal} myCart={myCart} />
                                                    </div>
                                                </Col>
                                            </>
                                        )}


                                    <Col className='' md={12}>

                                        <div className='footer_btn bg-white'>

                                            <Button onClick={goForCheckout} className='btn_checkout'><span>
                                                {isMobile ? (
                                                    <>
                                                        <span className='cart_icon_btn'><Image src={cart01} className='img-fluid'></Image> <i>{myCart?.lab_cart?.length}</i></span>
                                                    </>
                                                ) : (
                                                    <> </>
                                                )}
                                                Checkout</span> <span className='checkout_price'>Rs. {myCart?.TotalAmountFormated}</span></Button>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                        <Col className={!myCart?.lab_cart?.length > 0 && isMobile ? 'd-block' : 'd-none'} lg="3">
                            <div className='box_labs h-100'>
                                <Row className='p-0'>
                                    <Col className='' md={12}>
                                        <div className='footer_btn bg-white'>
                                            <Button className='btn_checkout when_mob_cartEmpty'><span>Checkout</span></Button>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section >
            <Modal
                title=" "
                centered
                open={modalsearch}
                onOk={() => setModalsearch(false)}
                onCancel={() => setModalsearch(false)}
                className='modal_search'
            >

                <div className='box_search'>
                    <SearchLabsPartners setSearchVal={setSearchVal} searchVal={searchVal} filteredLabs={filteredLabs} handleNameChange={handleNameChange} popularLabs={popularLabs} removeToCartFunc={removeToCartFunc} listnerForLabTest={listnerForLabTest} setListnerForLabTest={setListnerForLabTest} myCart={myCart} addToCartFunc={addToCartFunc} LabsTest={singleLabsDetails?.[0]?.lab_test} />
                </div>
            </Modal>
        </>
    )
}


export default labSelect