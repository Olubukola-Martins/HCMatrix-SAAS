import { PieChart } from "components/charts/PieChart";
import React from "react";

export const AllFeedbackReport = () => {
  const labels = ["Excellent", "Good", "Average", "Poor", "Unsatisfactory"];
  const bgColor = ["#4CAF50", "#3733F4", "#FCAA31", "#101525", "#D20000"];
  return (
    <>
      {/* Training Evaluation */}
      <div className="mt-3">
        <h2 className="font-semibold text-lg text-center pb-4">
          Training Evaluation
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="border rounded shadow flex justify-center p-2">
            <div>
              <PieChart
                data={[19, 20, 30, 10, 10]}
                labels={labels}
                dataEntityLabel="feedback report"
                bgColors={bgColor}
              />
              <p className="text-xs pt-2 font-medium">
                The course content supported the learning objectives
              </p>
            </div>
          </div>
          <div className="border rounded shadow flex justify-center p-2">
            <div>
              <PieChart
                data={[10, 20, 30, 40, 50]}
                labels={labels}
                dataEntityLabel="feedback report"
                bgColors={bgColor}
              />
              <p className="text-xs pt-2 font-medium">
                The course length was sufficient to deliver the content
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
};
