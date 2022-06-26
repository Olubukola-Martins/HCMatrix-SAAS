
import Login from "./Auth/Pages/Login";
import Register from "./Auth/Pages/Register";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ResetPassword from "./Auth/Pages/ResetPassword";
import Home from "./Home/Pages/Home";
import GeneralSettings from "./Settings/Pages/GeneralSettings";
import CompanyDetails from "./Settings/Pages/CompanyDetails";
import Rebranding from "./Settings/Pages/Rebranding";
import FromAddresses from "./Settings/Pages/FromAddresses";

function App() {
  return (
    <Router>
      <Switch>
      <Route path="/" exact>
        <Home/>
      </Route>
     <Route path="/login">
        <Login/>
      </Route>
      <Route path="/register">
        <Register/>
      </Route>
      <Route path="/reset-password">
        <ResetPassword/>
      </Route>
      <Route path="/settings" exact>
        <GeneralSettings/>
      </Route>
      <Route path="/settings/company-details" exact>
        <CompanyDetails/>
      </Route>
      <Route path="/settings/rebranding" exact>
        <Rebranding/>
      </Route>
      <Route path="/settings/from-addresses" exact>
        <FromAddresses/>
      </Route>
      {/* <Route path="*">
        <span>Not Found</span>
      </Route> */}
      </Switch>
    </Router>

  );
}

export default App;
