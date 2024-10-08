import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AutoComplete, Avatar, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import SearchModal from "components/search/SearchModal";
import { AddSisterCompanyForm } from "features/core/company/components/AddSisterCompanyForm";
import { EGlobalOps } from "stateManagers/GlobalContextProvider";
import logo from "../../assets/images/logo2.png";
import { UserNotificationsBadge } from "./UserNotificationsBadge";
import { useApiAuth } from "hooks/useApiAuth";
import UserProfileMenuDropdown from "./UserProfileMenuDropdown";
import {
  canUserAccessComponent,
  useGetUserPermissions,
} from "components/permission-restriction/PermissionRestrictor";
import { appRoutes } from "config/router/paths";
import useMostRecentApiAuth from "hooks/useMostRecentApiAuth";
import { DEFAULT_LOGO_IMAGE_URL } from "constants/general";

const ADD_COMPANY_KEY_VALUE = "";
type TCompanyOption = {
  value: string;
  label: React.ReactNode;
  image?: string;
  id: number;
  hidden: boolean;
};
type TAction = "user-menu" | "add-company" | "search";

interface IProps {
  switchTheme: Function;
  theme: string;
  green: Function;
  yellow: Function;
  orange: Function;
  blue: Function;
  purple: Function;
  sidebarToggle: boolean;
  setSidebarToggle: Function;
}
const TopBar = ({
  switchTheme,
  theme,
  green,
  yellow,
  orange,
  blue,
  purple,
  sidebarToggle,
  setSidebarToggle,
}: IProps) => {
  const { globalDispatch } = useApiAuth();
  const {
    companies: userCompanies,
    currentCompany,
    currentCompanyEmployeeDetails,
  } = useMostRecentApiAuth();
  const { userPermissions, companyActiveSubscription } =
    useGetUserPermissions();

  const [action, setAction] = useState<TAction>();
  const navigate = useNavigate();
  const companies: TCompanyOption[] =
    userCompanies?.map((item) => ({
      value: item.company.name,
      id: item.company.id,
      image: item.company?.logoUrl ?? DEFAULT_LOGO_IMAGE_URL,
      hidden: false,
      label: (
        <div className="flex gap-2 items-center">
          <Avatar src={item.company?.logoUrl ?? DEFAULT_LOGO_IMAGE_URL} />
          <span>{item.company.name}</span>
        </div>
      ),
    })) ?? [];
  const [options, setOptions] = useState<TCompanyOption[]>(companies);

  const onSearch = (searchText: string) => {
    const result = companies.filter(
      (item) =>
        item.value.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
    );
    setOptions(() => result);
  };

  const onSelect = (val: string, data: any) => {
    if (val === ADD_COMPANY_KEY_VALUE) {
      setAction("add-company");
      return;
    }
    globalDispatch({
      type: EGlobalOps.setCurrentCompanyId,
      payload: { id: data.id, name: data.value },
    });
    navigate(appRoutes.home); //this ensures that the user is redirected to home page, because this is the only page that all users have access to regardless of permissions
    window.location.reload();
  };

  return (
    <>
      <AddSisterCompanyForm
        open={action === "add-company"}
        handleClose={() => setAction(undefined)}
      />
      <div className="bg-mainBg w-full py-3 sticky top-0 z-50 text-accent shadow-lg">
        <div className="px-5 lg:px-12 flex items-center justify-between Container">
          <div className="flex items-center gap-3">
            <i
              onClick={() => setSidebarToggle()}
              className="ri-menu-line cursor-pointer"
              style={{ fontSize: 23 }}
            />
            <Link
              to="/"
              className={
                sidebarToggle
                  ? "lg:ml-16 transition-all duration-500 ease-in-out"
                  : "transition-all duration-500 ease-in-out"
              }
            >
              <img src={logo} alt="logo" className="md:h-8 h-7" />
            </Link>
          </div>

          <div className="flex gap-4 items-center">
            <i
              onClick={() => setAction("search")}
              className="fa-solid fa-magnifying-glass lg:hidden cursor-pointer text-base"
            ></i>
            <div className="lg:flex items-center gap-6 hidden">
              <i
                className="fa-solid fa-magnifying-glass cursor-pointer text-base"
                title="Search HcMatrix application"
                onClick={() => setAction("search")}
              ></i>
              <SearchModal
                open={action === "search"}
                handleClose={() => setAction(undefined)}
                userPermissions={userPermissions}
              />
              <div className="flex items-center gap-2">
                <Avatar
                  src={currentCompany?.logoUrl ?? DEFAULT_LOGO_IMAGE_URL}
                />
                <AutoComplete
                  options={[
                    ...options,
                    {
                      value: ADD_COMPANY_KEY_VALUE,
                      id: "",
                      image: "",
                      hidden: !canUserAccessComponent({
                        userPermissions,
                        requiredPermissions: ["create-sister-company"],
                      }),

                      label: (
                        <div className="flex gap-2 items-center">
                          <Button type="text" icon={<PlusOutlined />}>
                            Add Company
                          </Button>
                        </div>
                      ),
                    },
                  ].filter((item) => item?.hidden === false)}
                  defaultValue={currentCompany?.name}
                  style={{ width: 200, borderRadius: "100px" }}
                  onSelect={onSelect}
                  onSearch={onSearch}
                  placeholder="Search Company"
                  className="top-autocomplete-company"
                  size="middle"
                />
              </div>
            </div>

            {/* Dark and Light */}
            {/* {theme === "light" ? (
              <i
                onClick={() => switchTheme()}
                className="fas fa-moon text-lg cursor-pointer text-black"
                title="Dark mode"
              ></i>
            ) : (
              <img
                src={"--"}
                alt="sun"
                onClick={() => switchTheme()}
                className="cursor-pointer h-5"
                title="Light mode"
              />
            )} */}

            {canUserAccessComponent({
              userPermissions,
              requiredPermissions: ["manage-company-settings"],
              activeSubscription: companyActiveSubscription,
              requiredSubscriptionState: {
                label: "employee-management",
                resources: [],
              },
            }) && (
              <Link to={appRoutes.settings} className={"hover:text-black"}>
                <i
                  className="ri-settings-3-line text-xl cursor-pointer hover:text-black"
                  title="Settings"
                ></i>
              </Link>
            )}

            <UserNotificationsBadge />

            <UserProfileMenuDropdown
              colorFns={{
                green,
                yellow,
                orange,
                blue,
                purple,
              }}
              avatarUrl={currentCompanyEmployeeDetails?.avatarUrl}
              onOpenChange={(val) => setAction(val ? "user-menu" : undefined)}
              open={action === "user-menu"}
              userPermissions={userPermissions}
              activeSubscription={companyActiveSubscription}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default TopBar;
