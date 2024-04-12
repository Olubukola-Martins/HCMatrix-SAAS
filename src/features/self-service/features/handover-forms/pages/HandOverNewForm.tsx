import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";
import SelfServiceSubNav from "features/self-service/components/SelfServiceSubNav";
import EmployeeHandOverContainer from "../components/EmployeeHandOverContainer";
import { useGetAuthExitHandOverForm } from "../hooks/useGetAuthExitHandOverForm";

export const HandOverNewForm = () => {
  const { data, isLoading } = useGetAuthExitHandOverForm();
  return (
    <>
      <SelfServiceSubNav />
      <div className="Container">
        <PageIntro
          title="Exit Hand over Form"
          link={appRoutes.selfServiceHome}
        />

        <EmployeeHandOverContainer handover={data} isLoading={isLoading} />
      </div>
    </>
  );
};
