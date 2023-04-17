import { Collapse, Typography } from "antd";
import CompanyInformationForm from "./CompanyInformationForm";

const CompanyInfoAccordion = () => {
  return (
    <div className="">
      <Collapse
        collapsible="header"
        defaultActiveKey={["1"]}
        expandIconPosition="end"
      >
        <Collapse.Panel
          header={
            <Typography.Title level={5}>Company Information</Typography.Title>
          }
          key="1"
        >
          <CompanyInformationForm />
        </Collapse.Panel>
      </Collapse>
    </div>
  );
};

export default CompanyInfoAccordion;
