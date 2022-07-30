import jwtDecode from "jwt-decode";
import myApiInstance from "../api/apiHandler";

const isValidToken = (accessToken) => {
  if (!accessToken) {
    return false;
  }

  const decoded = jwtDecode(accessToken);
  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

const handleTokenExpired = (exp) => {
  let expiredTimer;

  window.clearTimeout(expiredTimer);
  const currentTime = Date.now();
  const timeLeft = exp * 1000 - currentTime;
  console.log(timeLeft);
  expiredTimer = window.setTimeout(() => {
    // You can do what ever you want here, like show a notification
    alert("Your session has expired. Please reload and login again.");
  }, timeLeft);
};

const setAccessToken = (accessToken) => {
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
    myApiInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    // This function below will handle when token is expired
    const { exp } = jwtDecode(accessToken);
    handleTokenExpired(exp);
  } else {
    localStorage.removeItem("accessToken");
  }
};

const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

export { isValidToken, setAccessToken, getAccessToken };
