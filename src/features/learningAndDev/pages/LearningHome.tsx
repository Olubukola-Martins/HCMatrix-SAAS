import { LeaningNavbar } from "../components/LeaningNavbar";
import { SimpleCard } from "components/cards/SimpleCard";
import udemyLogo from "../assets/imgaes/udemyLogo.svg";
import { Link } from "react-router-dom";
import { Tabs } from "antd";
import { LeaningMonthCard } from "../components/LeaningMonthCard";
import { TrackProgressCard } from "../components/TrackProgressCard";
import { TrainingCard } from "../components/TrainingCard";
import { appRoutes } from "config/router/paths";

export const LearningHome = () => {
  return (
    <>
      <LeaningNavbar active="none-active" />

      <div className="Container">
        <div>
          <h2 className="font-medium text-lg pb-2">Good morning Esther</h2>
          <p>
            Welcome on board, here is a breakdown summary of all employee
            Learning and Development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 my-3">
          <SimpleCard title="Total Employee" highlight="0" />
          <SimpleCard title="Total Number of Trainings" highlight="0" />
          <SimpleCard title="Training Enrollment" highlight="0" />
          <div className="border rounded-md p-2 shadow-sm bg-card hover:shadow-md cursor-pointer group">
            <div
              className={`rounded-md bg-mainBg shadow px-3 py-6 group-hover:border-b-2 group-hover:border-caramel flex flex-col`}
            >
              <>
                <div>
                  <img src={udemyLogo} alt="udemy" />
                </div>
                <Link
                  to={appRoutes.udemy}
                  className="font-medium text-sm text-right text-caramel pt-3 underline"
                >
                  View Report
                </Link>
              </>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-6 gap-5">
          <div className="col-span-4">
            <LeaningMonthCard />
          </div>
          <div className="lg:col-span-2 col-span-6">
            <TrackProgressCard />
          </div>

          <div className="col-span-4 bg-mainBg shadow border rounded-lg p-3">
            <h3 className="text-base">Gamification?</h3>

            <Tabs
              defaultActiveKey="1"
              items={[
                {
                  key: "1",
                  label: "Badges",
                  children: (
                    <>
                      <h4>No One is Currently on Leave</h4>
                    </>
                  ),
                },
                {
                  key: "2",
                  label: "Points",
                  children: (
                    <>
                      <h4>No Point</h4>
                    </>
                  ),
                },
              ]}
            />
          </div>
          <div className="lg:col-span-2 col-span-6">
            <TrainingCard />
          </div>
        </div>
      </div>
    </>
  );
};
