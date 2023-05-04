import { Form, Input, Select, Spin } from "antd";
import { useContext, useEffect } from "react";
import { useAuthUser } from "react-auth-kit";
import { useQueryClient } from "react-query";
import { BeatLoader } from "react-spinners";
import {
  ICreateDepProps,
  IUpdateDeptProps,
} from "../../../../ApiRequesHelpers/Utility/departments";
import {
  useCreateDepartment,
  useFetchSingleDepartment,
  useUpdateDepartment,
} from "../../../../APIRQHooks/Utility/departmentHooks";
import { IAuthDets } from "../../../../AppTypes/Auth";
import {
  EGlobalOps,
  GlobalContext,
} from "../../../../Contexts/GlobalContextProvider";
import {
  textInputValidationRules,
  emailValidationRules,
} from "../../../../FormHelpers/validation";
import { openNotification } from "../../../../NotificationHelpers";

const EditDepartmentForm = ({
  handleClose,
  departmentId,
}: {
  handleClose: Function;
  departmentId: number;
}) => {
  const queryClient = useQueryClient();
  const auth = useAuthUser();

  const authDetails = auth() as unknown as IAuthDets;

  const token = authDetails.userToken;
  const globalCtx = useContext(GlobalContext);
  const { state: globalState, dispatch } = globalCtx;
  const companyId = globalState.currentCompany?.id as unknown as string;
  const [form] = Form.useForm();
  const { data, isSuccess } = useFetchSingleDepartment({
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
  }, [isSuccess, data]);
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
          const result = res.data.data;

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

      <Form.Item name="departmentHeadId" label="Department Head (Optional)">
        <Select placeholder="Department head" options={[]} />
      </Form.Item>
      <Form.Item name="parentDepartmentId" label="Parent Department (Optional)">
        <Select placeholder="Parent Department" options={[]} />
      </Form.Item>

      <button className="button" type="submit">
        {isLoading ? <BeatLoader color="#fff" /> : "Submit"}
      </button>
    </Form>
  );
};

export default EditDepartmentForm;
