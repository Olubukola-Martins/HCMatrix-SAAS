import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthRoutes from "./Auth/Routes/AuthRoutes";
import Domains from "./Settings/Pages/Domains";

function App() {
  return (
    <Router>
      <AuthRoutes />
      
      <Routes>
       <Route path="/settings/domains" element={ <Domains/>}/>
      <Route path="*" element={<span>Not found1</span> }/>
      </Routes>
    </Router>
  );
}

export default App;
