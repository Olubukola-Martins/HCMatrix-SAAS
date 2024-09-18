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
import { formatNumberWithCommas } from "utils/dataHelpers/formatNumberWithCommas";
import {
  canUserAccessComponent,
  useGetUserPermissions,
} from "components/permission-restriction/PermissionRestrictor";
import { useGetPayrollPendingSetup } from "../hooks/payroll/pendingSetup/useGetPayrollPendingSetup";
import ProgressBar from "features/home/components/ProgressBar";
import WalletOverviewDetailsCard from "../components/wallet/overview/cards/WalletOverviewDetailsCard";
import SimpleCardList from "components/cards/SimpleCardList";
import { useRetrievePayrollWallets } from "../hooks/wallet/useRetrievePayrollWallets";
import { useGetPayrollWalletDashboardAnalytics } from "../hooks/wallet/useGetPayrollWalletDashboardAnalytics";
import { CURRENT_YEAR } from "constants/dateFormats";

const outerStyle =
  "group  transition ease-in-out duration-500 cursor-pointer shadow-md col-span-3 md:col-span-1 rounded-xl flex flex-col gap-2 w-full  p-3 bg-card";
const innerStyle =
  "group-hover:shadow-md transition ease-in-out duration-500 bg-mainBg rounded-xl p-2 flex flex-col gap-4 flex-1";

type IPendingItem = {
  content: string;
  done?: boolean;
  link: string;
};

const PayrollHome = () => {
  const [showItems, setShowItems] = useState(false);
  const { data: analytics, isFetching } = useGetPayrollAnalytics();
  const { userPermissions } = useGetUserPermissions();
  const { data: pendingSetup, isLoading: pendingSetupLoading } =
    useGetPayrollPendingSetup();
  const { data: wallets, isLoading: isLoadingWallets } =
    useRetrievePayrollWallets();

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
                highlight: `${formatNumberWithCommas(
                  analytics?.reviewPayroll?.totalPay ?? 0
                )}`,
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

                link: canUserAccessComponent({
                  userPermissions,
                  requiredPermissions: ["view-all-payrolls"],
                })
                  ? appRoutes.listOfPayrolls
                  : undefined,
                content: canUserAccessComponent({
                  userPermissions,
                  requiredPermissions: ["view-all-payrolls"],
                })
                  ? "View the list of payrolls"
                  : `You don't have access to this content!`,
              }}
            />
            <>
              <WalletOverviewDetailsCard
                data={wallets}
                isLoading={isLoadingWallets}
                className="border rounded-md p-4 bg-card shadow-md text-sm"
              />
              <WalletAnalyticsHomeCards />

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
                    <PayrollPendingSetup
                      pendingItems={[
                        {
                          content: "Setup company currency settings",
                          done: pendingSetup?.companyCurrencySettings,
                          link: appRoutes.companyDetailsSettings,
                        },
                        // {
                        //   content: "Setup cost centres",
                        //   done: pendingSetup?.costCentres,
                        //   link: appRoutes.payrollCostCentres,
                        // },
                        {
                          content: "Setup payroll schemes",
                          done: pendingSetup?.payrollSchemes,
                          link: appRoutes.payrollSchemes,
                        },
                        {
                          content: "Configure payroll report templates",
                          done: pendingSetup?.payrollReportTemplates,
                          link: appRoutes.payrollReport,
                        },
                        {
                          content: "Configure payslip templates",
                          done: pendingSetup?.payslipTemplates,
                          link: appRoutes.payslips,
                        },
                        {
                          content: "Setup ITF Authorities",
                          done: pendingSetup?.itfAuthorities,
                          link: appRoutes.itfAuthorities,
                        },
                        {
                          content: "Setup NSITF Authorities",
                          done: pendingSetup?.nsitfAuthorities,
                          link: appRoutes.nsitfAuthorities,
                        },
                        {
                          content: "Setup Pension Authorities",
                          done: pendingSetup?.pensionAdministators,
                          link: appRoutes.pensionAdministrators,
                        },
                        {
                          content: "Setup Tax Authorities",
                          done: pendingSetup?.taxAuthorities,
                          link: appRoutes.taxAuthorities,
                        },
                        {
                          content: "Configure payroll settings",
                          done: pendingSetup?.payrollSettings,
                          link: appRoutes.payrollSettings,
                        },
                        {
                          content: "Add Employees",
                          done: pendingSetup?.employees,
                          link: appRoutes.employeeSettings,
                        },
                      ]}
                      isLoading={pendingSetupLoading}
                      showItems={showItems}
                    />
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
            </>
          </div>
        </Skeleton>
      </div>
    </>
  );
};

