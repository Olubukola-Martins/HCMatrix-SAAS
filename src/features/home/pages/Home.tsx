import { Select } from "antd";
import { AdminHome } from "../components/AdminHome";
import { EmployeeHome } from "../components/EmployeeHome";
import { useApiAuth } from "hooks/useApiAuth";
import { useEffect, useState } from "react";

type TView = "owner" | "employee";
function Home() {
  const { authUserData: user, currentCompanyEmployeeDetails: employee } =
    useApiAuth();
  const [view, setView] = useState<TView>("employee");
  useEffect(() => {
    if (user.isOwner) {
      setView("owner");
    }
  }, [user]);

  return (
    <div className="flex flex-col gap-4">
      {user.isOwner && (
        <div className="Container flex justify-end mt-4">
          <Select
            options={[
              { value: "owner", label: "Owner" },
              { value: "employee", label: "Employee" },
            ]}
            size="small"
            value={view}
            onSelect={(val: TView) => setView(val)}
          />
        </div>
      )}
      {view === "owner" && <AdminHome />}
      {view === "employee" && <EmployeeHome employee={employee} />}
    </div>
  );
}

export default Home;
