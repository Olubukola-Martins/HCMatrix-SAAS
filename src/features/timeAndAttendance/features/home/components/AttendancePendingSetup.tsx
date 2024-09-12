import { useGetAttendancePendingSetup } from "../hooks/useGetAttendancePendingSetup";
import { Dropdown } from "antd";
import Themes from "components/Themes";
import ProgressBar from "features/home/components/ProgressBar";
import { Link } from "react-router-dom";
import { createPendingSetupLinks } from "../utils";

const pendingStyle = `flex items-center justify-center rounded-full text-white p-1 h-4 w-4 min-h-min min-w-min`;
const linkStyle = `text-sm group-hover:text-caramel capitalize`;
const linkWrap = `flex items-center gap-2 group`;
export const AttendancePendingSetup = () => {
  const { data } = useGetAttendancePendingSetup();
  const totalNumberOfItems = Object.values(data || {}).length;
  const totalNumberOfCompletedItems = Object.values(data || {}).filter(
    (value) => value === true
  ).length;
  const completedPercentage =
    (totalNumberOfCompletedItems / totalNumberOfItems) * 100;

  return (
    <Dropdown
      overlay={
        <Themes>
          <div className="bg-card px-3 py-[10px] rounded-md flex flex-col gap-[10px]">
            {Object.entries(data || {}).map(([key, value], i) => (
              <div className={linkWrap}>
                <div
                  className={` ${
                    value ? "bg-caramel" : "bg-gray-400"
                  } ${pendingStyle}`}
                >
                  <span className={`block`}>{i + 1}</span>
                </div>
                <Link
                  className={`${value ? "text-caramel" : ""} ${linkStyle}`}
                  to={createPendingSetupLinks(key)}
                >
                  {key}
                </Link>
              </div>
            ))}

            {/* <div className={linkWrap}>
              <div
                className={` ${
                  data?.workSchedule ? "bg-caramel" : "bg-gray-400"
                } ${pendingStyle}`}
              >
                <span className={`block`}>2</span>
              </div>
              <Link
                className={`${
                  data?.workSchedule ? "text-caramel" : ""
                } ${linkStyle}`}
                to={appRoutes.workSchedule}
              >
                Work schedule
              </Link>
            </div>

            <div className={linkWrap}>
              <div
                className={` ${
                  data?.timeOffPolicy ? "bg-caramel" : "bg-gray-400"
                } ${pendingStyle}`}
              >
                <span className={`block`}>3</span>
              </div>
              <Link
                className={`${
                  data?.timeOffPolicy ? "text-caramel" : ""
                } ${linkStyle}`}
                to={appRoutes.timeOffPolicy}
              >
                Time off policy
              </Link>
            </div>

            <div className={linkWrap}>
              <div
                className={` ${
                  data?.break ? "bg-caramel" : "bg-gray-400"
                } ${pendingStyle}`}
              >
                <span className={`block`}>4</span>
              </div>
              <Link
                className={`${data?.break ? "text-caramel" : ""} ${linkStyle}`}
                to={appRoutes.breakSetUp}
              >
                Set up break
              </Link>
            </div>

            <div className={linkWrap}>
              <div
                className={` ${
                  data?.locations ? "bg-caramel" : "bg-gray-400"
                } ${pendingStyle}`}
              >
                <span className={`block`}>5</span>
              </div>
              <Link
                className={`${
                  data?.locations ? "text-caramel" : ""
                } ${linkStyle}`}
                to={appRoutes.location}
              >
                Work location
              </Link>
            </div>

            <div className={linkWrap}>
              <div
                className={` ${
                  data?.others ? "bg-caramel" : "bg-gray-400"
                } ${pendingStyle}`}
              >
                <span className={`block`}>6</span>
              </div>
              <Link
                className={`${data?.others ? "text-caramel" : ""} ${linkStyle}`}
                to={appRoutes.otherSettings}
              >
                Other settings
              </Link>
            </div>

            <div className={linkWrap}>
              <div
                className={` ${
                  data?.biometrics ? "bg-caramel" : "bg-gray-400"
                } ${pendingStyle}`}
              >
                <span className={`block`}>7</span>
              </div>
              <Link
                className={`${
                  data?.biometrics ? "text-caramel" : ""
                } ${linkStyle}`}
                to={appRoutes.biometrics}
              >
                Biometrics
              </Link>
            </div>
            <div className={linkWrap}>
              <div
                className={` ${
                  data?.scheduleEmployeeShift ? "bg-caramel" : "bg-gray-400"
                } ${pendingStyle}`}
              >
                <span className={`block`}>8</span>
              </div>
              <Link
                className={`${
                  data?.scheduleEmployeeShift ? "text-caramel" : ""
                } ${linkStyle}`}
                to={appRoutes.workSchedule}
              >
                Schedule Employee shift
              </Link>
            </div> */}
          </div>
        </Themes>
      }
      trigger={["click"]}
    >
      <div className="border rounded-md py-2 px-3 shadow-sm bg-card hover:shadow-md cursor-pointer group">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-sm">Pending Setup</h3>
          <i className="ri-arrow-down-s-line text-xl"></i>
        </div>

        <div className="flex flex-col gap-3">
          <ProgressBar width={`${completedPercentage}%`} />
          <span className="text-sm font-light">
            {totalNumberOfCompletedItems}/{totalNumberOfItems} complete
          </span>
        </div>
      </div>
    </Dropdown>
  );
};
