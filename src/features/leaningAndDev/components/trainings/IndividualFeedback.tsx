import { Select, Tabs } from "antd";
import { TrainingEvaluation } from "./TrainingEvaluation";

export const IndividualFeedback = () => {
  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-base">Ruth Godwin Feedback</h2>

        <Select
          className="font-medium"
          placeholder="Select Employee"
          allowClear
          options={[
            { label: "Godswill Omenuko", value: 1 },
            { label: "Victor Offor", value: 2 },
          ]}
        />
      </div>
      <Tabs
        defaultActiveKey="1"
        className="mt-2"
        items={[
          {
            key: "1",
            label: "General Information",
            children: (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                <div>
                  <h4 className="font-medium pb-2 text-base">Employee name</h4>
                  <div className="border p-2 rounded shadow-sm text-sm">
                    Ruth Godwin
                  </div>
                </div>
                <div>
                  <h4 className="font-medium pb-2 text-base">Designation</h4>
                  <div className="border p-2 rounded shadow-sm text-sm">
                    Ruth Godwin
                  </div>
                </div>
                <div>
                  <h4 className="font-medium pb-2 text-base">Department</h4>
                  <div className="border p-2 rounded shadow-sm text-sm">
                    Dev team
                  </div>
                </div>
                <div>
                  <h4 className="font-medium pb-2 text-base">Training Title</h4>
                  <div className="border p-2 rounded shadow-sm text-sm">
                    Angular Js
                  </div>
                </div>
                <div>
                  <h4 className="font-medium pb-2 text-base">Type</h4>
                  <div className="border p-2 rounded shadow-sm text-sm">
                    Online
                  </div>
                </div>

                <div>
                  <h4 className="font-medium pb-2 text-base">Start date</h4>
                  <div className="border p-2 rounded shadow-sm text-sm">
                    ------
                  </div>
                </div>
                <div>
                  <h4 className="font-medium pb-2 text-base">End date</h4>
                  <div className="border p-2 rounded shadow-sm text-sm">
                    -----
                  </div>
                </div>
                <div>
                  <h4 className="font-medium pb-2 text-base">Duration</h4>
                  <div className="border p-2 rounded shadow-sm text-sm">
                    -----
                  </div>
                </div>
              </div>
            ),
          },
          {
            key: "2",
            label: "Training Evaluation",
            children: <TrainingEvaluation />,
          },
          {
            key: "3",
            label: "Training Tools",
            children: <span>Training Tools</span>,
          },
          {
            key: "4",
            label: "Instructor & Enrollment",
            children: <span>Instructor & Enrollment</span>,
          },
          {
            key: "5",
            label: "Overall Benefit",
            children: <span>Overall Benefit</span>,
          },
        ]}
      />
    </>
  );
};
