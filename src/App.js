import Login from "./Auth/Pages/Login";
import Register from "./Auth/Pages/Register";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ResetPassword from "./Auth/Pages/ResetPassword";



function App() {
  return (
    <Router>
     <Route exact path="/login">
        <Login/>
      </Route>
      <Route path="/register">
        <Register/>
      </Route>
      <Route path="/reset-password">
        <ResetPassword/>
      </Route>
      <Route path="*">
        <span>Not Found</span>
      </Route>
    </Router>
  );
}

export default App;
