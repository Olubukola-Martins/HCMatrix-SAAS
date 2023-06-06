import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { AuthProvider } from "react-auth-kit";
import { Suspense, useEffect } from "react";
import Router from "config/router";
import refreshApi from "config/refreshTokenApi";
import GlobalContextProvider from "stateManagers/GlobalContextProvider";
import UserFeedbackContainer from "components/UserFeedbackContainer";
import AdminWelcomeContainer from "components/AdminWelcomeContainer";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: false,
      refetchIntervalInBackground: false,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
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
            <UserFeedbackContainer />
            <AdminWelcomeContainer />
            <Suspense fallback={<div>Loading...</div>}>
              <Router />
            </Suspense>
          </BrowserRouter>
        </GlobalContextProvider>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
