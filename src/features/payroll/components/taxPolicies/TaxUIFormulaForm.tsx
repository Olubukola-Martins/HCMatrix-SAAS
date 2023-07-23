import { Form, Input, InputNumber, Popconfirm, Table, Tag } from "antd";
import type { FormInstance } from "antd/es/form";
import { AppButton } from "components/button/AppButton";
import { DeleteFilled } from "@ant-design/icons";
import React, { useContext, useEffect, useRef, useState } from "react";
import { TTaxPolicyCreatorProps } from "./TaxPolicyCreator";
import { AddSalaryComponentForm } from "../salaryComponents/AddSalaryComponent";
import {
  TTaxCondition,
  createTaxyearlyTaxableIncomeComponentFormula,
  dummyConditions,
} from "features/payroll/utils/createTaxSalaryComponentFormula";

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
  key: string;
  name: string;
  amount: number;
  taxRate: number;
  taxAmountPayablePerYear: number;
}

interface EditableRowProps {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<any>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (
      editing &&
      editing &&
      record?.name.toLowerCase().indexOf("over") === -1
    ) {
      inputRef?.current!.focus();
    }
  }, [editing, record]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();

      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode =
      editing && record?.name.toLowerCase().indexOf("over") === -1 ? (
        <Form.Item
          style={{ margin: 0 }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} is required.`,
              type: "number",
            },
          ]}
        >
          <InputNumber ref={inputRef} onPressEnter={save} onBlur={save} />
        </Form.Item>
      ) : (
        <div
          className="editable-cell-value-wrap"
          style={{ paddingRight: 24 }}
          onClick={toggleEdit}
        >
          {children}
        </div>
      );
  }

  return <td {...restProps}>{childNode}</td>;
};

type EditableTableProps = Parameters<typeof Table>[0];

interface DataType {
  key: React.Key;
  name: string;
  amount: number;
  taxRate: number;
  taxAmountPayablePerYear: number;
}

type ColumnTypes = Exclude<EditableTableProps["columns"], undefined>;

export const TaxUIFormulaForm: React.FC<
  TTaxPolicyCreatorProps & {
    handleFormula: (val: string) => void;
    taxableIncome?: string;
  }
> = ({ dependencies = [], handleFormula, taxableIncome }) => {
  const convertedConditions = dummyConditions.map(
    (condition, index, conditions) => {
      let name = "";
      if (index === 0) {
        name = "First";
      } else {
        name = "Next";
      }
      if (index === conditions.length - 1) {
        name = `Over `;
      }
      return {
        key: index.toString(),
        name: name,
        amount:
          index === conditions.length - 1
            ? conditions[index - 1].max
            : condition.max,
        taxRate: condition.rate,
        taxAmountPayablePerYear: condition.yearlyTaxableIncome,
      };
    }
  );

  console.log(convertedConditions);

  const [dataSource, setDataSource] = useState<DataType[]>(convertedConditions);

  const [count, setCount] = useState(2);

  const handleDelete = (key: React.Key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  const defaultColumns: (ColumnTypes[number] & {
    editable?: boolean;
    dataIndex: string;
  })[] = [
    {
      title: "",
      dataIndex: "name",
    },
    {
      title: "Yearly Taxable Income",
      dataIndex: "amount",
      width: "60%",
      editable: true,
    },
    {
      title: "Tax Amount Payable Per Year",
      dataIndex: "taxAmountPayablePerYear",
      editable: true,
    },
    {
      title: "Tax Rate",
      dataIndex: "taxRate",
      editable: true,
    },
    {
      title: "",
      dataIndex: "operation",
      render: (_, record: unknown) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete((record as DataType).key)}
          >
            <DeleteFilled />
          </Popconfirm>
        ) : null,
    },
  ];

  const handleAdd = () => {
    const newData: DataType = {
      key: count,
      name: `Next`,
      amount: 0,
      taxRate: 0,
      taxAmountPayablePerYear: 0,
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };

  const handleSave = (row: DataType) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    // Fix code below let it update last row based on the previous row amount
    // if (newData.length - 2 === index) {
    //   newData[newData.length - 1].amount = row.amount;
    // }

    setDataSource(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  useEffect(() => {
    // every time datasource is updated ensure to update the formula
    const conditions: TTaxCondition[] = dataSource.map(
      (item, i, items): TTaxCondition => ({
        min: i === 0 ? 0 : items[i - 1].amount,
        max: i === items.length - 1 ? Infinity : item.amount,
        yearlyTaxableIncome: i === 0 ? 0 : item.taxAmountPayablePerYear,
        rate: item.taxRate / 100,
      })
    );
    const result = createTaxyearlyTaxableIncomeComponentFormula({
      conditions,
      taxableIncome: taxableIncome ?? "taxable_income",
      divisor: 1,
    });
    console.log("first", result);
    handleFormula(result);
  }, [dataSource, handleFormula, taxableIncome]);
  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });
  return (
    <div className="flex flex-col gap-4">
      <Table
        components={components}
        rowClassName={() => "editable-row"}
        bordered
        pagination={false}
        dataSource={dataSource}
        columns={columns as ColumnTypes}
      />
      <AppButton
        label="Add a row"
        handleClick={handleAdd}
        type="button"
        variant="transparent"
      />
    </div>
  );
};
