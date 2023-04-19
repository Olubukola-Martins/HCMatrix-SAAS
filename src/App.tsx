import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { AuthProvider } from "react-auth-kit";
// import GlobalContextProvider from "./Contexts/GlobalContextProvider";
import { useEffect } from "react";
// import refreshApi from "./Config/refreshTokenApi";
import Router from "config/router";
const queryClient = new QueryClient();

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
      // refresh={refreshApi}
    >
      <QueryClientProvider client={queryClient}>
        {/* <GlobalContextProvider> */}
        <BrowserRouter>
          {/* <UserFeedbackContainer />
            <AdminWelcomeContainer /> */}

          <Router />
        </BrowserRouter>
        {/* </GlobalContextProvider> */}
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
