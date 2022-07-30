import myApiInstance from "../apiHandler";

export const login = async (data) => {
  try {
    return Promise.resolve(
      await myApiInstance.post("/api/v1/auth/signin", data, { baseURL: process.env.REACT_APP_API_URI })
    );
  } catch (error) {
    return Promise.reject(error);
  }
};

export const register = async (data) => {
  try {
    return Promise.resolve(
      await myApiInstance.post("/api/v1/auth/signup", data, { baseURL: process.env.REACT_APP_API_URI })
    );
  } catch (error) {
    return Promise.reject(error);
  }
};
