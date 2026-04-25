import Cookies from "js-cookie";
import { URL } from '../components/constants';
import OneSignal from 'react-onesignal';
import mixpanel from 'mixpanel-browser';
// utils/maintenanceCheck.js
import API, { APIV3 } from "@/utils/httpService";

export const isUserSignedIn = () => {
  const Authorization = Cookies.get('Authorization')

  if (Authorization) {
    return true;
  }
  else {
    return false;
  }

}

export const IsUserLoggedIn = () => {
  const token = Cookies.get('Authorization')
  // const completed = localStorage.getItem('user-profile-completed');
  let isloggedIn = false;

  if (token) {
    // Cookies.set('user_id', token);
    // Cookies.set('user-profile-completed', completed);
    isloggedIn = true;
  }
  return isloggedIn;
};

export const shortenName = (inputStr) => {
  if (inputStr.length > 30) {
    let val = inputStr.substring(0, 30) + '...';
    return val;
  }

  else {
    return inputStr;
  }
}

export const logoutUser = () =>
  new Promise((resolve, reject) => {

    localStorage.removeItem('mask_email');
    localStorage.removeItem('user-profile-completed');
    localStorage.removeItem('network');
    localStorage.removeItem('mask_phone');
    localStorage.removeItem('phone');
    localStorage.removeItem("oneTimePayment")
    localStorage.removeItem("instantPhone")
    Cookies.remove('Authorization')
    Cookies.remove('Authorization', { domain: '.merisehat.pk' })
    OneSignal.removeExternalUserId();
    Cookies.remove('cart')
    let englishUrl = process.env.NEXT_PUBLIC_PATIENT_URL;
    let urduUrl = `${process.env.NEXT_PUBLIC_PATIENT_URL}/ur`;


    const lang = localStorage.getItem("lang");

    lang == 2 ? window.location.href = urduUrl : window.location.href = englishUrl;

    resolve();
  });

// localStorage.js
export function saveDataToLocalStorage(data) {
  localStorage.setItem('navMenu', JSON.stringify(data));
}

export function getDataFromLocalStorage() {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem('navMenu');
    return data ? JSON.parse(data) : null;
  }
}

export const mixPanelInit = async () => {

  mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_SECRET_KEY, {
    debug: false,
  });
}

export function hasFalsyValue(obj) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (!obj[key]) {
        return true;
      }
    }
  }
  return false;
}

export const slugify = (str) => {
  let temp = str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

  return temp;
};

export const imagePath = (image) => {
  if (image) {
    return image;
  }
  return PlaceHolderImage;
};

export const checkMaintenance = async () => {
  try {
    const response = await APIV3.get('/check/update');
    return response.status === 200 && response.data?.data?.is_maintenance_available !== true;
  } catch (error) {
    console.error("Error during maintenance check:", error);
    return true; // Consider as maintenance mode in case of an error
  }
};


export async function downloadPrescription(appointmentId) {
  try {

    const response = await API.get(`/appointment/download-prescription/${appointmentId}?is_html=1&is_download=1`);

    return response;

  } catch (error) {
    console.error(error);
    return error?.response?.data?.data?.message || error?.data?.message;
  }
}