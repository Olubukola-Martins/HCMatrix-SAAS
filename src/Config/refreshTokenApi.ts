import { createRefresh, useSignOut } from "react-auth-kit";
import { refreshUserToken } from "../ApiRequesHelpers/Auth";

// export const TOKEN_EXPIRES_IN = 120;
// export const REFRESH_TOKEN_EXPIRES_IN = 5;

// NEXT REMOVE THE SIGN OUTS ON THE ERR CATCH Of func
export const TOKEN_EXPIRES_IN = 1200;
export const REFRESH_TOKEN_EXPIRES_IN = 10;
const REFRESH_TOKEN_INTERVAL = 8; // AFTER 4 minutes of inactivity you are automatically logged out => MAIN SOLN
const NEW_AUTH_TOKEN_EXPIRES_IN = 9; // exprmnt -  but should be what determines how long user stays if there is/isn't active

const refreshApi = createRefresh({
  interval: REFRESH_TOKEN_INTERVAL, // Refreshs the token in every 10 minutes -> as per env varaiable set
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
          newAuthTokenExpireIn: NEW_AUTH_TOKEN_EXPIRES_IN,
          newRefreshToken: result.refreshToken,
          newRefreshTokenExpiresIn: REFRESH_TOKEN_EXPIRES_IN,
          authUserState: { ...authUserState, userToken: result.accessToken },

          // You can also add new refresh token ad new user state
        };
      })
      .catch((e) => {
        console.error(e, "REFRESK");
        const signOut = useSignOut();

        // log person out
        signOut();
        return {
          isSuccess: false, // For unsuccessful network request isSuccess is false
          newAuthToken: "",
        };
      });
  },
});

export default refreshApi;
