import React, { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../../Layout/DashboardLayout";
import { EmployeeFullInfoAccordionWrap } from "../../Components/EmployeeProfile/EmployeeFullInfoAccordionWrap";
import {
  SeparateEmployee,
  SuspendEmployee,
} from "../../Components/EmployeeProfile/SuspendAndSeparateEmployee";
import ViewInAs from "../../Components/EmployeeProfile/ViewInAs";

const PersonalInformation = () => {
  const [suspendModal, setSuspendModal] = useState(false);
  const [separateModal, setSeparateModal] = useState(false);
  const [viewInModal, setViewInModal] = useState(false);

  return (
    <DashboardLayout>
      <div className="Container pb-20">
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
                <span>Browse..</span>
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
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8">
              <div>
                <div className="P_Form_Group">
                  <label>Name</label>
                  <input type="text" placeholder="Godswill Omenuko" />
                </div>

                <div className="P_Form_Group my-4">
                  <label>Address</label>
                  <textarea
                    className="resize-none"
                    placeholder="No 3 United Estate Ajah Lagos Nigeria"
                  />
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div className="P_Form_Group">
                    <label>Gender</label>
                    <select>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                  <div className="P_Form_Group">
                    <label>Marital Status</label>
                    <select>
                      <option value="married">Married</option>
                      <option value="single">Single</option>
                      <option value="divorced">Divorced</option>
                    </select>
                  </div>
                </div>
                <div className="P_Form_Group mt-4">
                  <label>Date of Birth</label>
                  <input
                    type="text"
                    placeholder="23 - 09 - 2022"
                    onFocus={(e) => (e.target.type = "date")}
                    onBlur={(e) => (e.target.type = "text")}
                  />
                </div>
              </div>

              <div>
                <div className="P_Form_Group">
                  <label>Email Address</label>
                  <input type="email" placeholder="johndoe@email.com" />
                </div>
                <div className="P_Form_Group my-4">
                  <label>Employee Number</label>
                  <input type="text" placeholder="SNN3764" />
                </div>
                <div className="P_Form_Group my-4">
                  <label>Employee Number</label>
                  <input type="tel" placeholder="+234 | 9078657754" />
                </div>
                <div className="P_Form_Group my-4">
                  <label>Confirmation Date</label>
                  <input
                    type="text"
                    placeholder="23 - 09 - 2022"
                    onFocus={(e) => (e.target.type = "date")}
                    onBlur={(e) => (e.target.type = "text")}
                  />
                </div>

                <div className="flex justify-end mt-10">
                  <button className="button">Save Changes</button>
                </div>
              </div>
            </form>
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
