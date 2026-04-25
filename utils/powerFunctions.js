import { diseaseUrl, getArticalUrl } from "./endpoints";
import API, { APIV3 } from "./httpService";


const PlaceHolderImage = "/png/doc-male.png";

export const checkLinkType = (link, name, target, component) => {
  let checkIsHTTP = link?.includes('http');

  if (checkIsHTTP) {
    return (
      <a target={target} className="" href={link}>
        {name}
      </a>
    );
  } else {
    return component;
  }
};

export const renderColumns = (columns) => {
  if (columns === 1) {
    return 12;
  } else if (columns === 2) {
    return 6;
  } else if (columns === 3) {
    return 4;
  } else if (columns === 4) {
    return 3;
  } else if (columns === 5) {
    return 2;
  } else {
    return 3;
  }
};

export const goToHome = (lang) => {
  return lang == 2 ? '/ur/' : '/';
};

export const asynchronouslySetInLocal = async (key, d) => {
  localStorage.setItem(key, d);
};

export const asynchronouslyGetFromLocal = async (key) => {
  const value = localStorage.getItem(key);
  if (value) {
    return value;
  }
};

export const log = (...args) => {
  if (true) {
    // console.log(...args);
  }
};

export const updateLanguageURLtoBrowser = (currentURL, languageCode = 'ur') => {
  // log('languagecode=', languageCode);

  if (
    currentURL.includes('/article') &&
    (languageCode === 'ur' || languageCode === '')
  ) {
    currentURL = goToHome(languageCode === 'ur' ? 2 : 1);
    return currentURL;
  }

  const domainPie = ''; // ".pk" // for production
  const rules = [
    { existing: domainPie + '/sehat-a-z' },
    { existing: domainPie + '/wellness' },
    { existing: domainPie + '/add-family-member' },
    { existing: domainPie + '/scan-started' },
    { existing: domainPie + '/start-vital-scan' },
    { existing: domainPie + '/page' },
    { existing: domainPie + '/doctor' },
    { existing: domainPie + '/disease' },
    { existing: domainPie + '/' }
  ];

  const home_rules = [
    { existing: domainPie + '/article' },
  ];

  // back to original
  currentURL = currentURL.replace('/ur/', '/');
  log(currentURL, 'before rule');
  var found = false;

  rules.map((rule) => {
    if (currentURL.search(rule.existing) > -1 && !found) {
      //log(currentURL.search(rule.existing),rule.existing, 'current url');
      currentURL =
        languageCode.length > 0 ? '/' + languageCode + currentURL : currentURL;
      log(currentURL, rule.existing, 'new url');
      found = true;
    }
  });

  // remove double slashes
  //currentURL = currentURL.replace(/([^:])(\/\/+)/g, '$1/');
  log(currentURL, 'redirect,I am the current');

  return currentURL;
};

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

export const checkLink = (link) => {
  let checkURL = link?.includes('http');
  if (checkURL) {
    return link;
  } else {
    return `https://${link}`;
  }
};


export const getArticals = async (slug, locale) => {
  const platform = 'web';
  const headers = { "platform": platform, "locale": locale === 'ur' ? 2 : 1 };

  try {
    const response = await APIV3.get(`${getArticalUrl}${slug}`, {
      headers
    });
    return response;
  } catch (error) {
    console.error('Error making API request:', error);
    throw error; // Rethrow the error to handle it higher up in your code
  }
};

export const getMoreArticles = async (ids, locale) => {
  const platform = 'web';
  const headers = { "platform": platform, "locale": locale === 'ur' ? 2 : 1 };

  try {
    const response = await API.get(`/article/next-article?id=${ids}`, {
      headers
    });
    return response;
  } catch (error) {
    console.error('Error making API request:', error);
    throw error; // Rethrow the error to handle it higher up in your code
  }
};

export const getDisease = async (slug, locale) => {
  const platform = 'web';
  const headers = { "platform": platform, "locale": locale === 'ur' ? 2 : 1 };

  try {
    const response = await APIV3.get(`${diseaseUrl}${slug}`, {
      headers
    });
    return response;
  } catch (error) {
    console.error('Error making API request:', error);
    throw error; // Rethrow the error to handle it higher up in your code
  }
};
