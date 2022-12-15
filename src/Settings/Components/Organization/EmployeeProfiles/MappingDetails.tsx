import { Button, Collapse, Form, Select } from "antd";
import React from "react";
import { TBulkEmployeeImport } from "../../../../ApiRequesHelpers/Utility/employee";
import { generalValidationRules } from "../../../../FormHelpers/validation";
import PersonalInfoMapping from "./PersonalInfoMapping";

interface IProps {
  handleNext: Function;
  handlePrev: Function;
  activeStep: number;
  columns: string[];
  retrievedData: any[];
  setFormattedData: Function;
}

const { Panel } = Collapse;
const MappingDetails = ({
  handlePrev,
  handleNext,
  activeStep,
  columns,
  retrievedData,
  setFormattedData,
}: IProps) => {
  const [form] = Form.useForm();
  const handleSubmit = (data: any) => {
    console.log("mapping", data);
    const mappedColumns = Object.entries(data);
    const formattedColumns = columns.map((col) => {
      const equivalentCol = mappedColumns.find((mcol) => mcol[1] === col);
      const ans = equivalentCol ? (equivalentCol[0] as unknown as string) : col;
      return ans;
    });
    console.log("fcols", formattedColumns, mappedColumns);

    const formattedData = retrievedData.map((item) => {
      let ans: any = {};
      formattedColumns.forEach((col, i) => {
        ans[col] = item[i];
      });
      return ans;
    });

    console.log("fDATA", formattedData);

    setFormattedData(formattedData);
    // make call to api here
    const dataToBeSubmitted: TBulkEmployeeImport[] = formattedData.map(
      (item) => ({
        firstName: item?.firstName,
        lastName: item?.lastName,
        email: item?.email,
        hasSelfService: item?.hasSelfService,
        empUid: item?.empUid,
        roleId: item?.roleId,
        designationId: item?.designationId,
        jobInformation: {
          startDate: item?.startDate,
          jobTitle: item?.jobTitle,
          monthlyGross: item?.monthlyGross,
          employmentType: item?.employmentType,
          workModel: item?.workModel,
          numberOfDaysPerWeek: item?.numberOfDaysPerWeek,
          departmentId: item?.departmentId,
        },
      })
    );
    console.log("data to be submitted", dataToBeSubmitted);
    // convert to json also
    const jsonData = JSON.stringify(dataToBeSubmitted);
    handleNext();
  };
  return (
    <div className="flex flex-col gap-4">
      <Form
        layout="vertical"
        size="small"
        requiredMark={false}
        disabled={activeStep === 2}
        onFinish={handleSubmit}
        form={form}
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
      <div className="flex flex-row justify-between w-full mt-4">
        {activeStep !== 0 && (
          <Button onClick={() => handlePrev()} type="text">
            Previous
          </Button>
        )}
        <div className="ml-auto">
          {activeStep !== 3 && (
            <button
              className="button"
              type="submit"
              onClick={() => form.submit()}
            >
              Save
            </button>
          )}
          {activeStep === 3 && <button className="button">Done</button>}
        </div>
      </div>
    </div>
  );
};

export default MappingDetails;
