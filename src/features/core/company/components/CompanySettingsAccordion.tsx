import { Collapse, Typography } from "antd";

import CompanySettingsForm from "./CompanySettingsForm";

const CompanySettingsAccordion = () => {
  return (
    <div className="">
      <Collapse
        collapsible="header"
        defaultActiveKey={["1"]}
        expandIconPosition="end"
      >
        <Collapse.Panel
          header={
            <Typography.Title level={5}>Company Settings</Typography.Title>
          }
          key="1"
        >
          <CompanySettingsForm />
        </Collapse.Panel>
      </Collapse>
    </div>
  );
};

export default CompanySettingsAccordion;
