import { DatePicker, Form, Input, message, Select, Tooltip } from "antd";
import { FileUpload } from "components/FileUpload";
import { AppButton } from "components/button/AppButton";
import { FormCountryInput } from "components/generalFormInputs/FormCountryInput";
import { FormLGAInput } from "components/generalFormInputs/FormLGAInput";
import { FormPhoneInput } from "components/generalFormInputs/FormPhoneInput";
import { FormStateInput } from "components/generalFormInputs/FormStateInput";
import { SelectCountry } from "components/selectEntity/SelectCountry";
import { SelectLGA } from "components/selectEntity/SelectLGA";
import { SelectState } from "components/selectEntity/SelectState";
import { DEFAULT_DATE_FORMAT } from "constants/dateFormats";
import {
  EMPLOYMENT_ELIGIBILITIES_OPTIONS,
  GENDERS,
  MARITAL_STATUSES,
} from "constants/general";
import { TIME_ZONES } from "constants/timeZones";
import { useSaveEmployeePersonalInformation } from "features/core/employees/hooks/personalInformation/useSaveEmployeePersonalInformation";
import { QUERY_KEY_FOR_SINGLE_EMPLOYEE } from "features/core/employees/hooks/useFetchSingleEmployee";
import { TSingleEmployee } from "features/core/employees/types";
import { FormExchangeRateInput } from "features/payroll/components/exchangeRates/FormExchangeRateInput";
import { useCurrentFileUploadUrl } from "hooks/useCurrentFileUploadUrl";
import { useFetchCountries } from "hooks/useFetchCountries";
import moment from "moment";
import { useState, useEffect } from "react";
import { useQueryClient } from "react-query";
import { TEmploymentEligibity } from "types/employementEligibilities";
import { formatPhoneNumber } from "utils/dataHelpers/formatPhoneNumber";
import { parsePhoneNumber } from "utils/dataHelpers/parsePhoneNumber";
import {
  dateHasToBeLesserThanOrEqualToCurrentDayRule,
  emailValidationRulesOp,
  generalValidationRules,
  textInputValidationRules,
} from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";

interface IProps {
  personalInfo?: TSingleEmployee["personalInformation"];
  employeeId?: number;
}

