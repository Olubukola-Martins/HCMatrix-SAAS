import { useState } from "react";
import { AdminHome } from "../Components/AdminHome";
import { EmployeeHome } from "../Components/EmployeeHome";
import { useAuthUser } from "react-auth-kit";

function Home() {
  const auth = useAuthUser();
  const authDetails = auth();
  const user = authDetails?.user;
  const [role] = useState(user.isAdmin);
  return <div>{role ? <AdminHome /> : <EmployeeHome user={user} />}</div>;
}

export default Home;
