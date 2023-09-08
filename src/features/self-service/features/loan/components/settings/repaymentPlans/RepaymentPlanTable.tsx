import { Avatar, Button, Form, Input, InputNumber, Switch, Table } from "antd";
import { ColumnsType, TablePaginationConfig, TableProps } from "antd/lib/table";
import { useState } from "react";
import { useQueryClient } from "react-query";
import { openNotification } from "utils/notifications";
import { useUpdateExchangeRate } from "features/payroll/hooks/exhangeRates/useUpdateExchangeRate";
import { QUERY_KEY_FOR_EXCHANGE_RATES } from "features/payroll/hooks/exhangeRates/useGetExchangeRates";
import { TRepaymentPlan } from "../../../types";

interface IProps {
  data?: TRepaymentPlan[];
  loading?: boolean;
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "text" | "number";
  record: TRepaymentPlan;
  index: number;
  children: React.ReactNode;
}
const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode =
    inputType === "text" ? (
      <Input value={record?.name} placeholder="Name" />
    ) : (
      <InputNumber value={record?.duration} placeholder="duration" />
    );

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const RepaymentPlanTable = ({ data = [], loading }: IProps) => {
  const queryClient = useQueryClient();

  const [form] = Form.useForm();

  const { mutate, isLoading } = useUpdateExchangeRate();

  const [editingKey, setEditingKey] = useState<number>();
  const isEditing = (record: TRepaymentPlan) => record.id === editingKey;
  const edit = (record: Partial<TRepaymentPlan> & { id: React.Key }) => {
    form.setFieldsValue({ isLead: false, ...record });
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey(undefined);
  };
  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as TRepaymentPlan;

      const member = data?.find(
        (item) => item.id === key
      ) as unknown as TRepaymentPlan;

      mutate(
        {
          id: member.id,
          body: {
            currency: member.name,
            rate: +row.id,
          },
        },
        {
          onError: (err: any) => {
            openNotification({
              state: "error",
              title: "Error Occurred",
              description:
                err?.response.data.message ?? err?.response.data.error.message,
            });
          },
          onSuccess: (res: any) => {
            openNotification({
              state: "success",

              title: "Success",
              description: res.data.message,
              // duration: 0.4,
            });

            // form.resetFields(); //will be added if it was empty vals under to prevent it from being used in the row below on edit
            cancel();

            queryClient.invalidateQueries({
              queryKey: [QUERY_KEY_FOR_EXCHANGE_RATES],
              // exact: true,
            });
          },
        }
      );
    } catch (errInfo) {
      console.log(errInfo, "ERRO");
    }
  };
  const ogColumns: ColumnsType<TRepaymentPlan> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_, item) => item.name,
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
      render: (_, item) => item.duration,
    },

    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: 40,
      render: (_, item) => {
        const editable = isEditing(item);
        return editable ? (
          <div className="flex gap-4">
            <Button
              onClick={() => save(item.id)}
              type="text"
              loading={isLoading}
            >
              <span className="capitalize text-caramel cursor-pointer">
                Save
              </span>
            </Button>
            <Button onClick={() => cancel()} type="text">
              <span>Cancel</span>
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-3 text-lg">
            {!editingKey ? (
              <i
                className="ri-pencil-line cursor-pointer hover:text-caramel"
                onClick={() => edit(item)}
              />
            ) : (
              <>
                <i className="ri-pencil-line cursor-not-allowed text-slate-200" />
              </>
            )}
          </div>
        );
      },
    },
  ];
  const columns = ogColumns;
  const mergedColumns = columns.map((col) => {
    if (col.key === "name" || col.key === "duration") {
      return {
        ...col,
        onCell: (record: TRepaymentPlan) => ({
          record,
          inputType: col.key === "name" ? "text" : "number",
          dataIndex: col.key,
          title: col.title,
          editing: isEditing(record),
        }),
      };
    }
    return col;
  });

  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        columns={mergedColumns as any}
        size="small"
        dataSource={data}
        loading={loading}
      />
    </Form>
  );
};

export default RepaymentPlanTable;
