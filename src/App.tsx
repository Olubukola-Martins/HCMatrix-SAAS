import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { AuthProvider } from "react-auth-kit";
import { Suspense, useEffect } from "react";
import Router from "config/router";
import GlobalContextProvider from "stateManagers/GlobalContextProvider";
import ErrorBoundary from "components/errorHandlers/ErrorBoundary";
import { LOCAL_STORAGE_AUTH_KEY } from "constants/localStorageKeys";

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
  // clear darkmode
  useEffect(() => {
    const dark = localStorage.getItem("dark");
    if (dark) {
      localStorage.removeItem("dark");
    }
    // localStorage.clear(); //to clear all changes tommorow
  }, []);
  return (
    <ErrorBoundary message="Please contact administrator!">
      <BrowserRouter>
        <AuthProvider
          authType={"localstorage"}
          authName={LOCAL_STORAGE_AUTH_KEY}
          // cookieDomain={window.location.hostname}
          // cookieSecure={window.location.protocol === "https:"}
          // refresh={refreshApi}
        >
          <QueryClientProvider client={queryClient}>
            <GlobalContextProvider>
              <Suspense fallback={<div>temporary Loading...</div>}>
                <Router />
              </Suspense>
            </GlobalContextProvider>
            <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
          </QueryClientProvider>
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
