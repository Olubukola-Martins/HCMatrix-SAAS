import { Input } from "antd";
import Table, { ColumnsType } from "antd/lib/table";
import { SimpleCard } from "components/cards/SimpleCard";
import { useState } from "react";
import { AssignTraining } from "./AssignTraining";

type TTrainingUsers = {
  key: React.Key;
  employee: string;
  enrolledDate: string;
  progress: string;
  type: string;
  completionDate: string;
};

const data: TTrainingUsers[] = [
  {
    key: 1,
    employee: "Godswill Omenuko",
    completionDate: "25/3/2022",
    enrolledDate: "25/3/2022",
    progress: "concluded",
    type: "Online",
  },
];

const columns: ColumnsType<TTrainingUsers> = [
  {
    title: "Employee",
    dataIndex: "employee",
  },
  {
    title: "Training Type",
    dataIndex: "type",
  },
  {
    title: "Progress",
    dataIndex: "progress",
  },
  {
    title: "Enrolled on",
    dataIndex: "enrolledDate",
  },
  {
    title: "Completion Date",
    dataIndex: "completionDate",
  },
];

export const TrainingUsers = () => {
  const [openAssign, setOpenAssign] = useState(false);
  return (
    <>
      <AssignTraining
        open={openAssign}
        handleClose={() => setOpenAssign(false)}
      />
      <div className="bg-card rounded p-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-3">
        <div className="bg-mainBg rounded-l-md px-2 py-3 flex lg:justify-center gap-3">
          <div>
            <img
              src="https://res.cloudinary.com/ddvaelej7/image/upload/v1655827312/samples/Image_r0ikln.png"
              alt="user"
              className="h-28 w-28 rounded-full"
            />
          </div>
          <div className="hidden md:flex flex-col gap-2">
            <h3 className="font-semibold">Training Title:</h3>
            <h3 className="font-semibold">Training Description:</h3>
          </div>
        </div>

        <div className="bg-mainBg rounded-r-md px-2 py-3 gap-2 lg:col-span-2">
          <div className="flex flex-col gap-2">
            <p>
              <span className="font-semibold pr-2 md:hidden flex">
                Training Title:
              </span>
              Angular js
            </p>
            <p className="text-sm">
              <span className="font-semibold pr-2 md:hidden flex">
                Training Description:
              </span>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque
              temporibus enim culpa, dignissimos recusandae alias a ut.
              Laboriosam doloremque ipsa cumque dolore a sed, alias, accusantium
              nemo tenetur dolorum amet.
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 my-7">
        <SimpleCard title="Assigned Learners" highlight="10" />
        <SimpleCard title="Completed Learners" highlight="5" />
        <SimpleCard title="Grand Cost" highlight="$100" />
        <SimpleCard title="Duration" highlight="1 week" />
      </div>

      <div className="flex justify-between items-center mt-10 mb-7">
        <Input.Search
          placeholder="Search branch"
          style={{ width: "35%" }}
          allowClear
        />

        <h3 onClick={() => setOpenAssign(true)} className="text-caramel underline font-medium text-base cursor-pointer hover:text-accent">
          Assign Training
        </h3>
      </div>

      <Table
        className="mt-3"
        columns={columns}
        dataSource={data}
        scroll={{ x: 600 }}
      />
    </>
  );
};
