import { Form, Input, Skeleton, Spin } from "antd";
import { useApiAuth } from "hooks/useApiAuth";
import { useContext, useEffect } from "react";
import { useQueryClient } from "react-query";
import { BeatLoader } from "react-spinners";
import { EGlobalOps, GlobalContext } from "stateManagers/GlobalContextProvider";
import {
  textInputValidationRules,
  emailValidationRules,
} from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";
import { useFetchSingleDepartment } from "../hooks/useFetchSingleDepartment";
import { useUpdateDepartment } from "../hooks/useUpdateDepartment";
import { IUpdateDeptProps } from "../types";
import { FormEmployeeInput } from "features/core/employees/components/FormEmployeeInput";
import { FormDepartmentInput } from "./FormDepartmentInput";

const EditDepartmentForm = ({
  handleClose,
  departmentId,
}: {
  handleClose: Function;
  departmentId: number;
}) => {
  const queryClient = useQueryClient();
  const { token, companyId } = useApiAuth();
  const { dispatch } = useContext(GlobalContext);
  const [form] = Form.useForm();
  const { data, isSuccess, isFetching } = useFetchSingleDepartment({
    token,
    companyId,
    departmentId,
  });

  useEffect(() => {
    if (isSuccess) {
      form.setFieldsValue({
        name: data.name,
        email: data.email,
        departmentHeadId: data?.departmentHeadId,
        parentDepartmentId: data?.parentDepartmentId,
      });
    }
  }, [isSuccess, data, form]);
  const { mutate, isLoading } = useUpdateDepartment();

  const handleSubmit = (data: any) => {
    if (companyId) {
      const props: IUpdateDeptProps = {
        companyId,
        name: data.name,
        email: data.email,
        departmentHeadId: data.departmentHeadId,
        parentDepartmentId: data.parentDepartmentId,
        token,
        id: departmentId,
      };
      // return;
      openNotification({
        state: "info",
        title: "Wait a second ...",
        description: <Spin />,
      });
      mutate(props, {
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

          form.resetFields();
          handleClose();
          dispatch({ type: EGlobalOps.setShowInitialSetup, payload: true });

          queryClient.invalidateQueries({
            queryKey: ["departments"],
            // exact: true,
          });
          queryClient.invalidateQueries({
            queryKey: ["single-department", departmentId],
            // exact: true,
          });
        },
      });
    }
  };
  return (
    <Skeleton loading={isFetching} active paragraph={{ rows: 9 }}>
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
          <Input placeholder="Department" />
        </Form.Item>
        <Form.Item name="email" label="Mail Alias" rules={emailValidationRules}>
          <Input placeholder="john@gmail.com" />
        </Form.Item>

        <FormEmployeeInput
          Form={Form}
          control={{
            name: "departmentHeadId",
            label: "Department Head (Optional)",
          }}
          optional
        />
        <FormDepartmentInput
          Form={Form}
          control={{
            name: "parentDepartmentId",
            label: "Parent Department (Optional)",
          }}
          optional
        />

        <button className="button" type="submit">
          {isLoading ? <BeatLoader color="#fff" /> : "Submit"}
        </button>
      </Form>
    </Skeleton>
  );
};

export default EditDepartmentForm;
