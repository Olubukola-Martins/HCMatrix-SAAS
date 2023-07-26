import { Avatar, Button, Form, Input, InputNumber, Switch, Table } from "antd";
import { ColumnsType, TablePaginationConfig, TableProps } from "antd/lib/table";
import { useState } from "react";
import { useQueryClient } from "react-query";
import { openNotification } from "utils/notifications";
import { TExchangeRateListItem } from "features/payroll/types";
import { useUpdateExchangeRate } from "features/payroll/hooks/exhangeRates/useUpdateExchangeRate";
import { QUERY_KEY_FOR_EXCHANGE_RATES } from "features/payroll/hooks/exhangeRates/useGetExchangeRates";

interface IProps {
  data?: TExchangeRateListItem[];
  loading?: boolean;
  defaultCompanyParams?: string;
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "number";
  record: TExchangeRateListItem;
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
    inputType === "number" ? (
      <InputNumber value={record.rate} placeholder="Rate" />
    ) : (
      <Input />
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

export const ExchangeRatesTable = ({
  data = [],
  loading,
  defaultCompanyParams,
}: IProps) => {
  const queryClient = useQueryClient();

  const [form] = Form.useForm();

  const { mutate, isLoading } = useUpdateExchangeRate();

  const [editingKey, setEditingKey] = useState<number>();
  const isEditing = (record: TExchangeRateListItem) => record.id === editingKey;
  const edit = (record: Partial<TExchangeRateListItem> & { id: React.Key }) => {
    form.setFieldsValue({ isLead: false, ...record });
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey(undefined);
  };
  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as TExchangeRateListItem;

      const member = data?.find(
        (item) => item.id === key
      ) as unknown as TExchangeRateListItem;

      mutate(
        {
          id: member.id,
          body: {
            currency: member.currency,
            rate: +row.rate,
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
  const columns: ColumnsType<TExchangeRateListItem> = [
    {
      title: "Currency",
      dataIndex: "curr",
      key: "curr",
      render: (_, item) => item.currency,
    },
    {
      title: "Rate",
      dataIndex: "rate",
      key: "rate",
      render: (_, item) => item.rate,
    },

    {
      title: "Action",
      dataIndex: "action",
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
            {!editingKey && defaultCompanyParams !== item.currency ? (
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
  const mergedColumns = columns.map((col) => {
    if (col.key !== "rate") {
      return col;
    }
    return {
      ...col,
      onCell: (record: TExchangeRateListItem) => ({
        record,
        inputType: col.key === "rate" ? "number" : null,
        dataIndex: col.key,
        title: col.title,
        editing: isEditing(record),
      }),
    };
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
