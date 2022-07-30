import myApiInstance from "../apiHandler";

export const getCountriesList = async () => {
  try {
    return Promise.resolve(await myApiInstance.get("/api/v1/country", { baseURL: process.env.REACT_APP_API_URI }));
  } catch (error) {
    return Promise.reject(error);
  }
};
