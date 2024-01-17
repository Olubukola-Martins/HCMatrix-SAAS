import { Form, Input, Modal } from "antd";

import { QUERY_KEY_FOR_ROLES } from "../hooks/useFetchRoles";
import { useContext } from "react";
import { useQueryClient } from "react-query";
import { GlobalContext, EGlobalOps } from "stateManagers/GlobalContextProvider";
import { IModalProps } from "types";
import { textInputValidationRules } from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";
import { useCreateRole } from "../hooks/useCreateRole";
import { AppButton } from "components/button/AppButton";

export const AddRole = ({ open, handleClose }: IModalProps) => {
  const queryClient = useQueryClient();

  const [form] = Form.useForm();
  const { mutate, isLoading } = useCreateRole();
  const globalCtx = useContext(GlobalContext);
  const { dispatch } = globalCtx;
  const handleSubmit = (data: any) => {
    mutate(
      {
        name: data.name,
        permissionIds: [],
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
            queryKey: [QUERY_KEY_FOR_ROLES],
          });
        },
      }
    );
  };
  return (
    <Modal
      title="Add Role"
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      style={{ top: 10 }}
    >
      <Form layout="vertical" requiredMark={false} onFinish={handleSubmit}>
        <Form.Item
          name="name"
          label="Role Name"
          rules={textInputValidationRules}
        >
          <Input placeholder="Role Name" size="large" />
        </Form.Item>

        <div className="flex justify-between items-center">
          <AppButton
            handleClick={() => handleClose(false)}
            label="Cancel"
            additionalClassNames={["transparentButton"]}
          />
          <AppButton type="submit" isLoading={isLoading} />
        </div>
      </Form>
    </Modal>
  );
};
