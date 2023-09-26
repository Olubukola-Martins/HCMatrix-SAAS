import React from "react";
import { PageIntro } from "components/layout/PageIntro";
import PayrollSubNav from "../components/PayrollSubNav";
import { appRoutes } from "config/router/paths";
import { PayrollReviewContainer } from "../components/payrollReviews/PayrollReviewContainer";

const PayrollReview = () => {
  return (
    <>
      <PayrollSubNav />
      <div className="Container">
        <PageIntro title="Payroll Review" link={appRoutes.payrollHome} />
        <PayrollReviewContainer />
      </div>
    </>
  );
};

export default PayrollReview;
