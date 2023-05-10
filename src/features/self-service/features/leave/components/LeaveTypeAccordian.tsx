import { Collapse, Space, Typography, Modal } from "antd";
import { MoreOutlined, CloseOutlined } from "@ant-design/icons";
import { useState } from "react";
import AddLeaveTypeForm from "./AddLeaveTypeForm";

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
            <div className="bg-card py-4 px-3 flex justify-between align-center rounded-md">
              <h5 className="text-base ">Maternity Leave</h5>
              <MoreOutlined />
            </div>
            <div className="bg-card py-4 px-3 flex justify-between align-center rounded-md">
              <h5 className="text-base ">Maternity Leave</h5>
              <MoreOutlined />
            </div>
          </div>
        </Panel>
      </Collapse>
    </>
  );
};

export default LeaveTypeAccordian;
