import { Select, List, Dropdown, Menu, Skeleton, Popconfirm } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AppButton } from "../../../../components/button/AppButton";
import { appRoutes } from "../../../../config/router/paths";
import { RecruitmentSettingsIntro } from "../../components/RecruitmentSettingsIntro";
import {
  QUERY_KEY_FOR_JOB_TEMPLATE,
  useGetJobTemplate,
} from "../hooks/useGetJobTemplate";
import { useDeleteRecruitmentItem } from "features/recruitment/hooks/useDeleteRecruitmentItem";
import { QuestionCircleOutlined } from "@ant-design/icons";

const JobTemplate = () => {
  const { data, isLoading } = useGetJobTemplate();
  const { removeData } = useDeleteRecruitmentItem({
    deleteEndpointUrl: "job-templates",
    queryKey: QUERY_KEY_FOR_JOB_TEMPLATE,
  });
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
      <div className="Container">
        <div className="mb-5 mt-8 px-3 flex flex-row flex-wrap-reverse gap-x-[2px] gap-y-2.5 justify-between w-full">
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
                value: "CSI Department",
                label: "CSI Department",
              },
            ]}
          ></Select>
          <Link to={appRoutes.addJobTemplate}>
            <AppButton
              type="button"
              label="+ Add Email Template"
              variant="transparent"
              additionalClassNames={["py-5 px-8 max-sm:text-xs"]}
            />
          </Link>
        </div>
        <Skeleton active loading={isLoading}>
          <div className=" flex-wrap px-3 ">
            <List
              grid={{
                gutter: 30,
                column: 2,
                xs: 1,
                sm: 2,
              }}
              dataSource={data?.map((item) => ({
                title: item.title,
                id: item.id,
              }))}
              renderItem={(item) => (
                <div>
                  <List.Item>
                    <div className="justify-between flex flex-row rounded border shadow-sm py-4 px-6">
                      <div className="w-full">
                        <h3 className="text-sm pb-1 text-gray-500">
                          Job Subject:
                        </h3>
                        <Link
                          to={appRoutes.jobTemplateDetails(item.id).path}
                          className="underline decoration-caramel text-caramel text-lg inline-block w-full overflow-hidden text-ellipsis max-w-full whitespace-nowrap"
                        >
                          {item.title}
                        </Link>
                      </div>
                      <Dropdown
                        trigger={["click"]}
                        overlay={
                          <Menu>
                            <Menu.Item key="1">
                              <Link
                                to={appRoutes.jobTemplateDetails(item.id).path}
                              >
                                View
                              </Link>
                            </Menu.Item>
                            <Menu.Item key="2">
                              <Link
                                to={appRoutes.jobTemplateDetails(item.id).path}
                              >
                                Edit
                              </Link>
                            </Menu.Item>
                            <Menu.Item key="3">
                              <Popconfirm
                                title={`Are you sure to delete ${item.title}?`}
                                icon={
                                  <QuestionCircleOutlined
                                    style={{ color: "red" }}
                                  />
                                }
                                okText="Yes"
                                cancelText="No"
                                onConfirm={() => removeData(item.id)}
                              >
                                Delete
                              </Popconfirm>
                            </Menu.Item>
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
        </Skeleton>
      </div>
    </>
  );
};

export default JobTemplate;
