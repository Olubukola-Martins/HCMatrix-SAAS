import { Form, Switch, Input, Popconfirm, Skeleton } from "antd";
import { AppButton } from "components/button/AppButton";
import "../../assets/style.css";
import {
  QUERY_KEY_FOR_RECRUIT_NOTIFICATIONS,
  useGetNotifications,
} from "../hooks/useGetNotifications";
import { usePatchRecruitmentItem } from "../hooks/usePatchRecruitmentSettings";

export const RecruitmentNotification = () => {
  const { data, isLoading, error } = useGetNotifications();
  const { patchData } = usePatchRecruitmentItem({
    patchEndpointUrl: "settings/notifications",
    queryKey: QUERY_KEY_FOR_RECRUIT_NOTIFICATIONS,
  });
  const [form] = Form.useForm();
  console.log(data);
  const handleSwitchChange = (checked: boolean, id: number) => {
    patchData(id, checked);
  };

  return (
    <>
      <div className="bg-card rounded md:p-5 p-3">
        <h2 className="pb-5 font-medium text-base"> Notifications</h2>
        <div className="bg-mainBg py-4 px-4 rounded">
          <Form
            form={form}
            layout="vertical"
            requiredMark={false}
            // onFinish={handleSubmit}
            name="notificationsSettings"
          >
            {isLoading ? (
              <div className="recruitmentSettingsForm flex flex-col sm:gap-6 gap-9 ">
                <Skeleton active />
                <Skeleton active />
              </div>
            ) : error ? (
              <p className="text-red-600 text-xl">ERROR</p>
            ) : (
              <>
                {data?.map((result) => (
                  <div className="recruitmentSettingsForm" key={result.id}>
                    <h3 className="font-medium">{result.notification.title}</h3>
                    <div className="flex gap-5 items-center justify-end">
                      <Form.Item
                        valuePropName="checked"
                        name={result.name}
                        className="flex justify-end items-end"
                        noStyle
                      >
                        <Switch
                          defaultChecked={result.isActive}
                          onChange={(checked) =>
                            handleSwitchChange(checked, result.id)
                          }
                        />
                      </Form.Item>
                    </div>
                  </div>
                ))}
              </>
            )}

            <div className="flex justify-between self-center mt-5 w-96 ml-auto max-sm:w-full max-lg:w-80">
              <button
                className="text-base font-medium hover:text-caramel"
                type="reset"
              >
                Cancel
              </button>
              <AppButton type="submit" label="Add" />
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};
