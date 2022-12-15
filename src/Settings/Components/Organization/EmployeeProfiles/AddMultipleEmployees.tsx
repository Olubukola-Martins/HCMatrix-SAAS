import { Input } from "@material-ui/core";
import { Drawer, Form } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { IDrawerProps } from "../../../../AppTypes/Component";
import { textInputValidationRules } from "../../../../FormHelpers/validation";

export const AddMultipleEmployees = ({ open, handleClose }: IDrawerProps) => {
  return (
    <Drawer
      title="Invite Multiple Employees"
      open={open}
      onClose={() => handleClose(false)}
      footer={null}
      drawerStyle={{ background: "#f6f7fb" }}
    >
      <div>
        <div className="bg-red-200 py-2 rounded flex justify-between text-sm px-2">
          <span>Employees Added: 4</span>
          <span>License count left: 2</span>
        </div>
        <p className="text-sm py-6">
          Enter several email addresses separated by a comma. Users are invited
          via email and will become members of the organization once they accept
          the invitation.
        </p>
        <Form>
          <Form.Item name="email" rules={textInputValidationRules}>
            <TextArea
              className="rounded"
              rows={7}
              placeholder="Enter email address..."
            />
          </Form.Item>

          <button className="button">Send Invite</button>
        </Form>
      </div>
    </Drawer>
  );
};
