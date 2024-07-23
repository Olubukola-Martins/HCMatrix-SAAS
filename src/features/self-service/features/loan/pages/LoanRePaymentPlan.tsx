import { SimpleCard } from "components/cards/SimpleCard";
import { PageIntro } from "components/layout/PageIntro";
import { BackgroundCurves } from "features/self-service/components/BackgroundCurves";
import SelfServiceSubNav from "features/self-service/components/SelfServiceSubNav";

const LoanRePaymentPlan = () => {
  return (
    <div>
      <SelfServiceSubNav />
      <div className="relative">
        <BackgroundCurves />
        <div className="absolute top-4 Container mt-8 w-full">
          <PageIntro link={true} title="Repayment Plan" />
          <div className="grid grid-cols-1 md:grid-cols-4 mt-7">
            <SimpleCard
              title="Loan Amount"
              highlight={`${0 ?? 0}`}
              loading={false}
            />
            <SimpleCard
              title="Paid Amount"
              highlight={`${0 ?? 0}`}
              loading={false}
            />
            <SimpleCard
              title="Pending Amount"
              highlight={`${0 ?? 0}`}
              loading={false}
            />
            <SimpleCard
              title="Next Payment Date"
              highlight={`20/03/2024`}
              loading={false}
            />
          </div>
        </div>

        {/* Table */}
        
      </div>
    </div>
  );
};

export default LoanRePaymentPlan;
