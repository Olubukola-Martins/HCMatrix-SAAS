import { TSinglePayroll } from "features/payroll/types/payroll";
import React, { useState } from "react";
import { EmployeePayrollUpdatesContainer } from "../employeePayrollUpdates/EmployeePayrollUpdatesContainer";
import PageSubHeader from "components/layout/PageSubHeader";
import { MoreOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu } from "antd";
import PayrollBreakdown from "./PayrollBreakdown";

interface IProps {
  payroll: TSinglePayroll;
}
const SinglePayrollReview: React.FC<IProps> = ({ payroll }) => {
  type TAction = "view-summary" | "compare";
  const [action, setAction] = useState<TAction>();
  const handleAction = (props: { action: TAction }) => {
    const { action } = props;
    setAction(action);
  };
  const clearAction = () => {
    setAction(undefined);
  };
  return (
    <>
      <PayrollBreakdown
        open={action === "view-summary"}
        handleClose={clearAction}
        payroll={payroll}
      />
      <div className="flex flex-col gap-6">
        <PageSubHeader
          description={`Review ${payroll.name} payroll being processed`}
          hideBackground
          actions={[
            { name: "Approve", handleClick: () => {} },
            {
              name: "Reject",
              handleClick: () => {},
              btnVariant: "style-with-class",
              additionalClassNames: ["neutralButton"],
            },
          ]}
          comps={[
            <Dropdown
              overlay={
                <Menu
                  items={[
                    {
                      key: "view",
                      label: "View Total Summary",
                      onClick: () => handleAction({ action: "view-summary" }),
                    },
                    {
                      key: "compare",
                      label: "Compare",
                      onClick: () => handleAction({ action: "compare" }),
                    },
                  ]}
                />
              }
            >
              <Button type="text" icon={<MoreOutlined />} />
            </Dropdown>,
          ]}
        />
        <EmployeePayrollUpdatesContainer
          expatriate={false}
          payrollId={payroll?.id}
          allowMultipleSelect={false}
          allowedEmployeeActions={["view-details"]}
        />
      </div>
    </>
  );
};

export default SinglePayrollReview;
