import Login from "./Auth/Pages/Login";
import Register from "./Auth/Pages/Register";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ResetPassword from "./Auth/Pages/ResetPassword";
import Home from "./Home/Pages/Home";
import Domains from "./Settings/Pages/Domains";

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reset-password" element={<ResetPassword />} />

     
      <Route path="*">
        {/* <span>Not Found</span> */}
      </Route>
      </Route>
            </Routes>
    </Router>
  );
}

export default App;
