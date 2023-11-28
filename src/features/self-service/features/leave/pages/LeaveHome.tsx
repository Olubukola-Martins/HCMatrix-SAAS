import SelfServiceSubNav from "features/self-service/components/SelfServiceSubNav";
import LeaveCards from "../components/LeaveCards";
import LeaveHomePageHeader from "../components/LeaveHomePageHeader";
import "../styles/leave.css";
import LeaveHomeTabs from "../components/LeaveHomeTabs";

const LeaveHome = () => {
  return (
    <div>
      <SelfServiceSubNav />

      <div>
        <div className="Container">
          {/* header */}
          <LeaveHomePageHeader />

          <div>
            {/* cards */}

            <LeaveCards />

            {/* table section*/}
            <div className="mt-12 flex flex-col gap-4">
              <LeaveHomeTabs />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveHome;
