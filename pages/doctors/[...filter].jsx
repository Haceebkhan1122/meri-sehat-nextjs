import React, { useEffect, useState, useRef } from 'react'
import FindBestDoctors from '../../components/findBestDoctors/FindBestDoctors';
import { useRouter } from 'next/router';
import { fetchCities, fetchSpecialitiesDiseaseDoctor, fetchDiseaseNames, fetchSpecialityNames, hospitalNames } from '../../store/citySpecialityDiseaseDoctorLayout';
import { useDispatch, useSelector } from "react-redux";
import Cookies from 'js-cookie';
import { APIV3 } from "@/utils/httpService";
import { filterFindDocApi, findDoctorByCity, findAllCitiesSpeciality, faqDoctorListing, doctorListingPageFromServer, cities, recommendedDoctorsListing, quickTagsListing } from "@/utils/endpoints";
import CititesWithLocation from '../../components/cititesWithLocation/cititesWithLocation'
import { wrapper } from "@/store/store";
import { addTranslation } from "@/store/translationSlice";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import CitiesModalFAD from '../../components/modalCitiesFAD/ModalCities';
import Head from 'next/head';
import cookie from 'cookie';
import mixpanel from 'mixpanel-browser';

const DoctorListingAllPage = (props) => {
  const { apiType, _nextI18Next } = props;
  Cookies.remove('specModal');
  Cookies.remove('clinic_info');
  // Access the router
  const router = useRouter();
  const isQueryEmpty = Object.keys(router.query).length === 0;
  const isQuerySpecialityListShowing = router.query;
  const isQueryEmptyTwo = router.query.filter.length;
  const queryValue = Object.values(router.query)
  const initialLocale = _nextI18Next?.initialLocale;
  const i18n = _nextI18Next?.initialI18nStore[initialLocale]?.common;

  useEffect(() => {
    if (typeof i18n === "object" && Object.keys(i18n).length > 0) {
      dispatch(addTranslation(i18n));
    }
  }, [i18n]);

  const dispatch = useDispatch();
  let myCities = useSelector((state) => state.cities.cities);
  let specialityDiseaseDoctorGlobal = useSelector((state) => state.specialityDiseaseDoctor.specialityDiseaseDoctor);
  let diseasesNameAll = useSelector((state) => state.diseaseNames.diseaseNames);
  let SpecialitiesNameAll = useSelector((state) => state.specialityName.SpecialityNames);
  let hospitalsNameAll = useSelector((state) => state.hospitalsList.hospitalList);
  const [selectedCity, setSelectedCity] = useState();
  const [specialityValue, setSpecialityValue] = useState('')
  const [clinicValue, setClinicValue] = useState({})
  const [specialityQueryValue, setSpecialityQueryValue] = useState('')
  const [diseaseValue, setDiseaseValue] = useState('')
  const [diseaseQueryValue, setDiseaseQueryValue] = useState('')
  const [doctorValue, setDoctorValue] = useState('')
  const [doctorQueryValue, setDoctorQueryValue] = useState('')
  const [gender, setGender] = useState('')
  const [appointmentType, setAppointmentType] = useState('')
  const [genderQuery, setGenderQuery] = useState('')
  const [doctorListing, setDoctorListing] = useState([])
  const [getAllCitiesSpec, setGetAllCitiesSpec] = useState([]);
  const [searchFindDocByCity, setSearchFindDocByCity] = useState()
  const [recommendedDoctors, setRecommendedDoctors] = useState()
  const [quickFilters, setQuickFilters] = useState({})
  const [minFee, setMinFee] = React.useState();
  const [maxFee, setMaxFee] = React.useState();
  const [defaultMinValue, setDefaultMinValue] = React.useState();
  const [defaultMaxValue, setDefaultMaxValue] = React.useState();

  // default query params states
  const [completeSearchModal, setCompleteSearchModal] = useState(false)
  const [applyFilter, setApplyFilter] = useState(false)

  const [specModal, setSpecModal] = useState(false)
  const [diseasessModal, setDiseasessModal] = useState(false)
  const [loading, setLoading] = useState(true);
  const [sortSpecialityValue, setSortSpecialityValue] = useState('');
  const [sortDiseaseValue, setSortDiseaseValue] = useState('');
  const [sortGenderValue, setSortGenderValue] = useState('');
  const [theBestGeneralFold, setTheBestGeneralFold] = useState(false);
  const [selectedCityCookie, setSelectedCityCookie] = useState()
  const [citiesModal, setCitiesModal] = useState(false)
  const [checkerOfSortingSelector, setCheckerOfSortingSelector] = useState()
  const [showMobile, setShowMobile] = useState(false);
  const [selectedOtherCityData, SetSelectedOtherCityData] = useState();
  const [otherCityState, SetOtherCityState] = useState(true);
  const [selectedDiseaseValue, setSelectedDiseaseValue] = useState('');
  var storedCity = Cookies.get('selectedCity');
  const karachiCity = myCities?.find(city => city.name == 'Karachi');
  const initialRender = useRef(true);
  const [loadingLast, setLoadingLast] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [firstRender, setFirstRender] = useState(true);
  const [currentPageChanged, setCurrentPageChanged] = useState(false);
  const [listenerFilterApply, setListenerFilterApply] = useState(true);
  const [isDirectUrlHit, setisDirectUrlHit] = useState(false)
  const cityNameInParam = router.query.filter[0];

  // Get Selected City from Cookies
  useEffect(() => {
    const storedCity = Cookies.get('selectedCity');
    try {
      if (storedCity) {
        const selectedCityCookie = JSON.parse(storedCity);
        setSelectedCityCookie(selectedCityCookie)

      } else if (cityNameInParam !== "") {
        const cityObject = myCities?.find(item => item?.name?.toLowerCase() == cityNameInParam?.toLowerCase());
        if (cityObject) {
          Cookies.set('selectedCity', JSON.stringify(cityObject));
        }
      } else {
        setCitiesModal(true)
      }
    } catch (error) {
      console.error('Error parsing JSON from the cookie:', error);
    }
  }, [JSON.stringify(selectedCity), JSON.stringify(myCities)])

  useEffect(() => {
    const timer = setTimeout(() => {
      mixpanel.track('Speciality page view');
    }, 5000);

    // Cleanup the timeout if the component unmounts
    return () => clearTimeout(timer);
  }, []);

  // get selected city from cookie
  useEffect(() => {
    try {
      if (loading) {
      } else if (storedCity) {
        const parsedData = JSON.parse(storedCity);
        setSelectedCity(parsedData);
      } else {
        console.log('Cookie not found');
      }
    } catch (error) {
      console.error('Error parsing JSON from the cookie:', error);
    }
  }, [loading, storedCity, karachiCity])

  // calling cities and specialities, disease, doctor function from reducer redux
  useEffect(() => {
    dispatch(fetchCities())
    dispatch(fetchSpecialitiesDiseaseDoctor())
    dispatch(fetchDiseaseNames())
    dispatch(fetchSpecialityNames())
    dispatch(hospitalNames(selectedCityCookie?.id))
  }, []);

  // set default value of query params
  useEffect(() => {
    if (!queryValue[1]?.[1]) {
      if (router.query.filter[1]) {
        setSpecialityValue(router.query.filter[1])
      }
      if (router.query.disease) {
        setDiseaseValue(router.query.disease)
      }
      if (router.query.name) {
        setDoctorValue(router.query.name)
      }
      if (router.query.gender) {
        setGender(router.query.gender)
      }
      if (router.query.appointment_type) {
        setAppointmentType(router.query.appointment_type)
      }
      if (router.query.min_fee) {
        setMinFee(router.query.min_fee)
      }
      if (router.query.max_fee) {
        setMaxFee(router.query.max_fee)
      }
    }
  }, [router.query])

  // Get Clinics from store and set clinic value obj when user page refresh 
  useEffect(() => {
    if (router.query.clinic_id) {
      const fileration = hospitalsNameAll !== null && hospitalsNameAll?.filter((item) => item?.id == router?.query?.clinic_id);
      setClinicValue(fileration[0] && fileration[0]);
    }
  }, [hospitalsNameAll !== null])

  // when single speciality is clicked
  const handleSingleSpecByCity = async (specData) => {
    Cookies.remove('findASpecialist')
    Cookies.remove('OtherCities')
    Cookies.remove('speciality')
    // const specName = specData?.name.replaceAll(" ", '+')
    let query = `/${selectedCityCookie?.name}/${specData?.name}`
    setSpecialityValue(specData?.name)
    router.push({
      pathname: window.location.pathname,
      query: query,
    });
  }

  // handle other cities logic redirect
  const handleOtherCities = (otherCityData) => {
    SetSelectedOtherCityData(otherCityData)
    SetOtherCityState(false)
    Cookies.remove('findASpecialist')
    Cookies.remove('OtherCities')
    Cookies.remove('selectedCity')
    Cookies.remove('speciality')
  }

  // Get Data From cookie and set in state
  useEffect(() => {
    if (selectedOtherCityData) {
      Cookies.set('selectedCity', JSON.stringify(selectedOtherCityData?.city))
      const storedCity = Cookies.get('selectedCity');
      if (storedCity) {
        const parsedData = JSON.parse(storedCity);
        setSelectedCityCookie(parsedData)
      } else {
        console.log('Cookie not found')
      }

      let query = `/doctors/${selectedOtherCityData?.city?.name}/${selectedOtherCityData?.speciality[0]?.name}`
      setSpecialityValue(selectedOtherCityData?.speciality[0]?.name)
      router.push({
        pathname: window.location.pathname,
        query: query,
      });

    }
  }, [selectedOtherCityData])

  // Get All City Specialities
  const getAllCitiesSpeciality = async () => {
    const otherCities = Cookies.get('OtherCities')

    if (otherCities) {
      const response = await APIV3.get(findAllCitiesSpeciality);
      if (response?.status == 200) {
        setGetAllCitiesSpec(response?.data?.data)
      }
    }

  }

  // Call API Functions And Mixpanel
  useEffect(() => {
    setTimeout(() => {
      mixpanel.track('Speciality page view');
    }, 5000);
    getAllCitiesSpeciality()
    fetchingRecommendedDoctors()
    fetchingQuickTagsFilters()
  }, [])

  // search api function from all options modal
  const fetchDoctorByQueryParam = async () => {
    setLoadingLast(true);
    Cookies.remove('findASpecialist');
    try {
      let apiUrl = `${filterFindDocApi}?page=${router.query.page ? router.query.page : '1'}&city_id=${selectedCity ? selectedCity : selectedCityCookie?.id}`;
      var query = {};
      if (router.query.filter[1]) {
        apiUrl += `&speciality=${router.query.filter[1]?.replace(/-/g, ' ')}`;
        setSpecialityQueryValue(router.query.filter[1])
        setSpecialityValue(router.query.filter[1])
      }
      if (router.query.disease) {
        apiUrl += `&disease=${router.query.disease?.replace(/-/g, ' ')}`;
        setDiseaseQueryValue(router.query.disease)
        setDiseaseValue(router.query.disease)
        query.disease = router.query.disease.toLowerCase()?.replace(/ /g, '-');
      }
      if (router.query.clinic_id) {
        apiUrl += `&clinic_id=${router.query.clinic_id}`;
        query.clinic_id = router.query.clinic_id
      }
      if (router.query.name) {
        apiUrl += `&name=${router.query.name}`;
        setDoctorQueryValue(router.query.name)
        setDoctorValue(router.query.name)
        query.name = doctorValue;
      }
      if (router.query.gender) {
        apiUrl += `&gender=${router.query.gender}`;
        setGenderQuery(router.query.gender)
        setGender(router.query.gender)
        query.gender = router.query.gender;
      }
      if (router.query.appointment_type) {
        apiUrl += `&appointment_type=${router.query.appointment_type}`;
        setAppointmentType(router.query.appointment_type)
        query.appointment_type = router.query.appointment_type;
      }
      if (router.query.min_fee) {
        apiUrl += `&min_fee=${router.query.min_fee}`;
        setMinFee(router.query.min_fee)
        query.min_fee = router.query.min_fee;
      }
      if (router.query.max_fee) {
        apiUrl += `&max_fee=${router.query.max_fee}`;
        setMaxFee(router.query.max_fee)
        query.max_fee = router.query.max_fee;
      }

      const response = await APIV3.get(apiUrl);
      if ((router.query.disease || router.query.filter[1])) {
        query.page = "1";
      }
      if (response?.status == 200) {
        const calculatedTotalPages = Math.ceil(response?.data?.data?.total / response?.data?.data?.per_page);
        setTotalPages(calculatedTotalPages);
        setCurrentPage(response?.data?.data?.current_page)
        setLoadingLast(false);
        setDoctorListing(response?.data?.data);
        Cookies.set('specialityMeta', JSON.stringify(response?.data?.data?.speciality_arr))
        setCheckerOfSortingSelector(false)
        setShowMobile(false)
        setCompleteSearchModal(false)
        setSpecModal(false)
        setDiseasessModal(false)
        if (router.query.filter[1]) {
          router.push({
            pathname: `/doctors/${selectedCityCookie?.name ? `${selectedCityCookie?.name.toLowerCase()}` : ''}${(!sortSpecialityValue && router.query.filter[1]) ? `/${router.query.filter[1].toLowerCase()?.replace(/ /g, '-')}` : ''}${sortSpecialityValue ? `/${sortSpecialityValue.toLowerCase()?.replace(/ /g, '-')}` : ''}`,
            query: query,
          });
        }
      }
    } catch (e) {
      console.error(e);

    }
  };

  // calling cities function from reducer redux
  useEffect(() => {
    // Check if it's the first render and selectedCityCookie is available
    if (firstRender && selectedCityCookie) {
      fetchDoctorByQueryParam();
      setFirstRender(false);
    }
  }, [firstRender, selectedCityCookie]);

  // find doctor by city 
  const fetchingSearchDocByCity = async () => {
    try {
      const response = await APIV3.get(`${findDoctorByCity}?city_id=${selectedCityCookie?.id}`)
      if (response?.status == 200) {
        setSearchFindDocByCity(response?.data?.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  // find doctor by city 
  useEffect(() => {
    if (selectedCityCookie && selectedCityCookie !== "undefined") {
      fetchingSearchDocByCity();
      const query = {};
      if (!selectedCityCookie) {
        router.push({
          pathname: `/doctors/${selectedCityCookie?.name}`,
          query: query,
        });
      }
    }
  }, [JSON.stringify(selectedCityCookie)]);


  // search api function from filter options modal
  const fetchDoctorByFilter = async () => {
    setLoadingLast(true);
    try {
      let apiUrl = `${filterFindDocApi}?page=${`1`}&city_id=${selectedCity ? selectedCity : selectedCityCookie?.id}`;
      const query = {};
      if (specialityValue !== "" || sortSpecialityValue !== "") {
        apiUrl += `&speciality=${sortSpecialityValue ? sortSpecialityValue?.replace(/-/g, ' ') : specialityValue?.replace(/-/g, ' ')}`;
      } if (diseaseValue !== "" || sortDiseaseValue !== "") {
        apiUrl += `&disease=${sortDiseaseValue ? sortDiseaseValue?.replace(/-/g, ' ') : diseaseValue?.replace(/-/g, ' ')}`;
        query.disease = sortDiseaseValue ? sortDiseaseValue.toLowerCase()?.replace(/ /g, '-') : diseaseValue.toLowerCase()?.replace(/ /g, '-');
      } if (clinicValue.id) {
        apiUrl += `&clinic_id=${clinicValue.id}`;
        query.clinic_id = clinicValue.id
      }
      if (doctorValue !== "") {
        apiUrl += `&name=${doctorValue}`;
        query.name = doctorValue;
      }
      if (gender !== "") {
        apiUrl += `&gender=${gender}`;
        query.gender = gender;
      }
      if (appointmentType !== "") {
        apiUrl += `&appointment_type=${appointmentType}`;
        query.appointment_type = appointmentType;
      }
      if (minFee !== undefined && minFee !== "0" && minFee !== "") {
        apiUrl += `&min_fee=${minFee}`;
        query.min_fee = minFee;
      }
      if (maxFee !== undefined && maxFee !== "0" && maxFee !== "") {
        apiUrl += `&max_fee=${maxFee}`;
        query.max_fee = maxFee;
      }
      if ((diseaseValue || specialityValue || clinicValue?.id || sortSpecialityValue || sortDiseaseValue)) {
        query.page = "1";
      }
      const response = await APIV3.get(apiUrl);
      if (response?.status == 200) {
        setCurrentPage(1)
        const calculatedTotalPages = Math.ceil(response?.data?.data?.total / response?.data?.data?.per_page);
        setTotalPages(calculatedTotalPages);
        SetSelectedOtherCityData('')
        setLoadingLast(false);
        setDoctorListing(response?.data?.data);
        Cookies.set('specialityMeta', JSON.stringify(response?.data?.data?.speciality_arr));
        Cookies.remove('findASpecialist')
        Cookies.remove('OtherCities')
        Cookies.remove('speciality')
        setCheckerOfSortingSelector(false)
        setShowMobile(false)
        router.push({
          pathname: `/doctors/${selectedCityCookie?.name ? `${selectedCityCookie?.name.toLowerCase()}` : ''}${sortSpecialityValue !== "" ? `/${sortSpecialityValue.toLowerCase()?.replace(/ /g, '-')}` : specialityValue ? `/${specialityValue.toLowerCase()?.replace(/ /g, '-')}` : ''}`,
          query: query,
        });
        setCompleteSearchModal(false)
        setSpecModal(false)
        setDiseasessModal(false)
      }
    } catch (e) {
      console.error(e);
    }
  }

  // Skip API call on initial render
  useEffect(() => {
    SetOtherCityState(true)
    if (selectedCityCookie) {
      setListenerFilterApply(true)
      if (initialRender.current) {
        // Skip API call on initial render
        initialRender.current = false;
      } else if (!checkerOfSortingSelector && !Cookies.get('OtherCities') && !Cookies.get('speciality') && currentPage >= 1 && listenerFilterApply == true && otherCityState == true) {
        fetchDoctorByFilter();
      }
    }
  }, [specialityValue, diseaseValue, doctorValue, clinicValue?.id, selectedCityCookie]);

  // Will run on currentPage update
  useEffect(() => {
    const fetchDoctorByFilter = async () => {
      setLoadingLast(true);
      try {
        let apiUrl = `${filterFindDocApi}?page=${currentPage}&city_id=${selectedCityCookie?.id}`;
        const query = {};
        if (specialityValue !== "" || sortSpecialityValue !== "") {
          apiUrl += `&speciality=${sortSpecialityValue ? sortSpecialityValue?.replace(/-/g, ' ') : specialityValue?.replace(/-/g, ' ')}`;
        } if (diseaseValue !== "" || sortDiseaseValue !== "") {
          apiUrl += `&disease=${sortDiseaseValue ? sortDiseaseValue?.replace(/-/g, ' ') : diseaseValue?.replace(/-/g, ' ')}`;
          query.disease = sortDiseaseValue ? sortDiseaseValue.toLowerCase()?.replace(/ /g, '-') : diseaseValue.toLowerCase()?.replace(/ /g, '-');
        } if (clinicValue.id) {
          apiUrl += `&clinic_id=${clinicValue.id}`;
          query.clinic_id = clinicValue.id
        }
        if (doctorValue !== "") {
          apiUrl += `&name=${doctorValue}`;
          query.name = doctorValue;
        }
        if (gender !== "") {
          apiUrl += `&gender=${gender}`;
          query.gender = gender;
        }
        if (appointmentType !== "") {
          apiUrl += `&appointment_type=${appointmentType}`;
          query.appointment_type = appointmentType;
        }
        if (minFee !== undefined) {
          apiUrl += `&min_fee=${minFee}`;
          query.min_fee = minFee;
        }
        if (minFee !== undefined) {
          apiUrl += `&max_fee=${maxFee}`;
          query.max_fee = maxFee;
        }
        query.page = currentPage;

        const response = await APIV3.get(apiUrl);
        if (response?.status == 200) {
          const calculatedTotalPages = Math.ceil(response?.data?.data?.total / response?.data?.data?.per_page);
          setCurrentPageChanged(false)
          setTotalPages(calculatedTotalPages);
          SetSelectedOtherCityData('')
          setLoadingLast(false);
          setDoctorListing(response?.data?.data);
          Cookies.remove('findASpecialist')
          Cookies.remove('OtherCities')
          setCheckerOfSortingSelector(false)
          setShowMobile(false)
          setSortDiseaseValue("")
          setSortSpecialityValue("")
          // Update the URL query parameters
          router.push({
            pathname: `/doctors/${selectedCityCookie?.name ? `${selectedCityCookie?.name.toLowerCase()}` : ''}${sortSpecialityValue !== "" ? `/${sortSpecialityValue.toLowerCase()?.replace(/ /g, '-')}` : specialityValue ? `/${specialityValue.toLowerCase()?.replace(/ /g, '-')}` : ''}`,
            query: query,
          });
          setCompleteSearchModal(false)
          setSpecModal(false)
          setDiseasessModal(false)
        }
      } catch (e) {
        console.error(e);
      }
    };
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    if (selectedCityCookie) {
      if (!checkerOfSortingSelector && !Cookies.get('OtherCities') && !Cookies.get('speciality') && (currentPage && currentPageChanged)) {
        // Call the API when filter values change
        fetchDoctorByFilter();
      }
    }
  }, [currentPage]);

  // checker of checkerOfSortingSelector state when will its get true
  useEffect(() => {
    if (selectedCityCookie && checkerOfSortingSelector === true) {
      fetchDoctorByFilter();
    }
  }, [checkerOfSortingSelector])

  // check if url query is only speciality
  useEffect(() => {
    const queryParams = Object.entries(router.query);
    if ((queryParams.length === 2 || 3) && queryParams[1]?.[1]?.[1] && (specialityValue || sortSpecialityValue) && (!sortDiseaseValue && !diseaseValue) && !gender && !appointmentType) {
      setTheBestGeneralFold(true)
    } else {
      setTheBestGeneralFold(false)
    }
  }, [router.query, specialityValue])

  // Remove filters function
  const handleChecksMulti = (item) => {
    if (item?.key == "filter") {
      setSpecialityValue("");
      setSortSpecialityValue("")
      setCheckerOfSortingSelector(true)
    }
    if (item?.key == "disease") {
      setSelectedDiseaseValue("")
      setDiseaseValue("");
      setSortDiseaseValue("")
      setCheckerOfSortingSelector(true)
    }
    if (item?.key == "name") {
      setDoctorValue("");
    }
    if (item?.key == "gender") {
      setGender("");
      setDiseaseValue(sortDiseaseValue ? sortDiseaseValue : diseaseValue)
      setSpecialityValue(sortSpecialityValue ? sortSpecialityValue : specialityValue)
      setCheckerOfSortingSelector(true)
    }
    if (item?.key == "appointment_type") {
      setAppointmentType("")
      setCheckerOfSortingSelector(true)
    }
    if (item?.key == "min_fee") {
      setMinFee("")
      setCheckerOfSortingSelector(true)
    }
    if (item?.key == "max_fee") {
      setMaxFee("")
      setCheckerOfSortingSelector(true)
    }
    if (item?.address) {
      setClinicValue({})
    }
  };

  // Pagination  go to next page function
  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
    setCurrentPageChanged(true)
  };

  // Recommended Doctors 
  const fetchingRecommendedDoctors = async () => {
    try {
      const response = await APIV3.get(`${recommendedDoctorsListing}`)
      if (response?.status == 200) {
        setRecommendedDoctors(response?.data?.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  // Get Quick Tags Filters 
  const fetchingQuickTagsFilters = async () => {
    try {
      const response = await APIV3.get(`${quickTagsListing}`)
      if (response?.status == 200) {
        setQuickFilters(response?.data?.data)
        setDefaultMinValue(response?.data?.data?.range?.min_fee)
        setDefaultMaxValue(response?.data?.data?.range?.max_fee)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Head>
        <title>{props.doctors ? props.responseMetaData?.meta_name : props.responseMetaData?.speciality && props.responseMetaData?.speciality?.meta_name}</title>
        <meta name="title" content={props.doctors ? props.responseMetaData?.meta_name : props?.responseMetaData?.speciality && props?.responseMetaData?.speciality?.meta_name} />
        <meta name="description" content={props.doctors ? props.responseMetaData?.meta_description : props?.responseMetaData?.speciality && props?.responseMetaData?.speciality?.meta_description} />
        <meta property="og:title" content={props.doctors ? props.responseMetaData?.canonical_title : props?.responseMetaData?.speciality && props?.responseMetaData?.speciality?.canonical_title} key="og-title" />
        <meta property="og:description" content={props.doctors ? props.responseMetaData?.canonical_description : props?.responseMetaData?.speciality && props?.responseMetaData?.speciality?.canonical_description} key="og-desc" />
        <meta property="og:image" content={props.doctors ? props.responseMetaData?.seo_image : props?.responseMetaData?.speciality && props?.responseMetaData?.speciality?.seo_image} key="og-image" />
        <meta name="twitter:title" content={props.doctors ? props.responseMetaData?.canonical_title : props?.responseMetaData?.speciality && props?.responseMetaData?.speciality?.canonical_title} key="tw-title" />
        <meta name="twitter:description" content={props.doctors ? props.responseMetaData?.canonical_description : props?.responseMetaData?.speciality && props?.responseMetaData?.speciality?.canonical_description} key="tw-desc" />
        <meta name="twitter:image" content={props.doctors ? props.responseMetaData?.seo_image : props?.responseMetaData?.speciality && props?.responseMetaData?.speciality?.seo_image} key="tw-image" />
        <link rel="canonical" href={props.doctors ? props.responseMetaData?.canonical_link : props?.responseMetaData?.speciality && props?.responseMetaData?.speciality?.canonical_link} />
      </Head>
      <FindBestDoctors isQuerySpecialityListShowing={isQuerySpecialityListShowing} setSelectedCityCookie={setSelectedCityCookie} defaultMinValue={defaultMinValue} defaultMaxValue={defaultMaxValue} setMaxFee={setMaxFee} maxFee={maxFee} setMinFee={setMinFee} minFee={minFee} quickFilters={quickFilters} clinicValue={clinicValue} setClinicValue={setClinicValue} recommendedDoctors={recommendedDoctors} SpecialitiesNameAll={SpecialitiesNameAll} diseasesNameAll={diseasesNameAll} setSelectedDiseaseValue={setSelectedDiseaseValue} selectedDiseaseValue={selectedDiseaseValue} isQueryEmptyTwo={isQueryEmptyTwo} setListenerFilterApply={setListenerFilterApply} currentPage={currentPage} handlePageClick={handlePageClick} totalPages={totalPages} selectedCityCookie={selectedCityCookie} selectedOtherCityData={selectedOtherCityData} loadingLast={loadingLast} faqData={props.faqData} doctorsListingData={props.doctorListingData} showMobile={showMobile} setShowMobile={setShowMobile} sortGenderValue={sortGenderValue} setSortGenderValue={setSortGenderValue} handleChecksMulti={handleChecksMulti} fetchDoctorByFilter={fetchDoctorByFilter} applyFilter={applyFilter} isQueryEmpty={isQueryEmpty} doctorListing={doctorListing} theBestGeneralFold={theBestGeneralFold} setSortDiseaseValue={setSortDiseaseValue} sortDiseaseValue={sortDiseaseValue} sortSpecialityValue={sortSpecialityValue} setSortSpecialityValue={setSortSpecialityValue} setApplyFilter={setApplyFilter} setSpecModal={setSpecModal} specModal={specModal} diseasessModal={diseasessModal} setDiseasessModal={setDiseasessModal} setGender={setGender} gender={gender} setAppointmentType={setAppointmentType} appointmentType={appointmentType} setDoctorValue={setDoctorValue} doctorValue={doctorValue} setDiseaseValue={setDiseaseValue} diseaseValue={diseaseValue} specialityValue={specialityValue} setSpecialityValue={setSpecialityValue} specialityDiseaseDoctorGlobal={specialityDiseaseDoctorGlobal} completeSearchModal={completeSearchModal} setCompleteSearchModal={setCompleteSearchModal} selectedCity={selectedCity} setSelectedCity={setSelectedCity} myCities={myCities} />
      {isQuerySpecialityListShowing.filter.length == 1 && Object.keys(isQuerySpecialityListShowing).length == 1 ? (
        <>
          <CititesWithLocation loadingLast={loadingLast} handleOtherCities={handleOtherCities} getAllCitiesSpec={getAllCitiesSpec} handleSingleSpecByCity={handleSingleSpecByCity} selectedCity={selectedCity} setSelectedCity={setSelectedCity} myCities={myCities} citiesModal={citiesModal} setCitiesModal={setCitiesModal} searchFindDocByCity={searchFindDocByCity} selectedCityCookie={selectedCityCookie} />
        </>
      ) : null}
      <CitiesModalFAD setisDirectUrlHit={setisDirectUrlHit} myCities={myCities} setSelectedCity={setSelectedCity} selectedCity={selectedCity} citiesModal={citiesModal} setCitiesModal={setCitiesModal} />
    </>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ locale, req, params }) => {

      const cookiess = req.headers.cookie;
      let parsedDataMeta = null;

      if (cookiess) {
        const parsedCookies = cookie.parse(cookiess);
        const metaaaa = parsedCookies.selectedCity;
        if (metaaaa) {
          parsedDataMeta = JSON.parse(metaaaa);
        }
      }

      const cookies = parseCookies(req && req);
      const langChecker = cookies.lang;
      const apiLocale = locale === "ur" || langChecker == "2" ? 2 : 1;

      let responseMetaData = null;
      let findDocByIDDataMeta = null;

      try {
        const citiesApi = await APIV3.get(cities);
        const citiesData = citiesApi.data?.data;
        const filterCity = citiesData?.filter((city) => city?.name?.toLowerCase() == params.filter[0]);

        if (filterCity?.length > 0) {
          const filterMetaData = await APIV3.get(`${filterFindDocApi}?page=${'1'}&city_id=${filterCity?.[0]?.id}&speciality=${params.filter[1]?.replace(/-/g, ' ')}`);
          responseMetaData = filterMetaData?.data?.data || null;
        }

        if (filterCity?.length > 0 && params.filter?.length < 2) {
          const findDocById = await APIV3.get(`${findDoctorByCity}?city_id=${filterCity?.[0]?.id}`);
          const findDocByIdData = findDocById.data?.data;
          findDocByIDDataMeta = findDocByIdData[findDocByIdData?.length - 1]?.city_seo || null;
        }

        const response = await APIV3.get(faqDoctorListing, {
          headers: {
            platform: "web",
            locale: apiLocale,
          },
        });
        const data = response.data?.data;

        const doctorListingData = await APIV3.get(doctorListingPageFromServer, {
          headers: {
            platform: "web",
            locale: apiLocale,
          },
        });

        const doctorListingDataContent = doctorListingData?.data?.data;

        return {
          props: {
            responseMetaData: params.filter?.length < 2 ? findDocByIDDataMeta : responseMetaData || null,
            doctors: params.filter?.length < 2 ? true : false,
            faqData: data,
            doctorListingData: doctorListingDataContent,
            ...(await serverSideTranslations(locale, ["common"])),
            ...(await serverSideTranslations(locale, ["common"], null, ["en", "ur"])),
          },
        };
      } catch (error) {
        console.error("Error fetching data:", error);
        return {
          props: {
            responseMetaData: findDocByIDDataMeta || responseMetaData || null,
            faqData: null,
            doctorListingData: null,
            ...(await serverSideTranslations(locale, ["common"])),
            ...(await serverSideTranslations(locale, ["common"], null, ["en", "ur"])),
          },
        };
      }
    }
);

export default DoctorListingAllPage;


function parseCookies(req) {
  return cookie.parse(req ? req.headers.cookie || "" : document.cookie);
}