import { Input, Space, Spin, Table } from "antd";
import React, { useState } from "react";
import { ColumnsType } from "antd/lib/table";
import { AddDependents } from "./AddDependents";

import { EditDependant } from "./EditDependent";

import { useQueryClient } from "react-query";
import { useDeleteDependantOfEmployee } from "features/core/employees/hooks/useDeleteDependantOfEmployee";
import { TEmployee, TEmployeeDependant } from "features/core/employees/types";
import { useApiAuth } from "hooks/useApiAuth";
import moment from "moment";
import { openNotification } from "utils/notifications";

interface IProps {
  employee?: TEmployee;
}
export const Dependents: React.FC<IProps> = ({ employee }) => {
  const queryClient = useQueryClient();
  const { token, companyId } = useApiAuth();

  const [action, setAction] = useState<"edit" | "add">();
  const [dependent, setDependent] = useState<TEmployeeDependant>();
  const { mutate } = useDeleteDependantOfEmployee();
  const handleDelete = (dependentId: number) => {
    if (companyId && employee && dependentId) {
      // return;
      openNotification({
        state: "info",
        title: "Wait a second ...",
        description: <Spin />,
      });
      mutate(
        {
          employeeId: employee.id,
          companyId,
          token,
          dependantId: dependentId,
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
            const result = res.data.data;

            openNotification({
              state: "success",

              title: "Success",
              description: res.data.message,
              // duration: 0.4,
            });

            queryClient.invalidateQueries({
              queryKey: ["single-employee", employee.id],
              // exact: true,
            });
          },
        }
      );
    }
  };
  const [searchResult, setSearchResult] = useState<TEmployeeDependant[]>();
  const handleSearch = (val: string) => {
    const searchTerm = val.toLowerCase();
    if (val === "") {
      //onClear
      setSearchResult(undefined);
    }
    if (employee?.dependents) {
      const data = employee.dependents.filter(
        (item) => item.fullName.toLowerCase().indexOf(searchTerm) !== -1
      );
      setSearchResult(data);
    }
  };
  const columns: ColumnsType<TEmployeeDependant> = [
    {
      title: "Name",
      dataIndex: "fullName",
    },
    {
      title: "Date Of Birth",
      dataIndex: "dob",
      render: (val) => moment(val).format("YYYY/MM/DD"),
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
    },
    {
      title: "Relationship",
      dataIndex: "relationship",
      render: (val) => <span className="capitalize">{val}</span>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <i
            className="ri-pencil-line text-lg cursor-pointer"
            onClick={() => {
              setDependent(record);
              setAction("edit");
            }}
          />
          <i
            className="ri-delete-bin-line text-xl cursor-pointer"
            onClick={() => handleDelete(record.id)}
          />
        </Space>
      ),
    },
  ];
  if (employee) {
    return (
      <div className="bg-mainBg shadow-sm rounded-md p-4 mt-5">
        <h2 className="font-medium text-lg mb-4">Dependents</h2>
        <div className="bg-card p-3 rounded">
          <div className="flex md:items-center gap-5  flex-col-reverse md:flex-row md:justify-between my-3">
            <Input
              placeholder="Search dependants"
              style={{ width: 200 }}
              className="rounded"
              onChange={(e) => handleSearch(e.target.value)}
              allowClear
            />
            <div>
              <button className="button" onClick={() => setAction("add")}>
                Add Dependent
              </button>
            </div>
          </div>

          <AddDependents
            open={action === "add"}
            handleClose={() => setAction(undefined)}
            employeeId={employee.id}
          />
          {dependent && (
            <EditDependant
              open={action === "edit"}
              handleClose={() => setAction(undefined)}
              employeeId={employee.id}
              dependent={dependent}
            />
          )}

          <Table
            columns={columns}
            dataSource={searchResult ? searchResult : employee?.dependents}
            pagination={{ pageSize: 5 }}
            scroll={{ x: "max-content", y: 240 }}
            size={"small"}
          />
        </div>
      </div>
    );
  }
  return null;
};
