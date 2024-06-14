import { Form, Input, message, Select, Tooltip } from "antd";
import { AppButton } from "components/button/AppButton";
import { FormPhoneInput } from "components/generalFormInputs/FormPhoneInput";
import { RELATIONSHIPS } from "constants/general";
import { useSaveEmployeeEmergencyContact } from "features/core/employees/hooks/emergencyContact/useSaveEmployeeEmergencyContact";
import { QUERY_KEY_FOR_SINGLE_EMPLOYEE } from "features/core/employees/hooks/useFetchSingleEmployee";
import { TSingleEmployee } from "features/core/employees/types";

import { useState, useEffect } from "react";
import { useQueryClient } from "react-query";
import { formatPhoneNumber } from "utils/dataHelpers/formatPhoneNumber";
import { parsePhoneNumber } from "utils/dataHelpers/parsePhoneNumber";
import {
  generalValidationRules,
  textInputValidationRules,
} from "utils/formHelpers/validation";

import { openNotification } from "utils/notifications";

interface IProps {
  emergencyContact?: TSingleEmployee["emergencyContact"];
  employeeId?: number;
}
export const EmergencyContact: React.FC<IProps> = ({
  employeeId,
  emergencyContact,
}) => {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  const [disable, setDisable] = useState(true);

  const enableEdit = () => {
    setDisable(!disable);
    message.success(
      disable ? "Editing enabled Successfully" : "Editing disabled successfully"
    );
  };

  useEffect(() => {
    if (!emergencyContact) return;
    form.setFieldsValue({
      address: emergencyContact.address,
      fullName: emergencyContact.fullName,
      phone: {
        code: parsePhoneNumber(emergencyContact?.phoneNumber)?.code,
        number: parsePhoneNumber(emergencyContact?.phoneNumber).number,
      },
      relationship: emergencyContact.relationship,
    });
  }, [emergencyContact, form]);
  const { mutate, isLoading } = useSaveEmployeeEmergencyContact();
  const handleFinish = (data: any) => {
    if (!employeeId) return;
    mutate(
      {
        employeeId,
        data: {
          address: data.address,
          fullName: data.fullName,
          phoneNumber: formatPhoneNumber({
            code: data?.phone?.code,
            number: data?.phone.number,
          }),

          relationship: data.relationship,
        },
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

          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_SINGLE_EMPLOYEE],
            // exact: true,
          });
        },
      }
    );
  };

  return (
    <div className="bg-mainBg shadow-sm rounded-md p-4 mt-5">
      <div className="flex justify-between mb-3">
        <h2 className="font-medium text-lg">Emergency Contact</h2>
        <Tooltip title={disable ? "Enable editing" : "Disable editing"}>
          <i
            className={
              disable
                ? `ri-pencil-line cursor-pointer hover:text-caramel text-xl`
                : `ri-lock-line cursor-pointer hover:text-caramel text-xl`
            }
            onClick={enableEdit}
          ></i>
        </Tooltip>
      </div>

      <div className="bg-card p-3 rounded">
        <Form
          layout="vertical"
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
          onFinish={handleFinish}
          form={form}
          disabled={disable}
          requiredMark={false}
        >
          <Form.Item
            name="fullName"
            label="Full Name"
            rules={textInputValidationRules}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="address"
            label="Address"
            rules={textInputValidationRules}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="relationship"
            label="Relationship"
            rules={generalValidationRules}
          >
            <Select options={RELATIONSHIPS} />
          </Form.Item>
          <FormPhoneInput Form={Form} />
          <div className="md:col-span-2 flex justify-end">
            {!disable && (
              <AppButton
                label="Save Changes"
                type="submit"
                isLoading={isLoading}
              />
            )}
          </div>
        </Form>
      </div>
    </div>
  );
};
