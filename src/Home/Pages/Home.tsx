import { useState } from "react";
import { AdminHome } from "../Components/AdminHome";
import { EmployeeHome } from "../Components/EmployeeHome";
import { useAuthUser } from "react-auth-kit";

function Home() {
  const auth = useAuthUser();
  const authDetails = auth();
  const user = authDetails?.user;

  return (
    <div>{user.isAdmin ? <AdminHome /> : <EmployeeHome user={user} />}</div>
  );
}

export default Home;
