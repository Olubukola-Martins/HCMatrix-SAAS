import { Collapse, Form } from "antd";
import MappingFormGroup from "./MappingFormGroup";
import { AppButton } from "components/button/AppButton";
import {
  TBulkEmployeeImportMappingSection,
  TBulkImportEmployeeProp,
} from "../../types/bulk-import";
import {
  BULK_EMPLOYEE_IMPORT_MAPPING_SECTIONS,
  COMPULSORY_BULK_MAPPING_SECTION_FOR_EMPLOYEE_INFO,
} from "../../constants";
import { useState } from "react";

interface IProps {
  handleNext: () => void;
  handlePrev: () => void;
  handleDataToBeSubmitted: (data: TBulkImportEmployeeProp[]) => void;
  columns: string[];
  sections: TBulkEmployeeImportMappingSection[];
  retrievedData: (string | number)[][];
}

const { Panel } = Collapse;
const EmployeeImportDataMapping = ({
  handlePrev,
  handleNext,
  handleDataToBeSubmitted,
  columns,
  retrievedData,
  sections,
}: IProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const handleSubmit = (data: any) => {
    const mappedColumns = Object.entries(data);

    const formattedData = retrievedData.map((item) => {
      let ans: { [key: string]: any } = {};
      mappedColumns.forEach((col, i) => {
        const equiv = col[1] as string;
        const index = columns.indexOf(equiv);
        ans[col[0]] = item[index] ? item[index] : null;
      });
      return ans;
    });

    const dataToBeSubmitted: TBulkImportEmployeeProp[] = formattedData.map(
      (item) => {
        let employeeData: TBulkImportEmployeeProp = {
          email: item?.email,
          empUid: item?.empUid,
          firstName: item?.firstName,
          lastName: item?.lastName,
          hasSelfService: item?.hasSelfService,
          jobInformation: {
            startDate: item?.startDate,
            employmentType: item?.employmentType,
            workModel: item?.workModel,
            numberOfDaysPerWeek: item?.numberOfDaysPerWeek,
            hireDate: item?.hireDate,
            probationEndDate: item?.probationEndDate,
            confirmationDate: item?.confirmationDate,
            lineManagerId: item?.lineManagerId,
            branchId: item?.branchId,
            payrollType: item?.payrollType,
            monthlyGross: item?.monthlyGross,
            payGradeId: item?.payGradeId,
            frequency: item?.frequency,
            hourlyRate: item?.hourlyRate,
          },
          personalInformation: {
            dob: item?.dob,
            gender: item?.gender,
            phoneNumber: item?.phoneNumber,
            eligibility: item?.eligibility,
            exchangeRateId: item?.exchangeRateId,
            maritalStatus: item?.maritalStatus,
            nationality: item?.nationality,
            address: {
              countryId: item?.countryId,
              stateId: item?.stateId,
              streetAddress: item?.streetAddress,
              timezone: item?.timezone,
              lgaId: item?.lgaId,
            },
            passportExpirationDate: item?.passportExpirationDate,
            validDocumentUrl: item?.validDocumentUrl,
            alternativeEmail: item?.alternativeEmail,
            alternativePhoneNumber: item?.alternativePhoneNumber,
            nin: item?.nin,
          },
          emergencyContact: {
            address: item?.address,
            fullName: item?.fullName,
            phoneNumber: item?.phoneNumber,
            relationship: item?.relationship,
          },
        };

        // delete sections not selected
        BULK_EMPLOYEE_IMPORT_MAPPING_SECTIONS.filter(
          (item) => !sections.find((section) => section.key === item.key)
        ).forEach((section) => {
          if (section.key === "employeeInformation") return; //don cos employee info is a compulsory section
          delete employeeData[section.key];
        });

        return employeeData;
      }
    );

    handleDataToBeSubmitted(dataToBeSubmitted);

    console.log("data to be submitted", dataToBeSubmitted, sections);
  };
  const handleConfirm = () => {
    setIsLoading(true);
    form
      .validateFields()
      .then(() => {
        setIsLoading(false);
        form.submit();
        handleNext();
      })
      .catch((err) => setIsLoading(false));
  };
  return (
    <div className="flex flex-col gap-4">
      <Form
        layout="vertical"
        size="small"
        requiredMark={false}
        onFinish={handleSubmit}
        form={form}
      >
        <Collapse
          defaultActiveKey={[
            COMPULSORY_BULK_MAPPING_SECTION_FOR_EMPLOYEE_INFO.key,
          ]}
          accordion
        >
          <Panel
            header={COMPULSORY_BULK_MAPPING_SECTION_FOR_EMPLOYEE_INFO.title}
            key={COMPULSORY_BULK_MAPPING_SECTION_FOR_EMPLOYEE_INFO.key}
          >
            <MappingFormGroup
              columns={columns}
              Form={Form}
              formInputs={
                COMPULSORY_BULK_MAPPING_SECTION_FOR_EMPLOYEE_INFO.inputs
              }
            />
          </Panel>
          {sections.map((item) => (
            <Panel header={item.title} key={item.key}>
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
        <>
          <AppButton handleClick={handlePrev} label="previous" />
        </>

        <>
          <AppButton
            label="Next"
            isLoading={isLoading}
            handleClick={handleConfirm}
          />
        </>
      </div>
    </div>
  );
};

export default EmployeeImportDataMapping;
