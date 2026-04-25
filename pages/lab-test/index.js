import React, { useState, useEffect, useRef } from "react";
import { Container, Accordion } from "react-bootstrap";
import { Select } from "antd";
import { faqs_category_pricing, labTest, cities, labsByCitiesApi, cart, addToCart, removeCart, emptyCart, switchCart, labPackagesPopular } from "@/utils/endpoints";
import API from "@/utils/httpService";
import parse from "html-react-parser";
import { useRouter } from "next/router";
import { renderWidget } from "@/utils/common";
import Cookies from "js-cookie";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { addTranslation } from "@/store/translationSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { MetaDataCustom } from "@/components/metaDataCustom";
import LabSelection from '../../components/labSection/LabSelection'
import LocationForLabs from '../../components/locationForLabs/LocationForLabs'
import { fetchCart } from '@/store/myCartSlice';
import swal from 'sweetalert';
import ChangeCity from '../../components/changeCity/changeCity'
import LabPackages from "../../components/labPackages/LabPackages";
import Loader from "@/components/Loader";


const { Option } = Select;
export default function index(props) {

  const router = useRouter();
  const dispatch = useDispatch();
  const { widgetData = [], key } = props;

  const [clssForSpace, setClssForSpace] = useState("");
  const { apiType, _nextI18Next } = props;
  const [topics, setTopics] = useState({});
  const [apiLoader, setApiLoader] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [locationModal, setLocationModal] = useState(false);
  const [locationValue, setLocationValue] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [activeState, setActiveState] = useState({});
  const initialLocale = _nextI18Next?.initialLocale;
  const i18n = _nextI18Next?.initialI18nStore[initialLocale]?.common;
  const [citiesLabs, setCitiesLabs] = useState(null)
  const [labsByCities, setLabsByCities] = useState(null)
  const [singleLabsDetails, setSingleLabsDetails] = useState(null)
  const [nextCitySelectedListner, setNextCitySelectedListner] = useState(false)
  const [defaultCity, setDefaultCity] = useState(null)
  const [effectHasRun, setEffectHasRun] = useState(null);
  const [loadingLast, setLoadingLast] = useState(false);
  const [getCartId, setGetCartId] = useState(null);
  const [apiCalled, setApiCalled] = useState(false);
  const [myCartApiCalled, setMyCartApiCalled] = useState(true);
  const [listnerForLabTest, setListnerForLabTest] = useState();
  const [removeModal, setRemoveModal] = useState(false)
  const [instructionsModalListner, setInstructionsModalListner] = useState(true)
  let myCart = useSelector((state) => state.cart.myCartData);
  const [getLabsId, setGetLabsId] = useState();
  const [runForSelectedlab, setRunForSelectedlab] = useState(null)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleCityChange, setIsModalVisibleCityChange] = useState();
  const [listnerforCityNameFromCart, setListnerforCityNameFromCart] = useState(null);
  const [search, setSearch] = useState(''); // To track the selected name
  const [popularLabs, setPopularLabs] = useState([]);
  const [popularLabsTests, setPopularLabsTests] = useState([]);
  const [popularLabsPackages, setPopularLabsPackages] = useState([]);
  const [guestIDValue, setGuestIDValue] = useState(null);
  const [listnerForSwitchCity, setListnerForSwitchCity] = useState();
  const [labPackagesPopularData, setLabPackagesPopularData] = useState(null);
  const [instructionsModalPackage, setInstructionsModalPackage] = useState()
  const [runForwhenChangeOnlyCity, setRunForwhenChangeOnlyCity] = useState(false)
  const [switchCityCartCreateListner, setSwitchCityCartCreateListner] = useState(false);
  const [hasLocationChanged, setHasLocationChanged] = useState(false);
  const [myCartData, setMyCartData] = useState(null);
  const [listnerIfCartHasItem, setListnerIfCartHasItem] = useState(false);
  const [addToCartLoader, setAddToCartLoader] = useState(false);
  const [removeToCartLoader, setRemoveToCartLoader] = useState(false);
  const [listnerForCityChangeDefault, setListnerForCityChangeDefault] = useState(true);
  const [activeRadioState, setActiveRadioState] = useState(1);
  const [cartLength, setCartLength] = useState(null);
  const [listnerForCartWithLogin, setListnerForCartWithLogin] = useState(false)

  const settings = {
    arrow: false,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: true,
  };

  const [i18nData, setI18nData] = useState(null);
  let i18nDataTwo = useSelector((state) => state.translation.i18n);
  const locationLabs = Cookies.get("locationLabs");

  if (Cookies.get('guestId')) {
    var guestID = Cookies.get('guestId')
  }
  const auth = Cookies.get('Authorization')
  const hasEffectRunRef = useRef(false);


  useEffect(() => {
    if (myCart?.lab_cart?.length > 0) {
      setMyCartData(myCart?.lab_cart)
      if (myCartData !== "null") {
        Cookies.set('cart', myCartData?.length)
        let lengthCount = Cookies.get('cart')
        if (lengthCount !== "undefined") {
          setCartLength(lengthCount)
        }
      }
    } else {
      // Cookies.remove('cart')
      if (myCartData !== "undefined" && !myCartData?.length > 0) {
        let lengthCount = Cookies.get('cart')
        if (lengthCount !== "undefined") {
          // Cookies.remove('cart')
          let lengthCountTwo = Cookies.get('cart')
          setCartLength(lengthCountTwo)
        }
      }
    }
  }, [myCart, myCartData])

  useEffect(() => {
    if (auth && !myCartData?.length > 0 && myCartData !== null) {
      if (Cookies.get('cart')) {
        Cookies.remove('cart')
      }
    }
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined") {
      setI18nData(i18nDataTwo);
    }
  }, [i18nDataTwo]);

  useEffect(() => {
    import("react-device-detect").then((item) => {
      setIsMobile(item.isMobile);
    });
  }, []);

  useEffect(() => {
    if (typeof i18n === "object" && Object.keys(i18n).length > 0) {
      dispatch(addTranslation(i18n));
    }
  }, [i18n]);

  useEffect(() => {
    if (widgetData && Object.keys(widgetData).length > 0) {
      setTopics(widgetData);
    }
  }, [widgetData]);

  useEffect(() => {
    const checkBannerPosition1 = topics?.widgets?.[0]?.key_type == "web-banner";
    const checkBannerPosition2 =
      topics?.widgets?.[0]?.key_type == "web-heading-and-description";
    if (
      checkBannerPosition1 ||
      checkBannerPosition2 ||
      (apiType !== "disease" && checkBanner?.length == 0)
    ) {
      setClssForSpace("");
    } else {
      setClssForSpace("topSpace");
    }
  }, [topics]);

  const checkBanner = topics?.widgets?.filter(
    (item) => item?.key_type == "web-banner"
  );

  // set City modal by default 
  useEffect(() => {
    if (!locationLabs || locationLabs === "undefined") {
      setLocationModal(true)
    } else {
      setLocationModal(false)
    }
  }, [myCart])

  // set Cities list API 
  const fetchCities = async () => {
    try {
      const response = await API.get(cities);
      if (response?.code === 200) {
        setCitiesLabs(response?.data);
      }
    } catch (e) {
      console.log(e);
    }
  }

  // set Cities list API by default
  useEffect(() => {
    fetchCities();
    return () => {
      fetchCities();
    };
  }, [])

  // fetch labs by default only for first visit and new user
  const fetchLabsByCityDefault = async (id) => {
    try {
      const response = await API.get(`${labsByCitiesApi}?city=1`);
      if (response?.code === 200) {
        setLabsByCities(response?.data);
        setNextCitySelectedListner(true)
        setDefaultCity(true)
        if (typeof locationLabs === "undefined") {
          setRunForwhenChangeOnlyCity(true)
        } else {
          setRunForwhenChangeOnlyCity(false)
        }
        setListnerIfCartHasItem(false)
      }
    } catch (e) {
      console.log(e);
    }
  }

  // if cart length is empty and mycart lab also empty it means its a new user then hit by default labs api with karachi city 
  useEffect(() => {
    if (!Cookies.get('cart') || (auth && !Cookies.get('cart') >= 1)) {
      fetchLabsByCityDefault();
    }
    else {
      dispatch(fetchCart());
    }
  }, []);


  // hit api when default city is true and labs by cities greater than 0
  useEffect(() => {
    if (labsByCities?.length > 0 && labsByCities[0]?.id) {
      fetchSingleLabDetails(labsByCities[0]?.id)
    }
  }, [labsByCities])

  // fetch labs by single city
  const fetchLabsByCity = async (id) => {
    try {
      setLoadingLast(true)
      const response = await API.get(`${labsByCitiesApi}?city=${id}`);
      if (response?.code === 200) {
        setLabsByCities(response?.data);
        setLoadingLast(false)
        setNextCitySelectedListner(false)
        setEffectHasRun(false);
      }
    } catch (e) {
      console.log(e);
    }
  }

  // fetch single labs details 
  const fetchSingleLabDetails = async (id) => {
    try {
      setLoadingLast(true)
      const response = await API.get(`${labsByCitiesApi}?lab_id=${id}`);
      if (response?.code === 200) {
        setSingleLabsDetails(response?.data);
        setLoadingLast(false)
        setNextCitySelectedListner(false)
        setEffectHasRun(false);
        setIsModalVisible(false)
      }
    } catch (e) {
      console.log(e);
    }
  }

  // if cart item greater than 0  the some states goes true
  useEffect(() => {
    if (runForSelectedlab === null && myCart?.lab_cart?.length > 0) {
      // fetchSingleLabDetails(myCart?.lab?.id);
      setRunForSelectedlab(false);
      setListnerforCityNameFromCart(true)
    }
  }, [runForSelectedlab, myCart?.lab_cart]);

  // after select city hit default api for lab test and lab packages with the lab id 
  useEffect(() => {
    if (singleLabsDetails?.length > 0) {
      setGetLabsId(singleLabsDetails?.[0]?.id)
    }
  }, [getLabsId, singleLabsDetails])


  // create cart api hit when swtich city 200 response state goes true
  useEffect(() => {
    if (switchCityCartCreateListner === true && getLabsId && listnerForCartWithLogin) {
      cartListner(getLabsId)
    }
  }, [getLabsId, listnerForCartWithLogin])



  // cart create api hit when getLabsId state sets id
  useEffect(() => {
    if (!myCartData?.length > 0 && getLabsId && !listnerForCartWithLogin) {
      cartListner(getLabsId);
    }
  }, [getLabsId, listnerForCartWithLogin])


  useEffect(() => {
    if (!myCart?.lab_cart?.length > 0 && labsByCities?.length > 0 && runForwhenChangeOnlyCity === true && !hasEffectRunRef.current && labsByCities[0]?.id) {
      // fetchSingleLabDetails(labsByCities[0].id);
      hasEffectRunRef.current = true;
      setNextCitySelectedListner(false)
    }
  }, [labsByCities, runForwhenChangeOnlyCity, fetchSingleLabDetails]);

  // create cart API func
  const cartListner = async (id) => {
    try {
      const response = await API.get(`${cart}?lab_id=${id}`);
      if (response?.code === 200) {
        setGetCartId(response?.data)
        setGuestIDValue(response?.data?.guest_id)
        Cookies.remove('guestId')
        let newUpdatedId = Cookies.set('guestId', response?.data?.guest_id)
        if (newUpdatedId || is_guest !== 1) {
          dispatch(fetchCart());
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  // create cart api hit by conditions
  useEffect(() => {
    if (auth && myCart?.lab_cart?.length > 0 && myCart?.lab?.id && !apiCalled && singleLabsDetails?.length > 0) {
      // cartListner(myCart?.lab?.id);

      setApiCalled(true); // Set the flag to true to prevent further API calls
    }
    else if (auth && getLabsId && !myCart?.lab_cart?.length > 0 && apiCalled === false && singleLabsDetails?.length > 0) {
      // cartListner(getLabsId);

      setApiCalled(true);
    }
    else if (auth && myCart === null && getLabsId && singleLabsDetails === null) {
      // cartListner(getLabsId);


      setApiCalled(true); // Set the flag to true to prevent further API calls
    }
  }, [apiCalled, singleLabsDetails, getCartId]);

  // add to cart api hit
  const addToCartFunc = async (id) => {
    const guestID = Cookies.get('guestId')
    const auth = Cookies.get('Authorization')
    try {
      let data;
      if (listnerForLabTest) {
        data = {
          userId: getCartId?.user_id,
          cart_id: getCartId?.id,
          lab_id: id,
        };
      } else {
        data = {
          userId: getCartId?.user_id,
          cart_id: getCartId?.id,
          package_id: id,
        };
      }

      if (!auth) {
        data.guest_id = guestID;
      }
      setAddToCartLoader(true);
      const response = await API.post(`${addToCart}`, data);
      if (response?.code === 200) {
        setMyCartApiCalled(false)
        setInstructionsModalListner(false)
      } else {
        swal("", `${response?.message}`, "error");
      }
    } catch (e) {
      console.log(e);
    }
    finally {
      setAddToCartLoader(false);
    }
  }

  const addToCartFuncForProps = async (id) => {
    const guestID = Cookies.get('guestId')
    const auth = Cookies.get('Authorization')
    try {
      let data;
      if (listnerForLabTest) {
        data = {
          userId: getCartId?.user_id,
          cart_id: getCartId?.id,
          lab_id: id,
        };
      } else {
        data = {
          userId: getCartId?.user_id,
          cart_id: getCartId?.id,
          package_id: id,
        };
      }

      if (!auth) {
        data.guest_id = guestID;
      }
      setAddToCartLoader(true);
      const response = await API.post(`${addToCart}`, data);
      if (response?.code === 200) {
        setMyCartApiCalled(false)
        setDefaultCity(null)
        setInstructionsModalListner(false)
        return response;
      } else {
        swal("", `${response?.message}`, "error");
        throw new Error("Error");
      }
    } catch (e) {
      console.log(e);
      throw new Error("Error");
    }
    finally {
      setAddToCartLoader(false);
    }
  }

  // remove to cart api hit
  const removeToCartFunc = async (id, isPackage = false) => {
    const guestID = Cookies.get('guestId')
    const auth = Cookies.get('Authorization')
    try {
      setRemoveToCartLoader(true);
      const response = await API.delete(`${removeCart}/${id}${!auth ? `?guest_id=${guestID}` : ''}${isPackage ? `${!auth ? '&&' : '?'}is_package=${true}` : ''}`);
      if (response?.code === 200) {
        dispatch(fetchCart());
        setRemoveModal(false);
      }
    } catch (e) {
      console.log(e);
    }
    finally {
      setRemoveToCartLoader(false);
    }
  }

  const removeToCartFuncForProps = async (id, isPackage = false) => {
    const guestID = Cookies.get('guestId')
    const auth = Cookies.get('Authorization')
    try {
      setRemoveToCartLoader(true);
      const response = await API.delete(`${removeCart}/${id}${!auth ? `?guest_id=${guestID}` : ''}${isPackage ? `${!auth ? '&&' : '?'}is_package=${true}` : ''}`);
      if (response?.code === 200) {
        dispatch(fetchCart());
        setRemoveModal(false)
        return response;
      }
      else {
        throw new Error("Error");
      }
    } catch (e) {
      console.log(e);
      throw new Error("Error");
    }
    finally {
      setRemoveToCartLoader(false);
    }
  }

  // empty cart api hit
  const emptyCartFunc = async () => {
    try {
      let data = {
        guest_id: guestID
      };
      const response = await API.post(`${emptyCart}`, !auth ? data : '');
      if (response?.code === 200) {
      }
    } catch (e) {
      console.log(e);
    }
  }

  // switch cart api hit
  const switchCartFunc = async (id, guestIDValue) => {
    const auth = Cookies.get('Authorization')
    try {
      let data;
      data = {
        lab_id: id
      }
      if (!auth && guestIDValue) {
        data.guest_id = guestIDValue;
      }
      const response = await API.post(`${switchCart}`, data);
      if (response?.code === 200) {
        // setSwitchCityListner(true)
      }
    } catch (e) {
      console.log(e);
    }
  }

  // switch city api hit
  const switchCityFunc = async (cartId) => {
    try {
      let data = {
        cart_id: cartId
      }
      const response = await API.post(`${switchCart}`, data);
      if (response?.code === 200) {
        Cookies.remove('cart')
        setListnerForCartWithLogin(true)
        setSwitchCityCartCreateListner(true)
        setListnerIfCartHasItem(false)
        setRunForwhenChangeOnlyCity(true)
        if (myCart?.lab_cart?.length > 0) {
          fetchLabsByCity(locationValue)
        }
        setIsModalVisibleCityChange(false)
        setListnerForSwitchCity(true)
      }
    } catch (e) {
      console.log(e);
    }
  }

  // popular labs by cities api hit
  useEffect(() => {
    if (labsByCities?.length > 0) {
      const filteredPopularLabs = labsByCities?.filter(obj => obj?.is_popular === 1);
      setPopularLabs(filteredPopularLabs)
    }
  }, [labsByCities])

  // popular labs test by city api hit
  useEffect(() => {
    if (singleLabsDetails?.length > 0) {
      const filteredPopularTests = singleLabsDetails?.[0]?.lab_test?.filter(obj => obj?.is_popular === 1);
      setPopularLabsTests(filteredPopularTests)
    }
  }, [singleLabsDetails])

  // popular labs packages by city api hit
  useEffect(() => {
    if (singleLabsDetails?.length > 0) {
      const filteredPopularPackages = singleLabsDetails?.[0]?.lab_package?.filter(obj => obj?.package?.is_popular === 1);
      setPopularLabsPackages(filteredPopularPackages)
    }
  }, [singleLabsDetails])

  // set guest id for when user not logged in as guest flow
  useEffect(() => {
    if (!Cookies.get("Authorization") && !Cookies.get("guestId") && !Cookies.get("cartId")) {
      if (getCartId?.guest_id && getCartId?.id) {
        Cookies.set("guestId", getCartId?.guest_id);
        Cookies.set("cartId", getCartId?.id);

      }
    } else if (Cookies.get("Authorization")) {
      Cookies.remove('guestId');
      Cookies.remove('cartId');
    }
  }, [getCartId, guestIDValue]);

  // Add another useEffect to update the guestId cookie when guestIDValue changes
  useEffect(() => {
    if (!auth && !myCartData && guestIDValue && getCartId) {
      Cookies.remove("guestId");
      Cookies.remove("cartId");
      Cookies.set("guestId", guestIDValue);
      Cookies.set("cartId", getCartId?.id);
    } else if (!auth && guestIDValue && getCartId) {
      Cookies.set("guestId", guestIDValue);
      Cookies.set("cartId", getCartId?.id);
    }
  }, [guestIDValue, myCartData, getCartId]);

  // lab packages api for lab landing page seperate section
  const labPackagesFunc = async () => {
    try {
      let cityId = 1;

      if (labsByCities?.length > 0) {
        cityId = labsByCities[0].id
      }

      const response = await API.get(`${labPackagesPopular}?city_id=${cityId}`);
      if (response?.code === 200) {
        setLabPackagesPopularData(response?.data)
      }
    } catch (e) {
      console.log(e);
    }
  }

  // lab packages api hit depends on internal state
  useEffect(() => {
    labPackagesFunc()
  }, [instructionsModalPackage])


  useEffect(() => {
    if (myCart?.lab?.lab_city?.city_id && myCart?.lab_cart?.length > 0) {
      fetchLabsByCity(myCart?.lab?.lab_city?.city_id)
      // fetchSingleLabDetails(myCart?.lab?.id)
      setListnerIfCartHasItem(true)
      setNextCitySelectedListner(false)
    }
  }, [myCart?.lab?.id])

  useEffect(() => {
    if (hasLocationChanged) {
      (async () => {
        try {
          let cityId = Cookies.get("locationLabs") || 1;

          const response = await API.get(`${labPackagesPopular}?city_id=${cityId}`);
          if (response?.code === 200) {
            setLabPackagesPopularData(response?.data)
          }
        } catch (e) {
          console.log(e);
        }
        finally {
          setHasLocationChanged(false);
        }
      })()
    }

  }, [hasLocationChanged])



  return (
    <>

      <MetaDataCustom metaData={topics} />
      <Container>
        {(apiLoader === true ||
          addToCartLoader === true ||
          removeToCartLoader === true) && (
            <>
              <Loader />
            </>
          )}
      </Container>
      <div
        className={`only_pricing_page forLabsMainPage ${topics?.class_name}`}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <Container data-aos="fade-up" data-aos-duration="800" className=" ">
          <div className="pricing-container mt-md-4 ">
            <div className="_pricing-banner-container my-80 mb-0">
              <div className="closing">
                {widgetData?.widgets?.map((item, index) => {
                  if (index <= 1) {
                    return renderWidget(item.key_type, item, index);
                  }
                })}
              </div>
            </div>
          </div>
        </Container>

        <div>
          <LabSelection
            selectedLocation={selectedLocation}
            listnerIfCartHasItem={listnerIfCartHasItem}
            defaultCity={defaultCity}
            runForwhenChangeOnlyCity={runForwhenChangeOnlyCity}
            popularLabsPackages={popularLabsPackages}
            guestIDValue={guestIDValue}
            popularLabsTests={popularLabsTests}
            popularLabs={popularLabs}
            setSearch={setSearch}
            search={search}
            switchCartFunc={switchCartFunc}
            emptyCartFunc={emptyCartFunc}
            listnerforCityNameFromCart={listnerforCityNameFromCart}
            setIsModalVisibleCityChange={setIsModalVisibleCityChange}
            isModalVisibleCityChange={isModalVisibleCityChange}
            setIsModalVisible={setIsModalVisible}
            isModalVisible={isModalVisible}
            setGetLabsId={setGetLabsId}
            setInstructionsModalListner={setInstructionsModalListner}
            instructionsModalListner={instructionsModalListner}
            setRemoveModal={setRemoveModal}
            removeModal={removeModal}
            removeToCartFunc={removeToCartFuncForProps}
            listnerForLabTest={listnerForLabTest}
            setListnerForLabTest={setListnerForLabTest}
            setMyCartApiCalled={setMyCartApiCalled}
            myCartApiCalled={myCartApiCalled}
            addToCartFunc={addToCartFuncForProps}
            getCartId={getCartId}
            loadingLast={loadingLast}
            effectHasRun={effectHasRun}
            nextCitySelectedListner={nextCitySelectedListner}
            singleLabsDetails={singleLabsDetails}
            fetchSingleLabDetails={fetchSingleLabDetails}
            labsByCities={labsByCities}
            citiesLabs={citiesLabs?.length > 0 && citiesLabs}
            setLocationModal={setLocationModal}
            locationModal={locationModal}
          />
        </div>

        <div></div>
        {widgetData?.widgets?.map((item, index) => {
          if (index > 1 && index < 3) {
            return renderWidget(item.key_type, item, index);
          }
        })}
        <LabPackages
          getCartId={getCartId}
          labsPackage={labPackagesPopularData}
          widgetData={widgetData?.widgets?.[3]}
          setInstructionsModalPackage={setInstructionsModalPackage}
          instructionsModalPackage={instructionsModalPackage}
        />

        <Container
          // style={{ order: "3" }}
          data-aos="fade-up"
          data-aos-duration="800"
        >
          <div className="pricing-faq-container container mt-0 mb-5 px-0">
            <h2 className="pricing-faq-heading text-center mb-3">
              {i18nData?.faq}
            </h2>
            {props?.faqQuestions?.map((faq, index) => (
              <Accordion defaultActiveKey={0} className="lab-test-faq-page">
                <Accordion.Item className="pricing-accordion-item" key={index}>
                  <Accordion.Header className="pricing-accordion-question bg-transparent">
                    {faq?.question}
                  </Accordion.Header>
                  <Accordion.Body className="pricing-accordion-answer">
                    {parse(faq?.answer)}
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            ))}
          </div>
        </Container>
        {locationModal ? (
          <>
            <LocationForLabs
              setActiveRadioState={setActiveRadioState}
              activeRadioState={activeRadioState}
              listnerForCityChangeDefault={listnerForCityChangeDefault}
              setListnerForCityChangeDefault={setListnerForCityChangeDefault}
              runForwhenChangeOnlyCity={runForwhenChangeOnlyCity}
              setListnerIfCartHasItem={setListnerIfCartHasItem}
              setHasLocationChanged={setHasLocationChanged}
              switchCityFunc={switchCityFunc}
              setRunForwhenChangeOnlyCity={setRunForwhenChangeOnlyCity}
              setEffectHasRun={setEffectHasRun}
              singleLabsDetails={singleLabsDetails}
              setSearch={setSearch}
              myCart={myCart}
              setIsModalVisibleCityChange={setIsModalVisibleCityChange}
              isModalVisibleCityChange={isModalVisibleCityChange}
              switchCartFunc={switchCartFunc}
              emptyCartFunc={emptyCartFunc}
              fetchSingleLabDetails={fetchSingleLabDetails}
              setListnerforCityNameFromCart={setListnerforCityNameFromCart}
              fetchLabsByCity={fetchLabsByCity}
              citiesLabs={citiesLabs}
              setActiveState={setActiveState}
              activeState={activeState}
              setLocationModal={setLocationModal}
              locationModal={locationModal}
              setLocationValue={setLocationValue}
              locationValue={locationValue}
              setSelectedLocation={setSelectedLocation}
              selectedLocation={selectedLocation}
            />
          </>
        ) : null}
        {isModalVisibleCityChange ? (
          <>
            <ChangeCity
              switchCityFunc={switchCityFunc}
              myCart={myCart}
              switchCartFunc={switchCartFunc}
              emptyCartFunc={emptyCartFunc}
              fetchSingleLabDetails={fetchSingleLabDetails}
              setIsModalVisibleCityChange={setIsModalVisibleCityChange}
              isModalVisibleCityChange={isModalVisibleCityChange}
            />
          </>
        ) : null}
      </div>
    </>
  );
}

export async function getServerSideProps({ locale }) {
  const langChecker = Cookies.get("lang");
  const apiLocale = locale === "ur" || langChecker == "2" ? 2 : 1;
  const response = await API.get(faqs_category_pricing, {
    headers: {
      platform: "web",
      locale: apiLocale,
    },
  });
  const data = response.data;

  const labTestPage =
    locale === "ur" || langChecker === "2" ? labTest : labTest;
  try {
    const labTestPageContent = await API.get(labTestPage, {
      headers: {
        platform: "web",
        locale: apiLocale,
      },
    });

    const labTestPageData = labTestPageContent?.data;

    if (labTestPageContent?.code === 200) {
      return {
        props: {
          faqQuestions: data,
          widgetData: labTestPageData,
          ...(await serverSideTranslations(locale, ["common"])),
        },
      };
    } else {
      return { props: { labTestPageData: [] } };
    }
  } catch (error) {
    return { props: { labTestPageData: [] } };
  }
}
