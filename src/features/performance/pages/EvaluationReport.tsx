import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";

export const EvaluationReport = () => {
  return (
    <div className="Container">
      <PageIntro
        title="Evaluation Report"
        link={appRoutes.evaluationDetails(1).path}
      />

      <div className="bg-card flex items-center justify-between px-2 md:px-6 rounded font-medium my-4 py-2 text-base">
        <h4>Ruth Godwin - 001</h4>
        <div className="flex items-center gap-3">
          <h4>Weight of Perspective</h4>
          <button className="text-yellow-500 rounded-3xl p-2 bg-yellow-100 font-bold">
            100%
          </button>
        </div>
      </div>
    </div>
  );
};
