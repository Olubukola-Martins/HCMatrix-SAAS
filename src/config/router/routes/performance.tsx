import { BalanceScorecard } from "features/performance/pages/BalanceScorecard";
import { DegreeEvaluation } from "features/performance/pages/DegreeEvaluation";
import { appRoutes } from "../paths";
import { TRouteData } from "../types";

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
];
