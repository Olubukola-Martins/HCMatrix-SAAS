import { Form, Input, Select, Spin } from "antd";
import { useFetchEmployees } from "features/core/employees/hooks/useFetchEmployees";
import { useState, useEffect } from "react";
import {
  textInputValidationRules,
  emailValidationRules,
  generalValidationRules,
} from "utils/formHelpers/validation";
import { TGroup } from "../types";
import { TGroupDataInput } from "../hooks/useAddGroup";

import { AppButton } from "components/button/AppButton";

const AddGroupForm = ({
  group,
  handleSubmit,
}: {
  handleSubmit: { fn: (props: TGroupDataInput) => void; isLoading?: boolean };
  group?: TGroup;
}) => {
  const [empSearch, setEmpSearch] = useState<string>("");

  const [form] = Form.useForm();
  useEffect(() => {
    if (group) {
      form.setFieldsValue({
        name: group.name,
        email: group.email,
        description: group.description,
        employees: group?.employees?.map((item) => item.employeeId),
      });
    }
  }, [group, form]);

  const { data: empData, isSuccess: isEmpSuccess } = useFetchEmployees({
    pagination: {
      limit: 100, //temp suppose to allow search
      offset: 0,
    },
    searchParams: {
      name: empSearch,
    },
  });

  const onSubmit = (data: any) => {
    handleSubmit.fn({
      description: data.description,
      email: data.email,
      employees: data.employees.map((id: number, index: number) => ({
        employeeId: id,
        isLead: index === 0 ? true : false,
      })),
      name: data.name,
    });
  };
  return (
    <Form
      layout="vertical"
      requiredMark={false}
      form={form}
      onFinish={onSubmit}
    >
      <Form.Item
        name="name"
        label="Group Name"
        rules={textInputValidationRules}
      >
        <Input placeholder="name" />
      </Form.Item>
      <Form.Item name="email" label="Mail Alias" rules={emailValidationRules}>
        <Input placeholder="john@gmail.com" />
      </Form.Item>

      <Form.Item name="description" label="Description (Optional)">
        <Input.TextArea placeholder="description" />
      </Form.Item>
      <Form.Item
        name="employees"
        label={
          <div className="flex flex-col">
            <span>Members</span>
            <span className="text-red-500 text-xs">
              * The first member will be the lead by default
            </span>
          </div>
        }
        rules={generalValidationRules}
      >
        <Select
          disabled={!!group}
          mode="tags"
          onSearch={(val) => setEmpSearch(val)}
          showSearch
          value={empSearch}
          defaultActiveFirstOption={false}
          showArrow={false}
          filterOption={false}
          // onChange={handleChange}
          notFoundContent={null}
        >
          {isEmpSuccess ? (
            empData.data.map((item) => (
              <Select.Option key={item.id} value={item.id}>
                {item.firstName} {item.lastName}
              </Select.Option>
            ))
          ) : (
            <div className="flex justify-center items-center w-full">
              <Spin size="small" />
            </div>
          )}
        </Select>
      </Form.Item>

      <AppButton
        isLoading={handleSubmit.isLoading}
        label="Save"
        type={`submit`}
      />
    </Form>
  );
};

export default AddGroupForm;
