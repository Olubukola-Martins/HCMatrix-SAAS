import React, { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../Layout/DashboardLayout";
import AddReplaceAsset from "../Components/Requisition/Add_ReplaceAsset";
import NewRequisition from "../Components/Requisition/NewRequisition";
import RequisitionDetails from "../Components/Requisition/RequisitionDetails";
import SelfServiceSubNav from "../Components/SelfServiceSubNav";

const Requisition = () => {
  const [newRequisitionModal, setNewRequisitionModal] = useState(false);
  const [addAssets, setAddAssets] = useState(false);
  const [requisitionDetailModal, setRequisitionDetailModal] = useState(false);

  return (
    <DashboardLayout>
        <SelfServiceSubNav/>
      {/* modal components */}
      <NewRequisition
        open={newRequisitionModal}
        handleClose={() => setNewRequisitionModal(false)}
      />
      <AddReplaceAsset
        open={addAssets}
        handleClose={() => setAddAssets(false)}
      />

      <RequisitionDetails
        open={requisitionDetailModal}
        handleClose={() => setRequisitionDetailModal(false)}
      />

      <div className="Container">
        <div className="flex items-center gap-2">
          <Link to="/self-service/home" className="hover:text-caramel">
            <i className="ri-arrow-left-s-line text-xl"></i>
          </Link>
          <h5 className="font-black text-lg">Asset Requisition</h5>
        </div>
        <div className="flex items-center gap-3 mt-4 md:mt-0 justify-start md:justify-end">
          <i className="ri-download-2-line text-xl cursor-pointer"></i>
          <i className="fa-solid fa-file-export cursor-pointer"></i>
          <button
            className="button"
            onClick={() => setNewRequisitionModal(true)}
          >
            New Requisition
          </button>
          <button
            onClick={() => setAddAssets(true)}
            className="transparentButton"
            style={{ color: "var(--caramel)" }}
          >
            Add / Replace Assets
          </button>
        </div>

        <table className="payroll-table text-accent mt-6">
          <thead>
            <tr>
              <th>
                <input type="checkbox" />
              </th>
              <th>Requisition Date</th>
              <th>Requisition Type</th>
              <th>Title</th>
              <th>Item</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5].map((item) => (
              <tr key={item}>
                <td>
                  <input type="checkbox" />
                </td>
                <td>DD/MM/YY</td>
                <td>Asset Request</td>
                <td>Laptop Request</td>
                <td>HP EliteBook</td>
                <td>Pending</td>
                <td className="flex items-center justify-center gap-3">
                  <i
                    onClick={() => setRequisitionDetailModal(true)}
                    className="ri-eye-line text-lg cursor-pointer hover:text-caramel"
                  ></i>
                  <i className="ri-download-2-line text-lg"></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
};

export default Requisition;
