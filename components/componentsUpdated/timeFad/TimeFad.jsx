import React from 'react'
import styles from './timeFad.module.scss';
import moment from 'moment';
import { Tab, Tabs } from 'react-bootstrap';

const TimeFad = ({ clinicTimings, selectedTime, handleCheckTime,activeTab,setActiveTab }) => {

    return (
        <>
            <h4 className='titleTime'> Select time </h4>
            <Tabs
             activeKey={activeTab}
                defaultActiveKey="morning"
                onSelect={(k) => setActiveTab(k)} 
                id="uncontrolled-tab-example"
                className="mb-3"
            >
                <Tab eventKey="morning" title="Morning">
                    {clinicTimings && Object?.keys(clinicTimings)?.includes("Morning") && clinicTimings?.Morning?.length > 0 ? (
                        <div className={`${styles.checks_dates_wraper} hk_scroller`}>
                            {clinicTimings?.Morning.map((item, i) => {
                                const isChecked = selectedTime === item.start_time;
                                return (
                                    <div key={item.start_time} className={isChecked ? `${styles.singleDay} ${styles.checkedSingleDay}` : styles.singleDay}>
                                        <label htmlFor={item.start_time}>
                                            <input
                                                type="radio"
                                                id={item.start_time}
                                                name="time"
                                                value={item.start_time}
                                                checked={isChecked}
                                                onChange={() => handleCheckTime(item, "time")}
                                            />
                                            <span>{item.start_time && moment(item.start_time, "HH:mm").format('h:mm A')}</span>
                                        </label>
                                    </div>
                                );
                            })}
                        </div>
                    ) :
                        (
                            <>
                                No date found
                            </>
                        )}
                </Tab>
                <Tab eventKey="afternoon" title="Afternoon">
                    {clinicTimings && Object?.keys(clinicTimings)?.includes("Afternoon") && clinicTimings?.Afternoon?.length > 0 ? (
                        <div className={`${styles.checks_dates_wraper} hk_scroller`}>
                            {clinicTimings?.Afternoon?.map((item, i) => {
                                const isChecked = selectedTime === item.start_time;
                                return (
                                    <div key={item.start_time} className={isChecked ? `${styles.singleDay} ${styles.checkedSingleDay}` : styles.singleDay}>
                                        <label htmlFor={item.start_time}>
                                            <input
                                                type="radio"
                                                id={item.start_time}
                                                name="time"
                                                value={item.start_time}
                                                checked={isChecked}
                                                onChange={() => handleCheckTime(item, "time")}
                                            />
                                            {/* <span>{item.start_time && moment(item.start_time, "HH:mm").format('h:mm a')}</span> */}
                                            <span>{item?.start_time}</span>
                                        </label>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <>
                            No date found
                        </>
                    )}
                </Tab>
                <Tab eventKey="evening" title="Evening">
                    {clinicTimings && Object?.keys(clinicTimings)?.includes("Evening") && clinicTimings?.Evening?.length > 0 ? (
                        <div className={`${styles.checks_dates_wraper} hk_scroller`}>
                            {clinicTimings?.Evening.map((item, i) => {
                                const isChecked = selectedTime === item.start_time;
                                return (
                                    <div key={item.start_time} className={isChecked ? `${styles.singleDay} ${styles.checkedSingleDay}` : styles.singleDay}>
                                        <label htmlFor={item.start_time}>
                                            <input
                                                type="radio"
                                                id={item.start_time}
                                                name="time"
                                                value={item.start_time}
                                                checked={isChecked}
                                                onChange={() => handleCheckTime(item, "time")}
                                            />
                                            <span>{item.start_time }</span>
                                        </label>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <>
                            No date found
                        </>
                    )}
                </Tab>
            </Tabs>
        </>
    )
}

export default TimeFad