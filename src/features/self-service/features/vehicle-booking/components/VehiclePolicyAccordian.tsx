import { Collapse, Typography } from "antd";
import VehiclePolicyForm from "./VehiclePolicyForm";

const { Panel } = Collapse;

const VehiclePolicyAccordian = () => {
  return (
    <Collapse expandIconPosition="end" accordion>
      <Panel
        header={<Typography.Title level={5}>Vehicle Policy</Typography.Title>}
        key="1"
      >
        <VehiclePolicyForm />
      </Panel>
    </Collapse>
  );
};

export default VehiclePolicyAccordian;
