import SelfServiceSubNav from "features/self-service/components/SelfServiceSubNav";
import LoanOverview from "../components/LoanOverview";
import EmployeeLoanRequests from "../components/EmployeeLoanRequests";
import AllLoanRequests from "../components/AllLoanRequests";
import LoanApprovalsContainer from "../components/LoanApprovalsContainer";
import { useState } from "react";
import { Tabs } from "antd";
import { PageIntro } from "components/layout/PageIntro";
import PageSubHeader from "components/layout/PageSubHeader";
import { appRoutes } from "config/router/paths";
import { useNavigate } from "react-router-dom";
import { NewLoan } from "../components/NewLoan";
import EmployeeLoanRepayments from "../components/repayments/EmployeeLoanRepayments";
import AllLoanRepayments from "../components/repayments/AllLoanRepayments";

export type TLoanTabKey =
  | "Overview"
  | "My Requests"
  | "Approvals"
  | "My Repayments"
  | "All Repayments"
  | "All Loans";
type TAction = "new-loan";
const LoanHome = () => {
  const [key, setKey] = useState<TLoanTabKey>("Overview");
  const handleTabKey = (val: TLoanTabKey) => {
    setKey(val);
  };
  const tabItems: {
    label: TLoanTabKey;
    key: TLoanTabKey;
    children: React.ReactNode;
  }[] = [
    {
      label: "Overview",
      children: <LoanOverview handleTabKey={handleTabKey} />,
      key: "Overview",
    },
    {
      label: "My Requests",
      children: <EmployeeLoanRequests />,
      key: "My Requests",
    },
    {
      label: "My Repayments",
      children: <EmployeeLoanRepayments />,
      key: "My Repayments",
    },

    {
      label: "Approvals",
      children: <LoanApprovalsContainer />,
      key: "Approvals",
    },
    {
      label: "All Loans",
      children: <AllLoanRequests />,
      key: "All Loans",
    },
    {
      label: "All Repayments",
      children: <AllLoanRepayments />,
      key: "All Repayments",
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
                },
                {
                  name: "Settings",
                  handleClick: () => navigate(appRoutes.loanPolicies),
                  btnVariant: "transparent",
                },
              ]}
            />
          </div>
          <Tabs
            activeKey={key}
            onChange={(val) => setKey(val as unknown as TLoanTabKey)}
            items={tabItems}
          />
        </div>
      </div>
    </>
  );
};

export default LoanHome;
