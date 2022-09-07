import React, { useState } from "react";
import DashboardLayout from "../../Layout/DashboardLayout";
import CreateWalletPermission from "../Components/CreateWalletPermission";
import SendTo from "../Components/SendTo";
import "../style/style.css";
import logo from "../../Layout/Images/logo2.png";
import { Link } from "react-router-dom";
import UserLicense from "../Components/UserLicense";

const Statement = () => {
  const [openSend, setOpenSend] = useState(false);
  const [createWallet, setCreateWallet] = useState(false);
  const [licenseModal, setLicenseModal] = useState(false);

  return (
    <DashboardLayout>
      <SendTo open={openSend} handleClose={() => setOpenSend(false)} />
      <CreateWalletPermission
        open={createWallet}
        handleClose={() => setCreateWallet(false)}
      />

      <UserLicense
        open={licenseModal}
        handleClose={() => setLicenseModal(false)}
      />

      <div className="  -mt-6 pt-10 text-sm text-accent pb-10 bg-card">
        <div className="px-24">
          <div className="flex items-center justify-between mb-5">
            <i
              className="ri-close-fill cursor-pointer text-2xl font-semibold"
              onClick={() => setLicenseModal(true)}
            ></i>

            <div className="flex items-center gap-3">
              <button className="button" onClick={() => setCreateWallet(true)}>
                Pay Now
              </button>
              <button
                className="transparentButton"
                onClick={() => setOpenSend(true)}
              >
                Send To
              </button>
              <i className="ri-download-2-line text-xl font-bold cursor-pointer"></i>
            </div>
          </div>

          {/* main */}
          <div
            className="px-10 bg-mainBg rounded-md pb-5 pt-10"
            style={{
              boxShadow:
                "0 2px 5px rgba(0,0,0,0.12), 1px 1px 2px rgba(0,0,0,0.24)",
            }}
          >
            <div className="">
              <img src={logo} alt="logo" className="h-10 mb-2 -ml-2" />
              <span className="font-bold text-lg md:text-xl">Statement</span>
            </div>

            <div className="flex gap-4 flex-col-reverse md:flex-row justify-between mt-5">
              <div className="text-sm">
                <span className="block">To</span>
                <span>Dangote Cement</span>
                <p className="pt-1">
                  133 Ahmadu Bello Way, <br className="hidden md:flex" /> VI
                  Lagos Nigeria
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-3 text-sm border-b-2 pb-5">
              <div>
                <span>Details</span>
                <h5>Tenant ID _____000000</h5>
                <h5>Customer ID ____00000</h5>
                <h5>Quotation ID _____000000</h5>
                <h5>Quotation Date _____August 02, 2022</h5>
              </div>

              <div>
                <h5 className="font-medium text-lg">HR Management Software</h5>
                <div className="border-b-2 pb-1">
                  Summary for August 02, 2022-August 02, 2022
                </div>
                <h5>Starting Balance : $0</h5>
                <h5>Total New Activity : $0</h5>
                <h5 className="border-b-2 pb-1">
                  Total Payments Received : $0
                </h5>
                <h5>Ending Balance in USD : $0</h5>
              </div>
            </div>
            <div>
              <h5 className="pt-4">
                This is not a bill. <br /> This is a summary of billing activity
                for the time period of quotation request.
              </h5>
            </div>

            <table className="billingTable mt-20">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Quantity</th>
                  <th>Unit Price</th>
                  <th>Total Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Licensed User(s)</td>
                  <td>0</td>
                  <td>$0</td>
                  <td>$0</td>
                </tr>
                <tr>
                  <td>Cloud-Based Cost</td>
                  <td>0</td>
                  <td>$0</td>
                  <td>$0</td>
                </tr>
                <tr>
                  <td>Annual Subscription</td>
                  <td>0</td>
                  <td>$0</td>
                  <td>$0</td>
                </tr>
                <tr>
                  <td>Employee Management</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td>Self Service</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td>Advanced Reports and Analytics</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                </tr>

                <tr>
                  <td>Payroll & Finance</td>
                  <td>0</td>
                  <td>$0</td>
                  <td>$0</td>
                </tr>
              </tbody>
            </table>
            <div className="flex items-end gap-3 flex-col mt-4 font-medium">
              <div className="flex items-center gap-x-10">
                <span>TOTAL</span>
                <span>$0</span>
              </div>
              <div className="flex items-center gap-x-10">
                <span>VAT 0%</span>
                <span>$0</span>
              </div>
              <div className="flex items-center gap-x-10">
                <span>TOTAL INCLUDING VAT</span>
                <span>$0</span>
              </div>
            </div>

            <div className="mt-32 pb-14">
              <p className="text-justify text-xs">
                This quote does not include integrations or development-related
                customizations for HCMATRIX, which is a subscription-based cloud
                SaaS. This quote does not include travel arrangements (if the
                need be) - Invoicing: The next payment date will be 12 months
                following the subscription.The quote includes VAT. - Annual
                Renewal includes the following benefits: - Technical Support &
                Bug Fixes: Standard technical support, system troubleshooting,
                and so forth. - System Upgrades: Receive full access to all new
                system enhancements, UI/UX improvements, and security updates
                atleast twice a year. - Configuration Support: Virtual
                assistance with any necessary configuration modifications.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Statement;
