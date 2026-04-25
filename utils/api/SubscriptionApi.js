// import { getAuthToken } from '../helpers/authHelper';
import API from "../httpService";
import {getSubscriptionUrl} from "../endpoints";

export const getSubscription = async () => {
  // const userID = getAuthToken() || 0;
  // const lang = await asynchronouslyGetFromLocal('lang');
  const platform = 'web';

  const options = {
    headers: { "platform":platform, "locale":lang|| 1 }
  };
  const response = await API.get(`${getSubscriptionUrl}`, options);
  return response;
};
