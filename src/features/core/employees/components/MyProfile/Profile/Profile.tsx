import { TSingleEmployee } from "features/core/employees/types";
import { PersonalInformation } from "./PersonalInformation";
import { EmergencyContact } from "./EmergencyContact";
import { Dependents } from "./Dependents/Dependents";
import EmployeeDependents from "./Dependents/EmployeeDependents";

interface IProps {
  personalInfo?: TSingleEmployee["personalInformation"];
  emergencyContact?: TSingleEmployee["emergencyContact"];
  dependents?: TSingleEmployee["dependents"];

  employeeId?: number;
}

const Profile: React.FC<IProps> = ({
  personalInfo,
  employeeId,
  emergencyContact,
  dependents,
}) => {
  return (
    <>
      <PersonalInformation
        personalInfo={personalInfo}
        employeeId={employeeId}
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
