import TransferOwnership from "components/transferOwnership/TransferOwnership";
import { Setup2FA } from "components/twoFactorAuth/SetUp2FA";
import { useGetCompanyParams } from "features/core/company/hooks/useGetCompanyParams";
import { useSetup2FA } from "features/core/employees/hooks/twoFactorAuth/useSetup2FA";
import { getEmployeeFullName } from "features/core/employees/utils/getEmployeeFullName";
import { useApiAuth } from "hooks/useApiAuth";
import React, { useState } from "react";
import { useSignOut } from "react-auth-kit";
import { Link } from "react-router-dom";

const UserProfileMenu: React.FC<{
  colorFns: {
    green: Function;
    yellow: Function;
    orange: Function;
    blue: Function;
    purple: Function;
  };
  closeMenu: () => void;
}> = ({ colorFns, closeMenu }) => {
  const { currentCompanyEmployeeDetails: employee, authUserData } =
    useApiAuth();
  const signOut = useSignOut();
  const handleLogOut = () => {
    signOut();
    localStorage.clear();
    window.location.reload();
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
          to="/settings/profile"
          className="font-semibold border border-red-500 rounded bg-red-500 text-white transition ease-in-out duration-300 text-sm py-2 px-3 tracking-wider hover:opacity-70"
        >
          My Profile
        </Link>
      </div>

      <UserActions isOwner={authUserData.isOwner} closeMenu={closeMenu} />
      <ThemeChanger colorFns={colorFns} />
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

const UserActions: React.FC<{ isOwner?: boolean; closeMenu: () => void }> = ({
  isOwner,
  closeMenu,
}) => {
  type TAction = "transfer-ownership" | "setup-2fa";
  const [action, setAction] = useState<TAction>();
  const { data: companyParams } = useGetCompanyParams();
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
      hidden: isOwner === false,
      isLink: false,
    },
    {
      url: "/settings/delegations",
      text: "Delegate Role",
      hidden: isOwner === false,
      isLink: true,
    },
    {
      text: "Advanced Settings",
      hidden: isOwner === false,
      isLink: false,
    },
    {
      text: "Enable 2FA",
      onClick: () => setAction("setup-2fa"),
      hidden: false,
      isLink: false,
    },
    {
      url: "/billings",
      text: "Billings",
      hidden: isOwner === false,
      isLink: true,
    },
    {
      text: "Change Language",
      hidden: isOwner === false,
      isLink: false,
    },
  ];

  return (
    <>
      <Setup2FA open={action === "setup-2fa"} handleClose={clearAction} />
      {companyParams && (
        <TransferOwnership
          open={action === "transfer-ownership"}
          handleClose={() => clearAction()}
          companyParams={companyParams}
        />
      )}
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
const ThemeChanger: React.FC<{
  colorFns: {
    green: Function;
    yellow: Function;
    orange: Function;
    blue: Function;
    purple: Function;
  };
}> = ({ colorFns }) => {
  const { green, yellow, orange, blue, purple } = colorFns;

  return (
    <>
      {" "}
      <h5 className="font-bold text-left text-sm pb-3 pt-4">Change Theme</h5>
      <div className="flex items-center gap-4 px-2 rounded">
        <div
          className="h-4 w-4 rounded-full cursor-pointer"
          style={{ background: "#ff6647" }}
          onClick={() => yellow()}
        />
        <div
          className="h-4 w-4 rounded-full cursor-pointer"
          style={{ background: "#01966b" }}
          onClick={() => green()}
        />
        <div
          className="h-4 w-4 rounded-full cursor-pointer"
          style={{ background: "#d69a00" }}
          onClick={() => orange()}
        />
        <div
          className="h-4 w-4 rounded-full cursor-pointer"
          style={{ background: "#349CE4" }}
          onClick={() => blue()}
        />
        <div
          className="h-4 w-4 rounded-full cursor-pointer"
          style={{ background: "#6E55FF" }}
          onClick={() => purple()}
        />
      </div>
    </>
  );
};

export default UserProfileMenu;