const PayrollPendingSetup: React.FC<{
  pendingItems: IPendingItem[];
  showItems: boolean;
  isLoading?: boolean;
}> = ({ showItems, pendingItems, isLoading }) => {
  return (
    <Skeleton loading={isLoading} active paragraph={{ rows: 15 }}>
      <>
        <div className="flex items-center justify-between group-hover:text-caramel">
          <h4 className="font-semibold text-base">
            {pendingItems.length ===
            pendingItems.filter((item) => item.done).length
              ? "Completed Setup"
              : "Pending Setup"}
          </h4>
          <motion.i
            animate={{ rotate: showItems ? 180 : 0 }}
            className="ri-arrow-down-s-line text-xl"
            title="view"
          ></motion.i>
        </div>
        <div className="flex flex-col gap-3">
          <ProgressBar
            width={`${
              (pendingItems.filter((item) => item.done).length /
                pendingItems.length) *
              100
            }%`}
          />
          <span className="text-sm font-light">
            {pendingItems.filter((item) => item.done).length}/
            {pendingItems.length} complete
          </span>
        </div>
        {/* items */}
        <motion.div className="flex flex-col gap-4">
          {showItems &&
            pendingItems
              ?.sort((a, b) => (a.done ? -1 : 1))
              ?.map((item, index) => (
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
                  <Link to={item.link}>
                    <p
                      className={`block ${
                        item.done && "text-caramel"
                      } hover:underline`}
                    >
                      {item.content}
                    </p>
                  </Link>
                </div>
              ))}
        </motion.div>
      </>
    </Skeleton>
  );
};
const WalletAnalyticsHomeCards = () => {
  const { data, isLoading: walletAnalyticsLoading } =
    useGetPayrollWalletDashboardAnalytics({
      type: "area-graph",
      year: CURRENT_YEAR,
    });
  const balance = formatNumberWithCommas(
    Object.values(data?.balance ?? {}).reduce((prev, curr) => prev + curr, 0)
  );
  const credit = formatNumberWithCommas(data?.totalCredit);
  const debit = formatNumberWithCommas(data?.totalDebit);
  return (
    <>
      <SimpleCardList
        className="col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        entries={[
          {
            loading: walletAnalyticsLoading,
            title: "Wallet Balance",
            highlight: balance,
            highlightClassName: "font-bold text-xl mb-2 capitalize",
            className:
              "border rounded-md p-2 shadow-sm bg-card hover:shadow-md cursor-pointer group h-full",
          },
          {
            loading: walletAnalyticsLoading,

            title: "Total Debit",
            highlight: debit,
            highlightClassName: "font-bold text-xl mb-2 capitalize",
            className:
              "border rounded-md p-2 shadow-sm bg-card hover:shadow-md cursor-pointer group h-full",
          },
          {
            loading: walletAnalyticsLoading,

            title: "Total Credit",
            highlight: credit,
            highlightClassName: "font-bold text-xl mb-2 capitalize",
            className:
              "border rounded-md p-2 shadow-sm bg-card hover:shadow-md cursor-pointer group h-full",
          },
        ]}
      />
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
      <Link className={`${outerStyle} `} to={props.link}>
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
      <div className={`${innerStyle} max-h-48`}>
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
        className={`mt-auto flex items-center justify-between group-hover:text-caramel ${
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
