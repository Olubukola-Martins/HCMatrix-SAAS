import {
  TApprovalStatusContainerProps,
  withApprovalStatusContainer,
} from "components/containers/ApprovalStatusContainer";
import { PositionChangeRequestsTable } from "./PositionChangeRequestsTable";

interface ComponentProps {
  export: () => void;
}

const Component: React.FC<ComponentProps & TApprovalStatusContainerProps> = ({
  status,
}) => {
  return (
    <div>
      <PositionChangeRequestsTable status={status} />
    </div>
  );
};
const ComponentWithHOC = withApprovalStatusContainer(Component, {
  filtersToDisplay: ["employee", "status"],
});

export const PositionChangeRequestsTableContainer: React.FC = () => {
  return <ComponentWithHOC export={() => {}} />;
};
