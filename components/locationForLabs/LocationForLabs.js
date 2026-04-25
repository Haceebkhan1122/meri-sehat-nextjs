import React, { useEffect, useState } from "react";
import { Select, Radio, Modal } from "antd";
import { Col, Row } from "react-bootstrap";
import Image from "next/image";
import karachi from "../../public/png/locKarachi.png";
import lahore from "../../public/png/locLahore.png";
import activeChecked from "../../public/svg/tickLocation.svg";
import Cookies from "js-cookie";

const { Option } = Select;
const LocationForLabs = ({ activeRadioState, setActiveRadioState, listnerForCityChangeDefault, setListnerForCityChangeDefault, runForwhenChangeOnlyCity, setListnerIfCartHasItem, setHasLocationChanged, switchCityFunc, setEffectHasRun, setSearch, myCart, setIsModalVisibleCityChange, isModalVisibleCityChange, setListnerforCityNameFromCart, fetchLabsByCity, citiesLabs, setActiveState, activeState, setLocationModal, locationModal, setLocationValue, locationValue, selectedLocation, setSelectedLocation }) => {
  const [active, setActive] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);

  const cityLocations = [
    {
      image: karachi,
      label: 'Karachi',
      id: 1,
      value: 1,
    },
    {
      image: lahore,
      label: 'Lahore',
      id: 2,
      value: 2,
    },
    // {
    //   image: hyderabad,
    //   label: 'Hyderabad',
    //   id: 11,
    //   value: 11,
    // }
  ]

  let cartId = myCart?.id;

  useEffect(() => {
    if (myCart?.lab_cart?.length > 0 && myCart?.lab?.lab_city?.city?.id) {
      setActiveRadioState(myCart?.lab?.lab_city?.city?.id);
    }

  }, [])


  const handleRadioChange = (e, item) => {
    setActiveRadioState(item.id);
    setSelectedLocation(item?.label);
    setEffectHasRun(false)
    setListnerIfCartHasItem(false)
    setListnerForCityChangeDefault(false)
    setActive(false);
    if (!myCart?.lab_cart?.length > 0) {
      if (cartId) {
        switchCityFunc(myCart?.id)
      }
    }
    Cookies.remove("locationLabs");
    Cookies.set("locationLabs", e.target.value);
    setHasLocationChanged(true);
    if (!myCart?.lab_cart?.length > 0) {
      setLocationValue(e.target.value);
      fetchLabsByCity(e.target.value);
      setListnerforCityNameFromCart(false)
    } else {
      if (e.target.value !== myCart?.lab?.lab_city?.city_id) {
        setIsModalVisibleCityChange(true);
      }
      setLocationModal(false)
      setLocationValue(e.target.value);
      Cookies.remove("locationLabs");
      Cookies.set("locationLabs", e.target.value);
    }
    setSelectedValue(e.target.value);
    setLocationModal(false)
  };

  const handleSelectLocation = (value) => {
    setEffectHasRun(false)
    setSelectedLocation(value);
    // setRunForwhenChangeOnlyCity(true)
    setListnerIfCartHasItem(false)
    if (!myCart?.lab_cart?.length > 0) {
      if (cartId) {
        switchCityFunc(myCart?.id)
      }
    }
    Cookies.remove("locationLabs");
    Cookies.set("locationLabs", value);
    setHasLocationChanged(true);
    if (!myCart?.lab_cart?.length > 0) {
      setSelectedLocation(value);
      setActiveState(value);
      fetchLabsByCity(value);
      setListnerforCityNameFromCart(false)
      setSearch("")
      setLocationModal(false)

    } else {
      if (value !== myCart?.lab?.lab_city?.city_id) {
        setIsModalVisibleCityChange(true);
      }
      setLocationModal(false)
    }
  }

  const searchLocation = (value) => {
  };

  const filterOption = (input, option) =>
    option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;

  useEffect(() => {
    const initialValue = cityLocations.find((item) => item.id === locationValue)?.value;
    setSelectedValue(initialValue);
    // setActive(true)
  }, [cityLocations, active, listnerForCityChangeDefault]);

  const handleRadioClick = (e, items) => {
    if (myCart?.lab_cart?.length > 0) {
      handleRadioChange(e, items)
    }
  };

  return (
    <div>
      <Modal
        className="locationModal"
        footer={null}
        centered
        open={locationModal}
        onCancel={() => setLocationModal(false)}
        closable={!Cookies.get("locationLabs") ? false : true}
        maskClosable={false}
      >
        <p className="locationPopHeading text-center">Select Location</p>
        {/* <hr className="borderBelowLocation" /> */}
        <p className="currentlyLocation">We are currently only available in these cities.</p>
        <div className="locationPop">
          <div className="radioLocations">
            <Radio.Group value={locationValue} name="radiogroup">
              <Row>
                {cityLocations.map((items) => (
                  <Col md={6} xs="6" key={items.value}>
                    <div className={`radioCities ${(activeRadioState === items?.id) ? 'active' : ''}`}>
                      <Radio
                        onClick={(e) => handleRadioClick(e, items)}
                        value={items.value}
                        onChange={(e) => handleRadioChange(e, items)}
                        disabled={myCart?.lab_cart?.length > 0 && activeRadioState === items?.id}
                      >
                        <div className="d-block locationCard">
                          {activeRadioState === items?.id ? (
                            <Image src={activeChecked} className="activeIcon" />
                          ) : null}
                          <Image width={60} height={60} src={items.image} className="activeCity" />
                          <p className={`locationLabels ${active ? 'colorChange' : ''}`}>{items.label}</p>
                        </div>
                      </Radio>
                    </div>
                  </Col>
                ))}
              </Row>
            </Radio.Group>
          </div>
        </div >
      </Modal>
    </div>
  )
}

export default LocationForLabs