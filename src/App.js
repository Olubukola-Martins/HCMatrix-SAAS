import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthRoutes from "./Auth/Routes/AuthRoutes";

function App() {
  return (
    <Router>
      <AuthRoutes />
      
      <Routes>
      <Route path="*" element={<span>Not found1</span> }/>
      </Routes>
    </Router>
  );
}

export default App;
