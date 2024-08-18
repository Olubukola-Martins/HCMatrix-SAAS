import {
  canUserAccessComponent,
  useGetUserPermissions,
} from "components/permission-restriction/PermissionRestrictor";
import { appRoutes } from "config/router/paths";
import { TNavRoute } from "types/navigation-routes";
type TData = {
  navRoutes: TNavRoute[];
};
const useGenrateRecruitmentSettingNavRoutes = (): TData => {
  const { userPermissions, companyActiveSubscription: activeSubscription } =
    useGetUserPermissions();

  return {
    navRoutes: [
      {
        title: "Configure Candidate Status",
        path: appRoutes.recruitmentConfigureCandidateStatus,
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
        title: "Recruitment Channels",
        path: appRoutes.recruitmentRecruitmentChannels,
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
        title: "Email Template",
        path: appRoutes.recruitmentEmailTemplates,
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
        title: "Offer Template",
        path: appRoutes.recruitmentOfferTemplates,
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
        title: "Job Template",
        path: appRoutes.recruitmentJobTemplates,
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
        title: "Other Settings",
        path: appRoutes.recruitmentOtherSettings,
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

export default useGenrateRecruitmentSettingNavRoutes;
