import { Input, Table } from "antd";
import { TSingleEmployee } from "features/core/employees/types";
import { useState, useEffect } from "react";
import { usePagination } from "hooks/usePagination";
import { AppButton } from "components/button/AppButton";
import { ColumnsType } from "antd/lib/table";
import dayjs from "dayjs";
import { AddEmploymentHistory } from "./AddEmploymentHistory";
import { EditEmploymentHistory } from "./EditEmploymentHistory";
import { DeleteEmploymentHistory } from "./DeleteEmploymentHistory";

interface IProps {
  histories?: TSingleEmployee["employmentHistory"];
  employeeId?: number;
}

type TAction = "add" | "edit" | "delete";
export const EmploymentHistory: React.FC<IProps> = ({
  histories = [],
  employeeId,
}) => {
  const [action, setAction] = useState<TAction>();
  const [history, setHistory] =
    useState<TSingleEmployee["employmentHistory"][0]>();
  const handleAction = ({
    action,
    history,
  }: {
    action: TAction;
    history?: TSingleEmployee["employmentHistory"][0];
  }) => {
    setAction(action);
    setHistory(history);
  };

  const cancelAction = () => {
    setAction(undefined);
    setHistory(undefined);
  };
  const { pagination, onChange } = usePagination({ pageSize: 7 });
  const [data, setData] = useState<TSingleEmployee["employmentHistory"]>([]);
  const [search, setSearch] = useState<string>();
  useEffect(() => {
    const result = histories?.filter(
      (item) =>
        item.position.toLowerCase().indexOf(search?.toLowerCase() ?? "") !==
          -1 ||
        item.organization.toLowerCase().indexOf(search?.toLowerCase() ?? "") !==
          -1
    );
    setData(result);
  }, [search, histories]);
  const columns: ColumnsType<TSingleEmployee["employmentHistory"][0]> = [
    {
      title: "Organization",
      dataIndex: "na",
      ellipsis: true,
      render: (_, val) => (
        <span className="capitalize">{val.organization}</span>
      ),
    },
    {
      title: "Position",
      dataIndex: "comp",
      ellipsis: true,

      render: (_, val) => <span className="capitalize">{val.position}</span>,
    },
    {
      title: "Started",
      dataIndex: "Started",
      render: (_, val) => (
        <span className="">{dayjs(val.startDate).format("YYYY-MM-DD")}</span>
      ),
    },
    {
      title: "Ended",
      dataIndex: "Ended",
      render: (_, val) => (
        <span className="">{dayjs(val.endDate).format("YYYY-MM-DD")}</span>
      ),
    },

    {
      title: "Action",
      key: "action",
      render: (_, val) => (
        <div className="flex gap-2">
          <i
            className="ri-pencil-line text-lg cursor-pointer"
            onClick={() => handleAction({ action: "edit", history: val })}
          />
          <i
            className="ri-delete-bin-line text-xl cursor-pointer"
            onClick={() => handleAction({ action: "delete", history: val })}
          />
        </div>
      ),
    },
  ];
  return (
    <>
      {" "}
      {employeeId && (
        <AddEmploymentHistory
          open={action === "add"}
          handleClose={cancelAction}
          employeeId={employeeId}
        />
      )}
      {employeeId && history && (
        <EditEmploymentHistory
          open={action === "edit"}
          handleClose={cancelAction}
          employeeId={employeeId}
          history={history}
        />
      )}
      {employeeId && history && (
        <DeleteEmploymentHistory
          open={action === "delete"}
          handleClose={cancelAction}
          employeeId={employeeId}
          history={history}
        />
      )}
      <div className="bg-mainBg shadow-sm rounded-md p-4 mt-5">
        <h2 className="font-medium text-lg mb-4">Employment History</h2>
        <div className="bg-card p-3 rounded">
          <div className="flex md:items-center gap-5  flex-col-reverse md:flex-row md:justify-between my-3">
            <Input
              placeholder="Search histories"
              style={{ width: 200 }}
              className="rounded"
              onChange={(e) => setSearch(e.target.value)}
              allowClear
            />
            <div>
              <AppButton
                label="Add History"
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
