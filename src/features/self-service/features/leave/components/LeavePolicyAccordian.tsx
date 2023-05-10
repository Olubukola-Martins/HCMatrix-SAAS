import { Collapse, Typography } from "antd";
import LeavePolicyForm from "./LeavePolicyForm";

const { Panel } = Collapse;

const LeavePolicyAccordian = () => {
  return (
    <Collapse expandIconPosition="end" accordion>
      <Panel
        header={<Typography.Title level={5}>Leave Policy</Typography.Title>}
        key="1"
      >
        <LeavePolicyForm />
      </Panel>
    </Collapse>
  );
};

export default LeavePolicyAccordian;
