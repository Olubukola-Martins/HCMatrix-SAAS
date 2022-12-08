import { Button, Collapse, Form, Select } from "antd";
import React from "react";
import { generalValidationRules } from "../../../../FormHelpers/validation";
import PersonalInfoMapping from "./PersonalInfoMapping";

interface IProps {
  handleNext: Function;
  handlePrev: Function;
  activeStep: number;
  columns: string[];
}

const { Panel } = Collapse;
const MappingDetails = ({
  handlePrev,
  handleNext,
  activeStep,
  columns,
}: IProps) => {
  return (
    <div className="flex flex-col gap-4">
      <Form
        layout="vertical"
        size="small"
        requiredMark={false}
        disabled={activeStep === 2}
      >
        <Collapse defaultActiveKey={["1"]} accordion>
          <Panel header="Personal Information" key="1">
            <PersonalInfoMapping columns={columns} Form={Form} />
          </Panel>
          <Panel header="Job Information" key="2"></Panel>
          <Panel header="Financial Information" key="3"></Panel>
          <Panel header="Medical Information" key="4"></Panel>
          <Panel header="Hierarchy Information" key="5"></Panel>
          <Panel header="Contact Details" key="6"></Panel>
        </Collapse>
      </Form>
      {/* buttons */}
      <div className="flex flex-row justify-between w-full">
        {activeStep !== 0 && (
          <Button onClick={() => handlePrev()} type="text">
            Previous
          </Button>
        )}
        <div className="ml-auto">
          {activeStep !== 3 && (
            <button className="button" onClick={() => handleNext()}>
              Next
            </button>
          )}
          {activeStep === 3 && <button className="button">Done</button>}
        </div>
      </div>
    </div>
  );
};

export default MappingDetails;
