import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
// import Select from 'react-select';
import { getDoctorCities, getDoctorClinics, getDoctorSpecialites } from '../../utils/api/HealthScanApi';
import { Form, Select } from 'antd';
import { slugify } from "../../utils/powerFunctions";
import SearchIconLarge from "../searchIconLarge/SearchIconLarge";
import { TbCurrentLocation } from "react-icons/tb";
import { ImLocation } from "react-icons/im";
import { BsSearch } from "react-icons/bs";
import API from "../../utils/httpService";
import { useRouter } from 'next/router';
// import mixpanel from 'mixpanel-browser';

function HealthCareFilter(props) {
  const router = useRouter();

  const { widgetData, setSearchParams = () => { }, searchData } = props;
  const { cities, clinics, specialities } = widgetData?.data || {};
  const [selectedOption, setSelectedOption] = useState(null);
  const [searchForm] = Form.useForm();

  const [findSpeciality, setFindSpeciality] = useState([]);
  const [findClinics, setFindClinics] = useState([]);
  const [findCity, setFindCity] = useState([]);
  const [searchDoctor, setSerchDoctor] = useState({});
  const [loading, setLoading] = useState(false);
  const [doctorsResult, setDoctorsResult] = useState([]);

  const [detectCityValue, setDetectCityValue] = useState('');

  const [apiLoading, setApiLoading] = useState(false);

  const { city, speciality, hospital } = router.query;

  const links = [
    { text: 'Skin Specialist', url: '#' },
    { text: 'Child Specialist', url: '#' },
    { text: 'Gynecologist', url: '#' },
    { text: 'Diabetes', url: '#' }
  ];

  const cityOptions = findCity?.map((city) => {
    return { value: city?.id, label: city?.name };
  });
  const specialitiesOptions = findSpeciality?.specialities?.map(
    (speciality) => {
      return { value: speciality?.id, label: speciality?.name, type: 'Speciality' };
    }
  );
  const doctorOptions = findClinics?.map((doc) => {
    return { value: doc?.id, label: doc?.name, type: 'Clinic' };
  });

  const docSearchOptions = specialitiesOptions?.slice(0, 4)?.concat(doctorOptions?.slice(0, 4));


  // useEffect(() => {
  //   fetchDoctorSpecialites();
  //   faetchDoctorClinics();
  //   fetchDoctorCities();
  // }, []);

  useEffect(() => {
    const controller = new AbortController();
    const fetchDoctorSpecialites = async (qs) => {
      try {
        setLoading(true);
        const res = await getDoctorSpecialites(qs, controller.signal);
        if (res.code === 200) {
          setFindSpeciality(res?.data);
        }
      } catch (error) {

        setLoading(false);
      }
    };

    if (props?.excludeSpeciality === false) {
      fetchDoctorSpecialites();
    }



    return () => {
      controller.abort();
    }
  }, []);


  useEffect(() => {
    const controller = new AbortController();
    const faetchDoctorClinics = async (qs) => {

      try {
        setLoading(true);

        const res = await getDoctorClinics(qs, controller.signal);
        if (res.code === 200) {
          setFindClinics(res?.data);
        }
      } catch (error) {

        setLoading(false);
      }
    };

    if (props?.excludeSpeciality === false) {
      faetchDoctorClinics();
    }



    return () => {
      controller.abort();
    }
  }, [])

  useEffect(() => {
    const controller = new AbortController();
    const fetchDoctorCities = async (qs) => {
      try {
        setLoading(true);
        const res = await getDoctorCities(qs, controller.signal);
        if (res.code === 200) {
          setFindCity(res?.data);
        }
      } catch (error) {

        setLoading(false);
      }
    };

    fetchDoctorCities();

    return () => {
      controller.abort();
    }
  }, [])


  useEffect(() => {
    if (detectCityValue || findCity) {
      let data = [];
      (async () => {

        try {
          setApiLoading(true);
          const response = await API.get(`/doctor/listing?city=${detectCityValue}`, {

          });

          if (response?.code === 200) {
            setApiLoading(false);
            data.push(response?.data?.slice(0, 10));

            setDoctorsResult(data);
          }

          else {
            setApiLoading(false);
          }

        } catch (error) {
          setApiLoading(false);
        }



      })();
    }

  }, [detectCityValue])


  useEffect(() => {
    if(typeof window !== "undefined") {
      window.localStorage.setItem('speciality', JSON.stringify(findSpeciality));
    }
    
  }, [findSpeciality]);
  useEffect(() => {
    if(typeof window !== "undefined") {
      window.localStorage.setItem('clinics', JSON.stringify(findClinics));
    }
    
  }, [findClinics]);
  useEffect(() => {
    if(typeof window !== "undefined") {
      window.localStorage.setItem('city', JSON.stringify(findCity));
    }
    
  }, [findCity]);

  const openSecondScreen = () => {
    // log('okay');
  };

  const onSubmit = (e) => {
  };

  const onSearchDoctor = (value, key) => {
    let filters = { ...searchDoctor, [key]: value };

    if (filters.q) {
      const result = doctorsResult?.[0]?.filter((item) => item?.name === filters.q);
      setSerchDoctor(result?.[0]);
    }

    // let queryString = '';
    // queryString += filters.q ? '/?q=' + filters.q : '';
    // navigate(
    //   `/doctors/${filters?.city || 'karachi'}/${filters?.speciality || ''}` +
    //   queryString
    // );

  };

  useEffect(() => {
    if (searchData) {
      setSerchDoctor(searchData)
    }
  }, [searchData])

  const onSearcClick = (e, doctor) => {
    setSearchParams(searchDoctor);
    const { doctor_specialities, city, name, id } = searchDoctor;
    // const validate = speciality || city || q;
    let speciality = slugify(doctor_specialities?.[0]);
    let selected_city = slugify(city);
    let docName = slugify(name);

    // navigate(`/doctor/${selected_city}/${speciality}/${docName}/${id}`);
    router.push(`/doctor/${selected_city}/${speciality}/${docName}/${id}`);

    // navigate(
    //   `/doctors/${slugify(city)}/${slugify(speciality)}/?q=${slugify(q || '')}`
    // );
    // navigate(
    //   '/doctors' + selected_city + spec + queryString
    // );
    // mixpanel.track('Featured doctor search bar', {
    //   'Name': userDetailsInfo?.name, 'Email': userDetailsInfo?.email, 'Number': userDetailsInfo?.phone
    // });
  };

  // useEffect(() => {

  //   dispatch(getUserDetail())

  // }, [])

  useEffect(() => {
    const formValues = {
      speciality: speciality,
      city: city,
      hospital: hospital
    };
    searchForm.setFieldsValue(formValues);
  }, []);


  const successCallback = (position) => {


    if (position) {
      const latitude = position?.coords?.latitude;
      const longitude = position?.coords?.longitude;

      fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
        .then((res) => res.json())
        .then((data) => {
          setDetectCityValue(data?.city);
        });
    }

  };

  const errorCallback = (error) => {
    ;
  };


  const handleLocation = () => {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  }

  return (
    <section className="healthCareFilter">
      <Container>
        <Form onFinish={onSubmit} form={searchForm} layout="vertical">
          <div className="filter-box desktop">
            {props?.excludeSpeciality ? (

              <Form.Item style={{ width: '40%', display: 'inline-block' }} className="c_select city_form" name="city" label={false}>
                {detectCityValue ? (
                  <Select
                    autoComplete="none"
                    onSelect={(e) => onSearchDoctor(e, 'city')}
                    defaultValue={detectCityValue}
                    value={detectCityValue}
                    // filterOption={(input, option) =>
                    //   option?.children?.toLowerCase()?.includes(input.toLowerCase())
                    // }
                    showSearch
                    // placeholder={i18n.t('city_only')}
                    placeholder="City"


                  >
                    <Select.Option selected key={detectCityValue} value={detectCityValue}>
                      {detectCityValue}
                    </Select.Option>


                  </Select>
                ) : (
                  <Select
                    autoComplete="none"
                    onSelect={(e) => onSearchDoctor(e, 'city')}
                    // filterOption={(input, option) =>
                    //   option?.children?.toLowerCase()?.includes(input.toLowerCase())
                    // }
                    showSearch
                    // placeholder={i18n.t('city_only')}
                    placeholder="City"

                  >
                    {cityOptions?.map((item, index) => (
                      <Select.Option key={index} value={item?.label}>
                        {item?.label}
                      </Select.Option>
                    ))}

                  </Select>
                )}


                <div className="detect-location" style={{ cursor: 'pointer' }} onClick={handleLocation}>
                  <TbCurrentLocation />
                  <p> Detect </p>
                </div>
              </Form.Item>

            ) : (
              <>
                <Form.Item className="c_select" name="speciality" label={false}>
                  <Select
                    autoComplete="none"
                    onSelect={(e) => onSearchDoctor(e, 'speciality')}
                    // filterOption={(input, option) => {
                    //   option?.children?.toLowerCase()?.includes(input.toLowerCase())
                    // }
                    // }
                    showSearch
                    // placeholder={i18n.t('cond_spec')}
                    placeholder="Condition"
                  >
                    <Select.Option value="">Any</Select.Option>
                    {specialitiesOptions?.map((item, index) => (
                      <Select.Option key={index} value={item?.label}>
                        {item?.label}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item className="c_select" name="city" label={false}>
                  <Select
                    autoComplete="none"
                    onSelect={(e) => onSearchDoctor(e, 'city')}
                    // filterOption={(input, option) =>
                    //   option?.children?.toLowerCase()?.includes(input.toLowerCase())
                    // }
                    showSearch
                    // placeholder={i18n.t('city_only')}
                    placeholder="City"
                  >
                    {cityOptions?.map((item, index) => (
                      <Select.Option key={index} value={item?.label}>
                        {item?.label}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </>
            )}
            <Form.Item className="c_select" name="qs" label={false}>
              <Select
                autoComplete="none"
                className='doc-search-options'
                onSelect={(e) => onSearchDoctor(e, 'q')}
                showSearch
                // placeholder={i18n.t('doc_hosp')}
                placeholder="Doctor Hospital"
              >
                {apiLoading ? (
                  <Select.Option value=""> Loading.... Please Wait. </Select.Option>
                ) : (
                  <>
                    {/* <Select.Option value=""></Select.Option> */}

                    {doctorsResult?.[0]?.map((item, index) => (
                      <Select.Option style={{ borderBottom: '0.3px solid rgb(216 215 215)', margin: '15px 30px' }} key={index} value={item?.name}>
                        <BsSearch style={{ margin: '0 25px 0 0px' }} />
                        {/* <span  > */}
                        {item?.name}
                        {/* </span> */}
                        <span className='doc-filter-type'>{item?.type} </span>
                      </Select.Option>
                    ))}
                  </>
                )}

              </Select>
            </Form.Item>
            <button onClick={onSearcClick} type="submit" className="search-btn">
              <SearchIconLarge />
            </button>
          </div>


          <div className="filter-box mobile" onClick={openSecondScreen}>

            <Form.Item className="c_select" name="qs" label={false}>
              <Select
                autoComplete="none"
                className='doc-search-options'
                onSelect={(e) => onSearchDoctor(e, 'q')}
                // filterOption={(input, option) =>
                //   option?.children?.toLowerCase()?.includes(input.toLowerCase())
                // }
                showSearch
                // placeholder={i18n.t('doc_hosp')}
                placeholder="Doctor"
              >
                {apiLoading ? (
                  <Select.Option value=""> Loading.... Please Wait. </Select.Option>
                ) : (
                  <>
                    {/* <Select.Option value="">Any</Select.Option> */}
                    {doctorsResult?.[0]?.map((item, index) => (
                      <Select.Option style={{ borderBottom: '0.3px solid rgb(216 215 215)', margin: '15px 30px' }} key={index} value={item?.name}>
                        <BsSearch style={{ margin: '0 25px 0 0px' }} />
                        <span  >
                          {item?.name}
                        </span>
                        <span className='doc-filter-type'>{item?.type} </span>
                      </Select.Option>
                    ))}
                  </>
                )}

              </Select>
            </Form.Item>
            <button onClick={onSearcClick} type="button" className="search-btn">
              <SearchIconLarge />
            </button>
            {props?.excludeSpeciality ? (

              <Form.Item style={{ width: '40%', display: 'inline-block' }} className="c_select city_form row detect_and_svg" name="city" label={false}>
                <ImLocation />
                {detectCityValue ? (
                  <Select
                    autoComplete="none"
                    onSelect={(e) => onSearchDoctor(e, 'city')}
                    defaultValue={detectCityValue}
                    value={detectCityValue}
                    // filterOption={(input, option) =>
                    //   option?.children?.toLowerCase()?.includes(input.toLowerCase())
                    // }
                    showSearch
                    // placeholder={i18n.t('city_only')}
                    placeholder="City"



                  >
                    <Select.Option selected key={detectCityValue} value={detectCityValue}>
                      {detectCityValue}
                    </Select.Option>


                  </Select>
                ) : (
                  <>

                  </>

                )}


                <div className="detect-location" style={{ cursor: 'pointer' }} onClick={handleLocation}>
                  <p> Detect </p>
                </div>
              </Form.Item>

            ) : (
              <>
                <Form.Item className="c_select" name="speciality" label={false}>
                  <Select
                    autoComplete="none"
                    onSelect={(e) => onSearchDoctor(e, 'speciality')}
                    // filterOption={(input, option) => {
                    //   option?.children?.toLowerCase()?.includes(input.toLowerCase())
                    // }
                    // }
                    showSearch
                    // placeholder={i18n.t('cond_spec')}
                    placeholder="Condition"
                  >
                    <Select.Option value="">Any</Select.Option>
                    {specialitiesOptions?.map((item, index) => (
                      <Select.Option key={index} value={item?.label}>
                        {item?.label}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item className="c_select" name="city" label={false}>
                  <Select
                    autoComplete="none"
                    onSelect={(e) => onSearchDoctor(e, 'city')}
                    // filterOption={(input, option) =>
                    //   option?.children?.toLowerCase()?.includes(input.toLowerCase())
                    // }
                    showSearch
                    // placeholder={i18n.t('city_only')}
                    placeholder="City"
                  >
                    {cityOptions?.map((item, index) => (
                      <Select.Option key={index} value={item?.label}>
                        {item?.label}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </>
            )}
          </div>
        </Form>


      </Container>
    </section>
  );
}
export default React.memo(HealthCareFilter);