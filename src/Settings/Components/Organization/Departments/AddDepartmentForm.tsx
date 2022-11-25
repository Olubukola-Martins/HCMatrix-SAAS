import { Form, Input, Select, Spin } from "antd";
import React, { useContext } from "react";
import { useAuthUser } from "react-auth-kit";
import { useMutation, useQueryClient } from "react-query";
import {
  createDepartment,
  ICreateDepProps,
} from "../../../../ApiRequesHelpers/Utility/departments";
import {
  createEmployee,
  ICreateEmpProps,
} from "../../../../ApiRequesHelpers/Utility/employee";
import { GlobalContext } from "../../../../Contexts/GlobalContextProvider";
import {
  textInputValidationRules,
  emailValidationRules,
} from "../../../../FormHelpers/validation";
import { openNotification } from "../../../../NotificationHelpers";

const AddDepartmentForm = ({ handleClose }: { handleClose: Function }) => {
  const queryClient = useQueryClient();
  const auth = useAuthUser();

  const authDetails = auth();

  const user = authDetails?.user;
  console.log(user, "_______");
  const globalCtx = useContext(GlobalContext);
  const { state: globalState } = globalCtx;
  const companyId = globalState.currentCompany?.id;
  const [form] = Form.useForm();
  const { mutate, isLoading } = useMutation(createDepartment);

  const handleSubmit = (data: any) => {
    if (companyId) {
      const props: ICreateDepProps = {
        companyId,
        name: data.name,
        email: data.email,
        departmentHeadId: data.departmentHeadId,
        parentDepartmentId: data.parentDepartmentId,
      };
      console.log("prps", props, data);
      // return;
      openNotification({
        state: "info",
        title: "Wait a second ...",
        // description: <Progress percent={80} status="active" />,
        description: <Spin />,
      });
      mutate(props, {
        onError: (err: any) => {
          openNotification({
            state: "error",
            title: "Error Occured",
            description:
              err?.response.data.message ?? err?.response.data.error.message,
          });
        },
        onSuccess: (res: any) => {
          const result = res.data.data;

          openNotification({
            state: "success",

            title: "Success",
            description: res.data.message,
            // duration: 0.4,
          });

          form.resetFields();
          handleClose();
          queryClient.invalidateQueries({
            queryKey: ["departments"],
            exact: true,
          });
        },
      });
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
        label="Department Name"
        rules={textInputValidationRules}
      >
        <Input placeholder="Department" className="generalInputStyle" />
      </Form.Item>
      <Form.Item name="email" label="Mail Alias" rules={emailValidationRules}>
        <Input placeholder="john@gmail.com" className="generalInputStyle" />
      </Form.Item>

      <Form.Item name="departmentHeadId" label="Department Head">
        <Select
          placeholder="Department head"
          className="generalInputStyle"
          options={[]}
        />
      </Form.Item>
      <Form.Item name="parentDepartmentId" label="Parent Department">
        <Select
          placeholder="Parent Department"
          className="generalInputStyle"
          options={[]}
        />
      </Form.Item>

      <button className="button" type="submit">
        Submit
      </button>
    </Form>
  );
};

export default AddDepartmentForm;
