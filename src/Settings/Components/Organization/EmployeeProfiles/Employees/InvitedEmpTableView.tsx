import { Button, Dropdown, Menu, Spin, Table } from "antd";
import { TInvitedEmployee } from "../../../../../AppTypes/DataEntitities";
import { ColumnsType, TablePaginationConfig, TableProps } from "antd/lib/table";
import { TableRowSelection } from "antd/lib/table/interface";
import { MoreOutlined } from "@ant-design/icons";
import { employeeStatusColor } from "../../../../../GeneralHelpers/employeeHelpers";
import { useResendEmployeeInvite } from "APIRQHooks/Utility/employeeHooks";
import { IAuthDets } from "AppTypes/Auth";
import { GlobalContext } from "Contexts/GlobalContextProvider";
import { useContext, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import { openNotification } from "NotificationHelpers";

interface IProps {
  employees: TInvitedEmployee[];
  loading: boolean;
  pagination?: TablePaginationConfig;
  rowSelection: TableRowSelection<TInvitedEmployee>;
  onChange?: TableProps<TInvitedEmployee>["onChange"];
}

const InvitedEmpTableView = ({
  employees,
  loading,
  pagination,
  rowSelection,
  onChange,
}: IProps) => {
  const auth = useAuthUser();

  const authDetails = auth() as unknown as IAuthDets;

  const token = authDetails.userToken;
  const globalCtx = useContext(GlobalContext);
  const { state: globalState } = globalCtx;
  const companyId = globalState.currentCompany?.id as unknown as string;
  const [inviteId, setInviteId] = useState<number>(0);
  useResendEmployeeInvite({
    companyId,
    id: inviteId,
    token,
    onSuccess: (res: any) => {
      openNotification({
        state: "success",

        title: "Success",
        description: res.data.message,
        // duration: 0.4,
      });
    },
  });
  const resendInvite = (id: number) => {
    setInviteId(id);
    openNotification({
      state: "info",
      title: "Wait a second ...",
      description: <Spin />,
    });
  };
  const columns: ColumnsType<TInvitedEmployee> = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Last Sent",
      dataIndex: "lastSent",
      key: "lastSent",
      width: 120,
    },

    {
      title: "Action",
      key: "Action",
      width: 100,
      fixed: "right",
      render: (_: any, record) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item onClick={() => resendInvite(record.id)} key="kk">
                Resend Invite
              </Menu.Item>
            </Menu>
          }
          trigger={["click"]}
        >
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];
  return (
    <div>
      <Table
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        columns={columns}
        dataSource={employees.map((item) => ({ ...item, key: item.id }))}
        scroll={{ x: "max-content" }}
        loading={loading}
        className="mt-5"
        size="small"
        pagination={pagination}
        onChange={onChange}
      />
    </div>
  );
};

export default InvitedEmpTableView;
