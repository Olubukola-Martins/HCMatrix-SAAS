import { PageIntro } from "components/layout/PageIntro";
import PageSubHeader from "components/layout/PageSubHeader";
import { appRoutes } from "config/router/paths";
import { useState } from "react";
import { AddDepartmentModal } from "../components/AddDepartmentModal";
import DepartmentsViewContainer from "../components/DepartmentsViewContainer";

const Departments = () => {
  const [showM, setShowM] = useState(false);

  return (
    <>
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
    </>
  );
};

export default Departments;
