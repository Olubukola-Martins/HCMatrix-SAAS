import React from "react";
import { Form } from "antd";
import { SelectedModulesSection } from "./SelectedModulesSection";
import { AddOnSection } from "./AddOnSection";
import SummarySection from "./SummarySection";

const AddOnContainer = () => {
  const [form] = Form.useForm();
  const handleSubmit = () => {};
  return (
    <Form
      requiredMark={false}
      onFinish={handleSubmit}
      form={form}
      labelCol={{ span: 24 }}
    >
      <div className="mt-7 grid grid-cols-1 md:grid-cols-2 gap-7 text-accent">
        <div className="flex flex-col gap-4">
          <SelectedModulesSection
            Form={Form}
            pricePerUser="$40"
            selectedModules={["Payroll", "Onboarding"]}
          />
          <AddOnSection Form={Form} pricePerUser="$40" />
        </div>

        <div className="flex flex-col gap-4">
          <SummarySection />
        </div>
      </div>
    </Form>
  );
};

export default AddOnContainer;
