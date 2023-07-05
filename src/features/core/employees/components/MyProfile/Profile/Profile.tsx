import { DatePicker, Form, Input, message, Select, Spin, Tooltip } from "antd";
import { FileUpload } from "components/FileUpload";
import { FormCountryInput } from "components/generalFormInputs/FormCountryInput";
import { FormLGAInput } from "components/generalFormInputs/FormLGAInput";
import { FormPhoneInput } from "components/generalFormInputs/FormPhoneInput";
import { FormStateInput } from "components/generalFormInputs/FormStateInput";
import {
  EMPLOYMENT_ELIGIBILITIES_OPTIONS,
  GENDERS,
  MARITAL_STATUSES,
} from "constants/general";
import { TIME_ZONES } from "constants/timeZones";
import { useCreateEmployeePersonalInfo } from "features/core/employees/hooks/useCreateEmployeePersonalInfo";
import { useUpdateEmployeePersonalInfo } from "features/core/employees/hooks/useUpdateEmployeePersonalInfo";
import {
  TEmployee,
  ICreateEmpPersonalInfoProps,
} from "features/core/employees/types";
import { FormExchangeRateInput } from "features/payroll/components/exchangeRates/FormExchangeRateInput";
import { useApiAuth } from "hooks/useApiAuth";
import { useCurrentFileUploadUrl } from "hooks/useCurrentFileUploadUrl";
import moment from "moment";
import { useState, useEffect } from "react";
import { useQueryClient } from "react-query";
import { BeatLoader } from "react-spinners";
import { TEmploymentEligibity } from "types/employementEligibilities";
import {
  generalValidationRules,
  textInputValidationRules,
} from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";

interface IProps {
  employee?: TEmployee;
}

