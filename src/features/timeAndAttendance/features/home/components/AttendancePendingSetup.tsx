import { useGetAttendancePendingSetup } from "../hooks/useGetAttendancePendingSetup";
import { Dropdown } from "antd";
import Themes from "components/Themes";
import { appRoutes } from "config/router/paths";
import ProgressBar from "features/home/components/ProgressBar";
import { Link } from "react-router-dom";

const pendingStyle = `flex items-center justify-center rounded-full text-white p-1 h-4 w-4 min-h-min min-w-min`;
const linkStyle = `text-sm group-hover:text-caramel`;
const linkWrap = `flex items-center gap-2 group`;
export const AttendancePendingSetup = () => {
  const { data, isLoading } = useGetAttendancePendingSetup();
  console.log(data);
  
  return (
    <Dropdown
      overlay={
        <Themes>
          <div className="bg-card px-3 py-[10px] rounded-md flex flex-col gap-[10px]">
            <div className={linkWrap}>
              <div
                className={` ${
                  data?.timeTrackingRules ? "bg-caramel" : "bg-gray-400"
                } ${pendingStyle}`}
              >
                <span className={`block`}>1</span>
              </div>
              <Link
                className={`${
                  data?.timeTrackingRules ? "text-caramel" : ""
                } ${linkStyle}`}
                to={appRoutes.timeTrackingRules}
              >
                Time tracking rules
              </Link>
            </div>

            <div className={linkWrap}>
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
          <ProgressBar width={`${30}`} />
          <span className="text-sm font-light">2/7 complete</span>
        </div>
      </div>
    </Dropdown>
  );
};
