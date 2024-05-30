import { Form, Switch } from "antd";
import { AppButton } from "components/button/AppButton";
import { appRoutes } from "config/router/paths";
import { FormWorkflowInput } from "features/core/workflows/components/FormWorkflowInput";
import { Link } from "react-router-dom";

export const ShiftSwapConfig = () => {
  return (
    <>
      <Form layout="vertical" className="mt-10">
        <div className="bg-card rounded px-3 pt-4 pb-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
            <h3 className="font-semibold">
              Enable shift swap between employees on temporary shift
            </h3>
            <Form.Item
              name="EnableShiftSwap"
              className="flex justify-end items-end"
              valuePropName="checked"
              initialValue={false}
            >
              <Switch />
            </Form.Item>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div>
              <FormWorkflowInput
                Form={Form}
                control={{
                  label: "Select Workflow",
                  name: "attendanceWorkFlowId",
                }}
              />
              <div className="flex justify-end">
                <Link
                  to={appRoutes.workflowSettings}
                  className="flex items-center justify-end gap-2 text-caramel text-sm -mt-3"
                >
                  <i className="ri-add-circle-fill"></i>
                  <span>Create Workflow</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-card rounded px-3 pt-4 pb-3 mt-3">
          <div>
            <h3 className="font-semibold">
              Swap Eligibility Criteria for employees on temporary shift
            </h3>
            <p className="text-sm pt-1">Only one criteria can be selected</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 mt-5">
            <h3>Employees must belong to the same department</h3>
            <Form.Item
              name="sameDepartment"
              className="flex justify-end items-end"
              valuePropName="checked"
              initialValue={false}
            >
              <Switch />
            </Form.Item>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
            <h3>Employees must have the same designation</h3>
            <Form.Item
              name="sameDesignation"
              className="flex justify-end items-end"
              valuePropName="checked"
              initialValue={false}
            >
              <Switch />
            </Form.Item>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
            <h3>Employees must have the same role</h3>
            <Form.Item
              name="sameRole"
              className="flex justify-end items-end"
              valuePropName="checked"
              initialValue={false}
            >
              <Switch />
            </Form.Item>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
            <h3>Employees can swap with anyone in the organization</h3>
            <Form.Item
              name="swap"
              className="flex justify-end items-end"
              valuePropName="checked"
              initialValue={false}
            >
              <Switch />
            </Form.Item>
          </div>

          <div className="flex justify-end mt-2 mr-3">
          <AppButton type="submit" label="Save" />
        </div>
        </div>
      </Form>
    </>
  );
};