export const Profile = ({ employee }: IProps) => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const { token, companyId } = useApiAuth();
  const [disable, setDisable] = useState(true);
  const [selectedEligibility, setSelectedEligibility] =
    useState<TEmploymentEligibity>();
  const [stateId, setStateId] = useState<number>();
  const [countryId, setCountryId] = useState<number>();
  const documentUrl = useCurrentFileUploadUrl("documentUrl");

  const enableEdit = () => {
    setDisable(!disable);
    message.success(
      disable ? "Editing enabled Successfully" : "Editing disabled successfully"
    );
  };

  useEffect(() => {
    const personalInfo = employee?.personalInformation;
    if (personalInfo) {
      setCountryId(personalInfo.address.countryId);
      setStateId(personalInfo.address.stateId);
      form.setFieldsValue({
        dob: personalInfo.dob ? moment(personalInfo.dob) : null,
        nationality: personalInfo.nationality,
        gender: personalInfo.gender,
        maritalStatus: personalInfo.maritalStatus,

        eligibility: personalInfo.eligibility,
        timezone: personalInfo.address.timezone,
        countryId: personalInfo.address.countryId,
        stateId: personalInfo.address.stateId,
        phone: {
          number: personalInfo.phoneNumber.split("-")[1],
          code: personalInfo.phoneNumber.split("-")[0].slice(1), //remove the plus
        },
        lgaId: personalInfo.address.lgaId,
        streetAddress: personalInfo.address.streetAddress,
        passportExpirationDate: personalInfo.passportExpirationDate
          ? moment(personalInfo.passportExpirationDate)
          : null,
      });
      setSelectedEligibility(
        personalInfo.eligibility as unknown as TEmploymentEligibity
      );
    }
  }, [employee, form]);

  const { mutate: createMutate, isLoading: createLoading } =
    useCreateEmployeePersonalInfo();
  const { mutate: updateMutate, isLoading: updateLoading } =
    useUpdateEmployeePersonalInfo();

  const handleFinish = (data: any) => {
    if (companyId && employee && !employee.personalInformation) {
      //if the personal info doesnt exist, then create
      let props: ICreateEmpPersonalInfoProps = {
        token,
        companyId,
        dob: data.dob.format("YYYY-MM-DD"),
        gender: data.gender,
        phoneNumber: `+${data.phone.code}-${data.phone.number}`,
        eligibility: data.eligibility,
        maritalStatus: data.maritalStatus,
        nationality: data.nationality,
        address: {
          streetAddress: data.streetAddress,
          countryId: data.countryId,
          stateId: data.stateId,
          lgaId: data.lgaId,
          timezone: data.timezone,
        },

        validDocumentUrl: documentUrl,
        employeeId: employee.id,
      };
      if (data?.passportExpirationDate) {
        props = {
          ...props,
          passportExpirationDate:
            data?.passportExpirationDate?.format("YYYY-MM-DD"),
        };
      }

      openNotification({
        state: "info",
        title: "Wait a second ...",
        description: <Spin />,
      });
      createMutate(props, {
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
            description: res?.data?.message,
          });
          setDisable(true);
          queryClient.invalidateQueries({
            queryKey: ["single-employee", employee?.id],
          });
        },
      });
    }
    if (companyId && employee && employee.personalInformation) {
      //if the personal info exist, then update
      let props: ICreateEmpPersonalInfoProps = {
        token,
        companyId,
        dob: data?.dob?.format("YYYY-MM-DD"),
        gender: data.gender,
        phoneNumber: `+${data.phone.code}-${data.phone.number}`,
        eligibility: data.eligibility,
        exchangeRateId: data.exchangeRateId,
        maritalStatus: data.maritalStatus,
        nationality: data.nationality,
        address: {
          streetAddress: data.streetAddress,
          countryId: data.countryId,
          stateId: data.stateId,
          lgaId: data.lgaId,
          timezone: data.timezone,
        },

        validDocumentUrl: data.validDocumentUrl,
        employeeId: employee.id,
      };
      if (data?.passportExpirationDate) {
        props = {
          ...props,
          passportExpirationDate:
            data?.passportExpirationDate?.format("YYYY-MM-DD"),
        };
      }

      // return;
      openNotification({
        state: "info",
        title: "Wait a second ...",
        description: <Spin />,
      });
      updateMutate(props, {
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
            description: res?.data?.message,
          });
          setDisable(true);

          queryClient.invalidateQueries({
            queryKey: ["single-employee", employee?.id],
          });
        },
      });
    }
  };

  return (
    <div>
      <div className="bg-mainBg shadow-sm rounded-md p-4 mt-5">
        <div className="flex justify-between mb-3">
          <h2 className="font-medium text-lg">Personal Information</h2>
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
            requiredMark={false}
            form={form}
            layout="vertical"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            onFinish={handleFinish}
            disabled={disable}
          >
            <Form.Item
              name="dob"
              label="Date of Birth"
              rules={[{ required: true }]}
            >
              <DatePicker
                className="w-full"
                format={"DD/MM/YYYY"}
                disabledDate={(d) =>
                  !d ||
                  d.isSameOrAfter(
                    moment(new Date().toLocaleDateString()).format("YYYY-MM-DD")
                  )
                }
              />
            </Form.Item>
            <FormPhoneInput Form={Form} />
            <Form.Item
              name="eligibility"
              label="Employment Eligibility"
              rules={generalValidationRules}
            >
              <Select
                className="capitalize"
                placeholder="Select"
                onChange={(val: TEmploymentEligibity) =>
                  setSelectedEligibility(val)
                }
                options={EMPLOYMENT_ELIGIBILITIES_OPTIONS}
              />
            </Form.Item>
            <Form.Item
              name="timezone"
              label="Time Zone"
              rules={generalValidationRules}
            >
              <Select placeholder="Select" options={TIME_ZONES} />
            </Form.Item>

            {selectedEligibility === "expatriate" && (
              <FormExchangeRateInput
                Form={Form}
                control={{ label: "Exchange Rate", name: "exchangeRateId" }}
              />
            )}
            {selectedEligibility === "expatriate" && (
              <Form.Item
                name="passportExpirationDate"
                label="Passport Expiration Date"
              >
                <DatePicker format="YYYY/MM/DD" className="w-full" />
              </Form.Item>
            )}
            {selectedEligibility === "expatriate" && (
              <Form.Item label="Supporting Document">
                <div className={`px-3 py-2 shadow rounded-sm bg-mainBg`}>
                  <FileUpload
                    allowedFileTypes={[
                      "image/jpeg",
                      "image/png",
                      "image/jpg",
                      "application/pdf",
                    ]}
                    fileKey="documentUrl"
                    textToDisplay="Upload file"
                    displayType="form-space-between"
                  />
                </div>
              </Form.Item>
            )}
            <Form.Item
              name="gender"
              label="Gender"
              rules={generalValidationRules}
            >
              <Select options={GENDERS} />
            </Form.Item>
            <Form.Item
              name="maritalStatus"
              label="Marital Status"
              rules={generalValidationRules}
            >
              <Select options={MARITAL_STATUSES} />
            </Form.Item>

            <FormCountryInput
              Form={Form}
              control={{ label: "Nationality", name: "nationality" }}
            />
            <FormCountryInput
              Form={Form}
              control={{ label: "Country", name: "countryId" }}
              handleSelect={(val) => setCountryId(val)}
            />
            {countryId && (
              <FormStateInput
                countryId={countryId}
                Form={Form}
                handleSelect={(val) => setStateId(val)}
              />
            )}

            {stateId && <FormLGAInput stateId={stateId} Form={Form} />}
            <Form.Item
              name="streetAddress"
              label="Street Address"
              className="col-span-3"
              rules={textInputValidationRules}
            >
              <Input.TextArea rows={3} />
            </Form.Item>

            {!disable && (
              <div className="flex items-center">
                <button className="button" type="submit">
                  {createLoading || updateLoading ? (
                    <BeatLoader color="#fff" />
                  ) : (
                    "Save changes"
                  )}
                </button>
              </div>
            )}
          </Form>
        </div>
      </div>
    </div>
  );
};
