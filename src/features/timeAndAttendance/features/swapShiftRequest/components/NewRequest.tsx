import { Drawer, Form } from "antd";
import { FormEmployeeInput } from "features/core/employees/components/FormEmployeeInput";
import { useContext } from "react";
import { EGlobalOps, GlobalContext } from "stateManagers/GlobalContextProvider";
import { IDrawerProps } from "types";
import { FormShiftCategoryInput } from "../../settings/workSchedule/components/shiftCategory/FormShiftCategoryInput";
import TextArea from "antd/es/input/TextArea";
import { textInputValidationRules } from "utils/formHelpers/validation";
import { AppButton } from "components/button/AppButton";
import { useCreateShiftRequest } from "../hooks/useCreateShiftRequest";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import { QUERY_KEY_FOR_MY_SHIFT_REQUEST } from "../hooks/useGetMyShiftSwapRequest";

export const NewRequest = ({ handleClose, open }: IDrawerProps) => {
  const globalCtx = useContext(GlobalContext);
  const { dispatch } = globalCtx;
  const [form] = Form.useForm();
  const { isLoading, mutate } = useCreateShiftRequest();
  const queryClient = useQueryClient();

  const handleFormSubmit = (val: any) => {
    mutate(
      { ...val },
      {
        onError: (err: any) => {
          openNotification({
            state: "error",
            title: "Error Occurred",
            description:
              err?.response.data.message ?? err?.response.data.error.message,
            duration: 7.0,
          });
        },
        onSuccess: (res: any) => {
          openNotification({
            state: "success",
            title: "Success",
            description: res.data.message,
          });
          form.resetFields();
          dispatch({ type: EGlobalOps.setShowInitialSetup, payload: true });
          handleClose();
          queryClient.invalidateQueries([QUERY_KEY_FOR_MY_SHIFT_REQUEST]);
        },
      }
    );
  };

  return (
    <Drawer open={open} onClose={() => handleClose()} title={`New Request`}>
      <Form
        onFinish={handleFormSubmit}
        form={form}
        layout="vertical"
        className="mt-4"
        requiredMark={false}
      >
        <FormShiftCategoryInput
          Form={Form}
          control={{ label: "Select Current Shift", name: "shiftFromId" }}
        />

        <FormShiftCategoryInput
          Form={Form}
          control={{ label: "Select New Shift", name: "shiftToId" }}
        />

        <FormEmployeeInput
          Form={Form}
          control={{ label: "Select Swap Partner", name: "shiftPartnerId" }}
        />
        <Form.Item
          label="Comment"
          name="comment"
          rules={textInputValidationRules}
        >
          <TextArea className="w-full " rows={3} />
        </Form.Item>

        <AppButton label="Submit" type="submit" isLoading={isLoading} />
      </Form>
    </Drawer>
  );
};
