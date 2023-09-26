import { TSingleEmployee } from "features/core/employees/types";
import { PersonalInformation } from "./PersonalInformation";
import { EmergencyContact } from "./EmergencyContact";
import { Dependents } from "./Dependents/Dependents";

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
      <Dependents dependents={dependents} employeeId={employeeId} />
    </>
  );
};

export default Profile;
