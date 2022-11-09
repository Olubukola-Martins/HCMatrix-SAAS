import { Tabs } from "antd";
import { PageIntro } from "../../../../Layout/Components/PageIntro";
import DashboardLayout from "../../../../Layout/DashboardLayout";
import { Profile } from "../../../Components/Organization/EmployeeProfiles/MyProfile/Profile";

export const MyProfile = () => {
  return (
    <DashboardLayout>
      <div className="Container mt-3">
        <PageIntro title="Profile" link="/" />

        <div className="bg-card p-5 mt-5">
          <div className="bg-mainBg shadow-sm rounded-md p-4 flex gap-3 justify-between">
            <div className="flex gap-3 items-center">
              <img
                src="https://res.cloudinary.com/ddvaelej7/image/upload/v1639659955/HCmatrix/User-Icon_wdkmsf.png"
                alt="user"
                className="h-24"
              />
              <div className="flex flex-col gap-1">
                <h3 className="text-lg font-medium">Isaac Temi</h3>
                <h4 className="font-medium">UI Designer | CSI</h4>
                <h5 className="text-sm">Manager</h5>
                <div className="text-sm flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <i className="ri-mail-line text-caramel"></i>
                    <span>isaactemi@gmail.com | </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="ri-phone-line text-caramel"></i>
                    <span> 09023865543 | </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="ri-map-pin-line text-caramel"></i>
                    <span>1B Ayobami Shonuga </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-3 text-xl">
              <i className="ri-pencil-line cursor-pointer hover:text-caramel"></i>
              <i className="ri-more-2-fill cursor-pointer hover:text-caramel"></i>
            </div>
          </div>
          <Tabs defaultActiveKey="1" className="mt-5 tabBlackActive">
            <Tabs.TabPane tab="Profile" key="1">
              <Profile />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Tab 2" key="2">
              Content of Tab Pane 2
            </Tabs.TabPane>
            <Tabs.TabPane tab="Tab 3" key="3">
              Content of Tab Pane 3
            </Tabs.TabPane>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  );
};
