import { Form } from "antd";
import MappingFormGroup from "./MappingFormGroup";
import { AppButton } from "components/button/AppButton";
import {
  TBulkEmployeeImportMappingSection,
  TBulkImportEmployeeProp,
} from "../../types/bulk-import";
import { BULK_EMPLOYEE_IMPORT_MAPPING_SECTIONS } from "../../constants";
import { useState } from "react";
import FramerAccordian from "components/accordian/FramerAccordian";
import { excelSerialToDate } from "utils/dataHelpers/excelSerialToDate";

interface IProps {
  handleNext: () => void;
  handlePrev: () => void;
  handleDataToBeSubmitted: (data: TBulkImportEmployeeProp[]) => void;
  columns: string[];
  sections: TBulkEmployeeImportMappingSection[];
  retrievedData: (string | number)[][];
}

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
          licenseType: item?.licenseType,
          jobInformation: {
            startDate: excelSerialToDate(item?.startDate),
            employmentType: item?.employmentType,
            workModel: item?.workModel,
            numberOfDaysPerWeek: item?.numberOfDaysPerWeek,
            hireDate: excelSerialToDate(item?.hireDate),
            probationEndDate: excelSerialToDate(item?.probationEndDate),
            confirmationDate: excelSerialToDate(item?.confirmationDate),
            lineManagerId: item?.lineManagerId,
            branchId: item?.branchId,
            payrollType: item?.payrollType,
            monthlyGross: item?.monthlyGross,
            payGradeId: item?.payGradeId,
            frequency: item?.frequency,
            hourlyRate: item?.hourlyRate,
          },
          personalInformation: {
            dob: excelSerialToDate(item?.dob),
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
            passportExpirationDate: excelSerialToDate(
              item?.passportExpirationDate
            ),
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
    console.log(dataToBeSubmitted, "Data to be ..");

    handleDataToBeSubmitted(dataToBeSubmitted);
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
        <div className="flex flex-col gap-4">
          {sections.map((item) => (
            <FramerAccordian
              key={item.key}
              heading={
                <h5 className="text-black  text-sm   font-semibold">
                  {item.title}
                </h5>
              }
            >
              <MappingFormGroup
                columns={columns}
                Form={Form}
                formInputs={item.inputs}
              />
            </FramerAccordian>
          ))}
        </div>
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
