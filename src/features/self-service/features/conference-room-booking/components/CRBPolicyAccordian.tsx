import { Collapse, Typography } from "antd";
import CRBPolicyForm from "./CRBPolicyForm";

const { Panel } = Collapse;

const CRBPolicyAccordian = () => {
  return (
    <Collapse expandIconPosition="end" accordion>
      <Panel
        header={
          <Typography.Title level={5}>Meeting Room Policy</Typography.Title>
        }
        key="1"
      >
        <CRBPolicyForm />
      </Panel>
    </Collapse>
  );
};

export default CRBPolicyAccordian;
