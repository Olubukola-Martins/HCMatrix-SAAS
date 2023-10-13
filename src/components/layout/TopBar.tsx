import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AutoComplete, Avatar, Badge, Button, Dropdown } from "antd";
import { useAuthUser } from "react-auth-kit";
import { PlusOutlined } from "@ant-design/icons";
import Themes from "components/Themes";
import SearchModal from "components/search/SearchModal";
import { DEFAULT_PROFILE_IMAGE_URL } from "constants/general";
import { IAuthDets } from "features/authentication/types";
import { AddSisterCompanyForm } from "features/core/company/components/AddSisterCompanyForm";
import { useFetchSingleEmployee } from "features/core/employees/hooks/useFetchSingleEmployee";
import { GlobalContext, EGlobalOps } from "stateManagers/GlobalContextProvider";
import logo from "../../assets/images/logo2.png";
import UserProfileMenu from "./UserProfileMenu";
import { UserNotificationsBadge } from "./UserNotificationsBadge";

type TCompany = {
  value: string;
  label: React.ReactNode;
  image?: string;
  id: string;
};

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
  const auth = useAuthUser();
  const authDetails = auth() as unknown as IAuthDets;

  const user = authDetails?.user;

  const globalCtx = useContext(GlobalContext);
  const { state: globalState, dispatch: globalDispatch } = globalCtx;

  const currentCompanyId = globalState.currentCompany?.id as unknown as string;
  const currentCompany = authDetails?.companies.find(
    (item) => item.companyId === +currentCompanyId
  );
  // done to make changes to user employee profile real-time

  const employeeId = currentCompany?.id as number;
  const { data: employee } = useFetchSingleEmployee({
    employeeId: employeeId,
  });
  const avatarUrl = employee?.avatarUrl;
  // done to make changes to user employee profile real-time

  console.log(authDetails?.companies, "TEST");

  const defaultCompanies = authDetails?.companies.map((item: any) => ({
    value: item.company.name,
    id: item.company.id,
    image: item.company?.logoUrl ?? "https://picsum.photos/190",

    label: (
      <div className="flex gap-2 items-center">
        <Avatar src={item.company?.logoUrl ?? "https://picsum.photos/190"} />
        <span>{item.company.name}</span>
      </div>
    ),
  }));

  const companies: TCompany[] = authDetails?.companies
    ? [
        ...defaultCompanies,
        {
          value: "",
          id: "",
          image: "",

          label: (
            <div className="flex gap-2 items-center">
              <Button type="text" icon={<PlusOutlined />}>
                Add Company
              </Button>
            </div>
          ),
        },
      ]
    : [];
  type TAction = "user-menu";
  const [action, setAction] = useState<TAction>();
  const [options, setOptions] = useState<TCompany[]>(companies);
  const [addCompanyModal, setAddCompanyModal] = useState(false);

  const [openSearchModal, setOpenSearchModal] = useState(false);

  const onSearch = (searchText: string) => {
    const result = companies.filter(
      (item) =>
        item.value.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
    );
    setOptions(() => result);
  };

  const onSelect = (val: string, data: any) => {
    if (val === "") {
      setAddCompanyModal(true);
      return;
    }
    globalDispatch({
      type: EGlobalOps.setCurrentCompanyId,
      payload: { id: data.id, name: data.value },
    });
    window.location.reload();
  };

  return (
    <>
      <AddSisterCompanyForm
        open={addCompanyModal}
        handleClose={() => setAddCompanyModal(false)}
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
              onClick={() => setOpenSearchModal(true)}
              className="fa-solid fa-magnifying-glass lg:hidden cursor-pointer text-base"
            ></i>
            <div className="lg:flex items-center gap-6 hidden">
              <i
                className="fa-solid fa-magnifying-glass cursor-pointer text-base"
                title="Search HcMatrix application"
                onClick={() => setOpenSearchModal(true)}
              ></i>
              <SearchModal
                open={openSearchModal}
                handleClose={() => setOpenSearchModal(false)}
              />
              {user?.isOwner && (
                <div className="flex items-center gap-2">
                  <Avatar
                    src={
                      companies.find(
                        (item) => item.id === globalState.currentCompany?.id
                      )?.image
                    }
                  />
                  <AutoComplete
                    options={options}
                    defaultValue={globalState.currentCompany?.name}
                    style={{ width: 200, borderRadius: "100px" }}
                    onSelect={onSelect}
                    onSearch={onSearch}
                    placeholder="Search Company"
                    className="top-autocomplete-company"
                    size="middle"
                  />
                </div>
              )}
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
                src={sun}
                alt="sun"
                onClick={() => switchTheme()}
                className="cursor-pointer h-5"
                title="Light mode"
              />
            )} */}

            <Link
              to="/settings"
              className={user?.isOwner ? "hover:text-black" : "hidden"}
            >
              <i
                className="ri-settings-3-line text-xl cursor-pointer hover:text-black"
                title="Settings"
              ></i>
            </Link>

            <UserNotificationsBadge />

            <Dropdown
              overlay={
                <Themes>
                  <UserProfileMenu
                    colorFns={{
                      green,
                      yellow,
                      orange,
                      blue,
                      purple,
                    }}
                    closeMenu={() => setAction(undefined)}
                  />
                </Themes>
              }
              trigger={["click"]}
              open={action === "user-menu"}
              onOpenChange={(val) =>
                val ? setAction("user-menu") : setAction(undefined)
              }
            >
              <Avatar
                src={!!avatarUrl ? avatarUrl : DEFAULT_PROFILE_IMAGE_URL}
                alt=""
                className="h-6 md:h-9 cursor-pointer border-2 border-slate-300 rounded-full ml-1"
                onClick={() => setAction("user-menu")}
              />
            </Dropdown>
          </div>
        </div>
      </div>

      {/* User profile dropdown*/}
    </>
  );
};

export default TopBar;
