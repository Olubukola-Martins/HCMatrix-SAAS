import React, { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../../../Layout/DashboardLayout";
import { EmployeeFullInfoAccordionWrap } from "../../../Components/Organization/EmployeeProfiles/PersonalInformation/EmployeeFullInfoAccordionWrap";
import {
  SeparateEmployee,
  SuspendEmployee,
} from "../../../Components/Organization/EmployeeProfiles/PersonalInformation/SuspendAndSeparateEmployee";
import ViewInAs from "../../../Components/Organization/EmployeeProfiles/PersonalInformation/ViewInAs";

import PersonalSummaryForm from "../../../Components/Organization/EmployeeProfiles/PersonalInformation/PersonalSummaryForm";

const PersonalInformation = () => {
  const [suspendModal, setSuspendModal] = useState(false);
  const [separateModal, setSeparateModal] = useState(false);
  const [viewInModal, setViewInModal] = useState(false);

  return (
    <DashboardLayout>
      <div className="  pb-20">
        <div className="flex justify-between items-center mt-3">
          <div className="flex items-center gap-2 text-accent font-semibold mt-2 pb-1">
            <Link to="/settings/employee-profile">
              <i className="ri-arrow-left-line text-xl cursor-pointer hover:text-caramel"></i>
            </Link>
            <h5 className="text-lg">Personal Information</h5>
          </div>
          <div className="flex items-center gap-2">
            <button className="button" onClick={() => setViewInModal(true)}>
              View other users
            </button>
            <button className="button" title="Download personal information">
              Print
            </button>
            <ViewInAs
              open={viewInModal}
              handleClose={() => setViewInModal(false)}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-4 grid-cols-1 gap-6 mt-5">
          <div className="text-center">
            <div className="flex justify-center">
              <img
                src="https://res.cloudinary.com/ddvaelej7/image/upload/v1657714689/samples/personal-info_vgptbq.png"
                alt="user"
                className=""
              />
            </div>
            <div className="bg-card py-1 rounded font-medium text-sm hover:shadow cursor-pointer text-accent">
              <label htmlFor="file">
                <span>Upload...</span>
              </label>
              <input type="file" id="file" className="hidden" />
            </div>

            <div className="flex items-center gap-2 mt-10 md:flex-col lg:flex-row">
              <button
                className="transparentButton"
                onClick={() => setSeparateModal(true)}
              >
                Separate User
              </button>
              <button
                className="transparentButton"
                onClick={() => setSuspendModal(true)}
              >
                Suspend User
              </button>

              <SuspendEmployee
                open={suspendModal}
                handleClose={() => setSuspendModal(false)}
              />
              <SeparateEmployee
                open={separateModal}
                handleClose={() => setSeparateModal(false)}
              />
            </div>
          </div>

          <div className="bg-card py-6 px-3 rounded-md col-span-3">
            <PersonalSummaryForm />
          </div>
        </div>

        {/* Accordion section */}
        <div className="mt-10">
          <EmployeeFullInfoAccordionWrap />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PersonalInformation;
