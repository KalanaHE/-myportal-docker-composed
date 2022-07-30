import { createContext, useEffect, useReducer } from "react";
import PropTypes from "prop-types";
import jwtDecode from "jwt-decode";
import { setAccessToken, getAccessToken } from "../utils/jwt";
import * as AuthService from "../api/services/auth";
import * as UserService from "../api/services/user";

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },
  LOGIN: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
  REGISTER: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
};

const reducer = (state, action) => (handlers[action.type] ? handlers[action.type](state, action) : state);

const AuthContext = createContext({
  ...initialState,
  method: "jwt",
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
});

AuthProvider.propTypes = {
  children: PropTypes.node,
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = getAccessToken();

        if (accessToken) {
          setAccessToken(accessToken);
          const decoded = jwtDecode(accessToken);
          const response = await UserService.getUser(decoded.id);
          const { data: user } = response.data;

          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: true,
              user,
            },
          });
        } else {
          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: "INITIALIZE",
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialize();
  }, []);

  const login = async (email, password) => {
    const response = await AuthService.login({ email, password });
    const {
      data: { token, permissions, ...user },
    } = response.data;

    setAccessToken(token);

    dispatch({
      type: "LOGIN",
      payload: {
        user: { ...user, permissions },
      },
    });
  };

  const register = async (data) => {
    const response = await AuthService.register(data);
    const {
      data: { token, ...user },
    } = response.data;

    setAccessToken(token);

    dispatch({
      type: "REGISTER",
      payload: {
        user,
      },
    });
  };

  const logout = async () => {
    setAccessToken(null);
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: "jwt",
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
