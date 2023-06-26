import SelfServiceSubNav from "features/self-service/components/SelfServiceSubNav";
import CRBCards from "../components/CRBCards";
import CRBHeader from "../components/CRBHeader";
import { CRBApprovalRequestsContainer } from "../components/CRBApprovalRequestsContainer";
import CRBHistoryContainer from "../components/CRBHistoryContainer";

export const CRBHomePage = () => {
  return (
    <>
      <SelfServiceSubNav />

      <div>
        <div className="Container">
          <CRBHeader title="Meeting Room Booking" />
          <CRBCards />
          <div className="mt-12 flex flex-col gap-4">
            <CRBApprovalRequestsContainer />
            <CRBHistoryContainer />
          </div>
        </div>
      </div>
    </>
  );
};
