import { Collapse, Typography } from "antd";
import LeavePolicyForm from "./policy/LeavePolicyForm";
import AppTooltip from "components/tooltip/AppTooltip";

const { Panel } = Collapse;

const LeavePolicyAccordian = () => {
  return (
    <Collapse expandIconPosition="end" accordion>
      <Panel
        header={
          <AppTooltip
            children={
              <Typography.Title level={5}>Leave Policy</Typography.Title>
            }
            tooltipProps={{
              title:
                "This section enables you to define leave policy. Note that leave policy cannot be modified when a leave cycle is active. If you wish to modify this section then first deactivate the ongoing leave cycle.",
            }}
          />
        }
        key="1"
      >
        <LeavePolicyForm />
      </Panel>
    </Collapse>
  );
};

export default LeavePolicyAccordian;
