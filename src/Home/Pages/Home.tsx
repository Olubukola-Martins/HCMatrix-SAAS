import { useState } from "react";
import { AdminHome2 } from "../Components/AdminHome2";
import { EmployeeHome } from "../Components/EmployeeHome";

function Home() {
  const [role, setRole] = useState("admin");
  return (
    <div>
      {role === "admin" && <AdminHome2 />}
      {role === "employee" && <EmployeeHome />}
    </div>
  );
}

export default Home;
