import React, { useState } from "react";
import { BookCompanyTrainingSession } from "../components/trainingSessions/BookCompanyTrainingSession";
import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";
import CompanyTrainingSessionContainer from "../components/trainingSessions/CompanyTrainingSessionContainer";
import { AppButton } from "components/button/AppButton";
import { useGetCompanyActiveSubscription } from "../hooks/company/useGetCompanyActiveSubscription";

const CompanyTrainingSessionManagement = () => {
  const [action, setAction] = useState<"book-training-session">();
  const { isLoading, data: subscription } = useGetCompanyActiveSubscription();
  return (
    <div className="Container space-y-4 lg:space-y-8">
      <BookCompanyTrainingSession
        handleClose={() => setAction(undefined)}
        open={action === "book-training-session"}
      />

      <PageIntro
        title="Training Session"
        link={appRoutes.settings}
        actions={[
          {
            name: "Book Session",
            handleClick: () => setAction("book-training-session"),

            btnVariant: "transparent",
          },
        ]}
      />
      <AppButton
        disabled
        label={subscription?.addOns?.trainingSession?.name}
        isLoading={isLoading}
      />

      <CompanyTrainingSessionContainer />
    </div>
  );
};

export default CompanyTrainingSessionManagement;
