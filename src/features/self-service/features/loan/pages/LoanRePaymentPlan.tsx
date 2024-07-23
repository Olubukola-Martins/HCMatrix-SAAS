import { SimpleCard } from "components/cards/SimpleCard";
import { PageIntro } from "components/layout/PageIntro";
import { TableWithFocusType } from "components/table";
import { BackgroundCurves } from "features/self-service/components/BackgroundCurves";
import SelfServiceSubNav from "features/self-service/components/SelfServiceSubNav";
import { REPAYMENT_PLAN_TABLE_COLUMNS } from "../components/repayments/columns/repaymentPlanColumn";

const LoanRePaymentPlan = () => {
  const columns = REPAYMENT_PLAN_TABLE_COLUMNS();

  return (
    <div>
      <SelfServiceSubNav />
      <div className="relative mb-20">
        <BackgroundCurves />
        <div className="absolute top-4 Container mt-8 w-full">
          <PageIntro link={true} title="Repayment Plan" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 my-7">
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
          <div className="flex items-center gap-x-5">
            <div className="flex items-center gap-3">
              <h4 className="font-medium">Repayment dates remaining</h4>
              <div className="border p-3 h-7 flex items-center rounded">
                <span>50</span>
              </div>
            </div>

            <i className="ri-download-2-fill text-xl cursor-pointer"></i>
          </div>
          <TableWithFocusType
            columns={columns}
            dataSource={[]}
            // loading={isLoading}
            // pagination={{ ...pagination, total: data?.total }}
            // onChange={onChange}
            scroll={{ x: 500 }}
          />
        </div>
      </div>
    </div>
  );
};

export default LoanRePaymentPlan;
