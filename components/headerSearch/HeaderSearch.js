import { Form } from "antd";
import { React, useState, useEffect } from "react";
// import './headerSearch.css';
import { useOutsideClick } from "./useOutsideClick";
import { DebounceInput } from "react-debounce-input";
import { useSelector } from "react-redux";

function HeaderSearch(props) {
  const [isActive, setIsActive] = useState(false);

  const speciality = JSON.parse(localStorage.getItem("speciality"));
  const [i18nData, setI18nData] = useState(null);
  let i18nDataTwo = useSelector((state) => state.translation.i18n);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setI18nData(i18nDataTwo);
    }
  }, [i18nDataTwo]);

  const {
    icon,
    onSearch = () => { },
    onClick = () => { },
    ref,
    customClass,
    content,
    reset = () => { },
    searchValue,
  } = props;

  const handleClickOutside = () => {
    setIsActive(false);
  };
  const handleClick = () => {
    setIsActive((current) => !current);
  };
  const newref = useOutsideClick(handleClickOutside);

  // log(isActive);
  return (
    <section className="headerSearchContainer">
      <div className="event__search__floater" ref={newref}>
        <div className="search__anchor">
          <Form id="event-search-form" layout="verticle">
            <DebounceInput
              minLength={1}
              // className={`search__bar ${isActive ? 'active' : ''}`}
              className={"search__bar active"}
              placeholder={i18nData?.search}
              debounceTimeout={500}
              onChange={onSearch}
              value={searchValue}
              onClick={handleClick}
            />
            {/* <select className={`form-control custom-event-search ${isActive ? 'active' : ''}` }>
                {speciality?.specialities?.map((spec, index) => (
                  <option key={index} value={spec?.name}>{spec?.name}</option>
                ))}
              </select> */}
            {/* <input
              onChange={onSearch}
              type="text"
              className={`search__bar ${isActive ? 'active' : ''}`}
              placeholder={i18n.t('type_to_search')}
              value={searchValue}
            /> */}
            {/* <input
              className="search__submit"
              type="button" */}
            {/*
            // onBlur={() => setIsActive((prevstate) => !prevstate)}
            /> */}
            <div className="search__toggler"></div>
            {/* <div className={`searchContent ${isActive ? 'active' : ''}`}> */}
            {/* <p>Zain</p> */}

            {/* </div> */}
          </Form>
        </div>
      </div>
    </section>
  );
}

export default HeaderSearch;
