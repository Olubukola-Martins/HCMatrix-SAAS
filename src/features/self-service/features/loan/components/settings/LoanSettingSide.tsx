import { AcceptSettingsAction } from "../../types/setting";

export const LoanSettingSide = ({
  setAction,
  action,
}: AcceptSettingsAction) => {
  return (
    <div>
      <ul className="flex flex-col gap-6 text-sm text-[#3A3A3A]">
        <li>
          <span
            onClick={() => setAction("approval-process")}
            className={`cursor-pointer hover:text-caramel px-3 py-2 rounded-md ${
              action === "approval-process" ? "bg-[#F1F4F5] font-medium" : ""
            }`}
          >
            Setup Approval Process
          </span>
        </li>
        <li>
          <span
            onClick={() => setAction("loan-types")}
            className={`cursor-pointer hover:text-caramel px-3 py-2 rounded-md ${
              action === "loan-types" ? "bg-[#F1F4F5] font-medium" : ""
            }`}
          >
            Create Loan Types
          </span>
        </li>
        <li className="cursor-pointer hover:text-caramel">
          <span
            onClick={() => setAction("eligibility-criteria")}
            className={`cursor-pointer hover:text-caramel px-3 py-2 rounded-md ${
              action === "eligibility-criteria"
                ? "bg-[#F1F4F5] font-medium"
                : ""
            }`}
          >
            Setup Eligibility Criteria
          </span>
        </li>
        <li>
          <span
            onClick={() => setAction("configure-payment")}
            className={`cursor-pointer hover:text-caramel px-3 py-2 rounded-md ${
              action === "configure-payment" ? "bg-[#F1F4F5] font-medium" : ""
            }`}
          >
            Configure Payment Settings
          </span>
        </li>
        <li>
          <span
            onClick={() => setAction("disbursement-setup")}
            className={`cursor-pointer hover:text-caramel px-3 py-2 rounded-md ${
              action === "disbursement-setup" ? "bg-[#F1F4F5] font-medium" : ""
            }`}
          >
            Disbursement Setup
          </span>
        </li>
      </ul>
    </div>
  );
};
