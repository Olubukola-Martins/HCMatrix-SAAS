import {
  TApprovalStatusContainerProps,
  withApprovalStatusContainer,
} from "components/containers/ApprovalStatusContainer";
import { MonetaryRequestsTable } from "./MonetaryRequestsTable";

interface ComponentProps {
  export: () => void;
}

const Component: React.FC<ComponentProps & TApprovalStatusContainerProps> = ({
  status,
  employeeId,
}) => {
  return (
    <div>
      <MonetaryRequestsTable status={status} employeeId={employeeId} />
    </div>
  );
};
const ComponentWithHOC = withApprovalStatusContainer(Component, {
  filtersToDisplay: ["employee", "status"],
});

export const MonetaryRequestsTableContainer: React.FC = () => {
  return <ComponentWithHOC export={() => {}} />;
};
