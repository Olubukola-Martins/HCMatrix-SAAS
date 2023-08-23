import { useState } from "react";
import { RecruitTemplateVariables } from "../components/RecruitTemplateVariables ";
import { RecruitmentSettingsIntro } from "../components/RecruitmentSettingsIntro";
import { appRoutes } from "config/router/paths";
import { Dropdown, List, Menu } from "antd";
import { Link } from "react-router-dom";
import { AppButton } from "components/button/AppButton";

const EmailTemplate = () => {
  const dataSource = [
    { title: "Invitation to In-Person Interview" },
    { title: "Regret to Inform -Aplicant" },
    { title: "Regret to Inform -Interviewed" },
  ];
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
      <div className="Container mb-5 mt-8 px-3 flex flex-row w-full">
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

      <div className="Container flex-wrap px-3 ">
        <h2 className="my-6">
          This email template will automatically be sent to applicants when they
          submit an application.
        </h2>
        <div>
          <List
            grid={{
              gutter: 30,
              column: 2,
              xs: 1,
              sm: 2,
            }}
            dataSource={[1]}
            renderItem={(item, index) => (
              <div>
                <List.Item>
                  <div className="justify-between flex flex-row rounded border shadow-sm py-4 px-6">
                    <div className="w-full">
                      <h3 className="text-sm pb-1 text-gray-500">
                        Email Subject:
                      </h3>
                      <Link
                        to="/"
                        className="underline decoration-caramel text-caramel text-lg inline-block w-full overflow-hidden text-ellipsis max-w-full whitespace-nowrap"
                      >
                        Application Confirmation Email
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
      </div>

      {/* additional email template */}
      <div className="Container flex-wrap px-3 ">
        <h2 className="my-6">
          These are additional email templates required by a candidate or
          application selection.
        </h2>
        <div>
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
                      <h3 className="text-sm pb-1 text-gray-500">
                        Email Subject:
                      </h3>
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
      </div>
    </>
  );
};

export default EmailTemplate;
