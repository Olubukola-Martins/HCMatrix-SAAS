import { Button, Dropdown, Menu, Spin, Table } from "antd";
import { ColumnsType, TablePaginationConfig, TableProps } from "antd/lib/table";
import { TableRowSelection } from "antd/lib/table/interface";
import { MoreOutlined } from "@ant-design/icons";

import { openNotification } from "utils/notifications";
import { useResendEmployeeInvite } from "../../hooks/useResendEmployeeInvite";
import { TInvitedEmployee } from "../../types";
import { useApiAuth } from "hooks/useApiAuth";
import { useState } from "react";

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
  const { token, companyId } = useApiAuth();

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
        scroll={{ x: "max-content", y: 570 }}
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
