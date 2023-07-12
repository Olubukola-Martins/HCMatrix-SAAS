import { PageIntro } from "components/layout/PageIntro";
import { AttendanceSubToper } from "../components/AttendanceSubToper";
import { appRoutes } from "config/router/paths";
import { SimpleCard } from "components/cards/SimpleCard";
import { AppButton } from "components/button/AppButton";
import { DatePicker } from "antd";
import { useState } from "react";
import { AddTimeEntry } from "../components/AddTimeEntry/AddTimeEntry";

export const TimeSheetDetails = () => {
  const [addTimeEntryModal, setAddTimeEntryModal] = useState(false);

  return (
    <>
      <AttendanceSubToper active="time-sheet"/>
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
          <div className="bg-mainBg rounded-md px-2 py-3 flex justify-center gap-3">
            <div>
              <img
                src="https://res.cloudinary.com/ddvaelej7/image/upload/v1657714689/samples/personal-info_vgptbq.png"
                alt="user"
                className="h-28"
              />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-medium">Godswill Omenuko</h3>
              <h3 className="font-medium">Frontend Developer</h3>
              <span>Manager | App Dev</span>
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
