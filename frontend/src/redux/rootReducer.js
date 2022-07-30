import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import commonReducer from "./slices/commonSlice";
import userReducer from "./slices/userSlice";

const rootPersistConfig = {
  key: "root",
  storage,
  keyPrefix: "redux-",
  whitelist: [],
};

const commonPersistConfig = {
  key: "common",
  storage,
  keyPrefix: "redux-",
  whitelist: ["countries", "nationalities", "userTitles", "genders", "civilStatus"],
};

const rootReducer = combineReducers({
  common: persistReducer(commonPersistConfig, commonReducer),
  user: userReducer,
});

export { rootPersistConfig, rootReducer };
