import { Button, Collapse, Form } from "antd";
import { TBulkEmployeeImport } from "../../../../ApiRequesHelpers/Utility/employee";

import MappingFormGroup, { TFormMappingInput } from "./MappingFormGroup";

export enum EmployeeSectionEnum {
  PERSONAL_INFORMATION = "Personal Information",
  WALLET_INFORMATION = "Wallet Information",
  BANK_INFORMATION = "Bank Information",
  PENSION_INFORMATION = "Pension Information",
  EMERGENCY_CONTACT = "Emergency Contact",
}

export type TMappingSection = {
  title: EmployeeSectionEnum;
  inputs: TFormMappingInput[];
};

interface IProps {
  handleNext: Function;
  handlePrev: Function;
  activeStep: number;
  columns: string[];
  retrievedData: any[];
  setFormattedData: Function;
  sections: TMappingSection[];
}

const { Panel } = Collapse;
const MappingDetails = ({
  handlePrev,
  handleNext,
  activeStep,
  columns,
  retrievedData,
  setFormattedData,
  sections,
}: IProps) => {
  const [form] = Form.useForm();
  const handleSubmit = (data: any) => {
    console.log("mapping", data);
    const mappedColumns = Object.entries(data);

    console.log(retrievedData, ">>>");
    const formattedData = retrievedData.map((item) => {
      let ans: any = {};
      mappedColumns.forEach((col, i) => {
        const equiv = col[1] as string;
        const index = columns.indexOf(equiv);
        ans[col[0]] = item[index] ? item[index] : null;
      });
      return ans;
    });

    console.log("fDATA", formattedData);

    setFormattedData(formattedData);
    // make call to api here
    const dataToBeSubmitted: TBulkEmployeeImport[] = formattedData.map(
      (item) => {
        const employeeData: TBulkEmployeeImport = {
          employeeInformation: {
            email: item?.email,
            empUid: item?.empUid,
            hasSelfService: item?.hasSelfService,
          },
          personalInformation: {
            alternativeEmail: item?.alternativeEmail,
            alternativePhoneNumber: item?.alternativePhoneNumber,
            dob: item?.dob,
            eligibility: item?.eligibility,
            firstName: item?.firstName,
            gender: item?.gender,
            lastName: item?.lastName,
            maritalStatus: item?.maritalStatus,
            nationality: item?.nationality,
            nin: item?.nin,
            passportExpirationDate: item?.passportExpirationDate,
            taxAuthority: item?.taxAuthority,
            taxId: item?.taxId,
          },
          walletInformation: {
            accountProvider: item?.walletAccountProvider,
            accountNumber: item?.walletAccountNumber,
          },
          bankInformation: {
            bankName: item?.bankName,
            accountNumber: item?.bankAccountNumber,
            bvn: item?.bvn,
          },
          pensionInformation: {
            fundAdministrator: item?.pensionFundAdministrator,
            accountNumber: item?.pensionAccountNumber,
            pensionType: item?.pensionType,
          },
          emergencyContact: {
            fullName: item?.ecFullName,
            address: item?.ecAddress,
            relationship: item?.ecRelationship,
            phoneNumber: item?.ecPhoneNumber,
          },
        };
        // delete sections not used
        if (
          !sections.find(
            (item) => item.title === EmployeeSectionEnum.PERSONAL_INFORMATION
          )
        )
          delete employeeData["personalInformation"];
        if (
          !sections.find(
            (item) => item.title === EmployeeSectionEnum.WALLET_INFORMATION
          )
        )
          delete employeeData["walletInformation"];
        if (
          !sections.find(
            (item) => item.title === EmployeeSectionEnum.BANK_INFORMATION
          )
        )
          delete employeeData["bankInformation"];
        if (
          !sections.find(
            (item) => item.title === EmployeeSectionEnum.PENSION_INFORMATION
          )
        )
          delete employeeData["pensionInformation"];
        if (
          !sections.find(
            (item) => item.title === EmployeeSectionEnum.EMERGENCY_CONTACT
          )
        )
          delete employeeData["emergencyContact"];
        return employeeData;
      }
    );

    console.log("data to be submitted", dataToBeSubmitted, sections);

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
          <Panel header="Employee Information" key="1">
            <MappingFormGroup
              columns={columns}
              Form={Form}
              formInputs={[
                { name: "empUid", label: "Employee ID" },
                { name: "email", label: "Email" },
                {
                  name: "hasSelfService",
                  label: "Self Service (Should be a yes or no)",
                },
              ]}
            />
          </Panel>
          {sections.map((item) => (
            <Panel header={item.title} key={item.title}>
              <MappingFormGroup
                columns={columns}
                Form={Form}
                formInputs={item.inputs}
              />
            </Panel>
          ))}
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
