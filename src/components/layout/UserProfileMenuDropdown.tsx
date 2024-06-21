import { Avatar, Dropdown } from "antd";
import Themes from "components/Themes";
import { canUserAccessComponent } from "components/permission-restriction/PermissionRestrictor";
import ThemeSwitcher from "components/theme/ThemeSwitcher";
import TransferOwnership from "components/transferOwnership/TransferOwnership";
import { Setup2FA } from "components/twoFactorAuth/SetUp2FA";
import { appRoutes } from "config/router/paths";
import { DEFAULT_PROFILE_IMAGE_URL } from "constants/general";
import { TCompanySubscription } from "features/billing/types/company/companySubscription";
import { getEmployeeFullName } from "features/core/employees/utils/getEmployeeFullName";
import { TPermissionLabel } from "features/core/roles-and-permissions/types";
import { useApiAuth } from "hooks/useApiAuth";
import React, { useState } from "react";
import { useSignOut } from "react-auth-kit";
import { Link, useNavigate } from "react-router-dom";

const UserProfileMenu: React.FC<{
  userPermissions: TPermissionLabel[];
  activeSubscription?: TCompanySubscription;

  closeMenu: () => void;
}> = ({ closeMenu, userPermissions, activeSubscription }) => {
  const { currentCompanyEmployeeDetails: employee } = useApiAuth();
  const signOut = useSignOut();
  const navigate = useNavigate();
  const handleLogOut = () => {
    signOut();
    localStorage.clear();
    navigate(appRoutes.login);
  };
  return (
    <div className="rounded-md py-5 px-5 text-center bg-card shadow-md">
      <div className="border-b-2 border-slate-600 pb-4">
        <h4 className="font-extrabold text-lg">
          {getEmployeeFullName(employee)}
        </h4>
        <span className="block text-xs pb-5 pt-1 text-gray-500">
          {employee?.email}
        </span>
        <Link
          to={appRoutes.userProfileSettings}
          className="font-semibold border border-red-500 rounded bg-red-500 text-white transition ease-in-out duration-300 text-sm py-2 px-3 tracking-wider hover:opacity-70"
        >
          My Profile
        </Link>
      </div>

      <UserActions
        userPermissions={userPermissions}
        closeMenu={closeMenu}
        isOwner={!!employee?.isOwner}
        activeSubscription={activeSubscription}
      />
      <ThemeSwitcher />
      <div
        onClick={handleLogOut}
        className="flex items-center gap-2 mt-7 cursor-pointer font-medium text-gray-500 group"
      >
        <i className="ri-logout-box-r-line group-hover:text-caramel"></i>
        <span className="group-hover:text-caramel">Logout</span>
      </div>
    </div>
  );
};

