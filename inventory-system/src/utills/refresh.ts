import axios from "axios";
import createRefresh from "react-auth-kit/createRefresh";
import createStore from "react-auth-kit/createStore";

const refresh = createRefresh({
  interval: 0.9,
  refreshApiCallback: async (param) => {
    try {
      console.log("Refreshing start");
      const headerParms = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = { token: param.refreshToken };
      const response = await axios.post(
        "http://localhost:9090/api/auth/refreshToken",
        body,
        headerParms
      );
      console.log("Refreshing", response.data);
      return {
        isSuccess: true,
        newAuthToken: response.data.accessToken,
        newRefreshToken: response.data.refreshToken,
        newAuthTokenType: "Bearer",
        newAuthTokenExpireIn: 1,
        newRefreshTokenExpiresIn: 10,
      };
    } catch (error) {
      console.error(error);
      return {
        isSuccess: false,
        newAuthToken: "",
      };
    }
  },
});

export const authStore = createStore({
  authName: "_auth",
  authType: "cookie",
  cookieDomain: window.location.hostname,
  cookieSecure: false, //window.location.protocol === "https:",
  refresh: refresh,
  // debug: true,
});
