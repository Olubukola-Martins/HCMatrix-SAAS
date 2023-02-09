import { AutoComplete, Avatar, Form, Modal, Select } from "antd";
import { useFetchEmployees } from "APIRQHooks/Utility/employeeHooks";
import { IAuthDets } from "AppTypes/Auth";
import { GlobalContext } from "Contexts/GlobalContextProvider";
import { useContext, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import Themes from "../../Themes/Themes";

interface IProps {
  open: boolean;
  handleClose: Function;
}

const users = [
  {
    id: 1,
    name: "Godswill Omenuko",
    email: "godswill@snapnetsolutions.com",
  },
  {
    id: 2,
    name: "Isaac Odeh",
    email: " Odeh@snapnetsolutions.com",
  },
];
const TransferOwnership = ({ open, handleClose }: IProps) => {
  const auth = useAuthUser();
  const authDetails = auth() as unknown as IAuthDets;
  const token = authDetails.userToken;
  const globalCtx = useContext(GlobalContext);
  const { state: globalState } = globalCtx;
  const companyId = globalState.currentCompany?.id as unknown as string;

  const [showSubmit, setShowSubmit] = useState(false);
  const [checkValueLength, setCheckValueLength] = useState("");
  const {
    data: employeeData,
    isSuccess,
    isFetching,
  } = useFetchEmployees({
    companyId,
    token,
  });
  console.log(checkValueLength);

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
