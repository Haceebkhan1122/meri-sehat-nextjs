import Cookies from "js-cookie"


export const isLoggedIn = () => {
  const Authorization = Cookies.get('Authorization');

  if (Authorization) {
    return true;
  }

  return false;
}