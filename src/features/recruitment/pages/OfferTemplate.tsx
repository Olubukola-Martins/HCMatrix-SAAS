import { RecruitmentSettingsIntro } from "../components/RecruitmentSettingsIntro";
import { AppButton } from "components/button/AppButton";
import { Dropdown, List, Menu } from "antd";
import { appRoutes } from "config/router/paths";
import { Link } from "react-router-dom";

const OfferTemplate = () => {
  const dataSource = [
    {
      title: "Full Time - At will",
    },
    {
      title: "Full Time - At will",
    },
    {
      title: "Full Time - At will",
    },
    {
      title: "Full Time - At will",
    },
  ];

  return (
    <>
      <RecruitmentSettingsIntro
        title="Offer Template"
        description={
          "Offer templates aid in bridging the gap between employee self-onboarding and the application tracking system."
        }
        nextLink={appRoutes.recruitmentJobTemplate}
      />
      <div className="Container mb-5 mt-8 px-3 flex flex-row w-full">
        <AppButton
          type="button"
          label="Map variables"
          variant="transparent"
          additionalClassNames={[
            "border-none hover:no-underline underline decoration-inherit underline-offset-4",
          ]}
        />
        <AppButton
          type="button"
          label="+ Add New Template"
          variant="transparent"
          additionalClassNames={["border-caramel max-sm:text-xs"]}
        />
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
    </>
  );
};

export default OfferTemplate;
