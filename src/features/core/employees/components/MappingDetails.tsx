import { Collapse, Form } from "antd";

import { useQueryClient } from "react-query";

import MappingFormGroup, { TFormMappingInput } from "./MappingFormGroup";
import { AppButton } from "components/button/AppButton";
import { TBulkEmployeeImport } from "../types";
import { useEmployeeBulkUpload } from "../hooks/useEmployeeBulkUpload";

import { openNotification } from "utils/notifications";
import { useApiAuth } from "hooks/useApiAuth";

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
  const queryClient = useQueryClient();
  const { token, companyId } = useApiAuth();

  const { mutate, isLoading } = useEmployeeBulkUpload();
  const [form] = Form.useForm();
  const handleSubmit = (data: any) => {
    const mappedColumns = Object.entries(data);

    const formattedData = retrievedData.map((item) => {
      let ans: any = {};
      mappedColumns.forEach((col, i) => {
        const equiv = col[1] as string;
        const index = columns.indexOf(equiv);
        ans[col[0]] = item[index] ? item[index] : null;
      });
      return ans;
    });

    setFormattedData(formattedData);

    // make call to api here
    const dataToBeSubmitted: TBulkEmployeeImport[] = formattedData.map(
      (item) => {
        const employeeData: TBulkEmployeeImport = {
          employeeInformation: {
            email: item?.email,
            empUid: item?.empUid,
            hasSelfService:
              `${item?.hasSelfService}`.toLowerCase() === "yes" ? true : false,
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
    if (companyId) {
      mutate(
        { data: dataToBeSubmitted, token, companyId },
        {
          onError: (err: any) => {
            openNotification({
              state: "error",
              title: "Error Occurred !",
              description:
                err?.response.data.error[0]?.message ??
                err?.response.data.message ??
                err?.response.data.error.message,
              duration: 0,
            });
          },
          onSuccess: (res: any) => {
            openNotification({
              state: "success",

              title: "Success",
              description: res.data.message,
              // duration: 0.4,
            });

            form.resetFields();
            handleNext();

            queryClient.invalidateQueries({
              queryKey: ["employees"],
              // exact: true,
            });
          },
        }
      );
    }
  };
  const handleConfirm = () => {
    form.validateFields().then(() => {
      handleNext();
    });
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
        {activeStep === 1 && (
          <>
            <AppButton handleClick={() => handlePrev()} label="previous" />
            <AppButton label="Confirm" handleClick={() => handleConfirm()} />
          </>
        )}

        {activeStep === 2 && (
          <>
            <AppButton handleClick={() => handlePrev()} label="previous" />

            <AppButton
              label="Done"
              handleClick={() => form.submit()}
              isLoading={isLoading}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default MappingDetails;
