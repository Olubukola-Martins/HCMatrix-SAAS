import { LineChart } from "components/charts/LineChart";
import { useGetDashboardGraph } from "../features/home/hooks/useGetDashboardGraph";
import { useState } from "react";
import { graphFilterProps } from "../features/home/types";
import { DatePicker, DatePickerProps, Input, Select } from "antd";
import dayjs from "dayjs";
const { Option } = Select;

const options = [1, 2, 3, 4, 5];

export const AttendanceMonthCard = () => {
  const [graphFilter, setGraphFilter] = useState<graphFilterProps>({
    year: +new Date().getFullYear(),
    month: +new Date().getMonth() + 1,
    week: 1,
  });
  const { data } = useGetDashboardGraph(graphFilter);

  const onChangeMonth: DatePickerProps["onChange"] = (__, value) => {
    setGraphFilter((val) => ({
      ...val,
      month: value ? +value : undefined,
    }));
  };
  // const onChangeYear: DatePickerProps["onChange"] = (__, value) => {
  //   setGraphFilter((val) => ({
  //     ...val,
  //     year: value ? +value : undefined,
  //   }));
  // };
  return (
    <div className="col-span-3 bg-mainBg w-full border flex flex-col gap-4 mt-4 rounded-lg text-sm shadow p-3">
      <div className="flex justify-end items-center gap-x-4">
        <Input
          value={graphFilter.year}
          onChange={(e) =>
            setGraphFilter((val) => {
              return {
                ...val,
                year: e.target.value ? +e.target.value : undefined,
              };
            })
          }
          placeholder="Year"
        />
        {/* <DatePicker
          onChange={onChangeYear}
          picker="year"
          format="YYYY"
          className="w-full"
          value={moment(graphFilter.year, "YYYY")}
        /> */}

        <DatePicker
          onChange={onChangeMonth}
          picker="month"
          format="M"
          className="w-full"
          value={dayjs(`${graphFilter.year}-${graphFilter.month}`, "YYYY-M")}
        />

        <Select
          value={graphFilter.week}
          onChange={(value) =>
            setGraphFilter((val) => ({
              ...val,
              week: value ? +value : undefined,
            }))
          }
          placeholder="Week"
          className="w-full"
          allowClear
        >
          {options.map((option) => (
            <Option key={option} value={option}>
              {option}
            </Option>
          ))}
        </Select>
      </div>

      <div className="flex-1">
        <LineChart
          data={data ? Object.values(data) : []}
          labels={data ? Object.keys(data) : []}
          dataEntityLabel="Attendance Record"
          bgColors={`#ff6647`}
        />
      </div>
    </div>
  );
};
