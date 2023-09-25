import { Input, Table } from "antd";
import { TSingleEmployee } from "features/core/employees/types";
import { useState, useEffect } from "react";
import { usePagination } from "hooks/usePagination";
import { AppButton } from "components/button/AppButton";
import { AddDependent } from "./AddDependent";
import { DeleteDependent } from "./DeleteDependent";
import { ColumnsType } from "antd/lib/table";
import moment from "moment";
import { EditDependent } from "./EditDependant";

interface IProps {
  dependents?: TSingleEmployee["dependents"];
  employeeId?: number;
}

type TAction = "add" | "edit" | "delete";
export const Dependents: React.FC<IProps> = ({
  dependents = [],
  employeeId,
}) => {
  const [action, setAction] = useState<TAction>();
  const [dependent, setDependent] =
    useState<TSingleEmployee["dependents"][0]>();
  const handleAction = ({
    action,
    dependent,
  }: {
    action: TAction;
    dependent?: TSingleEmployee["dependents"][0];
  }) => {
    setAction(action);
    setDependent(dependent);
  };

  const cancelAction = () => {
    setAction(undefined);
    setDependent(undefined);
  };
  const { pagination, onChange } = usePagination({ pageSize: 7 });
  const [data, setData] = useState<TSingleEmployee["dependents"]>([]);
  const [search, setSearch] = useState<string>();
  useEffect(() => {
    const result = dependents?.filter(
      (item) =>
        item.fullName.toLowerCase().indexOf(search?.toLowerCase() ?? "") !== -1
    );
    setData(result);
  }, [search, dependents]);
  const columns: ColumnsType<TSingleEmployee["dependents"][0]> = [
    {
      title: "Name",
      dataIndex: "fullName",
      render: (_, val) => <span className="capitalize">{val.fullName}</span>,
    },
    {
      title: "Date Of Birth",
      dataIndex: "dob",
      render: (_, val) => moment(val.dob).format("YYYY/MM/DD"),
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      render: (_, val) => <span className="">{val.phoneNumber}</span>,
    },
    {
      title: "Relationship",
      dataIndex: "relationship",
      render: (_, val) => <span className="">{val.relationship}</span>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, val) => (
        <div className="flex gap-2">
          <i
            className="ri-pencil-line text-lg cursor-pointer"
            onClick={() => handleAction({ action: "edit", dependent: val })}
          />
          <i
            className="ri-delete-bin-line text-xl cursor-pointer"
            onClick={() => handleAction({ action: "delete", dependent: val })}
          />
        </div>
      ),
    },
  ];
  return (
    <>
      {" "}
      {employeeId && (
        <AddDependent
          open={action === "add"}
          handleClose={cancelAction}
          employeeId={employeeId}
        />
      )}
      {employeeId && dependent && (
        <EditDependent
          open={action === "edit"}
          handleClose={cancelAction}
          employeeId={employeeId}
          dependent={dependent}
        />
      )}
      {employeeId && dependent && (
        <DeleteDependent
          open={action === "delete"}
          handleClose={cancelAction}
          employeeId={employeeId}
          dependent={dependent}
        />
      )}
      <div className="bg-mainBg shadow-sm rounded-md p-4 mt-5">
        <h2 className="font-medium text-lg mb-4">Dependents</h2>
        <div className="bg-card p-3 rounded">
          <div className="flex md:items-center gap-5  flex-col-reverse md:flex-row md:justify-between my-3">
            <Input
              placeholder="Search dependants"
              style={{ width: 200 }}
              className="rounded"
              onChange={(e) => setSearch(e.target.value)}
              allowClear
            />
            <div>
              <AppButton
                label="Add Dependent"
                handleClick={() => handleAction({ action: "add" })}
              />
            </div>
          </div>

          <Table
            columns={columns}
            size="small"
            dataSource={data}
            pagination={{ ...pagination, total: data.length }}
            onChange={onChange}
          />
        </div>
      </div>
    </>
  );
};
