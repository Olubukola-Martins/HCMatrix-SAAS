import { Input, Select } from "antd";
import Table, { ColumnsType } from "antd/lib/table";

type TTrackP = {
  key: React.Key;
  course: string;
  enrolledDate: string;
  progress: string;
  type: string;
  completionDate: string;
  time: string;
};

const columns: ColumnsType<TTrackP> = [
  {
    title: "Course",
    dataIndex: "course",
  },
  {
    title: "Enrolled on",
    dataIndex: "enrolledDate",
  },
  {
    title: "Progress",
    dataIndex: "progress",
  },
  {
    title: "Training Type",
    dataIndex: "type",
  },
  {
    title: "Completion Date",
    dataIndex: "completionDate",
  },
  {
    title: "Time",
    dataIndex: "time",
  },
];

const data: TTrackP[] = [
  {
    key: 1,
    course: "Angular Advance",
    enrolledDate: "26/03/2023",
    progress: "In Progress",
    type: "Online",
    completionDate: "26/03/2023",
    time: "4h 45min",
  },
];

export const TrainingProgress = () => {
  return (
    <>
      <div className="flex justify-between items-center mt-10 mb-7">
        <Input.Search
          placeholder="Search branch"
          style={{ width: "35%" }}
          allowClear
        />
        <div className="flex items-center gap-x-3">
          <Select
            placeholder="Filter by training type"
            options={[
              { value: 1, label: "All Training Type" },
              { value: 2, label: "Hybrid" },
              { value: 3, label: "Online" },
              { value: 4, label: "Offline" },
            ]}
            className="font-medium text-slate-400"
          />
          <Select
            placeholder="All Progress"
            options={[
              { value: 1, label: "All Progress" },
              { value: 2, label: "Pending" },
              { value: 3, label: "In Progress" },
              { value: 4, label: "Concluded" },
            ]}
            className="font-medium text-slate-400"
          />
        </div>
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
