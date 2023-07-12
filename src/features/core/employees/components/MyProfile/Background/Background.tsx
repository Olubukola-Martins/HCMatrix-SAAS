import { TSingleEmployee } from "features/core/employees/types";

import { EmploymentHistory } from "./EmploymentHistory/EmploymentHistory";
import { Education } from "./Education/Education";
import { Skills } from "./Skills/Skills";

interface IProps {
  educationDetails?: TSingleEmployee["educationDetails"];
  employmentHistory?: TSingleEmployee["employmentHistory"];
  skills?: TSingleEmployee["skills"];

  employeeId?: number;
}

const Background: React.FC<IProps> = ({
  employmentHistory,
  employeeId,
  skills,
  educationDetails,
}) => {
  return (
    <div className="bg-mainBg shadow-sm rounded-md py-6 px-4 mt-5">
      <EmploymentHistory
        histories={employmentHistory}
        employeeId={employeeId}
      />

      <Education educationDetails={educationDetails} employeeId={employeeId} />
      <Skills skills={skills} employeeId={employeeId} />
    </div>
  );
};

export default Background;
