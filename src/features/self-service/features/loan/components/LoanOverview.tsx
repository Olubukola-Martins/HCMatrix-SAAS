import React from "react";
import LoanOverviewCards from "./cards/LoanOverviewCards";
import { LoanInsightsCard } from "./cards/LoanInsightsCard";
import { RecentLoanRequestsCard } from "./cards/RecentLoanRequestsCard";
import { TLoanTabKey } from "../pages/LoanHome";
import { PermissionRestrictor } from "components/permission-restriction/PermissionRestrictor";
interface IProps {
  handleTabKey: (val: TLoanTabKey) => void;
}
const LoanOverview: React.FC<IProps> = ({ handleTabKey }) => {
  return (
    <div className="flex flex-col gap-4">
      <LoanOverviewCards />
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5  mt-4">
        <PermissionRestrictor requiredPermissions={["view-all-loan-requests"]}>
          <div className="col-span-3">
            <LoanInsightsCard />
          </div>
        </PermissionRestrictor>

        <div>
          <RecentLoanRequestsCard
            handleSeeAll={() => handleTabKey("My Requests")}
          />
        </div>
      </div>
    </div>
  );
};

export default LoanOverview;
