import { Select } from "antd";
import { APPROVAL_STATUS_OPTIONS } from "constants/statustes";
import { TApprovalStatus } from "types/statuses";

interface IProps {
  onSelect?: (val: TApprovalStatus) => void;
  onClear?: () => void;
  value?: TApprovalStatus;
}

export const SelectApprovalStatus: React.FC<IProps> = ({
  value,
  onSelect,
  onClear,
}) => {
  return (
    <div>
      <Select
        value={value}
        placeholder="Select Estate"
        options={APPROVAL_STATUS_OPTIONS}
        allowClear
        className="rounded border-slate-400 w-full"
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        onSelect={(val: TApprovalStatus) => {
          onSelect?.(val);
        }}
      />
    </div>
  );
};
