import { Form, Input, message, Select, Tooltip } from "antd";
import { saveEmployeeEmergencyContact } from "ApiRequesHelpers/Utility/employee";
import { useFetchCountries } from "APIRQHooks/Utility/countryHooks";
import { IAuthDets } from "AppTypes/Auth";
import { TEmployee } from "AppTypes/DataEntitities";
import { relationships } from "Constants";
import { GlobalContext } from "Contexts/GlobalContextProvider";
import {
  generalValidationRules,
  textInputValidationRules,
  phoneNumberValidationRule,
} from "FormHelpers/validation";
import Button from "GeneralComps/Button";
import { FormPhoneInput } from "GeneralComps/FormPhoneInput";
import { openNotification } from "NotificationHelpers";
import { useContext, useEffect, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import { useMutation, useQueryClient } from "react-query";

interface IProps {
  employee?: TEmployee;
}
export const EmergencyContact: React.FC<IProps> = ({ employee }) => {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  const auth = useAuthUser();

  const authDetails = auth() as unknown as IAuthDets;

  const token = authDetails.userToken;
  const globalCtx = useContext(GlobalContext);
  const { state: globalState } = globalCtx;
  const companyId = globalState.currentCompany?.id as unknown as string;
  const [disable, setDisable] = useState(true);
  const {
    data: countries,

    isSuccess: isCSuccess,
  } = useFetchCountries();

  const enableEdit = () => {
    setDisable(!disable);
    message.success(
      disable ? "Editing enabled Successfully" : "Editing disabled successfully"
    );
  };

  const { mutate, isLoading } = useMutation(saveEmployeeEmergencyContact);

  const handleSubmit = (data: any) => {
    const phoneNumber = `+${data.phone.code}-${data.phone.number}`;

    if (companyId && employee) {
      mutate(
        {
          phoneNumber,
          address: data.address,
          companyId,
          token,
          fullName: data.fullName,
          employeeId: employee.id,
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

          onSuccess: (res) => {
            openNotification({
              state: "success",

              title: "Success",
              description: res.data.message,
              // duration: 0.4,
            });
            queryClient.invalidateQueries({
              queryKey: ["single-employee", employee.id],
              // exact: true,
            });
          },
        }
      );
    }
  };
  useEffect(() => {
    if (isCSuccess && employee?.emergencyContact) {
      form.setFieldsValue({
        ...employee.emergencyContact,
        phone: {
          number: employee.emergencyContact.phoneNumber.split("-")[1],
          code: employee.emergencyContact.phoneNumber.split("-")[0].slice(1), //remove the plus
        },
      });
    }
  }, [form, employee, isCSuccess]);

  if (employee) {
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
            onFinish={handleSubmit}
            form={form}
            disabled={disable}
          >
            <Form.Item name="fullName" label="Full Name">
              <Input />
            </Form.Item>
            <Form.Item name="address" label="Address">
              <Input />
            </Form.Item>
            <Form.Item name="relationship" label="Relationship">
              <Select options={relationships} />
            </Form.Item>
            <FormPhoneInput Form={Form} />
            {!disable && (
              <div className="flex items-center">
                <Button isLoading={isLoading} type="submit" />
              </div>
            )}
          </Form>
        </div>
      </div>
    );
  }
  return null;
};
