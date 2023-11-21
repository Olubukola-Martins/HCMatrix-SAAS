import { Input, Table } from "antd";
import { TSingleEmployee } from "features/core/employees/types";
import { useState, useEffect } from "react";
import { usePagination } from "hooks/usePagination";
import { AppButton } from "components/button/AppButton";
import { AddDependent } from "./AddDependent";
import { DeleteDependent } from "./DeleteDependent";
import { ColumnsType } from "antd/lib/table";
import { EditDependent } from "./EditDependant";

export interface IDependentProps {
  dependents?: TSingleEmployee["dependents"];
  employeeId?: number;
  columns?: (props: {
    handleDelete: (item: TSingleEmployee["dependents"][0]) => void;
    handleEdit: (item: TSingleEmployee["dependents"][0]) => void;
  }) => ColumnsType<TSingleEmployee["dependents"][0]>;
  addDependent: {
    fn: (data: any, successCallBack?: () => void) => void;
    isLoading?: boolean;
  };
  editDependent: {
    fn: (
      dependent: TSingleEmployee["dependents"][0],
      data: any,
      successCallBack?: () => void
    ) => void;
    isLoading?: boolean;
  };
  deleteDependent: {
    fn: (
      dependent: TSingleEmployee["dependents"][0],
      successCallBack?: () => void
    ) => void;
    isLoading?: boolean;
  };
  showGender: boolean;
  showRelationship: boolean;
}

type TAction = "add" | "edit" | "delete";
export const Dependents: React.FC<IDependentProps> = ({
  dependents = [],
  employeeId,
  columns,
  addDependent,
  editDependent,
  deleteDependent,
  showGender,
  showRelationship,
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

  return (
    <>
      {" "}
      {employeeId && (
        <AddDependent
          open={action === "add"}
          handleClose={cancelAction}
          employeeId={employeeId}
          onSubmit={addDependent}
          showGender={showGender}
          showRelationship={showRelationship}
        />
      )}
      {employeeId && dependent && (
        <EditDependent
          open={action === "edit"}
          handleClose={cancelAction}
          employeeId={employeeId}
          dependent={dependent}
          onSubmit={editDependent}
          showGender={showGender}
          showRelationship={showRelationship}
        />
      )}
      {employeeId && dependent && (
        <DeleteDependent
          open={action === "delete"}
          handleClose={cancelAction}
          employeeId={employeeId}
          dependent={dependent}
          onSubmit={deleteDependent}
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
            columns={columns?.({
              handleEdit: (val) =>
                handleAction({ action: "edit", dependent: val }),
              handleDelete: (val) =>
                handleAction({ action: "delete", dependent: val }),
            })}
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
