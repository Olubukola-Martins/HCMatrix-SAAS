import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { AuthProvider } from "react-auth-kit";
import { Suspense, useEffect } from "react";
import Router from "config/router";
import GlobalContextProvider from "stateManagers/GlobalContextProvider";
import ErrorBoundary from "components/errorHandlers/ErrorBoundary";
import { LOCAL_STORAGE_AUTH_KEY } from "constants/localStorageKeys";
import { useNetworkState } from "hooks/network/useNetworkState";
import { ErrorWrapper } from "components/errorHandlers/ErrorWrapper";
import PageNotFoundIcon from "assets/svg-components/PageNotFoundIcon/PageNotFoundIcon";
import { useInitializeGoogleAnalyticsTracking } from "hooks/analtyics";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: false,
      refetchIntervalInBackground: false,
      refetchOnWindowFocus: false,
      retry: false, //Prevent Multiple Requests from being made on faliure
    },
  },
});

function App() {
  // initialize react-ga to track page views on google analytics
  useInitializeGoogleAnalyticsTracking();
  // clear darkmode
  useEffect(() => {
    const dark = localStorage.getItem("dark");
    if (dark) {
      localStorage.removeItem("dark");
    }
    // localStorage.clear(); //to clear all changes tommorow
  }, []);

  // check online status
  const { isOnline } = useNetworkState();
  if (process.env.REACT_APP_MAINTAINANCE === "true") {
    return (
      <ErrorWrapper
        isError={process.env.REACT_APP_MAINTENANCE === "true"}
        errImage={<PageNotFoundIcon />}
        message="Site under maitainance!"
      >
        Site under maitainance!
      </ErrorWrapper>
    );
  }
  return (
    <ErrorBoundary
      message="Please contact administrator!"
      errImageOrIcon={<PageNotFoundIcon />}
    >
      <BrowserRouter>
        <AuthProvider
          authType={"localstorage"}
          authName={LOCAL_STORAGE_AUTH_KEY}
          // cookieDomain={window.location.hostname}
          // cookieSecure={window.location.protocol === "https:"}
          // refresh={refreshApi}
        >
          <ErrorWrapper
            isError={!isOnline}
            errImage={<PageNotFoundIcon />}
            message="Please check your internet connection!"
          >
            <QueryClientProvider client={queryClient}>
              <GlobalContextProvider>
                <Suspense fallback={<div>temporary Loading...</div>}>
                  <Router />
                </Suspense>
              </GlobalContextProvider>
              <ReactQueryDevtools
                initialIsOpen={false}
                position="bottom-right"
              />
            </QueryClientProvider>
          </ErrorWrapper>
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
