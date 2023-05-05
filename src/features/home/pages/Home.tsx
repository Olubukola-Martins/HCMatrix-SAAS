import { useAuthUser } from "react-auth-kit";
import { AdminHome } from "../components/AdminHome";
import { EmployeeHome } from "../components/EmployeeHome";

function Home() {
  const auth = useAuthUser();
  const authDetails = auth();
  const user = authDetails?.user;

  return (
    <div>{user.isAdmin ? <AdminHome /> : <EmployeeHome user={user} />}</div>
  );
}

export default Home;
