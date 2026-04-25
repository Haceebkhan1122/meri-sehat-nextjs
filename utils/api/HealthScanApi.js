import { getCitiesUrl, getDoctorSpecialityUrl, getClinicsUrl } from "../endpoints";
import API from "../httpService";

export const getDoctorCities = async (qs = '', signal) => {

  const platform = 'web';
  const options = {
    headers: {

      "platform":platform,
      "locale": lang || 1
    },
    signal: signal ? signal : null
  };

  const response = await API.get(`${getCitiesUrl}${qs}`, options);

  return response;
};

export const getDoctorClinics = async (qs = '', signal) => {
  // const userID = getAuthToken() || 0;
  const platform = 'web';
  
  const options = {
    headers: {

      "platform":platform,

      "locale": lang || 1
    },
    signal: signal ? signal : null
  };

  const response = await API.get(`${getClinicsUrl}${qs}`, options);

  return response;
};

export const getDoctorSpecialites = async (qs = '', signal) => {
  const platform = 'web';
  const options = {
    headers: {

      "platform":platform,
      "locale": lang || 1
    },
    signal: signal ? signal : null
  };

  const response = await API.get(`${getDoctorSpecialityUrl}${qs}`, options);

  return response;
};