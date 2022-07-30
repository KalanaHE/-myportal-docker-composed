import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { SettingsProvider } from "./contexts/SettingsContext";
import { CollapseDrawerProvider } from "./contexts/CollapseDrawerContext";
import ThemeProvider from "./theme";
import NotistackProvider from "./components/NotistackProvider";
import Settings from "./components/settings";
import RtlLayout from "./components/RtlLayout";
import ScrollToTop from "./components/ScrollToTop";
import { ProgressBarStyle } from "./components/ProgressBar";
import ThemeColorPresets from "./components/ThemeColorPresets";
import MotionLazyContainer from "./components/animate/MotionLazyContainer";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { PersistGate } from "redux-persist/lib/integration/react";
import { store, persistor } from "./redux/store";
import { AuthProvider } from "./contexts/JWTContext";
import "simplebar/src/simplebar.css";
import "./locales/i18n";
import "react-image-lightbox/style.css";
import "./utils/highlight";
import "react-lazy-load-image-component/src/effects/blur.css";
import "react-lazy-load-image-component/src/effects/opacity.css";
import "react-lazy-load-image-component/src/effects/black-and-white.css";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <HelmetProvider>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <SettingsProvider>
                <CollapseDrawerProvider>
                  <BrowserRouter>
                    <ThemeProvider>
                      <ThemeColorPresets>
                        <RtlLayout>
                          <NotistackProvider>
                            <MotionLazyContainer>
                              <ProgressBarStyle />
                              <Settings />
                              <ScrollToTop />
                              <App />
                            </MotionLazyContainer>
                          </NotistackProvider>
                        </RtlLayout>
                      </ThemeColorPresets>
                    </ThemeProvider>
                  </BrowserRouter>
                </CollapseDrawerProvider>
              </SettingsProvider>
            </LocalizationProvider>
          </HelmetProvider>
        </PersistGate>
      </ReduxProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
