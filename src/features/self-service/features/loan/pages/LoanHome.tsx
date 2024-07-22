import SelfServiceSubNav from "features/self-service/components/SelfServiceSubNav";
import LoanOverview from "../components/LoanOverview";
import EmployeeLoanRequests from "../components/EmployeeLoanRequest/EmployeeLoanRequests";
import { useState } from "react";
import { Tabs } from "antd";
import { PageIntro } from "components/layout/PageIntro";
import PageSubHeader from "components/layout/PageSubHeader";
import { appRoutes } from "config/router/paths";
import { useNavigate } from "react-router-dom";
import { NewLoan } from "../components/NewLoan";
import EmployeeLoanRepayments from "../components/EmployeeLoanPayment/EmployeeLoanRepayments";
import { MakeRepayment } from "../components/make_payment/MakeRepayment";
import {
  canUserAccessComponent,
  useGetUserPermissions,
} from "components/permission-restriction/PermissionRestrictor";
import EmployeeLoanApprovals from "../components/EmployeeApprovals/EmployeeLoanApprovals";
import AllLoanRequests from "../components/AllLoans/AllLoanRequests";

export type TLoanTabKey =
  | "Overview"
  | "My Requests"
  | "My Approvals"
  | "My Repayments"
  | "All Repayments"
  | "All Loans";
type TAction = "new-loan" | "make-repayment";

const LoanHome = () => {
  const { userPermissions } = useGetUserPermissions();
  const [key, setKey] = useState<TLoanTabKey>("Overview");
  const handleTabKey = (val: TLoanTabKey) => {
    setKey(val);
  };
  const tabItems: {
    label: TLoanTabKey;
    key: TLoanTabKey;
    children: React.ReactNode;
    hidden: boolean;
  }[] = [
    {
      label: "Overview",
      children: <LoanOverview handleTabKey={handleTabKey} />,
      key: "Overview",
      hidden: !canUserAccessComponent({
        userPermissions,
        requiredPermissions: ["view-all-loan-requests"], //TODO: update to an overview permission if there is ever a need for it
      }),
    },
    {
      label: "My Requests",
      children: <EmployeeLoanRequests />,
      key: "My Requests",
      hidden: false,
    },
    {
      label: "My Repayments",
      children: <EmployeeLoanRepayments />,
      key: "My Repayments",
      hidden: false,
    },

    {
      label: "My Approvals",
      children: <EmployeeLoanApprovals />,
      key: "My Approvals",
      hidden: false,
    },
    {
      label: "All Loans",
      children: <AllLoanRequests />,
      key: "All Loans",
      hidden: !canUserAccessComponent({
        userPermissions,
        requiredPermissions: ["view-all-loan-requests"],
      }),
    },
    {
      label: "All Repayments",
      children: <div/>,
      key: "All Repayments",
      hidden: !canUserAccessComponent({
        userPermissions,
        requiredPermissions: ["view-all-loan-repayments"],
      }),
    },
  ];
  const [action, setAction] = useState<TAction>();
  const navigate = useNavigate();

  return (
    <>
      <NewLoan
        open={action === "new-loan"}
        handleClose={() => setAction(undefined)}
      />
      <MakeRepayment
        open={action === "make-repayment"}
        handleClose={() => setAction(undefined)}
      />
      <SelfServiceSubNav />

      <div className="Container">
        <div className="flex flex-col gap-6">
          <div>
            <PageIntro title="Loans" link={appRoutes.selfServiceHome} />
            <PageSubHeader
              hideBackground
              description={`You can now set loan policies and make loan requests`}
              actions={[
                {
                  name: "New Loan",
                  handleClick: () => setAction("new-loan"),
                  btnVariant: "style-with-class",
                  additionalClassNames: ["neutralButton"],
                },
                {
                  name: "Make Repayment",
                  handleClick: () => setAction("make-repayment"),
                },
                {
                  name: "Settings",
                  handleClick: () => navigate(appRoutes.loanPolicies),
                  btnVariant: "transparent",
                  hidden: !canUserAccessComponent({
                    userPermissions,
                    requiredPermissions: ["manage-loan-settings"],
                  }),
                },
              ]}
            />
          </div>
          <Tabs
            activeKey={key}
            onChange={(val) => setKey(val as unknown as TLoanTabKey)}
            items={tabItems.filter((item) => item.hidden === false)}
          />
        </div>
      </div>
    </>
  );
};

export default LoanHome;
