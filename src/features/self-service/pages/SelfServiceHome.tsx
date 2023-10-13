import loan from "../assets/images/loan.svg";
import leave from "../assets/images/leave.svg";
import health from "../assets/images/health.svg";
import payslip from "../assets/images/payslip.svg";
import attendance from "../assets/images/attendance.svg";
import vehicle from "../assets/images/vehicle.svg";
import requisition from "../assets/images/requisition.svg";
import Onboarding from "../assets/images/Onboarding.svg";
import { Link } from "react-router-dom";
import { Dropdown } from "antd";
import Themes from "components/Themes";
import SelfBox, { RequisitionBox, MoreBox } from "../components/SelfBox";
import { appRoutes } from "config/router/paths";

const SelfServiceHome: React.FC = () => {
  const requestStyle =
    "flex items-center justify-between cursor-pointer group border-b pb-2";

  return (
    <>
      <div className="relative mb-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="relative right-0 left-0 top-0 -mt-7"
        >
          <path
            fill="var(--card)"
            fillOpacity="1"
            d="M0,160L20,165.3C40,171,80,181,120,165.3C160,149,200,107,240,122.7C280,139,320,213,360,224C400,235,440,181,480,160C520,139,560,149,600,181.3C640,213,680,267,720,266.7C760,267,800,213,840,176C880,139,920,117,960,122.7C1000,128,1040,160,1080,176C1120,192,1160,192,1200,197.3C1240,203,1280,213,1320,234.7C1360,256,1400,288,1420,304L1440,320L1440,0L1420,0C1400,0,1360,0,1320,0C1280,0,1240,0,1200,0C1160,0,1120,0,1080,0C1040,0,1000,0,960,0C920,0,880,0,840,0C800,0,760,0,720,0C680,0,640,0,600,0C560,0,520,0,480,0C440,0,400,0,360,0C320,0,280,0,240,0C200,0,160,0,120,0C80,0,40,0,20,0L0,0Z"
          ></path>
        </svg>

        <div className="absolute top-4 Container mt-8">
          <h2 className="font-extrabold text-xl md:text-2xl text-accent">
            Self Service
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6 mb-10">
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5 col-span-3">
              <SelfBox
                title="Onboarding"
                icon={Onboarding}
                link={appRoutes.onboarding}
                desc="You can now access and manage onboarding"
              />
              <SelfBox
                title="Loan"
                icon={loan}
                link={appRoutes.loans}
                desc="You can apply and manage loan requests"
              />
              <SelfBox
                title="Leave"
                icon={leave}
                link={appRoutes.leaveHome}
                desc="You can apply and manage leave requests"
              />
              <SelfBox
                title="Health access"
                icon={health}
                link={appRoutes.healthAccessHome}
              />
              {/* TODO: Refactor all routes to use appRoutes */}
              <SelfBox
                title="My Payslip"
                icon={payslip}
                link={appRoutes.payslipTransactions}
                desc="You can view your payslips and transactions"
              />
              <SelfBox
                title="Hand-over Forms"
                icon={attendance}
                link={appRoutes.newHandOverForm}
                desc="You can now access and manage employee resignations"
              />
              <SelfBox
                title="Vehicle booking"
                icon={vehicle}
                link="/self-service/vehicle-booking"
              />
              <RequisitionBox icon={requisition} />
              <MoreBox />
            </div>
            <div>
              <div className="rounded-lg bg-mainBg border py-5 px-3 shadow">
                <p className="text-sm pb-5 font-medium">Total Company Assets</p>
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg">10</h3>
                  <Link
                    to="/self-service/assets"
                    className="text-caramel underline cursor-pointer text-sm"
                  >
                    View {">"}
                  </Link>
                </div>
              </div>

              <div className="bg-mainBg border mt-4 rounded-lg text-sm shadow">
                <div className="flex items-center justify-between px-3 py-3 border-b">
                  <p className="font-medium">Recent Requests </p>
                  <span className="text-xs">Status</span>
                </div>
                <div className="flex flex-col gap-3 px-3 py-2">
                  {Array(4)
                    .fill(0)
                    .map((item, i) => (
                      <div className={requestStyle} key={i}>
                        <div>
                          <h5 className="group-hover:text-caramel font-medium">
                            Asset Request
                          </h5>
                          <span className="text-xs">HP EliteBook</span>
                        </div>
                        <Dropdown
                          trigger={["click"]}
                          overlay={
                            <Themes>
                              <div className="py-3 px-4 text-sm font-medium rounded-md flex flex-col gap-2 shadow-md">
                                <span className="cursor-pointer hover:text-caramel">
                                  Accept
                                </span>
                                <span className="cursor-pointer hover:text-caramel py-1">
                                  Reject
                                </span>
                                <span className="cursor-pointer hover:text-caramel">
                                  View
                                </span>
                              </div>
                            </Themes>
                          }
                        >
                          <i className="ri-more-fill text-lg"></i>
                        </Dropdown>
                      </div>
                    ))}
                </div>
                <h2 className="text-caramel text-center text-base font-semibold cursor-pointer hover:text-accent pb-2 pt-1">
                  See All
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SelfServiceHome;
