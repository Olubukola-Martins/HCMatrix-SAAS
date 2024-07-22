

import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";
import SelfServiceSubNav from "features/self-service/components/SelfServiceSubNav";
import { useState } from "react";
import { LoanTabsActionProps } from "../types/setting";
import { LoanSettingSide } from "../components/settings/LoanSettingSide";
import { SetUpApprovalProcess } from "../components/settings/SetUpApprovalProcess";
import LoanTypeSetup from "../components/settings/loanTypes/LoanTypeSetup";
import { DisbursementSetUp } from "../components/settings/DisbursementSetUp";
import { EligibilityCriteria } from "../components/settings/EligibilityCriteria";
import { ConfigurePayment } from "../components/settings/repaymentPlans/ConfigurePayment";

const LoanPolicies = () => {
  const [action, setAction] = useState<LoanTabsActionProps>("approval-process");

  return (
    <>
      <SelfServiceSubNav />
      <div className="Container">
        <PageIntro title="Loans Settings" link=""/>
        <p className="text-accent text-sm pt-3">Configure your loan settings</p>

        <div className="grid grid-cols-1 md:grid-cols-4 mt-4 border-t">
          <div className="col-span-1 border-r pt-8">
            <LoanSettingSide setAction={setAction} action={action} />
          </div>
          <div className="col-span-3 pt-8 pb-10 pl-3">
            {action === "approval-process" ? <SetUpApprovalProcess /> : null}
            {action === "loan-types" ? <LoanTypeSetup /> : null}
            {action === "disbursement-setup" ? <DisbursementSetUp /> : null}
            {action === "eligibility-criteria" ? <EligibilityCriteria /> : null}
            {action === "configure-payment" ? <ConfigurePayment /> : null}
            
          </div>
        </div>
      </div>
    </>
  );
};

export default LoanPolicies;
