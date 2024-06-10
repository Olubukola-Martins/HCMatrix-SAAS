import { Input, Table } from "antd";
import { TSingleEmployee } from "features/core/employees/types";
import { useState, useEffect } from "react";
import { usePagination } from "hooks/usePagination";
import { AppButton } from "components/button/AppButton";
import { ColumnsType } from "antd/lib/table";
import dayjs from "dayjs";
import { AddEducation } from "./AddEducation";
import { EditEducation } from "./EditEducation";
import { DeleteEducation } from "./DeleteEducation";

interface IProps {
  educationDetails?: TSingleEmployee["educationDetails"];

  employeeId?: number;
}

type TAction = "add" | "edit" | "delete";
export const Education: React.FC<IProps> = ({
  educationDetails = [],
  employeeId,
}) => {
  const [action, setAction] = useState<TAction>();
  const [education, setEducation] =
    useState<TSingleEmployee["educationDetails"][0]>();
  const handleAction = ({
    action,
    education,
  }: {
    action: TAction;
    education?: TSingleEmployee["educationDetails"][0];
  }) => {
    setAction(action);
    setEducation(education);
  };

  const cancelAction = () => {
    setAction(undefined);
    setEducation(undefined);
  };
  const { pagination, onChange } = usePagination({ pageSize: 7 });
  const [data, setData] = useState<TSingleEmployee["educationDetails"]>([]);
  const [search, setSearch] = useState<string>();
  useEffect(() => {
    const result = educationDetails?.filter(
      (item) =>
        item.school.toLowerCase().indexOf(search?.toLowerCase() ?? "") !== -1
    );
    setData(result);
  }, [search, educationDetails]);
  const columns: ColumnsType<TSingleEmployee["educationDetails"][0]> = [
    {
      title: "School",
      dataIndex: "na",
      ellipsis: true,

      render: (_, val) => <span className="capitalize">{val.school}</span>,
    },
    {
      title: "Degree",
      dataIndex: "comp",
      ellipsis: true,

      render: (_, val) => <span className="capitalize">{val.degree}</span>,
    },
    {
      title: "Specialization",
      dataIndex: "spec",
      ellipsis: true,

      render: (_, val) => (
        <span className="capitalize">{val.specialization}</span>
      ),
    },
    {
      title: "Started",
      dataIndex: "cs",
      render: (_, val) => (
        <span className="">{dayjs(val.startDate).format("YYYY-MM-DD")}</span>
      ),
    },
    {
      title: "Ended",
      dataIndex: "ce",
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
            onClick={() => handleAction({ action: "edit", education: val })}
          />
          <i
            className="ri-delete-bin-line text-xl cursor-pointer"
            onClick={() => handleAction({ action: "delete", education: val })}
          />
        </div>
      ),
    },
  ];
  return (
    <>
      {" "}
      {employeeId && (
        <AddEducation
          open={action === "add"}
          handleClose={cancelAction}
          employeeId={employeeId}
        />
      )}
      {employeeId && education && (
        <EditEducation
          open={action === "edit"}
          handleClose={cancelAction}
          employeeId={employeeId}
          educationDetail={education}
        />
      )}
      {employeeId && education && (
        <DeleteEducation
          open={action === "delete"}
          handleClose={cancelAction}
          employeeId={employeeId}
          educationDetail={education}
        />
      )}
      <div className="bg-mainBg shadow-sm rounded-md p-4 mt-5">
        <h2 className="font-medium text-lg mb-4">Education</h2>
        <div className="bg-card p-3 rounded">
          <div className="flex md:items-center gap-5  flex-col-reverse md:flex-row md:justify-between my-3">
            <Input
              placeholder="Search educations"
              style={{ width: 200 }}
              className="rounded"
              onChange={(e) => setSearch(e.target.value)}
              allowClear
            />
            <div>
              <AppButton
                label="Add education"
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
