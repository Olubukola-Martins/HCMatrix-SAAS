import { Input } from "antd";
import { IoCopyOutline } from "react-icons/io5";

export const PortalLink = () => {
  return (
    <div className="Container">
      <h2 className="text-base p-2 my-1">User Portal Link</h2>
      <Input placeholder="https://" />
      <button className="flex p-2 my-4 gap-2 items-center border border-[#686868] rounded">
        <IoCopyOutline />
        Copy link
      </button>
    </div>
  );
};