export const PersonalInformation: React.FC<IProps> = ({
  personalInfo,
  employeeId,
}) => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const [disable, setDisable] = useState(true);
  const [selectedEligibility, setSelectedEligibility] =
    useState<TEmploymentEligibity>();

  const documentUrl = useCurrentFileUploadUrl("documentUrl");

  const enableEdit = () => {
    setDisable(!disable);
    message.success(
      disable ? "Editing enabled Successfully" : "Editing disabled successfully"
    );
  };
  const [errors, setErrors] = useState<{
    [key: string]: string | undefined;
  }>({});
  const [nationality, setNationality] = useState<string>("");
  const [countryId, setCountryId] = useState<number>();
  const [stateId, setStateId] = useState<number>();
  const [lgaId, setLgaId] = useState<number>();
  const [doesStateHaveLGAS, setDoesStateHaveLGAS] = useState(false);

  useEffect(() => {
    if (!personalInfo) return;
    setCountryId(personalInfo.address.countryId);
    setStateId(personalInfo.address.stateId);
    form.setFieldsValue({
      dob: personalInfo.dob ? moment(personalInfo.dob) : null,
      nationality: personalInfo.nationality,
      gender: personalInfo.gender,
      maritalStatus: personalInfo.maritalStatus,
      exchangeRateId: personalInfo.exchangeRateId,
      eligibility: personalInfo.eligibility,
      timezone: personalInfo.address.timezone,
      countryId: personalInfo.address.countryId,
      stateId: personalInfo.address.stateId,
      phone: {
        code: parsePhoneNumber(personalInfo.phoneNumber).code,
        number: parsePhoneNumber(personalInfo.phoneNumber).number,
      },
      lgaId: personalInfo.address.lgaId,
      streetAddress: personalInfo.address.streetAddress,
      passportExpirationDate: personalInfo.passportExpirationDate
        ? moment(personalInfo.passportExpirationDate)
        : null,
      alternativeEmail: personalInfo?.alternativeEmail,
      alternativePhoneNumber: {
        code: parsePhoneNumber(personalInfo.alternativePhoneNumber).code,
        number: parsePhoneNumber(personalInfo.alternativePhoneNumber).number,
      },
      nin: personalInfo?.nin,
      address: {
        timezone: personalInfo?.address.timezone,
        streetAddress: personalInfo?.address.streetAddress,
      },
    });
    setSelectedEligibility(
      personalInfo.eligibility as unknown as TEmploymentEligibity
    );
    setNationality(personalInfo.nationality);
    setCountryId(personalInfo?.address.countryId);
    setStateId(personalInfo?.address.stateId);
    setLgaId(personalInfo?.address.lgaId);
  }, [personalInfo, form]);

  const { mutate, isLoading } = useSaveEmployeePersonalInformation();

  const handleFinish = (data: any) => {
    if (!employeeId) return;
    setErrors((prev) => ({
      ...prev,
      country:
        typeof countryId === "undefined" ? "Please fill country!" : undefined,
      state:
        typeof stateId === "undefined" && typeof countryId === "number"
          ? "Please fill state!"
          : undefined,
      lga:
        typeof lgaId === "undefined" &&
        typeof countryId === "number" &&
        typeof stateId === "number" &&
        doesStateHaveLGAS
          ? "Please fill LGA!"
          : undefined,
    }));

    if (!countryId) return;
    if (!stateId) return;
    if (!lgaId && doesStateHaveLGAS) return;
    mutate(
      {
        employeeId,
        data: {
          dob: data?.dob?.format(DEFAULT_DATE_FORMAT),
          gender: data.gender,
          phoneNumber: formatPhoneNumber({
            code: data.phone.code,
            number: data.phone.number,
          }),
          eligibility: data.eligibility,
          exchangeRateId: data.exchangeRateId,
          maritalStatus: data.maritalStatus,
          nationality,
          address: { ...data.address, countryId, stateId, lgaId },

          validDocumentUrl: documentUrl,
          passportExpirationDate:
            data?.passportExpirationDate?.format(DEFAULT_DATE_FORMAT),
          alternativeEmail: data.alternativeEmail,
          alternativePhoneNumber: formatPhoneNumber({
            code: data.alternativePhoneNumber.code,
            number: data.alternativePhoneNumber.number,
          }),
          nin: data.nin,
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
              rules={[dateHasToBeLesserThanOrEqualToCurrentDayRule]}
            >
              <DatePicker className="w-full" format={DEFAULT_DATE_FORMAT} />
            </Form.Item>
            <Form.Item
              name="nationality"
              label="Nationality"
              rules={generalValidationRules}
            >
              <SelectCountry
                handleSelect={(_, country) =>
                  setNationality(country?.name ?? "")
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
                rules={generalValidationRules}
              >
                <DatePicker format={DEFAULT_DATE_FORMAT} className="w-full" />
              </Form.Item>
            )}
            {!disable && selectedEligibility === "expatriate" && (
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
            {disable && selectedEligibility === "expatriate" && (
              <Form.Item label="Supporting Document">
                <div className={`px-3 py-2 shadow rounded-sm bg-mainBg`}>
                  {personalInfo?.validDocumentUrl && (
                    <a
                      className="hover:text-caramel underline"
                      href={personalInfo?.validDocumentUrl}
                    >
                      Download Valid Document
                    </a>
                  )}
                  {!personalInfo?.validDocumentUrl && <span>No Document</span>}
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

            <Form.Item
              name="nin"
              label="National Identification Number"
              rules={generalValidationRules}
            >
              <Input className="w-full" />
            </Form.Item>
            <Form.Item
              name="alternativeEmail"
              rules={emailValidationRulesOp}
              label="Alternative Email"
            >
              <Input className="w-full" />
            </Form.Item>
            <FormPhoneInput
              Form={Form}
              control={{
                name: "alternativePhoneNumber",
                label: "Alternative Phone Number",
              }}
              optional
            />
            {/* TODO: Create a reusable address form component */}
            <>
              <Form.Item
                name="address"
                label="Address"
                className="md:col-span-2 lg:col-span-3"
              >
                <Input.Group className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Form.Item
                      noStyle
                      rules={textInputValidationRules}
                      name={["address", "streetAddress"]}
                    >
                      <Input.TextArea placeholder="Street Address" />
                    </Form.Item>
                  </div>
                  <Form.Item noStyle>
                    <SelectCountry
                      handleSelect={(val) => {
                        setCountryId(val);
                        setErrors((prev) => ({ ...prev, country: undefined }));
                      }}
                      onClear={() => {
                        setCountryId(undefined);
                        setStateId(undefined);
                        setLgaId(undefined);
                      }}
                      value={countryId}
                    />
                  </Form.Item>
                  <Form.Item noStyle>
                    <SelectState
                      countryId={countryId}
                      handleSelect={(val) => {
                        setStateId(val);
                        setErrors((prev) => ({ ...prev, state: undefined }));
                      }}
                      onClear={() => {
                        setStateId(undefined);
                        setLgaId(undefined);
                      }}
                      value={stateId}
                    />
                  </Form.Item>
                  <Form.Item noStyle>
                    <SelectLGA
                      stateId={stateId}
                      handleSelect={(val) => {
                        setLgaId(val);
                        setErrors((prev) => ({ ...prev, lga: undefined }));
                      }}
                      onClear={() => {
                        setLgaId(undefined);
                      }}
                      onFetchSuccess={(dataIsEmpty) =>
                        setDoesStateHaveLGAS(!dataIsEmpty)
                      }
                      value={lgaId}
                    />
                  </Form.Item>
                  <Form.Item
                    noStyle
                    name={["address", "timezone"]}
                    rules={generalValidationRules}
                  >
                    <Select
                      options={TIME_ZONES}
                      placeholder="Select Timezone"
                    />
                  </Form.Item>
                </Input.Group>
              </Form.Item>
              {/* errors */}
              <div className="flex flex-col gap-1 md:col-span-2 lg:col-span-3">
                {Object.values(errors)
                  .filter((item) => typeof item != "undefined")
                  .map((item, i) => (
                    <span key={i} className="text-sm text-red-500">
                      {item}
                    </span>
                  ))}
              </div>
            </>
            {!disable && (
              <div className="flex items-center justify-end md:col-span-2 lg:col-span-3">
                <AppButton
                  label="Save Changes"
                  isLoading={isLoading}
                  type="submit"
                />
              </div>
            )}
          </Form>
        </div>
      </div>
    </div>
  );
};
