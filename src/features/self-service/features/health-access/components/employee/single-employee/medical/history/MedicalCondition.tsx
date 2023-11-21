import { DEFAULT_DATE_FORMAT } from "constants/dateFormats";
import {
  TEmployeeMedicalHistoryType,
  TSingleEmployeeHealthAccess,
} from "features/self-service/features/health-access/types/employee";
import moment from "moment";
import { useState } from "react";
import { AddMedication } from "./AddMedication";
import { DeleteMedicalCondition } from "./DeleteMedicalCondition";
import { EditMedication } from "./EditMedication";

type TAction = "add" | "edit" | "delete";
export const MedicalCondition: React.FC<{
  title: string;
  employeeId?: number;
  conditions?: TSingleEmployeeHealthAccess["medicalHistory"];
  type: TEmployeeMedicalHistoryType;
}> = ({ conditions, title, type, employeeId }) => {
  const [action, setAction] = useState<TAction>();
  const [condition, setCondition] =
    useState<TSingleEmployeeHealthAccess["medicalHistory"][0]>();
  const handleAction = (
    action: TAction,
    condition?: TSingleEmployeeHealthAccess["medicalHistory"][0]
  ) => {
    setAction(action);
    setCondition(condition);
  };
  const handleClose = () => {
    setAction(undefined);
  };
  return (
    <>
      <AddMedication
        handleClose={handleClose}
        open={action === "add"}
        type={type}
        employeeId={employeeId}
      />
      <DeleteMedicalCondition
        handleClose={handleClose}
        open={action === "delete"}
        type={type}
        employeeId={employeeId}
        data={condition}
      />
      <EditMedication
        handleClose={handleClose}
        open={action === "edit"}
        type={type}
        employeeId={employeeId}
        data={condition}
      />
      <div>
        <div className="flex justify-between items-center">
          <h2 className="text-base text-accent">{title}</h2>
          <button className="button" onClick={() => handleAction("add")}>
            Add
          </button>
        </div>

        <div className="p-1 md:p-4 bg-gray-200 rounded mt-3">
          <table className="w-full text-center">
            <thead>
              <tr>
                <th>Condition</th>
                <th>Date of Onset</th>
              </tr>
            </thead>
            <tbody>
              {conditions
                ?.filter((item) => item.type === type)
                ?.map((data, i) => (
                  <tr key={i}>
                    <td className="p-1">{data.condition}</td>
                    <td>
                      {moment(data.dateOfOnset).format(DEFAULT_DATE_FORMAT)}
                    </td>
                    <td>
                      <i
                        className="ri-pencil-line cursor-pointer hover:text-caramel"
                        onClick={() => handleAction("edit", data)}
                      />
                      <i
                        className="ri-delete-bin-5-line cursor-pointer hover:text-caramel"
                        onClick={() => handleAction("delete", data)}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
