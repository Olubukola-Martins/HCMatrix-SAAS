import { useState } from "react";
import { AdminHome } from "../Components/AdminHome";
import { EmployeeHome } from "../Components/EmployeeHome";

function Home() {
  const [role, setRole] = useState("admin");
  return (
    <div>
      {role === "admin" && <AdminHome />}
      {role === "employee" && <EmployeeHome />}
    </div>
  );
}

export default Home;
