import { BalanceScorecard } from "features/performance/pages/BalanceScorecard";
import { DegreeEvaluation } from "features/performance/pages/DegreeEvaluation";
import { appRoutes } from "../paths";
import { TRouteData } from "../types";
import { EvaluationDetails } from "features/performance/pages/EvaluationDetails";
import { EvaluationReport } from "features/performance/pages/EvaluationReport";

export const performanceRoutes: TRouteData[] = [
  {
    element: <BalanceScorecard />,
    path: appRoutes.balanceScorecard,
    isSearchable: true,
    title: "Balance scorecard",
  },
  {
    element: <DegreeEvaluation />,
    path: appRoutes.degreeEvaluation,
    isSearchable: true,
    title: "360 degree evaluation",
  },
  {
    element: <EvaluationDetails />,
    path: appRoutes.evaluationDetails().format,
    isSearchable: false,
  },
  {
    element: <EvaluationReport />,
    path: appRoutes.evaluationReport().format,
    isSearchable: false,
  },
];
