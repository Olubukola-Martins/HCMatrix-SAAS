import { Collapse, Form, Input, Skeleton, Typography } from "antd";
import { AppButton } from "components/button/AppButton";
import { urlValidationRule } from "utils/formHelpers/validation";
import { FormFileInput } from "components/generalFormInputs/FormFileInput";

const CompanyDocumentsAccordion = () => {
  return (
    <div className="">
      <Collapse defaultActiveKey={["3"]} expandIconPosition="end">
        <Collapse.Panel
          header={
            <Typography.Title level={5}>Company Documents</Typography.Title>
          }
          key="3"
        >
          <CompanyDocumentsForm />
        </Collapse.Panel>
      </Collapse>
    </div>
  );
};

const CompanyDocumentsForm = () => {
  return (
    <Skeleton active loading={false} paragraph={{ rows: 8 }}>
      <Form
        requiredMark={false}
        labelCol={{ span: 24 }}
        onFinish={(val) => console.log(val, "Co DO")}
      >
        <div className="flex flex-col gap-4">
          <div className="grid md:grid-cols-3 gap-4">
            <FormFileInput
              Form={Form}
              label={`Company Handbook`}
              name="handbook"
              ruleOptions={{
                allowedFileTypes: [
                  "application/pdf",
                  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                ],
                required: true,
              }}
            />
            <Form.Item
              label="Other Needed Docs"
              name="website"
              rules={[urlValidationRule]}
            >
              <Input placeholder="Just a temporary placeholder" />
            </Form.Item>
          </div>
          <div className="flex justify-end">
            <Form.Item>
              <AppButton label="Save" isLoading={false} type="submit" />
            </Form.Item>
          </div>
        </div>
      </Form>
    </Skeleton>
  );
};

export default CompanyDocumentsAccordion;
