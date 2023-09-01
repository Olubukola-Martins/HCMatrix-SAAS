import { Drawer, Form, Select } from "antd";
import { IDrawerProps } from "types";
import { UseWindowWidth } from "features/timeAndAttendance/hooks/UseWindowWidth";
import { JoditEditorComponent } from "./JoditEditor";

export const SendEmailDrawer = ({ handleClose, open }: IDrawerProps) => {
  const { drawerSize } = UseWindowWidth();
  return (
    <Drawer
      title="Send Candidate an Email"
      open={open}
      onClose={() => handleClose()}
      size={drawerSize}
    >
      <Form>
        <Form.Item className="w-3/4 md:w-1/4">
          <Select
            options={[
              {
                value: "template",
                label: "Template",
              },
            ]}
          />
        </Form.Item>
        <JoditEditorComponent
          control={{
            name: "sendCandidateEmail",
            label: "Send Candidate an Email",
          }}
        />
      </Form>
    </Drawer>
  );
};
