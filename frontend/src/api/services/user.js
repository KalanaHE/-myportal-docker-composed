import myApiInstance from "../apiHandler";

export const getUser = async (userId) => {
  try {
    return Promise.resolve(
      await myApiInstance.get(`/api/v1/user/${userId}`, { baseURL: process.env.REACT_APP_API_URI })
    );
  } catch (error) {
    return Promise.reject(error);
  }
};
