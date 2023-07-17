import { PageIntro } from "components/layout/PageIntro";
import { LeaningNavbar } from "../components/LeaningNavbar";
import { appRoutes } from "config/router/paths";
import { Tabs } from "antd";
import { Link } from "react-router-dom";
import { AppButton } from "components/button/AppButton";
import { OptionalTraining } from "../components/trainings/OptionalTraining";
import { MandatoryTraining } from "../components/trainings/MandatoryTraining";

export const Training = () => {
  return (
    <>
      <LeaningNavbar active="training" />
      <div className="Container">
        <div className="flex items-center justify-between">
          <PageIntro title="Training" link={appRoutes.leaningHome} />
          <div className="flex items-center gap-4">
            <Link
              to={appRoutes.paidTraining}
              className="text-caramel font-medium text-base hover:text-accent"
            >
              Paid Training
            </Link>
            <AppButton variant="transparent" label="Bulk Upload" />
            <AppButton label="Add Training" />
          </div>
        </div>

        <Tabs
          defaultActiveKey="1"
          className="mt-2"
          items={[
            {
              key: "1",
              label: "Mandatory Trainings",
              children: (
                <>
                  <MandatoryTraining />
                </>
              ),
            },
            {
              key: "2",
              label: "Optional Trainings",
              children: (
                <>
                  <OptionalTraining />
                </>
              ),
            },
          ]}
        />
      </div>
    </>
  );
};
