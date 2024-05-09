import { createRefresh } from "react-auth-kit";
import { MICROSERVICE_ENDPOINTS } from "./enviroment";
import axios from "axios";

// export const TOKEN_EXPIRES_IN = 120;
// export const REFRESH_TOKEN_EXPIRES_IN = 5;

// NEXT REMOVE THE SIGN OUTS ON THE ERR CATCH Of func
export const TOKEN_EXPIRES_IN = 60 * 24 * 60; //60 days
export const REFRESH_TOKEN_EXPIRES_IN = 8;
const REFRESH_TOKEN_INTERVAL = 7; // refresh token after every 7 min

const refreshApi = createRefresh({
  interval: REFRESH_TOKEN_INTERVAL, // Refreshs the token in every 10 minutes -> as per env varaiable set
  refreshApiCallback: async ({
    authToken,
    authTokenExpireAt,
    refreshToken,
    refreshTokenExpiresAt,
    authUserState,
  }) => {
    try {
      const url = `${MICROSERVICE_ENDPOINTS.AUTHENTICATION}/authenticate/token/refresh`;
      const config = {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        params: {
          refreshToken,
        },
      };
      const res = await axios.get(url, config);
      const result = res.data.data;
      // TO DO: consider invalidating all react-querys
      return {
        isSuccess: true,
        newAuthToken: result.accessToken ?? "",
        newAuthTokenExpireIn: TOKEN_EXPIRES_IN,
        newRefreshTokenExpiresIn: REFRESH_TOKEN_EXPIRES_IN, // below
        newAuthUserState: {
          ...authUserState,
          userToken: result.accessToken ?? "",
        },
        newRefreshToken: result.refreshToken ?? "",
      };
    } catch (error) {
      return {
        isSuccess: false,
        newAuthToken: "",
      };
    }
  },
});

export default refreshApi;
