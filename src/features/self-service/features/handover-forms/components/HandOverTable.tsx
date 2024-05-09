import { TApprovalStatus } from "types/statuses";
import type { ColumnsType } from "antd/es/table";
import { usePagination } from "hooks/usePagination";
import { Button, Dropdown, Menu, Table } from "antd";
import { useApiAuth } from "hooks/useApiAuth";
import moment from "moment";
import { getAppropriateColorForStatus } from "utils/colorHelpers/getAppropriateColorForStatus";
import { getEmployeeFullName } from "features/core/employees/utils/getEmployeeFullName";
import { useGetExitHandOverForms } from "../hooks/useGetExitHandOverForms";
import { Link } from "react-router-dom";
import { TTHandOverForm } from "../types";
import { DEFAULT_DATE_FORMAT } from "constants/dateFormats";
import { appRoutes } from "config/router/paths";
import { useState } from "react";
import { MoreOutlined } from "@ant-design/icons";
import ViewApprovalStages from "features/core/workflows/components/approval-request/ViewApprovalStages";

type TAction = "view-approval-stages";

export const HandOverTable: React.FC<{
  status?: TApprovalStatus;
  employeeId?: number;
}> = ({ status, employeeId }) => {
  const [request, setRequest] = useState<TTHandOverForm>();
  const [action, setAction] = useState<TAction>();
  const handleAction = (key: TAction, item?: TTHandOverForm) => {
    setAction(key);
    setRequest(item);
  };
  const onClose = () => {
    setAction(undefined);
    setRequest(undefined);
  };
  const { companyId, token } = useApiAuth();
  const { pagination, onChange } = usePagination({
    pageSize: 4,
  });

  const { data, isFetching } = useGetExitHandOverForms({
    companyId,
    token,
    pagination: {
      limit: pagination.limit,
      offset: pagination.offset,
    },
    status,
    employeeId,
  });

  const columns: ColumnsType<TTHandOverForm> = [
    {
      title: "Employee Name",
      dataIndex: "emp",
      key: "emp",
      render: (_, item) => (
        <Link to={appRoutes.handOverDetails(item.id).path}>
          <span className="capitalize text-caramel">
            {getEmployeeFullName(item.employee)}{" "}
          </span>
        </Link>
      ),
    },
    {
      title: "Seperation Date",
      dataIndex: "date",
      key: "date",
      render: (_, item) => (
        <span>{moment(item.separationDate).format(DEFAULT_DATE_FORMAT)} </span>
      ),
    },
    {
      title: "Employee ID",
      dataIndex: "emp_uid",
      key: "emp_uid",
      render: (_, item) => (
        <span className="capitalize">{item.employee.empUid} </span>
      ),
    },

    {
      title: "Reason",
      dataIndex: "reas",
      key: "reas",
      ellipsis: true,
      render: (_, item) => (
        <span className="capitalize">{item.reasonForLeaving}</span>
      ),
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, item) => (
        <span style={{ color: getAppropriateColorForStatus(item.status) }}>
          {item.status}{" "}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, item) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item
                key="stages"
                onClick={() => {
                  handleAction("view-approval-stages", item);
                }}
              >
                View Stages
              </Menu.Item>
            </Menu>
          }
          trigger={["click"]}
        >
          <Button title="Actions" icon={<MoreOutlined />} type="text" />
        </Dropdown>
      ),
    },
  ];

  return (
    <div>
      {request && (
        <ViewApprovalStages
          handleClose={onClose}
          open={action === "view-approval-stages"}
          id={request?.id}
          type="exit-handover-form"
        />
      )}
      <Table
        size="small"
        dataSource={data?.data}
        loading={isFetching}
        columns={columns}
        pagination={{ ...pagination, total: data?.total }}
        onChange={onChange}
      />
    </div>
  );
};