const UserActions: React.FC<{
  isOwner: boolean;
  userPermissions: TPermissionLabel[];
  closeMenu: () => void;
  activeSubscription?: TCompanySubscription;
}> = ({ userPermissions, closeMenu, isOwner, activeSubscription }) => {
  type TAction = "transfer-ownership" | "setup-2fa";
  const [action, setAction] = useState<TAction>();
  const clearAction = () => {
    setAction(undefined);
  };

  const USER_ACTIONS: {
    onClick?: () => void;
    text: string;
    url?: string;
    hidden: boolean;
    isLink: boolean;
  }[] = [
    {
      onClick: () => setAction("transfer-ownership"),
      text: "Transfer Ownership",
      hidden: !canUserAccessComponent({
        userPermissions,
        requiredPermissions: ["transfer-company-ownership"],
        activeSubscription,
        requiredSubscriptionState: {
          label: "employee-management",
          resources: [],
        },
      }),
      isLink: false,
    },
    {
      url: appRoutes.delegationSettings,
      text: "Delegations",
      hidden: !canUserAccessComponent({
        userPermissions,
        requiredPermissions: ["create-delegations", "view-all-delegations"],
        activeSubscription,
        requiredSubscriptionState: {
          label: "employee-management",
          resources: [],
        },
      }),
      isLink: true,
    },

    {
      text: "Enable 2FA",
      onClick: () => setAction("setup-2fa"),
      hidden: !canUserAccessComponent({
        userPermissions,
        requiredPermissions: [],
        activeSubscription,
        requiredSubscriptionState: {
          label: "employee-management",
          resources: [],
        },
      }),
      isLink: false,
    },

    {
      url: appRoutes.billingSubscription,
      text: "Subscriptions",
      hidden:
        isOwner === false &&
        !canUserAccessComponent({
          userPermissions,
          requiredPermissions: [],
          activeSubscription,
          requiredSubscriptionState: {
            label: "employee-management",
            resources: [],
          },
        }),
      isLink: true,
    },
    {
      url: appRoutes.billingSummary,
      text: "Billing",
      hidden:
        isOwner === false &&
        !canUserAccessComponent({
          userPermissions,
          requiredPermissions: [],
          activeSubscription,
          requiredSubscriptionState: {
            label: "employee-management",
            resources: [],
          },
        }),

      isLink: true,
    },
    {
      url: appRoutes.purchaseUserLicense,
      text: "Manage User License",
      hidden:
        isOwner === false &&
        !canUserAccessComponent({
          userPermissions,
          requiredPermissions: [],
          activeSubscription,
          requiredSubscriptionState: {
            label: "employee-management",
            resources: [],
          },
        }),

      isLink: true,
    },
    {
      url: appRoutes.billingStorageManagement,
      text: "Storage",
      hidden:
        isOwner === false &&
        !canUserAccessComponent({
          userPermissions,
          requiredPermissions: [],
          activeSubscription,
          requiredSubscriptionState: {
            label: "employee-management",
            resources: [],
          },
        }),
      isLink: true,
    },
    {
      url: appRoutes.billingTrainingSession,
      text: "Training Session",
      hidden:
        isOwner === false &&
        !canUserAccessComponent({
          userPermissions,
          requiredPermissions: [],
          activeSubscription,
          requiredSubscriptionState: {
            label: "employee-management",
            resources: [],
          },
        }),

      isLink: true,
    },
    {
      text: "Change Language",
      hidden: true,
      isLink: false,
    },
  ];

  return (
    <>
      <Setup2FA open={action === "setup-2fa"} handleClose={clearAction} />
      <TransferOwnership
        open={action === "transfer-ownership"}
        handleClose={() => clearAction()}
      />
      <div className="flex flex-col gap-2 pt-2 text-accent font-medium text-sm">
        {USER_ACTIONS.map((item, i) => (
          <div
            key={i}
            className={
              item.hidden
                ? "hidden"
                : "border-b-2 pb-2 w-full cursor-pointer hover:text-caramel"
            }
          >
            {item.isLink && item.url ? (
              <Link to={item.url} onClick={() => closeMenu()}>
                {item.text}
              </Link>
            ) : (
              <div
                onClick={() => {
                  item?.onClick?.();
                  closeMenu();
                }}
              >
                {item.text}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

const UserProfileMenuDropdown: React.FC<{
  onOpenChange: (val: boolean) => void;
  userPermissions: TPermissionLabel[];
  activeSubscription?: TCompanySubscription;

  open: boolean;
  avatarUrl?: string;
}> = ({
  open,
  onOpenChange,
  avatarUrl,
  userPermissions,
  activeSubscription,
}) => {
  return (
    <Dropdown
      overlay={
        <Themes>
          <UserProfileMenu
            closeMenu={() => onOpenChange(false)}
            userPermissions={userPermissions}
            activeSubscription={activeSubscription}
          />
        </Themes>
      }
      trigger={["click"]}
      open={open}
      onOpenChange={onOpenChange}
    >
      <Avatar
        src={avatarUrl ?? DEFAULT_PROFILE_IMAGE_URL}
        alt=""
        className="h-6 md:h-9 cursor-pointer border-2 border-slate-300 rounded-full ml-1"
        onClick={() => onOpenChange(true)}
      />
    </Dropdown>
  );
};

export default UserProfileMenuDropdown;
