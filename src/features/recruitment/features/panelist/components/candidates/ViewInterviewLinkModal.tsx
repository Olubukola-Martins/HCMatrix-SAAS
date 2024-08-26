import { Modal } from "antd";
import React, { useState } from "react";

interface LinkModalProps {
  visible: boolean;
  onClose: () => void;
  link: string;
}

const ViewInterviewLinkModal: React.FC<LinkModalProps> = ({ visible, onClose, link }) => {
  const [copied, setCopied] = useState(false);

  function ensureHttpPrefix(url: string): string {
    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }
    return `http://${url}`;
  }

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(link)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };
  return (
    <Modal open={visible} onCancel={onClose} footer={null} className=" items-center w-[80vw] max-w-[400px] h-60">
      <p className="text-center mt-5 text-xl">Interview Link</p>
      <div className="flex mt-5 gap-x-10">
        <div className="border rounded-md py-2 px-3 text-caramel w-3/5">
          <a href={ensureHttpPrefix(link)} target="_blank" rel="noopener noreferrer" className="cursor-pointer underline text-lg">
            {link}
          </a>
        </div>

          <div className="flex flex-nowrap gap-x-1 cursor-pointer items-center text-lg hover:opacity-75 opacity-85" onClick={copyToClipboard}>
            <i className="ri-file-copy-line text-lg"></i>
            <p>Copy Link</p>
          </div>
          {copied && <span className="absolute right-5 bottom-16">Link copied!</span>}
      </div>
    </Modal>
  );
};

export default ViewInterviewLinkModal;
