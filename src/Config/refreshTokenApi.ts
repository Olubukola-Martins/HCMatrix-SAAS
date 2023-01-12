import axios from "axios";
import { createRefresh } from "react-auth-kit";
import { refreshUserToken } from "../ApiRequesHelpers/Auth";

const refreshApi = createRefresh({
  interval: process.env
    .REACT_APP_REFRESH_TOKEN_INTERVAL_TIME as unknown as number, // Refreshs the token in every 10 minutes -> as per env varaiable set
  refreshApiCallback: ({
    authToken,
    authTokenExpireAt,
    refreshToken,
    refreshTokenExpiresAt,
    authUserState,
  }) => {
    return refreshUserToken({
      token: authToken as string,
      refreshToken: refreshToken as string,
    })
      .then((res) => {
        const result = res.data.data;
        return {
          isSuccess: true, // For successful network request isSuccess is true
          newAuthToken: result.accessToken,
          newAuthTokenExpireIn: process.env
            .REACT_APP_REFRESH_TOKEN_EXPIRY_TIME as unknown as number,
          // You can also add new refresh token ad new user state
        };
      })
      .catch((e) => {
        console.error(e);
        return {
          isSuccess: false, // For unsuccessful network request isSuccess is false
          newAuthToken: authToken as string,
        };
      });
  },
});

export default refreshApi;
