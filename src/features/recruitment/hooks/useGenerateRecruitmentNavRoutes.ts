import {
  canUserAccessComponent,
  useGetUserPermissions,
} from "components/permission-restriction/PermissionRestrictor";
import { appRoutes } from "config/router/paths";
import { TNavRoute } from "types/navigation-routes";
type TData = {
  navRoutes: TNavRoute[];
};
const useGenerateRecruitmentNavRoutes = (): TData => {
  const { userPermissions, companyActiveSubscription: activeSubscription } =
    useGetUserPermissions();

  return {
    navRoutes: [
      {
        title: "Hired Candidate",
        path: appRoutes.recruitmentHiredCandidate,
        hidden: canUserAccessComponent({
          //TODO: this is a -ve(!) for all but done like this since not accounted 4 in subscripton @ the moment
          userPermissions,
          requiredPermissions: [],
          activeSubscription,
          requiredSubscriptionState: {
            label: "recruitment",
            resources: [],
          },
        }),
      },
      {
        title: "Report",
        path: appRoutes.recruitmentReport,
        hidden: canUserAccessComponent({
          userPermissions,
          requiredPermissions: [],
          activeSubscription,
          requiredSubscriptionState: {
            label: "recruitment",
            resources: [],
          },
        }),
      },

      {
        title: "Settings",
        path: appRoutes.recruitmentSettings,
        hidden: canUserAccessComponent({
          userPermissions,
          requiredPermissions: [],
          activeSubscription,
          requiredSubscriptionState: {
            label: "recruitment",
            resources: [],
          },
        }),
      },
    ],
  };
};

export default useGenerateRecruitmentNavRoutes;
