import { DatePicker } from "antd";
import CardWrapper from "./CardWrapper";
import { BarChart } from "components/charts";

const ApplicationReceivedByDepartmentCard = () => {
  const { RangePicker } = DatePicker;
  const data = [
    { count: 11, label: "Acounting" },
    { count: 19, label: "App-Dev" },
    { count: 26, label: "Finance" },
    { count: 20, label: "HR" },
    { count: 24, label: "Admin" },
    { count: 16, label: "Marketing" },
  ];

  const highestApplication = Math.max(...data.map((item) => item.count));
  return (
    <CardWrapper extraStyles=" h-full ">
      <div className="flex flex-col justify-between gap-4 ">
        <div className="flex flex-row justify-between  gap-y-2">
          <h2 className="font-extrabold">Application Received by Department</h2>
          <RangePicker className="w-56" />
        </div>

        <BarChart data={data.map((item) => item.count)} labels={data.map((item) => item.label)} dataEntityLabel="Application Received by Department" bgColors={data.map((item) => (item.count === highestApplication ? "#01966B" : "#DFE0E3"))} />
      </div>
    </CardWrapper>
  );
};

export default ApplicationReceivedByDepartmentCard;
