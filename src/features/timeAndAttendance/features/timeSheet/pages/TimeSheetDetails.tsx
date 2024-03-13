import { PageIntro } from "components/layout/PageIntro";
import { AttendanceSubToper } from "../../../components/AttendanceSubToper";
import { appRoutes } from "config/router/paths";
import { SimpleCard } from "components/cards/SimpleCard";
import { AppButton } from "components/button/AppButton";
import { DatePicker } from "antd";
import { useState } from "react";
import { AddTimeEntry } from "../../../components/AddTimeEntry/AddTimeEntry";
import { useParams } from "react-router-dom";
import { useGetSingleTimeSheet } from "../hooks/useGetSingleTimeSheet";
import { useFetchSingleEmployee } from "features/core/employees/hooks/useFetchSingleEmployee";

const placeholderAvatar = "https://picsum.photos/193";

const TimeSheetDetails = () => {
  const [addTimeEntryModal, setAddTimeEntryModal] = useState(false);
  const params = useParams();
  const id = params.id;
  const date = params.date;
  const { data: employeeData } = useFetchSingleEmployee({
    employeeId: id as unknown as number,
  });
  const { data, isLoading, error, isError } = useGetSingleTimeSheet(
    id as unknown as number,
    date as unknown as string
  );

  // console.log(error, isError, undefined);

  return (
    <>
      <AttendanceSubToper active="time-sheet" />
      <AddTimeEntry
        open={addTimeEntryModal}
        handleClose={() => setAddTimeEntryModal(false)}
      />
      <div className="Container">
        <PageIntro
          title="Back to Employee Timesheet"
          link={appRoutes.timeSheet}
        />
        <p className="py-3">
          Welcome on board, here is a detailed list of clocked work hours and
          breaks
        </p>

        <div className="bg-card rounded p-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-3">
          <div className="bg-mainBg rounded-md px-2 py-3 flex justify-center gap-5">
           <div className="flex items-center">
           <div className="h-28 w-28">
              <img
                src={`${
                  employeeData?.avatarUrl
                    ? employeeData?.avatarUrl
                    : placeholderAvatar
                }`}
                alt="user"
                className="h-full w-full rounded-full object-cover object-top"
              />
            </div>
           </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-medium">
                {employeeData?.firstName} {employeeData?.lastName}
              </h3>
              <h3 className="font-medium">{employeeData?.designation.name}</h3>
              <span>
                {employeeData?.role.name} | &nbsp;
                {employeeData?.designation.department.name}
              </span>
              <span>Clocked in from GTM +1</span>
            </div>
          </div>

          <div className="bg-mainBg rounded-md px-2 py-3 flex justify-center gap-2">
            <div className="flex flex-col gap-2  font-medium">
              <h3>
                Tracked Hours: <span className="pl-5">---</span>
              </h3>
              <h3>
                Worked Hours: <span className="pl-5">---</span>
              </h3>
              <h3>
                Break: <span className="pl-5">---</span>
              </h3>
              <h3>Lagos, Kano, Ibadan</h3>
            </div>
          </div>

          <div className="bg-mainBg rounded-md px-2 py-3 flex justify-center gap-2">
            <div className="flex flex-col gap-2  font-medium">
              <h3>
                Payroll Hours: <span className="pl-5">---</span>
              </h3>
              <h3>
                Regular Hours: <span className="pl-5">---</span>
              </h3>
              <h3>
                Time off: <span className="pl-5">---</span>
              </h3>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between my-5">
          <DatePicker />
          <AppButton
            label="Add Time Entry"
            handleClick={() => setAddTimeEntryModal(true)}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <SimpleCard title="Clocked in" highlight="7:20am" />
          <SimpleCard title="Clocked out" highlight="5:00pm" />
          <SimpleCard title="Break" highlight="1hr" />
          <SimpleCard title="Total worked hours" highlight="8hr" />
        </div>
      </div>
    </>
  );
};

export default TimeSheetDetails;
