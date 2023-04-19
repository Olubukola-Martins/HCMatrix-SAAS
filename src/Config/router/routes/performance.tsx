import { BalanceScorecard } from "features/performance/pages/BalanceScorecard";
import { appRoutes } from "../paths";
import { TRouteData } from "../types";

export const performanceRoutes: TRouteData[] = [
  {
    element: <BalanceScorecard/>,
    path: appRoutes.balanceScorecard,
    isSearchable: true,
    title: "Balance scorecard",
  },
];
