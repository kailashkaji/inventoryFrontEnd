import axios from "axios";
import createRefresh from "react-auth-kit/createRefresh";
import createStore from "react-auth-kit/createStore";

export const refresh = createRefresh({
  interval: 0.1,
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
        "http://localhost:9090/api/auth/login",
        body,
        headerParms
      );
      console.log("Refreshing");
      return {
        isSuccess: true,
        newAuthToken: response.data.token,
        newAuthTokenExpireIn: 10,
        newRefreshTokenExpiresIn: 60,
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
  authName: "accessToken",
  authType: "cookie",
  cookieDomain: window.location.hostname,
  cookieSecure: false, //window.location.protocol === "https:",
  //refresh: refresh,
  debug: true,
});
