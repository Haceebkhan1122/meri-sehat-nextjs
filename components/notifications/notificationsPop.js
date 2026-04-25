import React from 'react';
// import './Notifications.css';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { TabContext } from '@mui/lab';
import TabPanel from '@mui/lab/TabPanel';
import { BsCheckCircle } from 'react-icons/bs';
import { Router, useRouter } from "next/router";
// import API from '../../api';
import API from "@/utils/httpService";
import Image from 'next/image';
import { downloadPrescription } from "@/utils/utilFunctions";


const NotificationPop = ({ notifications, setMarkAsReadSignal }) => {
  const [value, setValue] = React.useState('all');


  const router = useRouter();

  const AllNotifications = () => {
    router.push('/notifications');
    sessionStorage.removeItem('defaultOpenTab');
  };

  const AllNotificationsUnread = () => {
    router.push('/notifications');
    sessionStorage.setItem('defaultOpenTab', '1');
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const markNotificationAsRead = async (e, notification_id) => {
    if (!notification_id) {
      try {
        const response = await API.get(
          `/markRead-notifications/999?mark_all=true`
        );

        if (response?.code === 200) {
          setMarkAsReadSignal(true);
        }
      } catch (error) { }
    } else {
      try {
        const response = await API.get(
          `/markRead-notifications/${notification_id}`
        );

        if (response?.code === 200) {
          setMarkAsReadSignal(true);
        }
      } catch (error) { }
    }
  };

  const handleNotificationsFunc = (item) => {
    if (item?.type == "prescription_for_patient") {
      downloadPrescription(item?.appointment_id)
    } else if (item?.type == 'insurance_pending' || item?.type == 'insurance_approved' || item?.type == 'insurance_rejected') {
      Cookies.set('receiptId', item?.claim_id)
      window.location.href = `${item?.redirect_link}`
    }
    // else if (item?.type == 'transaction_completed' || item?.type == 'transaction_fail') {
    //   window.location.href = `${item?.redirect_link}`
    // }
    else {
      window.location.href = `${item?.redirect_link}`
    }
  }

  return (
    <div className="notification-icon-open">
      <div className=" for-scroll-notification">
        <Box>
          <TabContext value={value}>
            <div className='heading_noti'>
              <h5 className="line-height-20 fw-500">
                Notifications
              </h5>
            </div>
            <div className="d-flex align-items-center justify-content-between pb-0 border_top_bottom">
              <Box className="notifications-tabss d-flex align-items-center">
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="secondary tabs example"
                >
                  <Tab value="all" label="All" />
                  <Tab value="unread" label="Unread" />
                </Tabs>
              </Box>
              <div
                className="d-flex align-items-center mark_as_all"
                style={{ cursor: 'pointer' }}
                onClick={(e) => markNotificationAsRead(e)}
              >
                <span className="line-height-20  me-2  word-spacing-inverse">
                  Mark all as read
                </span>
                <BsCheckCircle />
              </div>
            </div>
            {!notifications?.notifications?.length > 0 ? (
              <div className="d-flex align-items-center justify-content-center text-center p-4 hk_notifications_area">
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none">
                    <g clip-path="url(#clip0_130_73457)">
                      <path d="M30.0003 53.333C32.5212 53.333 34.5837 51.2561 34.5837 48.7176H25.417C25.417 51.2561 27.4795 53.333 30.0003 53.333ZM43.7503 39.4869V27.9484C43.7503 20.8638 40.0149 14.933 33.4378 13.3638V11.7945C33.4378 9.87916 31.9024 8.33301 30.0003 8.33301C28.0982 8.33301 26.5628 9.87916 26.5628 11.7945V13.3638C20.0087 14.933 16.2503 20.8407 16.2503 27.9484V39.4869L11.667 44.1022V46.4099H48.3337V44.1022L43.7503 39.4869ZM39.167 41.7945H20.8337V27.9484C20.8337 22.2253 24.2941 17.5638 30.0003 17.5638C35.7066 17.5638 39.167 22.2253 39.167 27.9484V41.7945Z" fill="#0F345A" />
                    </g>
                    <defs>
                      <clipPath id="clip0_130_73457">
                        <rect width="60" height="60" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <h4 className="mb-2 line-height-20">
                    No Notifications
                  </h4>
                  <p className="line-height-20">
                    You’re all caught up. No notifications at this time.
                  </p>
                </div>
              </div>
            ) : (
              <>
                <TabPanel value="all" style={{ padding: '0' }}>
                  {notifications?.notifications?.slice(0, 3)?.map((item) => (
                    <>
                      <div
                        className="innerCardNotification pb-3 border-bottom wraper_notifica"
                        style={{ cursor: 'pointer', padding: '1.5rem' }}
                        onClick={(e) => {
                          markNotificationAsRead(e, item?.id);
                          handleNotificationsFunc(item);
                        }}
                      >
                        <div className="d-flex unreadNotifications">
                          {item?.read_status == 0 && (
                            <div className="newNotificationCircle position-relative"></div>
                          )}
                          {item?.read_status == 0 && (

                            <Image src={item?.icon !== null && item?.icon} width={48} height={50} />
                          )}
                          {item?.read_status == 1 && (
                            <Image src={item?.icon !== null && item?.icon} width={48} height={50} />
                          )}
                          <a className="detailsNotifications wbv">

                            <a className="fs-14 color-313131">
                              <strong className="d-block">
                                {item?.title}:
                              </strong>
                              <span>
                                {item?.text}
                              </span>
                            </a>
                            <p style={{ paddingTop: '5px' }}>
                              {item?.created_at}
                            </p>
                            <div className='status_pop'>
                              {item?.status_icon && (
                                <Image src={item?.icon !== null && item?.status_icon} width={16} height={16} />
                              )}
                            </div>
                          </a>
                        </div>
                      </div>
                      <div
                        style={{ borderBottom: '1px solid  #efefef' }}
                      ></div>
                    </>
                  ))}
                  {notifications?.notifications?.length > 3 ? (
                    <div className="text-uppercase see-all">
                      <h5
                        style={{ cursor: 'pointer' }}
                        onClick={AllNotifications}
                      >
                        View All
                      </h5>
                    </div>
                  ) : null}
                </TabPanel>
                <TabPanel value="unread" style={{ padding: '0' }}>
                  {notifications?.notifications
                    ?.slice(0, 4)
                    .filter((n) => n?.read_status == 0)
                    ?.map((item) => (
                      <>
                        <div
                          className="innerCardNotification p-4 border-bottom"
                          style={{ cursor: 'pointer' }}
                          onClick={(e) => {
                            markNotificationAsRead(e, item?.id);
                            handleNotificationsFunc(item);
                          }}
                        >
                          <div className="d-flex unreadNotifications">
                            {item?.read_status == 0 && (
                              <div className="newNotificationCircle position-relative"></div>
                            )}
                            {item?.read_status == 0 && (
                              <Image src={item?.icon !== null && item?.icon} width={48} height={50} />
                            )}
                            <a className="detailsNotifications wbv">

                              <a className="fs-14 color-313131">
                                <strong className="d-block">
                                  {item?.title}:
                                </strong>
                                <span>
                                  {item?.text}
                                </span>
                              </a>
                              <p style={{ paddingTop: '5px' }}>
                                {item?.created_at}
                              </p>
                              <div className='status_pop'>
                                {item?.status_icon && (
                                  <Image src={item?.icon !== null && item?.status_icon} width={16} height={16} />
                                )}
                              </div>
                            </a>
                          </div>
                        </div>
                        <div
                          style={{ borderBottom: '0.3px solid #828282' }}
                        ></div>
                      </>
                    ))}
                  {notifications?.unread_count > 3 ? (
                    <div className="text-uppercase see-all">
                      <h5
                        style={{ cursor: 'pointer' }}
                        onClick={AllNotificationsUnread}
                      >
                        see all
                      </h5>
                    </div>
                  ) : notifications?.unread_count === 0 ? (
                    <div className="text-center py-3">
                      <p> No unread messages</p>
                    </div>
                  ) : null}
                </TabPanel>
              </>
            )}
          </TabContext>
        </Box>
      </div>
    </div>
  );
};

export default NotificationPop;
