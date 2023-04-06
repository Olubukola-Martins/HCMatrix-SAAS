import DashboardLayout from "Layout/DashboardLayout";
import SelfServiceSubNav from "../SelfServiceSubNav";
import CRBCards from "./CRBCards";
import CRBHistoryTable from "./CRBHistoryTable";
import CRBHeader from "./CRBHeader";
import CRBMyRequestsTable from "./CRBMyRequestsTable";

export const CRBHomePage = () => {
  return (
    <DashboardLayout>
      <SelfServiceSubNav />

      <div>
        <div className="Container">
          <CRBHeader title="Meeting Room Booking" />
          <CRBCards />
          <div className="mt-12 flex flex-col gap-4">
            <CRBMyRequestsTable />
            <CRBHistoryTable />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
