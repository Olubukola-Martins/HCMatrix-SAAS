import { PageIntro } from "components/layout/PageIntro";
import { AttendanceSubToper } from "../../../components/AttendanceSubToper";
import { appRoutes } from "config/router/paths";
import { SimpleCard } from "components/cards/SimpleCard";
import { useParams } from "react-router-dom";
import { useGetSingleTimeSheet } from "../hooks/useGetSingleTimeSheet";
import { useFetchSingleEmployee } from "features/core/employees/hooks/useFetchSingleEmployee";
import { convertMinutesToHours } from "features/timeAndAttendance/utils";
import { useGetFormattedDate } from "hooks/useGetFormattedDate";
import { Skeleton } from "antd";
import { DailySwitchActivityTable } from "../components/DailySwitchActivityTable";

const placeholderAvatar = "https://picsum.photos/193";

const TimeSheetDetails = () => {
  const params = useParams();
  const id = params.id;
  const date = params.date;
  const { data: employeeData, isLoading: loadEmployee } =
    useFetchSingleEmployee({
      employeeId: id as unknown as number,
    });
  const { data, isLoading } = useGetSingleTimeSheet(
    id as unknown as number,
    date as unknown as string
  );
  const { formattedDate } = useGetFormattedDate();

  return (
    <>
      <AttendanceSubToper active="time-sheet" />

      {isLoading && loadEmployee ? (
        <div className="Container">
          <Skeleton active className="w-full" paragraph={{ rows: 12 }} />
        </div>
      ) : (
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
                <h3 className="font-medium">
                  {employeeData?.designation.department.name}
                </h3>
                <span>{employeeData?.role.name}</span>
                <h3 className="font-medium">
                  {employeeData?.designation.name}
                </h3>
              </div>
            </div>

            <div className="bg-mainBg rounded-md px-3 py-3 flex justify-center gap-2">
              <div className="flex flex-col gap-2  font-medium">
                <h3>
                  Tracked hours:{" "}
                  <span className="pl-5">
                    {convertMinutesToHours(data?.totalTimeTracked || 0)}
                  </span>
                </h3>
                <h3>
                  Expected work hours:
                  <span className="pl-5">
                    {convertMinutesToHours(data?.expectedWorkingHours || 0)}hrs
                  </span>
                </h3>
                <h3>
                  Pay extra hours:
                  <span className="pl-5">
                    {data?.attendance.clockOut.payExtraHours ? "Yes" : "No"}
                  </span>
                </h3>
              </div>
            </div>

            <div className="bg-mainBg rounded-md px-2 py-3 flex justify-center gap-2">
              <div className="flex flex-col gap-2  font-medium">
                <h3>
                  Clocked-in From: <span className="pl-5">---</span>
                </h3>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between my-5">
            <button className="border cursor-text border-slate-500 rounded px-2 py-[5px] flex items-center gap-2">
              <span>{formattedDate}</span>
              <i className="ri-calendar-line"></i>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <SimpleCard
              title="Clocked in"
              highlight={data?.attendance?.clockIn?.time}
            />
            <SimpleCard
              title="Clocked out"
              highlight={data?.attendance?.clockOut?.time}
            />
            <SimpleCard
              title="Break"
              highlight={convertMinutesToHours(data?.totalBreakUsage || 0)}
            />
            <SimpleCard
              title="Total worked hours"
              highlight={convertMinutesToHours(data?.totalTimeTracked || 0)}
            />
            <SimpleCard
              title="Extra worked hours"
              highlight={convertMinutesToHours(data?.extraWorkedHours || 0)}
            />
          </div>

          <div className="bg-card rounded px-3 py-4 mt-6 mb-10">
            <h3 className="font-semibold pb-2 text-[16px]">
              Clock Out Comment:
            </h3>
            <p className="text-sm">
              {`${data?.attendance?.clockOut?.comment}` || `....`}
            </p>
          </div>
          <DailySwitchActivityTable
            isLoading={isLoading}
            data={data ? data?.attendance?.activities : []}
          />
        </div>
      )}
    </>
  );
};

export default TimeSheetDetails;
