import { Tabs } from "antd";
import { RatingSetUpDynamicForm } from "./RatingSetUpDynamicForm";
import { INTERVIEW_STAGE_SETTINGS_ARRAY } from "../../constants/defaultOtherSettings";
import "../../assets/style.css";
export const RatingSetUp = () => {
  const initialValues = {
    metric: "",
    weight: "",
    criteria: [""],
    newRatingSetup: [],
  };

  const handleSubmit = (values: any) => {
    console.log("Submitted values:", values);
  };
  return (
    <div className="Container">
      <Tabs type="card" >
        {INTERVIEW_STAGE_SETTINGS_ARRAY.map((stage) => (
          <Tabs.TabPane tab={stage.label} key={stage.name} >
            <RatingSetUpDynamicForm
              initialValues={initialValues}
              onSubmit={handleSubmit}
            />
          </Tabs.TabPane>
        ))}
      </Tabs>
    </div>
  );
};
