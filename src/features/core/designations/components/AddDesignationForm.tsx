import { Form, Input, Spin } from "antd";
import { useApiAuth } from "hooks/useApiAuth";
import React, { useContext } from "react";
import { useQueryClient } from "react-query";
import { useCreateDesignation } from "../hooks/useCreateDesignation";
import { AppButton } from "components/button/AppButton";
import { textInputValidationRules } from "utils/formHelpers/validation";
import { FormDepartmentInput } from "features/core/departments/components/FormDepartmentInput";
import { openNotification } from "utils/notifications";
import { GlobalContext, EGlobalOps } from "stateManagers/GlobalContextProvider";

const AddDesignationForm = ({ handleClose }: { handleClose: Function }) => {
  const queryClient = useQueryClient();
  const { dispatch } = useContext(GlobalContext);

  const { token, companyId } = useApiAuth();
  const [form] = Form.useForm();

  const { mutate, isLoading } = useCreateDesignation();

  const handleSubmit = (data: any) => {
    if (companyId) {
      openNotification({
        state: "info",
        title: "Wait a second ...",
        description: <Spin />,
      });
      mutate(
        {
          companyId,
          name: data.name,
          departmentId: data.departmentId,
          token,
        },
        {
          onError: (err: any) => {
            openNotification({
              state: "error",
              title: "Error Occured",
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

            form.resetFields();
            handleClose();
            dispatch({ type: EGlobalOps.setShowInitialSetup, payload: true });

            queryClient.invalidateQueries({
              queryKey: ["designations"],
            });
          },
        }
      );
    }
  };
  return (
    <>
      <Form
        layout="vertical"
        requiredMark={false}
        form={form}
        onFinish={handleSubmit}
      >
        <Form.Item
          name="name"
          label="Designation Name"
          rules={textInputValidationRules}
        >
          <Input placeholder="Designation" />
        </Form.Item>

        <FormDepartmentInput Form={Form} />

        <AppButton type="submit" label="Submit" isLoading={isLoading} />
      </Form>
    </>
  );
};

export default AddDesignationForm;
