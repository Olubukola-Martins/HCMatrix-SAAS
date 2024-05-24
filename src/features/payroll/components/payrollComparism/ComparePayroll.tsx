import { Form, Input, Modal, Typography, DatePicker } from "antd";
import { AppButton } from "components/button/AppButton";
import { appRoutes } from "config/router/paths";
import { TPayrollComaparisonType } from "features/payroll/hooks/payroll/comparison/useComparePayroll";
import { useNavigate } from "react-router-dom";
import { IModalProps } from "types";

type TProps = IModalProps & {
  payrollId: number;
  type: TPayrollComaparisonType;
};

const CONTENT_MAPPING: Record<
  TPayrollComaparisonType,
  { title: string; description: string; formLabel: string }
> = {
  basic: {
    title: "Basic Comparison",
    description:
      "In the basic comparison feature, you can only compare two payrolls at a time.",
    formLabel: "Select Period",
  },
  advanced: {
    title: "Advanced Comparison",
    description:
      "In advanced comparison feature, you can compare more than two payrolls at a time.",
    formLabel: "Select Range",
  },
};
export const ComparePayroll: React.FC<TProps> = ({
  open,
  handleClose,
  payrollId,
  type,
}) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const handleSubmit = (data: any) => {
    console.log(data, "compare data ...");
    const period = data.period;
    switch (type) {
      case "basic":
        navigate(
          `${
            appRoutes.payrollComparison
          }?id=${payrollId}&type=${type}/&selected=${period.selected.year.format(
            "YYYY"
          )}-${period.selected.month.format(
            "MM"
          )}-01&against=${period.against.year.format(
            "YYYY"
          )}-${period.against.month.format("MM")}-01`
        );

        break;
      case "advanced":
        // download the data or handle ....
        break;

      default:
        break;
    }
  };
  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      title={null}
      style={{ top: 20 }}
      width={`50%`}
    >
      <div className="space-y-8">
        <div className="flex flex-col text-center mt-2">
          <Typography.Title level={3}>
            <span className="font-black">{CONTENT_MAPPING[type].title}</span>
          </Typography.Title>
          <span className="max-[50%]">{CONTENT_MAPPING[type].description}</span>
        </div>
        <Form
          layout="vertical"
          form={form}
          onFinish={handleSubmit}
          requiredMark={false}
        >
          <Form.Item name="period" label={CONTENT_MAPPING[type].formLabel}>
            <Input.Group className="flex gap-x-5 items-start w-full justify-between">
              <Form.Item name={[`period`, `selected`]}>
                <Input.Group className="flex gap-x-4 items-center">
                  <Form.Item name={[`period`, `selected`, `month`]}>
                    <DatePicker
                      picker="month"
                      placeholder="Select Month"
                      format={`MMMM`}
                    />
                  </Form.Item>
                  <Form.Item name={[`period`, `selected`, `year`]}>
                    <DatePicker picker="year" placeholder="Select Year" />
                  </Form.Item>
                </Input.Group>
              </Form.Item>
              <button>
                <i className="ri-arrow-right-line text-lg text-caramel" />
              </button>
              <Form.Item name={[`period`, `against`]}>
                <Input.Group className="flex gap-x-4 items-center">
                  <Form.Item name={[`period`, `against`, `month`]}>
                    <DatePicker
                      picker="month"
                      placeholder="Select Month"
                      format={`MMMM`}
                    />
                  </Form.Item>
                  <Form.Item name={[`period`, `against`, `year`]}>
                    <DatePicker picker="year" placeholder="Select Year" />
                  </Form.Item>
                </Input.Group>
              </Form.Item>
            </Input.Group>
          </Form.Item>

          <div className="flex justify-between items-center relative -top-3">
            <AppButton
              label="Cancel"
              variant="transparent"
              handleClick={() => handleClose()}
            />
            <AppButton type="submit" label="Compare" />
          </div>
        </Form>
      </div>
    </Modal>
  );
};
