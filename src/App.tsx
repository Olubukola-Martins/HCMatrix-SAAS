import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { AuthProvider } from "react-auth-kit";
import { useEffect, useState } from "react";
import Router from "config/router";
import refreshApi from "config/refreshTokenApi";
import GlobalContextProvider from "stateManagers/GlobalContextProvider";
import UserFeedbackContainer from "components/UserFeedbackContainer";
import AdminWelcomeContainer from "components/AdminWelcomeContainer";
import { requestFirebaseToken } from "config/firebase";
import { openNotification } from "utils/notifications";
import { getMessaging, onMessage } from "firebase/messaging";
import { Notification } from "features/notifications/components/Notification";
const queryClient = new QueryClient();

function App() {
  // const [isTokenFound, setTokenFound] = useState<boolean>();
  // requestFirebaseToken(setTokenFound);
  // const messaging = getMessaging();

  // onMessage(messaging, (payload) => {
  //   console.log("payload...", payload);
  // });

  // // TO DO: any time there is an auth action or a company is switched make a call to backend notifications endpoint to populate the notifications page OR alternatively just make the call on the notifications component, or the hook should have token, n useApiAuth handled within to prevent repitition, params(along side pagination) passed to this endpoint should be the notification type => this will enable the hook to be used for different approval types
  // useEffect(() => {
  //   if (isTokenFound === true) {
  //     openNotification({
  //       state: "success",

  //       title: "Success",
  //       description: "FB Token exists ",
  //       duration: 0,
  //     });
  //   }
  //   if (isTokenFound === false) {
  //     openNotification({
  //       state: "error",

  //       title: "Error",
  //       description: "FB token has not been set",
  //       duration: 0,
  //     });
  //   }
  // }, [isTokenFound]);
  // clear darkmode
  useEffect(() => {
    localStorage.removeItem("dark");
    // localStorage.clear(); //to clear all changes tommorow
  }, []);
  return (
    <AuthProvider
      authType={"localstorage"}
      authName={"hcmatrix_app"}
      // cookieDomain={window.location.hostname}
      // cookieSecure={window.location.protocol === "https:"}
      refresh={refreshApi}
    >
      <QueryClientProvider client={queryClient}>
        <GlobalContextProvider>
          <BrowserRouter>
            <Notification />
            <UserFeedbackContainer />
            <AdminWelcomeContainer />

            <Router />
          </BrowserRouter>
        </GlobalContextProvider>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
