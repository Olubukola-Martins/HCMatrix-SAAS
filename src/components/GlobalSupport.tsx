import { Modal, Popover, Tooltip } from "antd";
import React, { useState } from "react";
import Themes from "./Themes";
import CustomerComplaintModal from "./customerComplaint/CustomerComplaintModal";

const GlobalSupport = () => {
  const [hovered, setHovered] = useState(false);
  const [queryModal, setQueryModal] = useState(false);

  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };
  const handleHoverChange = (open: boolean) => {
    setHovered(open);
  };

  return (
    <>
      <Popover
        openClassName="support"
        // style={{ width: 200, margin: "0 20px" }}
        title={
          <div className="flex items-center gap-x-10  font-medium text-white">
            <span>HCMatrix Quick Links</span>
            <i
              className="ri-close-line cursor-pointer"
              onClick={() => setHovered(false)}
            ></i>
          </div>
        }
        open={hovered}
        onOpenChange={handleHoverChange}
        trigger="click"
        content={
          <Themes>
            <div className="rounded-md">
              <div className=" font-medium">
                <ul className="flex flex-col gap-y-3">
                  <li className="flex items-center gap-x-5 border-b-2 pb-1  cursor-pointer group">
                    <i className="ri-movie-line text-xl"></i>
                    <span className="group-hover:text-caramel">Help Video</span>
                  </li>
                  <li className="flex items-center gap-x-5 border-b-2 pb-1  cursor-pointer group">
                    <i className="ri-book-line text-xl"></i>
                    <span className="group-hover:text-caramel">
                      Read Article
                    </span>
                  </li>
                  <li className="flex items-center gap-x-5 border-b-2 pb-1  cursor-pointer group">
                    <i className="ri-phone-line text-xl"></i>
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href="https://snapnet.3cx.ng/LiveChat397407"
                      className="group-hover:text-caramel"
                    >
                      Call
                    </a>
                  </li>
                  <li className="flex items-center gap-x-5 border-b-2 pb-1  cursor-pointer group">
                    <i className="ri-whatsapp-line text-xl"></i>
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href="https://api.whatsapp.com/send?phone=1%20(254)%20244-0305&text=Hello,%20I%20have%20a%20question%20about%20http%3A%2F%2Flocalhost%3A3000%2F"
                      className="group-hover:text-green-500"
                    >
                      WhatsApp
                    </a>
                  </li>
                  <li
                    // onClick={() => setQueryModal(true)}
                    className="flex items-center gap-x-5 pb-1  cursor-pointer group"
                  >
                    <i className="ri-mail-line text-xl"></i>
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href="https://hcmatrixsupport.powerappsportals.com/Account/Login/Register?returnUrl=%2Fsupport%2Fcreate-case%2F"
                      className="group-hover:text-green-500"
                    >
                      Drop Complaint
                    </a>
                    {/* <span className="group-hover:text-caramel">
                      Drop Complaint
                    </span> */}
                  </li>
                </ul>
              </div>
            </div>
          </Themes>
        }
      >
        <i
          style={{ borderWidth: "6px" }}
          className="ri-question-mark text-lg z-50 cursor-pointer font-semibold text-caramel border-caramel bg-white h-10 w-10 flex items-center rounded-full justify-center fixed bottom-10 right-3"
        ></i>
      </Popover>

      <CustomerComplaintModal
        open={queryModal}
        handleClose={() => setQueryModal(false)}
      />
    </>
  );
};

export default GlobalSupport;
