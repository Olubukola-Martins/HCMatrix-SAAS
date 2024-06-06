import { Drawer, Form, Input, InputNumber } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { AppButton } from "components/button/AppButton";
import { UseWindowWidth } from "features/timeAndAttendance/hooks/UseWindowWidth";
import { useContext, useEffect } from "react";
import { useQueryClient } from "react-query";
import { GlobalContext, EGlobalOps } from "stateManagers/GlobalContextProvider";
import { IDrawerProps } from "types";
import {
  generalValidationRules,
  textInputValidationRules,
} from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";
import { useCreateTimeOffPolicy } from "../hooks/useCreateTimeOffPolicy";
import { QUERY_KEY_FOR_TIME_OFF_POLICY } from "../hooks/useGetTimeOffPolicy";
import { useGetSinglePolicy } from "../hooks/useGetSinglePolicy";

export const CreateTimeOffPolicy = ({
  handleClose,
  open,
  id,
}: IDrawerProps) => {
  const { drawerSize } = UseWindowWidth();
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const { mutate, isLoading } = useCreateTimeOffPolicy();
  const { data, isSuccess } = useGetSinglePolicy(id as number);
  const globalCtx = useContext(GlobalContext);
  const { dispatch } = globalCtx;

  const handleFormSubmit = (values: any) => {
    const data = values.fields.map((value: any) => ({
      id: id ? id : undefined,
      title: value.title,
      duration: value.duration,
      comment: value.comment,
    }));
    mutate(
      {
        data,
      },
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
          queryClient.invalidateQueries([QUERY_KEY_FOR_TIME_OFF_POLICY]);
        },
      }
    );
  };

  useEffect(() => {
    const defaultField = {
      title: "",
      duration: "",
      comment: "",
    };
    if (data && isSuccess) {
      form.setFieldsValue({
        fields: [
          {
            title: data.title,
            duration: data.duration,
            comment: data.comment,
          },
        ],
      });
    } else {
      form.setFieldsValue({ fields: [defaultField] });
    }
  }, [id, data, isSuccess, form]);

  const handleAddField = () => {
    const fields = form.getFieldValue("fields") || [];
    const newField = {
      title: "",
      duration: "",
      comment: "",
    };
    form.setFieldsValue({ fields: [...fields, newField] });
  };

  const handleRemoveField = (index: number) => {
    const fields = form.getFieldValue("fields") || [];
    form.setFieldsValue({
      fields: fields.filter((_: any, i: number) => i !== index),
    });
  };
  return (
    <Drawer
      size={drawerSize}
      open={open}
      onClose={() => handleClose()}
      title={` ${id ? "Edit" : "Create"} Time Off Policy`}
    >
      <Form
        form={form}
        onFinish={handleFormSubmit}
        layout="vertical"
        requiredMark={false}
      >
        <Form.List name="fields">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, index) => (
                <div key={field.key}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-7">
                    <Form.Item
                      {...field}
                      name={[field.name, "title"]}
                      label="Enter policy name"
                      className="w-full"
                      rules={textInputValidationRules}
                    >
                      <Input placeholder="eg: medical policy" />
                    </Form.Item>

                    <Form.Item
                      {...field}
                      name={[field.name, "duration"]}
                      label="Duration in days"
                      className="w-full"
                      rules={generalValidationRules}
                    >
                      <InputNumber className="w-full" min={1} />
                    </Form.Item>
                  </div>
                  <Form.Item
                    {...field}
                    name={[field.name, "comment"]}
                    label="Enter Comment"
                    className="w-full"
                    rules={textInputValidationRules}
                  >
                    <TextArea className="w-full " rows={3} />
                  </Form.Item>
                  <div className="flex justify-end">
                    {!id && (
                      <i
                        className="ri-delete-bin-line -mt-3 text-xl text-red-400 cursor-pointer hover:text-caramel"
                        onClick={() => handleRemoveField(index)}
                      ></i>
                    )}
                  </div>
                </div>
              ))}

              {!id && (
                <AppButton
                  variant="transparent"
                  label="+ Add Time off policy"
                  handleClick={() => handleAddField()}
                />
              )}
            </>
          )}
        </Form.List>

        <div className="flex justify-end">
          <AppButton label="Save" type="submit" isLoading={isLoading} />
        </div>
      </Form>
    </Drawer>
  );
};
