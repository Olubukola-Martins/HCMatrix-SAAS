import { Input, Table } from "antd";
import { TSingleEmployee } from "features/core/employees/types";
import { useState, useEffect } from "react";
import { usePagination } from "hooks/usePagination";
import { AppButton } from "components/button/AppButton";
import { ColumnsType } from "antd/lib/table";
import { AddSkill } from "./AddSkill";
import { EditSkill } from "./EditSkill";
import { DeleteSkill } from "./DeleteSkill";

interface IProps {
  skills?: TSingleEmployee["skills"];
  employeeId?: number;
}

type TAction = "add" | "edit" | "delete";
export const Skills: React.FC<IProps> = ({ skills = [], employeeId }) => {
  const [action, setAction] = useState<TAction>();
  const [skill, setSkill] = useState<TSingleEmployee["skills"][0]>();
  const handleAction = ({
    action,
    skill,
  }: {
    action: TAction;
    skill?: TSingleEmployee["skills"][0];
  }) => {
    setAction(action);
    setSkill(skill);
  };

  const cancelAction = () => {
    setAction(undefined);
    setSkill(undefined);
  };
  const { pagination, onChange } = usePagination({ pageSize: 7 });
  const [data, setData] = useState<TSingleEmployee["skills"]>([]);
  const [search, setSearch] = useState<string>();
  useEffect(() => {
    const result = skills?.filter(
      (item) =>
        item.skill.toLowerCase().indexOf(search?.toLowerCase() ?? "") !== -1
    );
    setData(result);
  }, [search, skills]);
  const columns: ColumnsType<TSingleEmployee["skills"][0]> = [
    {
      title: "Name",
      dataIndex: "na",
      render: (_, val) => <span className="capitalize">{val.skill}</span>,
    },
    {
      title: "Competency",
      dataIndex: "comp",
      render: (_, val) => <span className="capitalize">{val.competency}</span>,
    },

    {
      title: "Action",
      key: "action",
      render: (_, val) => (
        <div className="flex gap-2">
          <i
            className="ri-pencil-line text-lg cursor-pointer"
            onClick={() => handleAction({ action: "edit", skill: val })}
          />
          <i
            className="ri-delete-bin-line text-xl cursor-pointer"
            onClick={() => handleAction({ action: "delete", skill: val })}
          />
        </div>
      ),
    },
  ];
  return (
    <>
      {" "}
      {employeeId && (
        <AddSkill
          open={action === "add"}
          handleClose={cancelAction}
          employeeId={employeeId}
        />
      )}
      {employeeId && skill && (
        <EditSkill
          open={action === "edit"}
          handleClose={cancelAction}
          employeeId={employeeId}
          skill={skill}
        />
      )}
      {employeeId && skill && (
        <DeleteSkill
          open={action === "delete"}
          handleClose={cancelAction}
          employeeId={employeeId}
          skill={skill}
        />
      )}
      <div className="bg-mainBg shadow-sm rounded-md p-4 mt-5">
        <h2 className="font-medium text-lg mb-4">Skills</h2>
        <div className="bg-card p-3 rounded">
          <div className="flex md:items-center gap-5  flex-col-reverse md:flex-row md:justify-between my-3">
            <Input
              placeholder="Search skills"
              style={{ width: 200 }}
              className="rounded"
              onChange={(e) => setSearch(e.target.value)}
              allowClear
            />
            <div>
              <AppButton
                label="Add Skill"
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
