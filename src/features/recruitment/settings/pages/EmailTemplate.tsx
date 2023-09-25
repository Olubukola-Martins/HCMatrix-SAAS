import { useState } from "react";
import { RecruitTemplateVariables } from "../components/RecruitTemplateVariables ";
import { RecruitmentSettingsIntro } from "../../components/RecruitmentSettingsIntro";
import { appRoutes } from "config/router/paths";
import { Dropdown, List, Menu, Popconfirm, Skeleton } from "antd";
import { Link } from "react-router-dom";
import { AppButton } from "components/button/AppButton";
import {
  QUERY_KEY_FOR_EMAIL_TEMPLATE,
  useGetEmailTemplate,
} from "../hooks/useGetEmailTemplate";
import { useDeleteRecruitmentItem } from "features/recruitment/hooks/useDeleteRecruitmentItem";
import { QuestionCircleOutlined } from "@ant-design/icons";

const EmailTemplate = () => {
  const { data, isLoading } = useGetEmailTemplate();

  const { removeData } = useDeleteRecruitmentItem({
    queryKey: QUERY_KEY_FOR_EMAIL_TEMPLATE,
    deleteEndpointUrl: "email-templates",
  });
  const [openVariables, setOpenVariables] = useState(false);

  return (
    <>
      <RecruitTemplateVariables
        open={openVariables}
        handleClose={() => setOpenVariables(false)}
      />
      <RecruitmentSettingsIntro
        title="Email Template"
        description={
          "Customize email templates to send to candidates on your ATS."
        }
        nextLink={appRoutes.recruitmentOfferTemplate}
      />

      <div className="Container">
        <div className=" mb-5 mt-8 px-3 flex flex-row w-full">
          <AppButton
            handleClick={() => setOpenVariables(true)}
            type="button"
            label="View variables"
            variant="transparent"
            additionalClassNames={[
              "border-none hover:no-underline underline decoration-inherit underline-offset-4",
            ]}
          />
          <Link to={appRoutes.addEmailTemplate}>
            <AppButton
              type="button"
              label="+ Add Email Template"
              variant="transparent"
              additionalClassNames={["py-5 px-8 max-sm:text-xs"]}
            />
          </Link>
        </div>

        {/*  email template */}
        <Skeleton loading={isLoading} active>
          <div className=" flex-wrap px-3 ">
            <div>
              <List
                grid={{
                  gutter: 30,
                  column: 2,
                  xs: 1,
                  sm: 2,
                }}
                dataSource={data?.map((item) => ({
                  title: item.name,
                  id: item.id,
                }))}
                renderItem={(item) => (
                  <div>
                    <List.Item>
                      <div className="justify-between flex flex-row rounded border shadow-sm py-4 px-6">
                        <div className="w-full">
                          <h3 className="text-sm pb-1 text-gray-500">
                            Template Name:
                          </h3>
                          <Link
                            to={appRoutes.emailTemplateDetails(item.id).path}
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
                                  to={
                                    appRoutes.emailTemplateDetails(item.id).path
                                  }
                                >
                                  View
                                </Link>
                              </Menu.Item>
                              <Menu.Item key="2">
                                <Link
                                  to={
                                    appRoutes.emailTemplateDetails(item.id).path
                                  }
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
          </div>
        </Skeleton>
      </div>
    </>
  );
};

export default EmailTemplate;
