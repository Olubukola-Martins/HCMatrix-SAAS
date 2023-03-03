import { Form, Select, Spin, Switch } from "antd";
import { useFetchEmployees } from "APIRQHooks/Utility/employeeHooks";
import { useAddMemberToGroup } from "APIRQHooks/Utility/groupHooks";
import { IAuthDets } from "AppTypes/Auth";
import { TGroup } from "AppTypes/DataEntitities";
import { GlobalContext } from "Contexts/GlobalContextProvider";
import Button from "GeneralComps/Button";
import { openNotification } from "NotificationHelpers";
import React, { useContext, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import { useQueryClient } from "react-query";

interface IProps {
  group: TGroup;
}

export const AddMemberToGroupForm: React.FC<IProps> = ({ group }) => {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  const auth = useAuthUser();
  const authDetails = auth() as unknown as IAuthDets;

  const token = authDetails.userToken;
  const globalCtx = useContext(GlobalContext);
  const { state: globalState } = globalCtx;
  const companyId = globalState.currentCompany?.id as unknown as string;
  const [empSearch, setEmpSearch] = useState<string>("");
  const { data: empData, isSuccess: isEmpSuccess } = useFetchEmployees({
    companyId,
    pagination: {
      limit: 100, //temp suppose to allow search
      offset: 0,
    },
    searchParams: {
      name: empSearch,
    },

    token,
  });
  const { mutate, isLoading } = useAddMemberToGroup();

  const handleSubmit = (data: any) => {
    if (companyId && group) {
      mutate(
        {
          id: group.id as number,
          companyId,

          token,

          employeeId: data.employeeId,
          isLead: data.isLead,
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

            queryClient.invalidateQueries({
              queryKey: ["single-group-members", group.id],
              // exact: true,
            });
          },
        }
      );
    }
  };

  return (
    <div className="">
      <Form layout="vertical" onFinish={handleSubmit}>
        <div className="flex gap-4 w-full">
          <Form.Item name="employeeId" label="Employee" className="flex-1">
            <Select
              onSearch={(val) => setEmpSearch(val)}
              showSearch
              value={empSearch}
              defaultActiveFirstOption={false}
              showArrow={false}
              filterOption={false}
              // onChange={handleChange}
              notFoundContent={null}
            >
              {isEmpSuccess ? (
                empData.data.map((item) => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.firstName} {item.lastName}
                  </Select.Option>
                ))
              ) : (
                <div className="flex justify-center items-center w-full">
                  <Spin size="small" />
                </div>
              )}
            </Select>
          </Form.Item>
          <Form.Item
            name="isLead"
            label="Is member a lead?"
            className="flex-auto"
          >
            <Switch unCheckedChildren="No" checkedChildren="Yes" />
          </Form.Item>
          <Form.Item label=".">
            <Button type="submit" label="Save" isLoading={isLoading} />
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};
