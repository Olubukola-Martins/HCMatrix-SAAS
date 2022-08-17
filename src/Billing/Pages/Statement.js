import React from "react";
import DashboardLayout from "../../Layout/DashboardLayout";
import "../style/style.css";

const employee = [
  { id: 1, name: "Godswill Omenuko" },
  { id: 2, name: "Isaac Odeh" },
  { id: 3, name: "Peter Obi" },
  { id: 4, name: "Basil Ikpe" },
  { id: 5, name: "Reuben Arinze" },
  { id: 6, name: "Godspower Eze" },
];

const Statement = () => {
  return (
    <DashboardLayout>
      <div className="Container mt-4 text-sm text-accent">
        <div className="flex justify-between items-center">
          <span className="font-bold text-lg md:text-xl">Statement</span>
          <i className="ri-close-fill cursor-pointer text-2xl font-semibold text-red-600"></i>
        </div>

        <div className="flex gap-4 flex-col-reverse md:flex-row justify-between mt-5">
          <div className="text-sm">
            <span className="block">To</span>
            <span>Dangote Cement</span>
            <p className="pt-1">
              133 Ahmadu Bello Way, <br className="hidden md:flex" /> VI Lagos
              Nigeria
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button className="button">Pay Now</button>
            <button className="transparentButton">Send To</button>
            <i className="ri-download-2-line text-xl font-bold"></i>
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
            <h5 className="border-b-2 pb-1">Total Payments Received : $0</h5>
            <h5>Ending Balance in USD : $0</h5>
          </div>
        </div>
        <div>
          <h5 className="pt-4">
            This is not a bill. <br /> This is a summary of billing activity for
            the time period of quotation request.
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

        <div className="my-10">
          <p className="text-justify">
            This quote does not include integrations or development-related
            customizations for HCMATRIX, which is a subscription-based cloud
            SaaS. This quote does not include travel arrangements (if the need
            be) - Invoicing: The next payment date will be 12 months following
            the subscription.The quote includes VAT. - Annual Renewal includes
            the following benefits: - Technical Support & Bug Fixes: Standard
            technical support, system troubleshooting, and so forth. - System
            Upgrades: Receive full access to all new system enhancements, UI/UX
            improvements, and security updates atleast twice a year. -
            Configuration Support: Virtual assistance with any necessary
            configuration modifications.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Statement;
