import { Typography } from "antd";
import ErrorImage from "../../assets/images/err.png";

interface IErrProps {
  message: string;
  supportText?: string;
  showImage?: boolean;
}

export const ErrorComponent = ({
  message,
  supportText,
  showImage = false,
}: IErrProps) => {
  return (
    <div className="h-full flex flex-col gap-4 justify-center items-center">
      {showImage ? (
        <div>
          <img
            src={ErrorImage}
            alt="error"
            className="object-contain h-[40vh]"
            loading="lazy"
          />
        </div>
      ) : null}
      <Typography.Title level={4}>
        <span className="text-red-600">{message}</span>
      </Typography.Title>
      <p className="text-caramel text-sm">{supportText}</p>
    </div>
  );
};
