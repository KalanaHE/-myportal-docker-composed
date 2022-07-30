import { createSlice } from "@reduxjs/toolkit";
import { excuteAfterGivenDelay } from "../../utils/commonUtils";
import * as CommonService from "../../api/services/common";

const REDUCER_DOMAIN = "common";

export const commonSlice = createSlice({
  name: REDUCER_DOMAIN,
  initialState: {
    loading: false,

    countries: [],
    retrievingCountriesListStatus: "idle",
    retrievingCountriesListError: null,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setCountries: (state, action) => {
      state.countries = action.payload;
    },
    setRetrievingCountriesListStatus: (state, action) => {
      state.retrievingCountriesListStatus = action.payload;
    },
    setRetrievingCountriesListError: (state, action) => {
      state.retrievingCountriesListError = action.payload;
    },
  },
});

export const { setLoading, setCountries, setRetrievingCountriesListStatus, setRetrievingCountriesListError } =
  commonSlice.actions;

export const fetchCountries = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setRetrievingCountriesListStatus("loading"));
      dispatch(setLoading(true));
      dispatch(setRetrievingCountriesListError(null));
      const response = await CommonService.getCountriesList(payload);
      if (response && response.status === 200) {
        dispatch(setRetrievingCountriesListStatus("succeeded"));
        const {
          data: { data: _data },
        } = response;
        dispatch(setCountries(_data));
      } else {
        throw new Error();
      }
    } catch (err) {
      dispatch(setRetrievingCountriesListStatus("failed"));
      dispatch(setRetrievingCountriesListError(err));
    } finally {
      dispatch(setLoading(false));
      excuteAfterGivenDelay(() => dispatch(setRetrievingCountriesListStatus("idle")));
    }
  };
};

export default commonSlice.reducer;
