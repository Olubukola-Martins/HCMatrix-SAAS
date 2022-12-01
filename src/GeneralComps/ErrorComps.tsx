import { Typography } from "antd";
import { BeatLoader } from "react-spinners";

interface IErrProps {
  message: string;
  supportText?: string;
}

export const ErrorComponent = ({ message, supportText }: IErrProps) => {
  return (
    <div className="h-44 flex flex-col gap-4 justify-center items-center">
      <Typography.Title level={4}>
        <span className="text-red-600">{message}</span>
      </Typography.Title>
      <p className="text-caramel text-sm">{supportText}</p>
    </div>
  );
};
