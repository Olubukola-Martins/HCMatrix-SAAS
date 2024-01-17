import SelfServiceSubNav from "features/self-service/components/SelfServiceSubNav";
import { useParams } from "react-router-dom";
import { useFetchSingleOnboarding } from "../hooks/useFetchSingleOnboarding";
import SingleOnboardingContainer from "../components/singleOnboarding/SingleOnboardingContainer";
import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";
import { ErrorWrapper } from "components/errorHandlers/ErrorWrapper";

const StartOnboarding = () => {
  const { id } = useParams();
  const { data, isFetching, isError } = useFetchSingleOnboarding({
    id: +(id as unknown as string),
  });

  return (
    <>
      <SelfServiceSubNav />

      <div className="Container">
        <PageIntro title="Start Onboarding" link={appRoutes.onboarding} />
        <ErrorWrapper
          isError={isError}
          message="Onboarding does not exist!"
          backLink={appRoutes.onboarding}
        >
          <SingleOnboardingContainer data={data} loading={isFetching} />
        </ErrorWrapper>
      </div>
    </>
  );
};

export default StartOnboarding;
