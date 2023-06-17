import { PageIntro } from "components/layout/PageIntro";
import { SubToper } from "../components/SubToper";
import { appRoutes } from "config/router/paths";

export const TimeSheetDetails = () => {
  return (
    <>
      <SubToper />
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
      </div>
    </>
  );
};
