import { Button, Table } from "antd";

import React, { useState } from "react";
import { ColumnsType } from "antd/lib/table";

import { usePagination } from "hooks/usePagination";

import moment from "moment";

import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { TPensionAdministrator } from "features/payroll/types";
import EditPensionAdmin from "./EditPensionAdmin";
import DeletePensionAdmin from "./DeletePensionAdmin";
import { useGetPensionAdmins } from "features/payroll/hooks/organization/pensionAdministrators/useGetPensionAdmins";

type TAction = "edit" | "delete";

const PensionAdminTable: React.FC<{
  categoryId?: number;
}> = ({ categoryId }) => {
  const [action, setAction] = useState<TAction>();
  const [pensionAdmin, setPensionAdmin] = useState<TPensionAdministrator>();
  const handleAction = ({
    action,
    data,
  }: {
    action: TAction;
    data: TPensionAdministrator;
  }) => {
    setAction(action);
    setPensionAdmin(data);
  };
  const cancelAction = () => {
    setAction(undefined);
    setPensionAdmin(undefined);
  };
  const { pagination, onChange } = usePagination();

  const { data, isFetching } = useGetPensionAdmins({
    pagination,
  });

  const columns: ColumnsType<TPensionAdministrator> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (val, item) => <span className="capitalize">{item?.name}</span>,
    },

    {
      title: "Employee Count",
      dataIndex: "pay",
      key: "pay",
      render: (_, item) => 0,
    },
    {
      title: "Created At",
      dataIndex: "createAr",
      key: "createAr",
      render: (_, item) => moment(item.createdAt).format(`YYYY-MM-DD`),
    },
    {
      title: "Updated At",
      dataIndex: "update",
      key: "update",
      render: (_, item) => moment(item.updatedAt).format(`YYYY-MM-DD`),
    },
    {
      title: "",
      dataIndex: "actions",
      key: "actions",
      render: (_, item) => (
        <div>
          <Button
            icon={<EditFilled />}
            type="text"
            onClick={() => handleAction({ action: "edit", data: item })}
          />
          <Button
            icon={<DeleteFilled />}
            type="text"
            onClick={() => handleAction({ action: "delete", data: item })}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      {pensionAdmin && (
        <EditPensionAdmin
          pensionAdmin={pensionAdmin}
          open={action === "edit"}
          handleClose={() => cancelAction()}
        />
      )}
      {pensionAdmin && (
        <DeletePensionAdmin
          pensionAdmin={pensionAdmin}
          open={action === "delete"}
          handleClose={() => cancelAction()}
        />
      )}
      <Table
        columns={columns}
        size="small"
        dataSource={data?.data}
        loading={isFetching}
        pagination={{ ...pagination, total: data?.total }}
        onChange={onChange}
      />
    </>
  );
};

export default PensionAdminTable;
