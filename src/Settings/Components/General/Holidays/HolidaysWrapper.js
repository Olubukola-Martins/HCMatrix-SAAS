import { Modal } from "antd";
import { useState } from "react";
import AddHolidayForm from "./AddHolidayForm";
import HolidaysTable from "./HolidaysTable";

const HolidaysWrapper = () => {
  const [showM, setShowM] = useState(false);
  return (
    <>
      <Modal
        visible={showM}
        onCancel={() => setShowM(false)}
        title="Add Holiday"
        footer={null}
      >
        <AddHolidayForm />
      </Modal>
      <div className="flex flex-col gap-4">
        <div className="flex justify-end">
          <button className="button" onClick={() => setShowM(true)}>
            Add Holiday
          </button>
        </div>
        <div>
          <HolidaysTable />
        </div>
      </div>
    </>
  );
};

export default HolidaysWrapper;
