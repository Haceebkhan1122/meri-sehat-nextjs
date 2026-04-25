import API from '@/utils/httpService';
import { getUserApi } from '@/utils/endpoints';
import Cookies from 'js-cookie';

export const getUserFromAPI = async () => {
    // Replace this with your actual API call using libraries like Axios or Fetch
    const response = await API.get(getUserApi);
    const data = response?.data
    return data;
};