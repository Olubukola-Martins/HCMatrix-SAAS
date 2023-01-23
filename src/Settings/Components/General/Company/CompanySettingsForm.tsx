import {
  Button,
  Checkbox,
  Form,
  Input,
  Select,
  Switch,
  Typography,
} from "antd";
import TransferOwnership from "Layout/Components/TransferOwnership";
import React, { useContext, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import { GlobalContext } from "../../../../Contexts/GlobalContextProvider";

const parentCompStyle = "grid md:grid-cols-2 border-0 border-b gap-4 py-2";
const compStyle = "flex flex-col gap-2 items-start";

const CompanySettingsForm = () => {
  const [transferOwnershipModal, setTransferOwnershipModal] = useState(false);
  const auth = useAuthUser();
  const authDetails = auth();
  const companies = authDetails?.companies;
  const globalCtx = useContext(GlobalContext);
  const { state: globalState } = globalCtx;
  const currentCompanyId = globalState.currentCompany?.id;
  const currentCompany = companies.find(
    (item: any) => (item.id = currentCompanyId)
  );
  return (
    <div>
      {/* transfer ownership */}
      <TransferOwnership
        open={transferOwnershipModal}
        handleClose={() => setTransferOwnershipModal(false)}
      />
      <Form
        className="flex flex-col gap-4"
        initialValues={{
          adminEmail: currentCompany.email,
        }}
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
              >
                <Input disabled />
              </Form.Item>
              <Button
                type="text"
                className="items-start"
                onClick={() => setTransferOwnershipModal(true)}
              >
                <span className="text-caramel text-xs">
                  TRANSFER ADMIN RIGHTS
                </span>
              </Button>
            </div>
            <div className={compStyle}>
              <Typography.Title level={5}>Email Settings</Typography.Title>
              <Form.Item
                label="Default From Address"
                name={`defaultFromAddress`}
                className="w-3/4"
              >
                <Select>
                  <Select.Option value="cars@tfml.com">
                    cars@tfml.com
                  </Select.Option>
                </Select>
              </Form.Item>
            </div>
          </div>
          {/* 2 */}
          <div className={parentCompStyle}>
            <Typography.Title level={5} className="md:col-span-2">
              Location Settings
            </Typography.Title>

            <div className={compStyle}>
              <Form.Item label="Country" name={`country`} className="w-3/4">
                <Select>
                  <Select.Option value="Tanzania">Tanzania</Select.Option>
                </Select>
              </Form.Item>
            </div>
            <div className={compStyle}>
              <Form.Item label="Time Zone" name={`timeZone`} className="w-2/4">
                <Select>
                  <Select.Option value="cars@tfml.com">
                    West Africa
                  </Select.Option>
                </Select>
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
              >
                <Select>
                  <Select.Option value="YYYY/MM/DD">YYYY/MM/DD</Select.Option>
                  <Select.Option value="YYYY-MM-DD">YYYY-MM-DD</Select.Option>
                </Select>
              </Form.Item>
            </div>
            <div className={compStyle}>
              <Form.Item
                label="Time Format"
                name={`timeFormat`}
                className="w-2/4"
              >
                <Select>
                  <Select.Option value="12hrs">12 - Hour(s)</Select.Option>
                  <Select.Option value="24hrs">24 - Hour(s)</Select.Option>
                </Select>
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
                name={`ableToModifyUserProfile`}
              >
                <Checkbox.Group
                  options={["Administator", "Employee"]}
                  defaultValue={["Employee"]}
                />
              </Form.Item>
            </div>
            <div className={compStyle}>
              <Typography.Title level={5}>Chat Settings</Typography.Title>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Would you like to enable the chat feature ?"
                name={`enableChatFeature`}
                className="w-3/4"
              >
                <Switch unCheckedChildren="No" checkedChildren="Yes" />
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
                name={`notificationChannels`}
              >
                <Checkbox.Group
                  options={["email", "in-app"]}
                  defaultValue={["in-app"]}
                />
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
              name={`allowUserToHideBirthday`}
              colon={false}
              className="w-3/4"
            >
              <Switch unCheckedChildren="No" checkedChildren="Yes" />
            </Form.Item>
            <Form.Item
              label="Allow users to hide mobile number?"
              name={`allowUserToHideMobileNo`}
              colon={false}
              className="w-3/4"
            >
              <Switch unCheckedChildren="No" checkedChildren="Yes" />
            </Form.Item>
            <Form.Item
              label="Allow users to hide work anniversary?"
              name={`allowUserToHideWorkAnniversary`}
              colon={false}
              className="w-3/4"
            >
              <Switch unCheckedChildren="No" checkedChildren="Yes" />
            </Form.Item>
          </div>
        </div>
        <div className="flex justify-end">
          <Form.Item>
            <button className="button" type="submit">
              Save
            </button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default CompanySettingsForm;
