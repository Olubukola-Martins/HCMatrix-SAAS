import { Select } from "antd";
import { APPROVAL_STATUS_OPTIONS } from "constants/statustes";
import { TApprovalStatus } from "types/statuses";

interface IProps {
  onSelect?: (val: TApprovalStatus) => void;
  onClear?: () => void;
  value?: TApprovalStatus;
  size?: "small" | "middle" | "large";
  mode?: "multiple" | "tags";
}

export const SelectApprovalStatus: React.FC<IProps> = ({
  value,
  onSelect,
  onClear,
  size = "middle",
  mode,
}) => {
  return (
    <div>
      <Select
        mode={mode}
        size={size}
        value={value}
        placeholder="Select Status"
        options={APPROVAL_STATUS_OPTIONS.map((a) => ({
          value: a.value,
          label: <span className="capitalize">{a.label}</span>,
        }))}
        allowClear
        className="rounded border-slate-400 w-full capitalize"
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        onSelect={(val: TApprovalStatus) => {
          onSelect?.(val);
        }}
        onClear={onClear}
      />
    </div>
  );
};
