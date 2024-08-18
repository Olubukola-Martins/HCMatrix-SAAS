import { Input } from "antd";
import { useState } from "react";
import { IoCopyOutline } from "react-icons/io5";

export const PortalLink = () => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const handleCopyClick = () => {
    if (inputValue.trim() === "") {
      alert("Input field is empty!");
      return;
    }
    navigator.clipboard.writeText(inputValue).then(() => {
      alert("Link copied to clipboard!");
    });
  };

  return (
    <div className="Container">
      <h2 className="text-base p-2 my-1">User Portal URL</h2>
      <Input
        placeholder="https://"
        value={inputValue}
        onChange={handleInputChange}
      />

      <button
        onClick={handleCopyClick}
        className="flex p-2 my-4 gap-2 items-center border border-[#686868] rounded"
      >
        <IoCopyOutline />
        Copy link
      </button>
    </div>
  );
};
