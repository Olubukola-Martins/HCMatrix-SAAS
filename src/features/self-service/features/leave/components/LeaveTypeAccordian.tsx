import { Collapse, Space, Typography, Modal } from "antd";
import { MoreOutlined, CloseOutlined } from "@ant-design/icons";
import { useState } from "react";
import AddLeaveTypeForm from "./AddLeaveTypeForm";
import LeaveTypeCardList from "./LeaveTypeCardList";

const { Panel } = Collapse;

const LeaveTypeAccordian = () => {
  const [showM, setShowM] = useState(false);
  return (
    <>
      <Modal
        visible={showM}
        onCancel={() => setShowM(false)}
        title="Add Leave Type"
        footer={null}
        style={{ top: 10 }}
      >
        <AddLeaveTypeForm handleClose={() => setShowM(false)} />
      </Modal>
      <Collapse defaultActiveKey={["1"]} expandIconPosition="end" accordion>
        <Panel
          header={<Typography.Title level={5}>Leave Types</Typography.Title>}
          key="1"
        >
          <div className="flex flex-col gap-4">
            <div className="flex justify-end">
              <button className="button" onClick={() => setShowM(true)}>
                Add Leave Type
              </button>
            </div>
            <LeaveTypeCardList />
          </div>
        </Panel>
      </Collapse>
    </>
  );
};

export default LeaveTypeAccordian;
