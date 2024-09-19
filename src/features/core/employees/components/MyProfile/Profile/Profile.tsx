import { TSingleEmployee } from "features/core/employees/types";
import { PersonalInformation } from "./PersonalInformation";
import { EmergencyContact } from "./EmergencyContact";
import EmployeeDependents from "./Dependents/EmployeeDependents";

interface IProps {
  personalInfo?: TSingleEmployee["personalInformation"];
  emergencyContact?: TSingleEmployee["emergencyContact"];
  dependents?: TSingleEmployee["dependents"];

  employeeId?: number;
  isOwner?: boolean;
}

const Profile: React.FC<IProps> = ({
  personalInfo,
  employeeId,
  emergencyContact,
  dependents,
  isOwner = false,
}) => {
  return (
    <>
      <PersonalInformation
        personalInfo={personalInfo}
        employeeId={employeeId}
        isOwner={isOwner}
      />
      <EmergencyContact
        emergencyContact={emergencyContact}
        employeeId={employeeId}
      />
      <EmployeeDependents dependents={dependents} employeeId={employeeId} />
    </>
  );
};

export default Profile;
