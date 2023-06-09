import { Modal, Form, Select } from "antd";
import Themes from "components/Themes";
import { useFetchEmployees } from "features/core/employees/hooks/useFetchEmployees";
import { useState } from "react";

interface IProps {
  open: boolean;
  handleClose: Function;
}
// TO DO: Add Transfer ownership logic to component && make it in sync with current practices
const TransferOwnership = ({ open, handleClose }: IProps) => {
  const [showSubmit, setShowSubmit] = useState(false);
  const [checkValueLength, setCheckValueLength] = useState("");
  const { data: employeeData } = useFetchEmployees();

  return (
    <>
      <Modal
        footer={null}
        open={open}
        onCancel={() => handleClose()}
        title={
          <div className="flex items-center justify-between w-full">
            <h5 className="text-base font-semibold">Transfer Ownership</h5>
          </div>
        }
      >
        <Themes>
          <div>
            <Form layout="vertical">
              {/* first phase */}
              <div className={showSubmit ? `hidden` : `""`}>
                <Form.Item label="Select User">
                  <Select
                    showSearch
                    allowClear
                    optionLabelProp="label"
                    placeholder="Select"
                    onChange={(val) => setCheckValueLength(val)}
                  >
                    {employeeData?.data.map((data) => (
                      <Select.Option
                        key={data.id}
                        value={data.id}
                        label={data.firstName}
                      >
                        {data.firstName}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                {checkValueLength === undefined || "" ? (
                  <button type="button" className="button mt-4" disabled>
                    Transfer ownership
                  </button>
                ) : (
                  <button
                    onClick={() => setShowSubmit(true)}
                    type="button"
                    className="button mt-4"
                  >
                    Transfer ownership
                  </button>
                )}
              </div>

              {/* second phase */}
              <div className={showSubmit ? `""` : `hidden`}>
                <h4 className="font-extrabold mb-3 text-center text-lg">
                  Do you want to Assign <br />
                  total ownership to Isaac
                </h4>
                <div className="flex  justify-center items-center gap-x-10 mt-10">
                  <button type="submit" className="button">
                    Yes, Continue
                  </button>
                  <button
                    type="button"
                    className="transparentButton"
                    onClick={() => setShowSubmit(false)}
                  >
                    No, Cancel
                  </button>
                </div>
              </div>
            </Form>
          </div>
        </Themes>
      </Modal>
    </>
  );
};

export default TransferOwnership;
