import { DatePicker, Drawer, Form, Input, Select, Spin } from "antd";

import { useAddDependantToEmployee } from "APIRQHooks/Utility/employeeHooks";
import { IAuthDets } from "AppTypes/Auth";
import { IDrawerProps } from "AppTypes/Component";
import { relationships } from "Constants";
import { GlobalContext } from "Contexts/GlobalContextProvider";
import {
  generalValidationRules,
  phoneNumberValidationRule,
} from "FormHelpers/validation";
import Button from "GeneralComps/Button";
import { openNotification } from "NotificationHelpers";
import { useContext } from "react";
import { useAuthUser } from "react-auth-kit";
import { useQueryClient } from "react-query";

interface IProps extends IDrawerProps {
  employeeId: number;
}

export const AddDependents = ({ open, handleClose, employeeId }: IProps) => {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  const auth = useAuthUser();

  const authDetails = auth() as unknown as IAuthDets;

  const token = authDetails.userToken;
  const globalCtx = useContext(GlobalContext);
  const { state: globalState } = globalCtx;
  const companyId = globalState.currentCompany?.id as unknown as string;
  const { mutate, isLoading } = useAddDependantToEmployee();

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
          employeeId,
          companyId,
          token,
          dob: data.dob,
          fullName: data.fullName,
          phoneNumber: data.phoneNumber,
          relationship: data.relationship,
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

            form.resetFields();
            handleClose();

            queryClient.invalidateQueries({
              queryKey: ["single-employee", employeeId],
              // exact: true,
            });
          },
        }
      );
    }
  };
  return (
    <Drawer
      title="Add Dependent"
      placement="right"
      onClose={() => handleClose()}
      open={open}
      className="drawerBg"
    >
      <Form
        layout="vertical"
        className="mt-5"
        form={form}
        requiredMark={false}
        onFinish={handleSubmit}
      >
        <Form.Item
          name="fullName"
          label="Full Name"
          rules={generalValidationRules}
        >
          <Input className="generalInputStyle" placeholder="Enter Name" />
        </Form.Item>
        <Form.Item
          name="dob"
          label="Date of Birth"
          rules={generalValidationRules}
        >
          <DatePicker format="YYYY/MM/DD" className="generalInputStyle" />
        </Form.Item>
        <Form.Item
          name="phoneNumber"
          label="Phone Number"
          rules={[phoneNumberValidationRule]}
        >
          <Input className="generalInputStyle" placeholder="Enter Phone" />
        </Form.Item>
        <Form.Item
          name="relationship"
          label="Relationship"
          rules={[{ required: true, message: "Field is required" }]}
        >
          <Select
            className="SelectTag w-full"
            size="large"
            placeholder="Select"
            options={relationships}
          />
        </Form.Item>

        <Button isLoading={isLoading} type="submit" />
      </Form>
    </Drawer>
  );
};
