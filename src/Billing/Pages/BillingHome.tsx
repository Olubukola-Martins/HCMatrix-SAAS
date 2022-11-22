import { Tabs } from "antd";
import { PageIntro } from "../../Layout/Components/PageIntro";
import DashboardLayout from "../../Layout/DashboardLayout";
import { Link } from "react-router-dom";
import { IncomingModules } from "../Components/IncomingModules";

const BillingHome = () => {
  return (
    <DashboardLayout>
      <div className="Container mt-5">
        <PageIntro title="Billings" link="/" />
        <Tabs defaultActiveKey="1" className="mt-5">
          <Tabs.TabPane tab="Your Plans" key="1">
            <div className="rounded-md border shadow mt-4 mb-6">
              <h5 className="py-3 px-2 font-medium">Current Module(s)</h5>
              <div className="border-b" />
              <div className="flex justify-between py-7 px-3">
                <div className="flex gap-2">
                  <div className="flex justify-center items-center">
                    <span className="rounded-md h-9 w-9 flex justify-center items-center bg-caramel">
                      <i className="ri-check-double-line text-white text-lg"></i>
                    </span>
                  </div>
                  <div className="font-medium">
                    <span className="block text-sm">Payroll</span>
                    <span className="text-xs">Subscribed since DD/MM/YY</span>
                  </div>
                </div>
                <div>
                  <Link to="/purchase-user-license" className="button">
                    Purchase User License
                  </Link>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-base pb-3">Coming Soon</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
                <IncomingModules
                  title="Recruitment"
                  color="#7987A5"
                  icon="ri-line-chart-line"
                  description={""}
                />
                <IncomingModules
                  title="Performance"
                  color="#A76755"
                  icon="ri-creative-commons-sa-line"
                  description={""}
                />
                <IncomingModules
                  title="Time and 
                  Attendance"
                  color="#FD8311D1"
                  icon="ri-time-line"
                  description={""}
                />
                <IncomingModules
                  title="Learning and
                  Development"
                  color="#6547B8"
                  icon="ri-line-chart-line"
                  description={""}
                />
              </div>
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Billing History" key="2">
            Content of Tab Pane 2
          </Tabs.TabPane>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default BillingHome;
