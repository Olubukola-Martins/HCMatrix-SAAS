import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { AuthProvider } from "react-auth-kit";
import { Suspense, useEffect } from "react";
import Router from "config/router";
import GlobalContextProvider from "stateManagers/GlobalContextProvider";

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
    localStorage.removeItem("dark");
    // localStorage.clear(); //to clear all changes tommorow
  }, []);
  return (
    <BrowserRouter>
      <AuthProvider
        authType={"localstorage"}
        authName={"hcmatrix_app"}
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
  );
}

export default App;
