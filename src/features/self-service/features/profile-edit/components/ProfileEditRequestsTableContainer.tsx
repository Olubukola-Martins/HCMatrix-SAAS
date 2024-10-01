import {
  TApprovalStatusContainerProps,
  withApprovalStatusContainer,
} from "components/containers/ApprovalStatusContainer";
import { ProfileEditRequestsTable } from "./ProfileEditRequestsTable";

interface ComponentProps {
  export: () => void;
}

const Component: React.FC<ComponentProps & TApprovalStatusContainerProps> = ({
  status,
}) => {
  return (
    <div>
      <ProfileEditRequestsTable status={status} />
    </div>
  );
};
const ComponentWithHOC = withApprovalStatusContainer(Component, {
  filtersToDisplay: ["employee", "status"],
});

export const ProfileEditRequestsTableContainer: React.FC = () => {
  return <ComponentWithHOC export={() => {}} />;
};
