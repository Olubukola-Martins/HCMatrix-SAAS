import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";
import SelfServiceSubNav from "features/self-service/components/SelfServiceSubNav";
import { OnboardingContainer } from "../components/OnboardingContainer";
import ErrorBoundary from "components/errorHandlers/ErrorBoundary";
import { useNavigate } from "react-router-dom";

const TasksPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <SelfServiceSubNav />

      <div className="Container ">
        <PageIntro title="Onboarding" link={appRoutes.selfServiceHome} />
        <ErrorBoundary
          message="Oops! Something went wrong"
          action={() => navigate(appRoutes.selfServiceHome)}
        >
          <OnboardingContainer />
        </ErrorBoundary>
      </div>
    </>
  );
};

export default TasksPage;
