import {
  Button,
  Checkbox,
  Form,
  Input,
  Select,
  Skeleton,
  Switch,
  Typography,
} from "antd";
import TransferOwnership from "components/transferOwnership/TransferOwnership";
import { useEffect, useState } from "react";

import { useQueryClient } from "react-query";
import { openNotification } from "utils/notifications";
import { AppButton } from "components/button/AppButton";
import { useFetchCountries } from "hooks/useFetchCountries";
import { TIME_ZONES } from "constants/timeZones";
import { DATE_FORMATS } from "constants/dateFormats";
import { TIME_FORMATS } from "constants/timeFormats";
import {
  emailValidationRules,
  emailValidationRulesOp,
  generalValidationRules,
} from "utils/formHelpers/validation";
import { CURRENCY_OPTIONS } from "constants/currencies";
import { useSaveCompanyParamSetting } from "../hooks/useSaveCompanyParamSetting";
import {
  QUERY_KEY_FOR_COMPANY_PARAMETER_SETTING,
  useGetCompanyParamSetting,
} from "../hooks/useGetCompanyParamSetting";
import { QUERY_KEY_FOR_AUTHENTICATED_USER } from "features/authentication/hooks/useGetAuthUser";

const parentCompStyle = "grid md:grid-cols-2 border-0 border-b gap-4 py-2";
const compStyle = "flex flex-col gap-2 items-start";

