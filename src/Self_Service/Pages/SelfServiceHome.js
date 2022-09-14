import React from "react";
import DashboardLayout from "../../Layout/DashboardLayout";
import SelfBox from "../Components/SelfBox";
import loan from "../Assets/Images/loan.svg";
import leave from "../Assets/Images/leave.svg";
import health from "../Assets/Images/health.svg";
import payslip from "../Assets/Images/payslip.svg";
import attendance from "../Assets/Images/attendance.svg";
import vehicle from "../Assets/Images/vehicle.svg";
import conference from "../Assets/Images/conference.svg";
import requisition from "../Assets/Images/requisition.svg";
import appraisals from "../Assets/Images/appraisals.svg";
import documents from "../Assets/Images/documents.svg";
import survey from "../Assets/Images/survey.svg";
import handOver from "../Assets/Images/handOver.svg";

const SelfServiceHome = () => {
  return (
    <DashboardLayout>
      <div>
        <h2 className="font-extrabold text-xl md:text-2xl text-accent">
          Self Service
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          <SelfBox title="Loan" icon={loan} link="#"/>
          <SelfBox title="Leave" icon={leave} link="#"/>
          <SelfBox title="Health access" icon={health} link="#"/>
          <SelfBox title="Payslip" icon={payslip} link="#"/>
          <SelfBox title="Attendance" icon={attendance} link="#"/>
          <SelfBox title="Vehicle booking" icon={vehicle} link="#"/>
          <SelfBox title="Conference Room Booking" icon={conference} />
          <SelfBox title="requisition" icon={requisition} link="requisition"/>
          <SelfBox title="appraisals" icon={appraisals} link="#"/>
          <SelfBox title="HR Letters & Documents" icon={documents} link="#"/>
          <SelfBox title="Survey Form" icon={survey} link="#"/>
          <SelfBox title="Hand Over Form" icon={handOver} link="#"/>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SelfServiceHome;
