import React, { useEffect, useState } from 'react'
import styles from './daysFad.module.scss'
import moment from 'moment';
import { useRouter } from 'next/router';

const DaysFad = ({ preferredConsultation, selectedDay, handleCheck,setSelectedDay }) => {
  const path = useRouter().pathname;
  
  useEffect(() => {
    if (preferredConsultation?.length && preferredConsultation?.[0]?.days?.length) {
      const firstDay = preferredConsultation?.[0].days[0];
      handleCheck(firstDay, "day");
    }
  }, [preferredConsultation]);


  const todayDate = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const today = preferredConsultation?.[0]?.days?.find(day => day?.date == todayDate);
    if (today) {
      setSelectedDay(today?.date);
    }
  }, [preferredConsultation]);



  return (
    <>
      {/* {sliding ? 
    "asdasdasd"
    : 
    ( */}
      <>
        {
          preferredConsultation?.length <= 0 ? <h4>  No selected days </h4> : <h4> Select a day </h4>
        }
        <hr />
        <div className={`${styles.checks_day_wraper} checks_day_wraper `}>
          {preferredConsultation?.map((item, i) => (
            <div className={`d-flex justify-content-center wrape_con`} key={`item_${i}`}>
              {/* <div
                key={`${days.date}`}
                className={ `${styles.singleDay} ${styles.checkedSingleDay} singleDay` 
                }
              >
                <label htmlFor={`${days.date}`}>
                  <input
                    type="radio"
                    id={`${days.date}`}
                    name="date"
                    value={days.day}
                    checked={isChecked}
                    onChange={() => handleCheck(days, "day")}
                  />
                  <span>{days.day && days.day},</span>
                  <span>{moment(days.date).format('D MMM')}</span>
                </label>
              </div> */}
              {item.days.map((days, index) => {
                const isChecked = selectedDay == days.date;
                return (
                  <div
                    key={`${days.date}`}
                    className={
                      isChecked
                        ? `${styles.singleDay} ${styles.checkedSingleDay} singleDay`
                        : `${styles.singleDay} singleDay`
                    }
                  >
                    <label htmlFor={`${days.date}`}>
                      <input
                        type="radio"
                        id={`${days.date}`}
                        name="date"
                        value={days.day}
                        checked={isChecked}
                        onChange={() => handleCheck(days, "day")}
                      />
                      <span>{days.day && days.date == todayDate ? "Today" : days.day}</span>
                      <span>{ days.date !== todayDate && moment(days.date).format('D MMM')}</span>
                    </label>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </>
      {/* // )} */}
    </>
  )
}

export default DaysFad