import { AutoComplete, Avatar, Modal } from "antd";
import React, { useState } from "react";
import Themes from "../../Themes/Themes";

const emailList = Array(3).fill("godswill@snapnetsolution.com");

interface IProps {
  open: boolean;
  handleClose: Function;
}

const users = [
  {
    value: "godswill@snapnetsolution.com",
    id: 1994,
    image: "https://picsum.photos/140",
    label: (
      <div className="flex gap-2 items-center">
        <Avatar src="https://picsum.photos/140" />
        <span>Godswill</span>
      </div>
    ),
  },
  {
    value: "isaac@snapnetsolution.com",
    id: 1904,
    image: "https://picsum.photos/180",
    label: (
      <div className="flex gap-2 items-center">
        <Avatar src="https://picsum.photos/180" />
        <span>Isaac</span>
      </div>
    ),
  },
];
const TransferOwnership = ({ open, handleClose }: IProps) => {
  const [showSubmit, setShowSubmit] = useState(false);
  const [options, setOptions] = useState(users);
  const [userId, setUserId] = useState("");
  const onSearch = (searchText: string) => {
    const result = users.filter(
      (item) =>
        item.value.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
    );
    setOptions(() => result);
  };

  const onSelect = (data: string) => {
    setUserId(data);
    setShowSubmit(true);
  };

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
            <div className="">
              {/* first phase */}
              <div className={showSubmit ? `hidden` : `""`}>
                <h4 className="font-semibold mb-3">Select a user</h4>
                <AutoComplete
                  options={options}
                  defaultValue={userId}
                  onSelect={onSelect}
                  onSearch={onSearch}
                  placeholder="Search users"
                  size="middle"
                  className="w-full"
                />
                <br />

                <button
                  onClick={() => setShowSubmit(true)}
                  type="button"
                  className="button mt-4"
                >
                  Transfer ownership
                </button>
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
            </div>
          </div>
        </Themes>
      </Modal>
    </>
  );
};

export default TransferOwnership;
