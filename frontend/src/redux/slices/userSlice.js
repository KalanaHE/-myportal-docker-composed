import { createSlice } from "@reduxjs/toolkit";
import { excuteAfterGivenDelay } from "../../utils/commonUtils";
import * as UserService from "../../api/services/user";

import { setLoading } from "./commonSlice";

const REDUCER_DOMAIN = "user";

export const userSlice = createSlice({
  name: REDUCER_DOMAIN,
  initialState: {
    user: {
      firstName: "Kalana",
      lastName: "Hettiarachchi",
      email: "kalana@test.com",
      userType: "GUEST",
    },
    retrievingUserDataStatus: "idle",
    retrievingUserDataError: null,
  },
  reducers: {
    setUserData: (state, action) => {
      state.user = action.payload;
    },
    setRetrievingUserDataStatus: (state, action) => {
      state.retrievingUserDataStatus = action.payload;
    },
    setRetrievingUserDataError: (state, action) => {
      state.retrievingUserDataError = action.payload;
    },
  },
  extraReducers: {},
});

export const { setUserData, setRetrievingUserDataStatus, setRetrievingUserDataError } = userSlice.actions;

export const fetchUser = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setRetrievingUserDataStatus("loading"));
      dispatch(setLoading(true));
      dispatch(setRetrievingUserDataError(null));
      const response = await UserService.getUser(payload);
      if (response && response.status === 200) {
        dispatch(setRetrievingUserDataStatus("succeeded"));
      } else {
        throw new Error();
      }
    } catch (err) {
      dispatch(setRetrievingUserDataStatus("failed"));
      dispatch(setRetrievingUserDataError(err));
    } finally {
      dispatch(setLoading(false));
      excuteAfterGivenDelay(() => dispatch(setRetrievingUserDataStatus("idle")));
    }
  };
};

export default userSlice.reducer;
