import axios from "axios";
import { createRefresh } from "react-auth-kit";
import { refreshUserToken } from "../ApiRequesHelpers/Auth";

const refreshApi = createRefresh({
  interval: 8, // Refreshs the token in every 10 minutes -> as per env varaiable set
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
        console.log("REFRESH", res);
        return {
          isSuccess: true, // For successful network request isSuccess is true
          newAuthToken: result.accessToken,
          newAuthTokenExpireIn: 9,
          // You can also add new refresh token ad new user state
        };
      })
      .catch((e) => {
        console.error(e, "REFRESK");
        // log person out
        return {
          isSuccess: false, // For unsuccessful network request isSuccess is false
          newAuthToken: authToken as string,
        };
      });
  },
});

export default refreshApi;
