import API, { APIV3 } from '@/utils/httpService';
import { gerTopicUrl, pageUrl, diseaseUrl } from '../apiConstant';
import { asynchronouslyGetFromLocal } from '@/utils/powerFunctions';
import Cookies from 'js-cookie';


export const getTopics = async (slug) => {
    // const userID = getAuthToken() || 0;
    const lang = await asynchronouslyGetFromLocal('lang');
    const platform = 'web';
    const response = await API.get(`${gerTopicUrl}${slug}`, {
        headers: { "platform": platform, "locale": lang || 1 }
    });

    return response;
};
export const getSehatAZ = async (slug) => {
    // const userID = getAuthToken() || 0;
    const lang = await asynchronouslyGetFromLocal('lang');
    const platform = 'web';
    const response = await API.get(`${gerTopicUrl}${slug}`, {
        headers: { "platform": platform, "locale": lang || 1 }
    });

    return response;
};
export const getPage = async (slug) => {
    // const userID = getAuthToken() || 0;
    const lang = await asynchronouslyGetFromLocal('lang');
    const platform = 'web';
    const response = await API.get(`${pageUrl}${slug}`, {
        headers: { "platform": platform, "locale": lang || 1 }
    });

    return response;
};

export const getDisease = async (slug) => {
    // const userID = getAuthToken() || 0;
    const lang = await asynchronouslyGetFromLocal('lang');
    const platform = 'web';

    let endpoint = '';

    let query = slug?.trim()?.split(" ");

    if (query?.length === 1) {
        endpoint = `${diseaseUrl}?search=${slug}`;
    }

    else if (query?.length > 1) {
        // console.log('second');
        endpoint = `${diseaseUrl}?search=${slug?.trim()?.split(" ")?.join("&")}`;
    }

    else {
        // console.log('third')
        endpoint = diseaseUrl;
    }

    const response = await APIV3.get(endpoint, {
        headers: { "platform": platform, "locale": lang || 1 }
    });

    return response;
};

export const getDiseases = async (slug) => {
    let endpoint = '';

    let query = slug?.trim()?.split(" ");

    if (query?.length === 1) {
        // console.log('first')
        endpoint = `${diseaseUrl}?search=${slug}`;
    }

    else if (query?.length > 1) {
        // console.log('second');
        endpoint = `${diseaseUrl}?search=${slug?.trim()?.split(" ")?.join("&")}`;
    }

    else {
        // console.log('third')
        endpoint = diseaseUrl;
    }


    // const userID = getAuthToken() || 0;
    const lang = Cookies.get("lang");
    const platform = 'web';
    const response = await APIV3.get(endpoint, {
        headers: { "platform": platform, "locale": lang || 1 }
    });

    if (response) {
        return response;
    }
};
