import { Button } from "antd";

import React, { useState } from "react";
import { ColumnsType } from "antd/lib/table";

import { usePagination } from "hooks/usePagination";

import { TTaxAuthority } from "features/payroll/types";
import moment from "moment";
import { TableWithFocusType } from "components/table";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import DeleteTaxAuth from "./DeleteTaxAuth";
import EditTaxAuth from "./EditTaxAuth";
import { useGetTaxAuthorities } from "features/payroll/hooks/organization/taxAuthorities/useGetTaxAuthorities";

type TAction = "edit" | "delete";

const TaxAuthTable: React.FC<{
  categoryId?: number;
}> = ({ categoryId }) => {
  const [action, setAction] = useState<TAction>();
  const [taxAuth, setTaxAuth] = useState<TTaxAuthority>();
  const handleAction = ({
    action,
    data,
  }: {
    action: TAction;
    data: TTaxAuthority;
  }) => {
    setAction(action);
    setTaxAuth(data);
  };
  const cancelAction = () => {
    setAction(undefined);
    setTaxAuth(undefined);
  };
  const { pagination, onChange } = usePagination();

  const { data, isFetching } = useGetTaxAuthorities({
    pagination,
  });

  const columns: ColumnsType<TTaxAuthority> = [
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
      render: (_, item) => moment(item.createdAt).format(`YYYY-MM-DD`),
    },
    {
      title: "Updated At",
      dataIndex: "Updated At",
      key: "Updated At",
      render: (_, item) => moment(item.updatedAt).format(`YYYY-MM-DD`),
    },
    {
      title: "",
      dataIndex: "actions",
      key: "actions",
      render: (_, item) => (
        <div>
          <Button
            icon={<AiFillEdit />}
            type="text"
            onClick={() => handleAction({ action: "edit", data: item })}
          />
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
      {taxAuth && (
        <EditTaxAuth
          taxAuth={taxAuth}
          open={action === "edit"}
          handleClose={() => cancelAction()}
        />
      )}
      {taxAuth && (
        <DeleteTaxAuth
          taxAuth={taxAuth}
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

export default TaxAuthTable;
