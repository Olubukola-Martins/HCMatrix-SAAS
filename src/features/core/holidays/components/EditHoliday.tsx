import { DatePicker, Form, Input, Modal } from "antd";
import { AppButton } from "components/button/AppButton";
import React, { useEffect } from "react";
import { IModalProps } from "types";
import {
  generalValidationRules,
  textInputValidationRules,
} from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";

import { THoliday } from "../types";
import { useUpdateHoliday } from "../hooks/useUpdateHoliday";
import { QUERY_KEY_FOR_HOLIDAYS } from "../hooks/useGetHolidays";
import moment from "moment";

interface IProps extends IModalProps {
  holiday: THoliday;
}

export const EditHoliday: React.FC<IProps> = ({
  open,
  handleClose,
  holiday,
}) => {
  const queryClient = useQueryClient();

  const [form] = Form.useForm();
  const { mutate, isLoading } = useUpdateHoliday();

  const handleSubmit = (data: any) => {
    mutate(
      {
        id: holiday.id,

        body: { title: data.title, date: data.date.toString() },
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
            queryKey: [QUERY_KEY_FOR_HOLIDAYS],
            // exact: true,
          });
        },
      }
    );
  };

  useEffect(() => {
    form.setFieldsValue({
      title: holiday.title,
      date: moment(holiday.date),
    });
  }, [form, holiday]);

  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      title={"Edit Holiday"}
      style={{ top: 20 }}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        requiredMark={false}
      >
        <Form.Item rules={textInputValidationRules} name="name" label="Name">
          <Input placeholder="Holiday Name" />
        </Form.Item>
        <Form.Item rules={generalValidationRules} name="date" label="Date">
          <DatePicker placeholder="Holiday Date" className="w-full" />
        </Form.Item>

        <div className="flex justify-end">
          <AppButton type="submit" isLoading={isLoading} />
        </div>
      </Form>
    </Modal>
  );
};
