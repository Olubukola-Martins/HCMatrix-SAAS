import { DoughnutChart } from "components/charts/DoughnutChart";
import CardWrapper from "./CardWrapper";

const EmploymentTypeAnalyticsCard = () => {
  const data = [
    { count: 22, label: "Full-Time", color: "#7F56D9" },
    { count: 39, label: "Part-Time", color: "#01966B" },
    { count: 26, label: "Internship", color: "#FF9800" },
  ];
  return (
    <CardWrapper>
      <div className="flex flex-col justify-between gap-4">
        <h2 className="font-extrabold">Employment Type Analytics</h2>
        <DoughnutChart data={data.map((item) => item.count)} labels={data.map((item) => item.label)} dataEntityLabel="Employment Type Analytics" bgColors={data.map((item) => item.color)} />
      </div>
    </CardWrapper>
  );
};

export default EmploymentTypeAnalyticsCard;
