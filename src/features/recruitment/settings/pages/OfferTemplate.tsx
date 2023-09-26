import { AppButton } from "../../../../components/button/AppButton";
import { appRoutes } from "../../../../config/router/paths";
import { Link } from "react-router-dom";
import { RecruitTemplateVariables } from "../components/RecruitTemplateVariables ";
import { useState } from "react";
import { Dropdown, List, Menu, Popconfirm, Skeleton } from "antd";
import { RecruitmentSettingsIntro } from "../../components/RecruitmentSettingsIntro";
import {
  QUERY_KEY_FOR_OFFER_TEMPLATE,
  useGetOfferTemplate,
} from "../hooks/useGetOfferTemplate";
import { useDeleteRecruitmentItem } from "features/recruitment/hooks/useDeleteRecruitmentItem";
import { QuestionCircleOutlined } from "@ant-design/icons";

const OfferTemplate = () => {
  const { data, isLoading } = useGetOfferTemplate();
  const { removeData } = useDeleteRecruitmentItem({
    queryKey: QUERY_KEY_FOR_OFFER_TEMPLATE,
    deleteEndpointUrl: "settings/offer-templates",
  });
  const [openVariables, setOpenVariables] = useState(false);
  return (
    <>
      <RecruitTemplateVariables
        open={openVariables}
        handleClose={() => setOpenVariables(false)}
      />
      <RecruitmentSettingsIntro
        title="Offer Template"
        description={
          "Offer templates aid in bridging the gap between employee self-onboarding and the application tracking system."
        }
        nextLink={appRoutes.recruitmentJobTemplate}
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
          <Link to={appRoutes.addOfferTemplate}>
            <AppButton
              type="button"
              label="+ Add Email Template"
              variant="transparent"
              additionalClassNames={["py-5 px-8 max-sm:text-xs"]}
            />
          </Link>
        </div>

        <Skeleton loading={isLoading}>
          <div className=" flex-wrap px-3 ">
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
                          Email Subject:
                        </h3>
                        <Link
                          to={appRoutes.offerTemplateDetails(item.id).path}
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
                                  appRoutes.offerTemplateDetails(item.id).path
                                }
                              >
                                View
                              </Link>
                            </Menu.Item>
                            <Menu.Item key="2">
                              <Link
                                to={
                                  appRoutes.offerTemplateDetails(item.id).path
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
        </Skeleton>
      </div>
    </>
  );
};

export default OfferTemplate;
