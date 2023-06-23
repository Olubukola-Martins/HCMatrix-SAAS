import { Button, Table, Switch } from "antd";
import { ColumnsType } from "antd/lib/table";
import { AppButton } from "components/button/AppButton";
import { usePagination } from "hooks/usePagination";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import React, { useState } from "react";
import { AddSalaryComponent } from "./AddSalaryComponent";
import { TSalaryComponent } from "features/payroll/types";
import { ALLOWANNCES } from "features/payroll/constants";

interface IProps {
  showControlBtns?: boolean;
}

export const SalaryComponentsContainer: React.FC<IProps> = ({
  showControlBtns = true,
}) => {
  const { pagination, onChange } = usePagination();
  const columns: ColumnsType<TSalaryComponent> = [
    {
      title: "Name",
      dataIndex: "uid",
      key: "uid",
      render: (_, item) => item.name,
    },
    {
      title: "Identifier",
      dataIndex: "id",
      key: "id",
      render: (_, item) => item.name.trim().split(" ").join("_"),
    },
    {
      title: "Calculation Type",
      dataIndex: "asty",
      key: "asty",
      render: (_, item) => (
        <span className="capitalize">
          {+item.formula >= 0 || +item.formula < 0 ? "Fixed Amount" : "Formula"}
        </span>
      ),

      // ellipsis: true,

      // width: 100,
    },
    {
      title: "Amount",
      dataIndex: "State",
      key: "State",
      ellipsis: true,
      render: (_, item) => <span className="">{item.formula}</span>,
    },
    {
      title: "Action",
      key: "action",
      width: 100,

      render: (_, item) =>
        showControlBtns ? (
          <div className="flex gap-4">
            <Button
              icon={<EditFilled />}
              type="text"
              // onClick={() => handleEdit(item._id)}
            />
            <Button
              icon={<DeleteFilled />}
              type="text"
              // onClick={() => handleEdit(item._id)}
            />
          </div>
        ) : (
          <div>
            <Switch
              defaultChecked={true}
              unCheckedChildren="Deactivated"
              checkedChildren={`Activated`}
            />
          </div>
        ),
    },
  ];
  const [showD, setShowD] = useState(false);
  return (
    <>
      <AddSalaryComponent
        open={showD}
        handleClose={() => setShowD(false)}
        handleSave={() => {}}
        dependencies={ALLOWANNCES.map((item) => item.identifier)}
      />
      <div className="flex flex-col gap-4">
        {/* btns */}
        {showControlBtns && (
          <div className="flex justify-between">
            <AppButton label="Delete" variant="transparent" />
            <div className="flex gap-2">
              <AppButton label="Bulk Upload" variant="transparent" />
              <AppButton
                label="Add Allowance"
                handleClick={() => setShowD(true)}
              />
            </div>
          </div>
        )}
        {/* table */}
        <Table
          columns={columns}
          size="small"
          dataSource={ALLOWANNCES}
          pagination={{ ...pagination, total: ALLOWANNCES.length }}
          onChange={onChange}
        />
      </div>
    </>
  );
};
