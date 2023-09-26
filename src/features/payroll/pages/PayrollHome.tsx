import React, { useState } from "react";
import PayrollCycle from "../assets/images/payrollCycle.svg";
import Group from "../assets/images/group.svg";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import PayrollSubNav from "../components/PayrollSubNav";
import { appRoutes } from "config/router/paths";
import { CreatePayrollButton } from "../components/payrollCreations/CreatePayrollButton";
import PayrollOverviewChart from "../components/graphs/PayrollOverviewChart";
import { useGetPayrollAnalytics } from "../hooks/payroll/analytics/useGetPayrollAnalytics";
import { Badge, Skeleton } from "antd";

const outerStyle =
  "group  transition ease-in-out duration-500 cursor-pointer shadow-md col-span-3 md:col-span-1 rounded-xl flex flex-col gap-2 w-full  p-3 bg-card";
const innerStyle =
  "group-hover:shadow-md transition ease-in-out duration-500 bg-mainBg rounded-xl p-2 flex flex-col gap-4 flex-1";

const PayrollHome = () => {
  const pendingItems = [
    { content: "Complete company profile", done: true },
    { content: "Create cost center/branch", done: true },
    { content: "Add Employees", done: true },
    { content: "Create paygrades", done: true },
    { content: "Create groups", done: false },
    { content: "Create/Select Approval Workflow  ", done: false },
    { content: "Set-up Salary Type/ scheme ", done: false },
    { content: "Create Attendance/Time Track Team", done: false },
    { content: "Create/Select Department", done: false },
    { content: "Select	Payroll Frequency", done: false },
    { content: "Create Wallet", done: false },
    { content: "Run Payroll", done: false },
  ];

  const [showItems, setShowItems] = useState(false);
  const { data: analytics, isFetching } = useGetPayrollAnalytics();

  return (
    <>
      <PayrollSubNav />
      <div className="text-accent Container">
        <div className="flex justify-between items-center mb-6">
          <span className="font-bold text-xl">Payroll</span>
          <div className="flex gap-4">
            <CreatePayrollButton />
          </div>
        </div>

        <Skeleton active loading={isFetching} paragraph={{ rows: 12 }}>
          <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-x-4 gap-y-12 w-full ">
            {/* <PayrollCard
            {...{
              image: DollarBox,
              title: "Payroll Burden",
              highlight: "N0.00",
            }}
          /> */}
            <PayrollCard
              key={1}
              {...{
                image: (
                  <Badge
                    size="small"
                    count={analytics?.reviewPayroll?.totalCount}
                    overflowCount={9}
                  >
                    <i
                      className="ri-notification-3-fill text-sm text-white cursor-pointer"
                      title="Notifications"
                    ></i>
                  </Badge>
                ),
                title: "Review Payroll",
                highlight: `${analytics?.reviewPayroll?.totalPay}`,
                content: "Click here to review payroll",
                link: appRoutes.payrollReview,
              }}
            />
            <PayrollCard
              key={2}
              {...{
                image: Group,
                title: "Employees",
                highlight: `${analytics?.employeeCount}`,

                link: appRoutes.employeeSettings,
              }}
            />
            <PayrollCard
              key={3}
              {...{
                image: PayrollCycle,
                title: "Payroll Cycle",
                highlight: "",
                link: appRoutes.listOfPayrolls,
                content: "View the list of payrolls",
              }}
            />

            <AnimatePresence exitBeforeEnter>
              {/* pending set up */}

              <motion.div
                layout
                transition={{
                  layout: {
                    duration: showItems ? 0.5 : 0.1,
                    ease: showItems ? "easeOut" : "easeIn",
                  },
                }}
                className={`cursor-pointer relative z-10 ${
                  showItems && "row-span-3"
                } shadow-md hgrouphover:border-caramel col-span-3 lg:col-span-1 rounded-xl flex flex-col gap-2 w-full  p-3 bg-card`}
                onClick={() => setShowItems((val) => !val)}
              >
                <div className="rounded-xl p-2 flex flex-col gap-8">
                  <div className="flex items-center justify-between group-hover:text-caramel">
                    <h4 className="font-semibold text-base">Pending Setup</h4>
                    <motion.i
                      animate={{ rotate: showItems ? 180 : 0 }}
                      className="ri-arrow-down-s-line text-xl"
                      title="view"
                    ></motion.i>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="setUp_progress2 general_setup">
                      <div className="setUp_progress-bar2" />
                    </div>
                    <span className="text-sm font-light">3/10 complete</span>
                  </div>
                  {/* items */}
                  <motion.div className="flex flex-col gap-4">
                    {showItems &&
                      pendingItems.map((item, index) => (
                        <div
                          className="flex gap-4 items-center text-xs"
                          key={item.content}
                        >
                          <div
                            className={`min-h-min min-w-min ${
                              item.done ? "bg-caramel" : "bg-gray-400"
                            } flex items-center justify-center  rounded-full text-white p-1 h-4 w-4`}
                          >
                            <span className={`block`}>{index + 1}</span>
                          </div>
                          <p className={`block ${item.done && "text-caramel"}`}>
                            {item.content}
                          </p>
                        </div>
                      ))}
                  </motion.div>
                </div>
              </motion.div>
              {/* <PayrollCard
              {...{
                image: Group,
                title: "Payroll History",
                highlight: "May 2022",
                content: "Compared to N0.00 last month",
              }}
            /> */}

              {/* Payroll graph & charts  */}
              <motion.div
                layout
                transition={{
                  layout: {
                    duration: showItems ? 0.1 : 0.5,
                    ease: showItems ? "easeIn" : "easeOut",
                  },
                }}
                className={`flex flex-col gap-4 w-full ${
                  showItems
                    ? "lg:col-span-3 col-span-3"
                    : "lg:col-span-4 col-span-3"
                }`}
              >
                {/* the chart goes here */}
                <PayrollOverviewChart />
              </motion.div>
            </AnimatePresence>
          </div>
        </Skeleton>
      </div>
    </>
  );
};

interface IPayrollCardProps {
  link?: string;
  title: string;
  highlight: string;
  content?: string;
  image: string | React.ReactNode;
}

const PayrollCard: React.FC<IPayrollCardProps> = (props) => {
  if (props.link) {
    return (
      <Link className={`${outerStyle}`} to={props.link}>
        <PayrollCardContent {...props} />
      </Link>
    );
  }
  return (
    <div className={`${outerStyle} cursor-text`}>
      <PayrollCardContent {...props} />
    </div>
  );
};
const PayrollCardContent: React.FC<IPayrollCardProps> = ({
  link,
  title,
  highlight,
  content,
  image,
}) => {
  return (
    <>
      <div className={`${innerStyle}`}>
        <div className="flex items-center gap-2">
          <div className="bg-caramel p-2 flex justify-center items-center rounded-full min-h-min min-w-min">
            {typeof image === "string" ? (
              <img src={image} alt="bg" className="h-6 w-6" />
            ) : (
              <div className="h-6 w-6">{image}</div>
            )}
          </div>{" "}
          <h4 className="font-light text-sm">{title}</h4>
        </div>
        <span className="block font-bold text-xl">{highlight}</span>
        <span className="block text-xs">{content}</span>
      </div>
      <div
        className={`flex items-center justify-between group-hover:text-caramel ${
          link ? "" : "invisible"
        }`}
      >
        <span className="text-sm">View</span>
        <i className="ri-arrow-right-s-line text-xl" title="view"></i>
      </div>
    </>
  );
};

export default PayrollHome;
