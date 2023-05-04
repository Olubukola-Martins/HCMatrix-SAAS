import { appRoutes } from "AppRoutes";
import { PageIntro } from "Layout/Components/PageIntro";
import PageSubHeader from "Layout/Components/PageSubHeader";
import DashboardLayout from "Layout/DashboardLayout";
import { useState } from "react";
import { AddDepartmentModal } from "Settings/Components/Organization/Departments/AddDepartmentModal";
import DepartmentsViewContainer from "Settings/Components/Organization/Departments/DepartmentsViewContainer";

const Departments = () => {
  const [showM, setShowM] = useState(false);

  return (
    <DashboardLayout>
      <AddDepartmentModal open={showM} handleClose={() => setShowM(false)} />
      <div className="Container">
        {
          <div className="mt-4">
            <PageIntro title="Departments" link={appRoutes.settings} />

            <PageSubHeader
              description="Manage all the department details and the departments settings
            in your organization."
              actions={[
                { name: "Add department", handleClick: () => setShowM(true) },
              ]}
            />
            <DepartmentsViewContainer />
          </div>
        }
      </div>
    </DashboardLayout>
  );
};

export default Departments;
