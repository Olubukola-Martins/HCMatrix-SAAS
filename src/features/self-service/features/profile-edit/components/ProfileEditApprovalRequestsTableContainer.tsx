import {
  TApprovalStatusContainerProps,
  withApprovalStatusContainer,
} from "components/containers/ApprovalStatusContainer";
import ProfileEditApprovalRequestsTable from "./ProfileEditApprovalRequestsTable";

interface ComponentProps {}

const Component: React.FC<ComponentProps & TApprovalStatusContainerProps> = ({
  status,
  employeeId,
}) => {
  return (
    <div>
      <ProfileEditApprovalRequestsTable status={status} employeeId={employeeId} />
    </div>
  );
};
const ComponentWithHOC = withApprovalStatusContainer(Component);

const ProfileEditApprovalRequestsTableContainer: React.FC = () => {
  return <ComponentWithHOC />;
};

export default ProfileEditApprovalRequestsTableContainer;
