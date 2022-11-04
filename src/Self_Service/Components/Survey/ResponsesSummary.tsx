import { Card } from "antd";
import React from "react";
import { responseLabels } from "../../../Data/chartData";
import { PieChart } from "../../../Payroll/Components/PieChart";

const ResponsesSummary = () => {
  return (
    <div className="flex flex-col gap-4">
      {Array(2)
        .fill(0)
        .map((item) => (
          <div className="rounded-md px-4 py-4 grid md:grid-cols-3 bg-card">
            <div className="flex flex-col gap-2">
              <h5 className="text-sm font-semibold">Age</h5>
              <p className="text-xs">0 responses</p>
            </div>
            <div className="flex gap-3 items-start h-72">
              <PieChart
                dData={[1, 0, 4, 7, 8]}
                labels={responseLabels}
                title=""
              />
            </div>
            <div className="flex gap-3 justify-end text-lg">
              <i className="ri-delete-bin-6-line" />
              <i className="ri-file-copy-line" />
            </div>
          </div>
        ))}

      <div className="rounded-md px-4 py-4 flex flex-col gap-4 bg-card">
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <h5 className="text-sm font-semibold">Age</h5>
            <p className="text-xs">0 responses</p>
          </div>

          <div className="flex gap-3 justify-end text-lg">
            <i className="ri-delete-bin-6-line" />
            <i className="ri-file-copy-line" />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {Array(3)
            .fill(0)
            .map((item) => (
              <Card size="small">
                <div className="flex justify-between">
                  <span>49 </span>
                </div>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ResponsesSummary;
