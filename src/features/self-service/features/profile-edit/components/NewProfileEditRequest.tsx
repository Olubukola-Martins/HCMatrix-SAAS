import { Form, Drawer, Select, Skeleton } from "antd";
import { AppButton } from "components/button/AppButton";
import React, { useEffect, useState } from "react";
import { IModalProps } from "types";
import { FormUnlicensedEmployeeSSRequestInput } from "features/core/employees/components/FormEmployeeInput";
import { PROFILE_EDIT_REQUEST_TYPES } from "../constants";
import { TProfileEditRequestType } from "../types";
import { useFetchSingleEmployee } from "features/core/employees/hooks/useFetchSingleEmployee";
import { EditJobInformationRequest } from "./category/EditJobInformationRequest";
import { EditPersonalInfoRequest } from "./category/EditPersonalInfoRequest";
import {
  EditBankDetailsRequest,
  EditITFDetailsRequest,
  EditNSITFDetailsRequest,
  EditPensionDetailsRequest,
  EditTaxDetailsRequest,
} from "./category/finance";
import { useApiAuth } from "hooks/useApiAuth";
import { TPensionValue, TBankValue } from "features/core/employees/types";
import {
  TTaxValue,
  TNSITFValue,
  TITFValue,
} from "features/core/employees/types/singleEmployee";

type TStep = "select-category" | "handle-edit";

export const NewProfileEditRequest: React.FC<IModalProps> = ({
  open,
  handleClose,
}) => {
  const [steps, setSteps] = useState<TStep>("select-category");
  const [category, setCategory] =
    useState<TProfileEditRequestType>("job-information");
  const [employeeId, setEmployeeId] = useState<number>();
  const { currentUserEmployeeId } = useApiAuth();
  useEffect(() => {
    setEmployeeId(currentUserEmployeeId);
  }, [currentUserEmployeeId]);

  const handleSubmit = ({
    category,
    employeeId,
  }: {
    employeeId?: number;
    category: TProfileEditRequestType;
  }) => {
    setCategory(category);
    if (employeeId) setEmployeeId(employeeId); //only update employeeId when you wish to update for unliscenced employee
    setSteps("handle-edit");
  };
  const { data: employee, isLoading: isLoadingEmployee } =
    useFetchSingleEmployee({
      employeeId: employeeId,
    });
  const passedEmployeeId =
    employeeId === currentUserEmployeeId ? undefined : employeeId;
  //should be undefined when the useri is requesting on behalf of himself

  const finance = employee?.finance;
  const pensionValue = finance?.find((item) => item.key === "pension")
    ?.value as TPensionValue | undefined;
  const bankValue = finance?.find((item) => item.key === "bank")?.value as
    | TBankValue
    | undefined;
  const taxValue = finance?.find((item) => item.key === "tax")?.value as
    | TTaxValue
    | undefined;
  const nsitfValue = finance?.find((item) => item.key === "nsitf")?.value as
    | TNSITFValue
    | undefined;
  const itfValue = finance?.find((item) => item.key === "itf")?.value as
    | TITFValue
    | undefined;
  console.log(finance, "finance");
  return (
    <Drawer
      open={open}
      onClose={() => handleClose()}
      footer={null}
      title={"New Profile Edit Request"}
      style={{ top: 20 }}
      width={`75%`}
    >
      {steps === "select-category" && (
        <Form layout="vertical" onFinish={handleSubmit} requiredMark={false}>
          <FormUnlicensedEmployeeSSRequestInput
            Form={Form}
            control={{
              name: "employeeId",
              label: "Select Unlinsenced Employee",
            }}
          />

          <Form.Item label="Category" name="category">
            <Select
              options={PROFILE_EDIT_REQUEST_TYPES.map((item, i) => ({
                value: item.type,
                label: <span className="capitalize">{item.name}</span>,
              }))}
              placeholder="Select Category"
            />
          </Form.Item>
          <div className="flex justify-end">
            <AppButton label="Proceed" type="submit" />
          </div>
        </Form>
      )}
      {steps === "handle-edit" && (
        <div>
          <div
            className="flex items-center hover:text-caramel cursor-pointer mb-8"
            onClick={() => setSteps("select-category")}
          >
            <i className="ri-arrow-left-s-line text-lg font-bold "></i>{" "}
            <p>Go Back</p>
          </div>

          <>
            <Skeleton paragraph={{ rows: 12 }} loading={isLoadingEmployee}>
              {category === "job-information" && (
                <EditJobInformationRequest
                  employeeId={passedEmployeeId}
                  jobInformation={employee?.jobInformation}
                />
              )}
              {category === "personal-information" && (
                <EditPersonalInfoRequest
                  employeeId={passedEmployeeId}
                  personalInfo={employee?.personalInformation}
                />
              )}
              {category === "bank-detail" && (
                <EditBankDetailsRequest
                  employeeId={passedEmployeeId}
                  value={bankValue}
                />
              )}
              {category === "tax" && (
                <EditTaxDetailsRequest
                  employeeId={passedEmployeeId}
                  value={taxValue}
                />
              )}
              {category === "itf" && (
                <EditITFDetailsRequest
                  employeeId={passedEmployeeId}
                  value={itfValue}
                />
              )}
              {category === "nsitf" && (
                <EditNSITFDetailsRequest
                  employeeId={passedEmployeeId}
                  value={nsitfValue}
                />
              )}
              {category === "pension" && (
                <EditPensionDetailsRequest
                  employeeId={passedEmployeeId}
                  value={pensionValue}
                />
              )}
            </Skeleton>
          </>
        </div>
      )}
    </Drawer>
  );
};
