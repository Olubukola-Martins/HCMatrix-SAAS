import { Form, Input, Select, Spin } from "antd";
import { useFetchEmployees } from "features/core/employees/hooks/useFetchEmployees";
import { useApiAuth } from "hooks/useApiAuth";
import { useState, useEffect } from "react";

import { useQueryClient } from "react-query";
import { BeatLoader } from "react-spinners";
import {
  textInputValidationRules,
  emailValidationRules,
  generalValidationRules,
} from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";
import { useSaveGroup } from "../hooks/useSaveGroup";
import { TGroup } from "../types";

const AddGroupForm = ({
  handleClose,
  group,
}: {
  handleClose: Function;
  group?: TGroup;
}) => {
  const queryClient = useQueryClient();
  const [empSearch, setEmpSearch] = useState<string>("");
  const { token, companyId } = useApiAuth();

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
  const { mutate, isLoading } = useSaveGroup();

  const { data: empData, isSuccess: isEmpSuccess } = useFetchEmployees({
    pagination: {
      limit: 100, //temp suppose to allow search
      offset: 0,
    },
    searchParams: {
      name: empSearch,
    },
  });

  const handleSubmit = (data: any) => {
    if (companyId) {
      // return;
      openNotification({
        state: "info",
        title: "Wait a second ...",
        description: <Spin />,
      });
      mutate(
        {
          id: group?.id,
          companyId,
          description: data.description,
          email: data.email,
          token,
          employees: data.employees.map((id: number, index: number) => ({
            employeeId: id,
            isLead: index === 0 ? true : false,
          })),
          name: data.name,
        },
        {
          onError: (err: any) => {
            openNotification({
              state: "error",
              title: "Error Occurred",
              description:
                err?.response.data.message ?? err?.response.data.error.message,
            });
          },
          onSuccess: (res: any) => {
            openNotification({
              state: "success",

              title: "Success",
              description: res.data.message,
              // duration: 0.4,
            });

            !group && form.resetFields();
            handleClose();

            queryClient.invalidateQueries({
              queryKey: ["groups"],
              // exact: true,
            });
          },
        }
      );
    }
  };
  return (
    <Form
      layout="vertical"
      requiredMark={false}
      form={form}
      onFinish={handleSubmit}
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

      <button className="button" type="submit">
        {isLoading ? <BeatLoader color="#fff" /> : "Submit"}
      </button>
    </Form>
  );
};

export default AddGroupForm;
