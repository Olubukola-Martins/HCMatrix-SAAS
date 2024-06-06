import { Button } from "antd";

import React, { useState } from "react";
import { ColumnsType } from "antd/lib/table";

import { usePagination } from "hooks/usePagination";

import moment from "moment";
import { TableWithFocusType } from "components/table";
import { AiFillDelete } from "react-icons/ai";
import { TPensionAdministrator } from "features/payroll/types";
import EditPensionAdmin from "./EditPensionAdmin";
import DeletePensionAdmin from "./DeletePensionAdmin";
import { useGetPensionAdmins } from "features/payroll/hooks/organization/pensionAdministrators/useGetPensionAdmins";
import { DEFAULT_DATE_FORMAT } from "constants/dateFormats";

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
      title: "Created At",
      dataIndex: "Created At",
      key: "Created At",
      render: (_, item) => moment(item.createdAt).format(DEFAULT_DATE_FORMAT),
    },
    {
      title: "Updated At",
      dataIndex: "update",
      key: "update",
      render: (_, item) => moment(item.updatedAt).format(DEFAULT_DATE_FORMAT),
    },
    {
      title: "",
      dataIndex: "actions",
      key: "actions",
      render: (_, item) => (
        <div>
          {/* <Button
            icon={<AiFillEdit />}
            type="text"
            onClick={() => handleAction({ action: "edit", data: item })}
          /> */}
          <Button
            icon={<AiFillDelete />}
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
      <TableWithFocusType
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
