import { TSingleEmployee } from "features/core/employees/types";

import { ManagerHistory } from "./ManagerHistory";
import { DirectReports } from "./DirectReports";

interface IProps {
  directReport?: TSingleEmployee["directReport"];
  managerHistory?: TSingleEmployee["managerHistory"];
}

const ManagerAndDirectReports: React.FC<IProps> = ({
  directReport,
  managerHistory,
}) => {
  return (
    <div className="bg-mainBg shadow-sm rounded-md py-6 px-4 mt-5">
      <ManagerHistory histories={managerHistory} />

      <DirectReports reports={directReport} />
    </div>
  );
};

export default ManagerAndDirectReports;