const CompanySettingsForm = () => {
  const [transferOwnershipModal, setTransferOwnershipModal] = useState(false);
  const queryClient = useQueryClient();
  const { data: countries, isFetching: isFetchingCountries } =
    useFetchCountries();
  const [adminEmail, setAdminEmail] = useState("");

  const { data: companyParams, isFetching: isFetchingCompanyParams } =
    useGetCompanyParamSetting();

  const [form] = Form.useForm();
  const { mutate, isLoading } = useSaveCompanyParamSetting();

  const handleSubmit = (data: any) => {
    mutate(
      {
        administrator: {
          adminEmail: adminEmail,
        },
        emailSettings: {
          defaultFromAddress: data.defaultFromAddress,
        },
        locationSettings: {
          country: data.country,
          timezone: data.timezone,
        },
        dateAndTimeSettings: {
          dateFormat: data.dateFormat,
          timeFormat: data.timeFormat,
        },
        profilePhotoSettings: {
          modifyUsersProfile: {
            administrator: data.modifyUsersProfile.includes("administrator"),
            employee: data.modifyUsersProfile.includes("employee"),
          },
        },
        notificationSettings: {
          email: data.notificationSettings.includes("email"),
          inApp: data.notificationSettings.includes("inApp"),
        },
        employeeSettings: {
          hideBirthday: !!data.hideBirthday,
          hidePhoneNumber: !!data.hidePhoneNumber,
          hideWorkAnniversary: !!data.hideWorkAnniversary,
        },
        currencySettings: {
          showCurrencySymbol: !!data.showCurrencySymbol,
          baseCurrency: data.baseCurrency,
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
            queryKey: [QUERY_KEY_FOR_COMPANY_PARAMETER_SETTING],
            // exact: true,
          });
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_AUTHENTICATED_USER],
            // exact: true,
          });
        },
      }
    );
  };
  useEffect(() => {
    if (companyParams) {
      const data = companyParams.value;
      setAdminEmail(data.administrator.adminEmail);
      form.setFieldsValue({
        adminEmail: data.administrator.adminEmail,
        defaultFromAddress: data.emailSettings.defaultFromAddress,
        country: data.locationSettings.country,
        timezone: data.locationSettings.timezone,
        dateFormat: data.dateAndTimeSettings.dateFormat,
        timeFormat: data.dateAndTimeSettings.timeFormat,
        hideBirthday: data.employeeSettings.hideBirthday,
        hidePhoneNumber: data.employeeSettings.hidePhoneNumber,
        hideWorkAnniversary: data.employeeSettings.hideWorkAnniversary,
        baseCurrency: data.currencySettings?.baseCurrency,
        showCurrencySymbol: data.currencySettings?.showCurrencySymbol,
        modifyUsersProfile: [
          data.profilePhotoSettings.modifyUsersProfile.administrator
            ? "administrator"
            : "",
          data.profilePhotoSettings.modifyUsersProfile.employee
            ? "employee"
            : "",
        ].filter((item) => item !== ""),
        notificationSettings: [
          data.notificationSettings.email ? "email" : "",
          data.notificationSettings.inApp ? "inApp" : "",
        ].filter((item) => item !== ""),
      });
    }
  }, [form, companyParams]);

  return (
    <Skeleton
      active
      loading={isFetchingCompanyParams || isFetchingCountries}
      paragraph={{ rows: 8 }}
    >
      <TransferOwnership
        open={transferOwnershipModal}
        handleClose={() => setTransferOwnershipModal(false)}
      />

      <Form
        className="flex flex-col gap-4"
        form={form}
        onFinish={handleSubmit}
        requiredMark={false}
      >
        <div className="flex flex-col gap-y-12 py-4">
          {/* 1 */}
          <div className={parentCompStyle}>
            <div className={compStyle}>
              <Typography.Title level={5}>Administrator</Typography.Title>
              <Form.Item
                label="Admin Email"
                name={`adminEmail`}
                className="w-3/4"
                rules={
                  !!companyParams?.value.administrator.adminEmail
                    ? emailValidationRulesOp
                    : emailValidationRules
                }
              >
                <Input
                  onChange={(e) => setAdminEmail(e.target.value)}
                  disabled={!!companyParams?.value.administrator.adminEmail}
                  value={adminEmail}
                />
              </Form.Item>
              {!!companyParams?.value.administrator.adminEmail && (
                <Button
                  type="text"
                  className="items-start"
                  onClick={() => setTransferOwnershipModal(true)}
                >
                  <span className="text-caramel text-xs">
                    TRANSFER ADMIN RIGHTS
                  </span>
                </Button>
              )}
            </div>
            <div className={compStyle}>
              <Typography.Title level={5}>Email Settings</Typography.Title>
              <Form.Item
                label="Default From Address"
                name={`defaultFromAddress`}
                className="w-3/4"
                rules={emailValidationRules}
              >
                <Input />
              </Form.Item>
            </div>
          </div>
          {/* 2 */}
          <div className={parentCompStyle}>
            <Typography.Title level={5} className="md:col-span-2">
              Location Settings
            </Typography.Title>

            <div className={compStyle}>
              <Form.Item
                label="Country"
                name={`country`}
                className="w-3/4"
                rules={generalValidationRules}
              >
                <Select
                  options={countries?.map((item) => ({
                    label: item.name,
                    value: item.name,
                  }))}
                />
              </Form.Item>
            </div>
            <div className={compStyle}>
              <Form.Item
                label="Time Zone"
                name={`timezone`}
                className="w-2/4"
                rules={generalValidationRules}
              >
                <Select options={TIME_ZONES} />
              </Form.Item>
            </div>
          </div>
          {/* 3 */}
          <div className={parentCompStyle}>
            <Typography.Title level={5} className="md:col-span-2">
              Date & Time Settings
            </Typography.Title>

            <div className={compStyle}>
              <Form.Item
                label="Date Format"
                name={`dateFormat`}
                className="w-2/4"
                rules={generalValidationRules}
              >
                <Select options={DATE_FORMATS} />
              </Form.Item>
            </div>
            <div className={compStyle}>
              <Form.Item
                label="Time Format"
                name={`timeFormat`}
                className="w-2/4"
                rules={generalValidationRules}
              >
                <Select options={TIME_FORMATS} />
              </Form.Item>
            </div>
          </div>
          {/* 4*/}
          <div className={parentCompStyle}>
            <div className={compStyle}>
              <Typography.Title level={5}>
                Profile photo settings
              </Typography.Title>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Who is able to modify user's profile?"
                name={`modifyUsersProfile`}
              >
                <Checkbox.Group
                  className="capitalize"
                  options={["administrator", "employee"]}
                  defaultValue={["employee"]}
                />
              </Form.Item>
            </div>
          </div>
          {/* 5*/}
          <div className={parentCompStyle}>
            <div className={compStyle}>
              <Typography.Title level={5}>
                Notifications Settings
              </Typography.Title>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Select the channels you would like to receive notifications through?"
                name={`notificationSettings`}
              >
                <Checkbox.Group options={["email", "inApp"]} />
              </Form.Item>
            </div>
          </div>
          {/* 6*/}
          <div className={parentCompStyle}>
            <Typography.Title level={5} className="mb-4 md:col-span-2">
              Employee Settings
            </Typography.Title>
            <Form.Item
              label="Allow users to hide birthday?"
              name={`hideBirthday`}
              colon={false}
              className="w-3/4"
            >
              <Switch
                unCheckedChildren="No"
                checkedChildren="Yes"
                defaultChecked={
                  companyParams?.value.employeeSettings.hideBirthday
                }
              />
            </Form.Item>
            <Form.Item
              label="Allow users to hide mobile number?"
              name={`hidePhoneNumber`}
              colon={false}
              className="w-3/4"
            >
              <Switch
                unCheckedChildren="No"
                checkedChildren="Yes"
                defaultChecked={
                  companyParams?.value.employeeSettings.hidePhoneNumber
                }
              />
            </Form.Item>
            <Form.Item
              label="Allow users to hide work anniversary?"
              name={`hideWorkAnniversary`}
              colon={false}
              className="w-3/4"
            >
              <Switch
                unCheckedChildren="No"
                checkedChildren="Yes"
                defaultChecked={
                  companyParams?.value.employeeSettings.hideWorkAnniversary
                }
              />
            </Form.Item>
          </div>
          {/* 7*/}
          <div className={parentCompStyle}>
            <Typography.Title level={5} className="mb-4 md:col-span-2">
              Currency Settings
            </Typography.Title>
            <Form.Item
              label="What is your base currency ?"
              name={`baseCurrency`}
              colon={false}
              className="w-3/4"
            >
              <Select placeholder="Base Currency" options={CURRENCY_OPTIONS} />
            </Form.Item>
            <Form.Item
              label="Do you want to show currency symbol ?"
              name={`showCurrencySymbol`}
              colon={false}
              className="w-3/4"
            >
              <Switch
                unCheckedChildren="No"
                checkedChildren="Yes"
                defaultChecked={
                  companyParams?.value?.currencySettings?.showCurrencySymbol
                }
              />
            </Form.Item>
          </div>
        </div>
        <div className="flex justify-end">
          <Form.Item>
            <AppButton label="Save" type="submit" isLoading={isLoading} />
          </Form.Item>
        </div>
      </Form>
    </Skeleton>
  );
};

export default CompanySettingsForm;
