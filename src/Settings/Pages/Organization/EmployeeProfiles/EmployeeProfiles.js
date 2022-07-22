import React, { useState } from "react";
import DashboardLayout from "../../../../Layout/DashboardLayout";
import Menu from "@mui/material/Menu";
import Themes from "../../../../Themes/Themes";
import "../../../style/settingsStyle.css";
import { AnimatePresence } from "framer-motion";
import FilterDrawer from "../../../Components/FilterDrawer";
import { Dialog, Slide } from "@mui/material";
import AddEmployee from "../../../Components/Organization/EmployeeProfiles/AddEmployee";
import ExportModal from "../../../Components/ExportModal";
import { Link } from "react-router-dom";
import EmployeeActions from "../../../Components/Organization/EmployeeProfiles/EmployeeActions";
import UploadFileModal from "../../../Components/UploadFileModal";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const EmployeeProfiles = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorE2, setAnchorE2] = useState(null);
  const [showDraggableDrawer, setShowDraggableDrawer] = useState("");
  const [openFullDialog, setOpenFullDialog] = useState(false);
  const [openExport, setOpenExport] = useState(false);
  const [importEmployeeModal, setImportEmployeeModal] = useState(false);
  const [bulk, setBulk] = useState([]);
  const open = Boolean(anchorEl);
  const handleChange = (item) => {
    if (bulk.find((a) => a === item)) {
      const result = bulk.filter((a) => a !== item);
      setBulk(result);
      return;
    }
    setBulk((items) => [...items, item]);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <DashboardLayout>
      <Dialog fullScreen open={openFullDialog} TransitionComponent={Transition}>
        <DashboardLayout>
          <AddEmployee close={() => setOpenFullDialog(false)} />
        </DashboardLayout>
      </Dialog>

      {/* Employee Status menu */}
      <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
        <Themes>
          <div className="bg-card w-36 px-2 text-sm py-3 text-accent">
            <h5 className="flex items-center justify-between border-b">
              <span>Probation</span> <span>6</span>
            </h5>
            <h5 className="flex items-center justify-between py-2 border-b">
              <span>Confirmed</span> <span>10</span>
            </h5>
            <h5 className="flex items-center justify-between border-b pb-2">
              <span>Separated</span> <span>8</span>
            </h5>
            <h5 className="flex items-center justify-between">
              <span>Suspended</span> <span>10</span>
            </h5>
          </div>
        </Themes>
      </Menu>

      {/* </div> */}
      <div className="relative pb-10">
        <div className="flex justify-between mt-5 Container">
          <div className="flex items-center gap-3">
            <button
              className="flex items-center gap-2 transition duration-300 ease-in-out border-slate-400 text-slate-400 border rounded text-sm px-2 py-1 hover:border-caramel"
              onClick={handleClick}
            >
              <span>Total Record</span>
              <i className="ri-arrow-down-s-line text-xl"></i>
            </button>
            <button className="button">100</button>
          </div>

          <div className="flex items-center gap-3 text-accent">
            <button
              className="py-1 px-2 bg-caramel rounded text-sm text-white font-medium"
              onClick={() => setOpenFullDialog(true)}
            >
              Add Employee Profile
            </button>
            <button
              onClick={() => setImportEmployeeModal(true)}
              className="py-1 px-2 bg-transparent rounded text-sm text-accent border border-slate-200 hover:border-slate-400 font-medium transition ease-in-out duration-300"
            >
              Import Employee Profile
            </button>
            <UploadFileModal
              open={importEmployeeModal}
              handleClose={() => setImportEmployeeModal(false)}
            />
            <i
              className="ri-filter-line text-xl cursor-pointer"
              onClick={() => setShowDraggableDrawer("filter")}
            ></i>
            {/* <i className="ri-upload-2-line text-xl cursor-pointer"></i> */}
            <i
              className="ri-question-fill text-xl cursor-pointer text-gray-400"
              title="Employee profile"
            ></i>
          </div>
        </div>

        <div className="">
          {/* drawers are here */}
          <AnimatePresence>
            {/* The Filter Draggable Modal */}
            {showDraggableDrawer === "filter" && (
              <FilterDrawer handleDrawer={setShowDraggableDrawer} />
            )}
          </AnimatePresence>
        </div>

        <div className="Container">
          <div className="bg-card flex items-center justify-between p-3 mb-2 mt-7">
            <h5 className="font-medium">Employee Information</h5>
            <div className="flex items-center gap-5">
              <button className="flex items-center gap-2 text-sm text-white bg-green-600 px-2 py-1">
                <span>Enroll Biometric</span>
                <i className="ri-fingerprint-fill text-base"></i>
              </button>
              <button className="flex items-center gap-2 text-sm text-white bg-caramel px-2 py-1">
                <span>Remove Biometric</span>
                <i className="ri-fingerprint-fill text-base"></i>
              </button>
              <button className="flex items-center gap-2 text-sm text-white bg-green-600 px-2 py-1">
                <span>Current View</span>
                <i className="ri-file-excel-line text-base"></i>
              </button>
              <button className="flex items-center gap-2 text-sm text-white bg-green-600 px-2 py-1">
                <span>All</span>
                <i className="ri-file-excel-line text-base"></i>
              </button>

              <button
                onClick={() => setOpenExport(true)}
                className="flex items-center gap-2 text-sm text-white bg-caramel px-2 py-1"
              >
                <span>Export</span>
                <i className="ri-file-hwp-line text-base"></i>
              </button>
              <ExportModal
                open={openExport}
                handleClose={() => setOpenExport(false)}
              />
            </div>
            <div />
          </div>
        </div>
        {bulk.length > 0 && <EmployeeActions />}

        <div className="Container">
          <table className="employee-profile-table">
            <thead>
              <tr>
                <th className="flex items-center justify-center gap-3">
                  <input type="checkbox" />
                  <span>Name</span>
                </th>
                <th>Gender</th>
                <th>Staff ID</th>
                <th>Grade</th>
                <th>Department</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <tr>
                  <td
                    className="flex items-center justify-center gap-3"
                    key={item}
                  >
                    <input
                      type="checkbox"
                      onChange={() => handleChange(item)}
                    />
                    <div className="flex items-center gap-2 justify-center">
                      <img
                        src="https://res.cloudinary.com/ddvaelej7/image/upload/v1656616707/samples/Ellipse_1915_maqdtn.png"
                        alt="user"
                      />
                      <Link
                        to="/settings/employee-profile/id"
                        className="font-medium cursor-pointer"
                      >
                        Francis terr
                      </Link>
                    </div>
                  </td>
                  <td>Male</td>
                  <td>D2345</td>
                  <td>2</td>
                  <td>Admin</td>
                  <td>johndoe@email.com</td>
                  <td>
                    <span className="flex items-center gap-2 text-xl justify-center">
                      <i className="fa-solid fa-circle-user"></i>
                      <i className="ri-pencil-line"></i>{" "}
                      <i className="ri-delete-bin-line"></i>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EmployeeProfiles;
