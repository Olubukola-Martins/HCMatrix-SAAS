import { AppButton } from "components/button/AppButton";
import { RecruitmentSettingsIntro } from "../components/RecruitmentSettingsIntro";
import { appRoutes } from "config/router/paths";
import { Dropdown, List, Menu, Select } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const JobTemplate = () => {
  const dataFinanceDep = [
    {
      title: "Accountant",
    },
    {
      title: "Auditor",
    },
    {
      title: "Budget Analyst",
    },
    {
      title: "Head of Finance",
    },
  ];

  const dataAppDep = [
    {
      title: "UI/UX Designer",
    },
    {
      title: "Frontend Developer (JS)",
    },
    {
      title: "Mobile Developer",
    },
    {
      title: "Backend Developer",
    },
  ];

  const [dataSource, setDataSource] = useState(dataAppDep);

  const handleSelectChange = (value: string) => {
    if (value === "Finance Department") {
      setDataSource(dataFinanceDep);
    } else if (value === "Application Department") {
      setDataSource(dataAppDep);
    } else {
      setDataSource(dataAppDep);
    }
  };

  return (
    <>
      <RecruitmentSettingsIntro
        title="Job Template"
        description={
          "Offer templates aid in bridging the gap between employee self-onboarding and the application tracking system."
        }
        nextLink={appRoutes.recruitmentOtherSettings}
      />
      <div className="Container mb-5 mt-8 px-3 flex flex-row flex-wrap-reverse gap-x-[2px] gap-y-2.5 justify-between w-full">
        <Select
          showSearch
          onChange={handleSelectChange}
          placeholder="Select department"
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={[
            {
              value: "Application Department",
              label: "Application Department",
            },
            {
              value: "Finance Department",
              label: "Finance Department",
            },
            {
              value: "CIS Department",
              label: "CIS Department",
            },
          ]}
        />
        <Link to={appRoutes.addJobTemplate} className="button">
          + Add New Template
        </Link>
      </div>

      <div className="Container flex-wrap px-3 ">
        <List
          grid={{
            gutter: 30,
            column: 2,
            xs: 1,
            sm: 2,
          }}
          dataSource={dataSource}
          renderItem={(item, index) => (
            <div>
              <List.Item>
                <div className="justify-between flex flex-row rounded border shadow-sm py-4 px-6">
                  <div className="w-full">
                    <h3 className="text-sm pb-1 text-gray-500">Job Subject:</h3>
                    <Link
                      to="/"
                      className="underline decoration-caramel text-caramel text-lg inline-block w-full overflow-hidden text-ellipsis max-w-full whitespace-nowrap"
                    >
                      {item.title}
                    </Link>
                  </div>
                  <Dropdown
                    trigger={["click"]}
                    overlay={
                      <Menu>
                        <Menu.Item key="1">View </Menu.Item>
                        <Menu.Item key="2">Edit</Menu.Item>
                        <Menu.Item key="3">Delete</Menu.Item>
                      </Menu>
                    }
                  >
                    <i className="ri-more-2-fill text-lg cursor-pointer"></i>
                  </Dropdown>
                </div>
              </List.Item>
            </div>
          )}
        />
      </div>
    </>
  );
};

export default JobTemplate;
