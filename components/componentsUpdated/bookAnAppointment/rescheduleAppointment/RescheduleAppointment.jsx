import React, { useState } from 'react'
import { Modal } from 'react-bootstrap';
import styles from './rescheduleAppointment.module.scss';
import moment from 'moment';

const RescheduleAppointment = ({ rescheduleAppointment, rescheduleAppointmentHandler, handleRescheduleClose, selectedTime, toShowDay, selectedDay, scheduleAppointment, setDashboardKey }) => {

  const dateString = selectedDay;
  const date = new Date(dateString);
  const day = date.getDate();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const formattedDate = `${day} ${month} ${year}`;

  const handleReschedule = () => {
    setDashboardKey(null)
    rescheduleAppointmentHandler()
  }

  return (
    <Modal centered show={rescheduleAppointment} onHide={handleRescheduleClose} className='rescheduleModal'>
      <span className={styles.cross_icon} onClick={handleRescheduleClose}> </span>
      <Modal.Body>
        <div className={`text-center ${styles.mainRescheduleAppointment}`}>
          <div className={`${styles.heading}`}>
            <h4>
              Are you sure you want to
              reschedule your appointment?
            </h4>
          </div>
          <div className={`${styles.paragraph}`}>
            <p>
              Your appointment will be rescheduled to <span className='dataApi'>{toShowDay.slice(0, 3)}</span>, <span className='dataApi'>{formattedDate}</span> at <span className='dataApi'>{selectedTime}</span>.
            </p>
          </div>
          <div className={`${styles.buttonContainer}`}>
            <button onClick={handleReschedule} className={`${styles.yesButton}`}>YES</button>
            <button onClick={handleRescheduleClose} className={`${styles.NoButton}`}>NO</button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default RescheduleAppointment