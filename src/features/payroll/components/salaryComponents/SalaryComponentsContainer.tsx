import { Button, Table, Switch } from "antd";
import { ColumnsType } from "antd/lib/table";
import { AppButton } from "components/button/AppButton";
import { usePagination } from "hooks/usePagination";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import React, { useState } from "react";
import { AddSalaryComponent } from "./AddSalaryComponent";

import {
  TSalaryComponent,
  TSalaryComponentInput,
} from "features/payroll/types/salaryComponents";
import DeleteSalaryComponent from "./DeleteSalaryComponent";
import { EditSalaryComponent } from "./EditSalaryComponent";

interface IProps {
  loading?: boolean;
  type?: "allowance" | "deduction";
  schemeId?: number;
  showControlBtns?: boolean;
  components?: TSalaryComponent[];
  dependencies?: TSalaryComponent[];
  handleAddSalaryComponent?: (props: TSalaryComponentInput) => void; // TODO: START HERE
  handleDeleteSalaryComponent?: (props: TSalaryComponent) => void;
  handleEditSalaryComponent?: (props: TSalaryComponent) => void;
}

export const SalaryComponentsContainer: React.FC<IProps> = ({
  loading,
  showControlBtns = true,
  components = [],
  dependencies = [],
  handleAddSalaryComponent,
  handleDeleteSalaryComponent,
  handleEditSalaryComponent,
  schemeId,
  type = "allowance",
}) => {
  const { pagination, onChange } = usePagination();
  const [showD, setShowD] = useState<
    "add-comp" | "delete-comp" | "edit-comp"
  >();
  const [salaryComponent, setSalaryComponent] = useState<TSalaryComponent>();
  const ogColumns: ColumnsType<TSalaryComponent> = [
    {
      title: "Name",
      dataIndex: "Name",
      key: "Name",
      render: (_, item) => <span className="capitalize">{item.name}</span>,
    },
    {
      title: "Identifier",
      dataIndex: "Identifier",
      key: "Identifier",
      render: (_, item) => item.name.trim().split(" ").join("_"),
    },
    {
      title: "Calculation Type",
      dataIndex: "Calculation Type",
      key: "Calculation Type",
      render: (_, item) => <span className="capitalize">{item.mode}</span>,

      // ellipsis: true,

      // width: 100,
    },
    {
      title: "Amount",
      dataIndex: "Amount",
      key: "Amount",
      ellipsis: true,
      render: (_, item) => <span className="">{item.amount}</span>,
    },
    {
      title: "Display on Review Table",
      dataIndex: "Display on Review Table",
      key: "Display on Review Table",
      ellipsis: true,
      render: (_, item) => (
        <span className="">
          {item.shouldDisplayOnReviewTable ? "Yes" : "No"}
        </span>
      ),
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
              onClick={() => {
                setShowD("edit-comp");
                setSalaryComponent(item);
              }}
            />
            <Button
              icon={<DeleteFilled />}
              type="text"
              onClick={() => {
                setShowD("delete-comp");
                setSalaryComponent(item);
              }}
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
  const columns = showControlBtns
    ? ogColumns
    : ogColumns.filter((item) => item.key !== "action");

  return (
    <>
      <AddSalaryComponent
        open={showD === "add-comp"}
        handleClose={() => setShowD(undefined)}
        handleSave={handleAddSalaryComponent}
        dependencies={dependencies.map((item) => item.label)}
        schemeId={schemeId}
        type={type}
      />
      {salaryComponent && (
        <DeleteSalaryComponent
          type={type}
          open={showD === "delete-comp"}
          salaryComponent={salaryComponent}
          handleClose={() => setShowD(undefined)}
          handleDelete={handleDeleteSalaryComponent}
        />
      )}
      {salaryComponent && (
        <AddSalaryComponent
          formMode="edit"
          type={type}
          open={showD === "edit-comp"}
          salaryComponent={salaryComponent}
          handleClose={() => setShowD(undefined)}
          handleSave={undefined}
          dependencies={dependencies.map((item) => item.label)}
        />
      )}
      <div className="flex flex-col gap-4">
        {/* btns */}
        {showControlBtns && (
          <div className="flex justify-end">
            {/* <AppButton label="Delete" variant="transparent" /> */}
            <div className="flex gap-2">
              {/* <AppButton label="Bulk Upload" variant="transparent" /> */}
              <AppButton
                label={`Add ${type}`}
                handleClick={() => setShowD("add-comp")}
              />
            </div>
          </div>
        )}
        {/* table */}
        <Table
          columns={columns}
          size="small"
          dataSource={components}
          pagination={{
            ...pagination,
            total: components.length,
          }}
          onChange={onChange}
          loading={loading}
        />
      </div>
    </>
  );
};
