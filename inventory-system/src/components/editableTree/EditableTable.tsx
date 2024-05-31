import React, { useContext, useEffect, useRef, useState } from "react";
import type { GetRef, InputRef, RefSelectProps } from "antd";
import { Button, Form, Input, Popconfirm, Select, Table } from "antd";
import { OrderItem } from "../../redux/order/constant";
import { RootState } from "../../redux/store";
import { shallowEqual, useSelector } from "react-redux";

type FormInstance<T> = GetRef<typeof Form<T>>;

const EditableContext = React.createContext<FormInstance<OrderItem> | null>(
  null
);

interface EditableRowProps {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  console.log("index check:", index, props);
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
  dataIndex: keyof OrderItem;
  record: OrderItem;
  handleSave: (record: OrderItem) => void;
  inputType: string;
  dataSource: OrderItem[];
  disabled: boolean;
}
const filterOption = (
  input: string,
  option?: { label: string; value: number }
) => {
  return (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
};
const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  inputType,
  dataSource,
  disabled,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const selectRef = useRef<RefSelectProps>(null);
  const form = useContext(EditableContext)!;
  const { items } = useSelector(
    (state: RootState) => state.itemReducer,
    shallowEqual
  );
  useEffect(() => {
    if (editing) {
      if (inputType === "input") {
        inputRef.current?.focus();
      } else {
        selectRef.current?.focus();
      }
    }
  }, [editing, inputType]);

  const toggleEdit = () => {
    if (!disabled) {
      setEditing(!editing);
      form.setFieldsValue({ [dataIndex]: record[dataIndex] });
    }
  };

  const save = () => {
    form.validateFields().then((values) => {
      console.log("key value:", values);
      toggleEdit();
      handleSave({ ...record, ...values });
    });
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        {inputType === "select" ? (
          <Select
            ref={selectRef}
            onBlur={save}
            showSearch
            filterOption={filterOption}
            options={items.map((item) => ({
              value: item.id,
              label: item?.itemName ?? "",
              disabled: dataSource.some((data) => data.itemId === item.id), // disable option if it's already selected
            }))}
          />
        ) : (
          <Input ref={inputRef} onPressEnter={save} onBlur={save} />
        )}
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
  age: string;
  address: string;
}
interface OrderItemProps {
  initialData?: OrderItem[];
  onUpdateOrderItems: (items: OrderItem[]) => void;
  disabled: boolean;
}

type ColumnTypes = Exclude<EditableTableProps["columns"], undefined>;

const EditAbleTable: React.FC<OrderItemProps> = ({
  initialData,
  onUpdateOrderItems,
  disabled,
}) => {
  const [dataSource, setDataSource] = useState<OrderItem[]>(initialData || []);

  const [count, setCount] = useState(500);
  const handleDelete = (key: number) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
    onUpdateOrderItems(newData);
  };
  const { items } = useSelector(
    (state: RootState) => state.itemReducer,
    shallowEqual
  );
  useEffect(() => {
    if (initialData) {
      setDataSource(
        initialData.map((orderItem) => {
          const correspondingItem = items.find(
            (item) => item.id === orderItem.itemId
          );
          return {
            ...orderItem,
            key: orderItem.itemId,
            itemName: correspondingItem?.itemName,
          };
        })
      );
    }
  }, [initialData, items]);
  const defaultColumns: (ColumnTypes[number] & {
    editable?: boolean;
    dataIndex: string;
    inputType?: string;
  })[] = [
    {
      title: "Item Name",
      dataIndex: "itemId",
      width: "40%",
      editable: true,
      inputType: "select",
      render: (_, record) =>
        record.itemName ? record.itemName : record.itemId,
    },
    {
      title: "Quantity",
      dataIndex: "orderedQuantity",
      editable: true,
      width: "15%",
    },
    {
      title: "Rate",
      dataIndex: "price",
      editable: true,
      width: "20%",
    },
    {
      title: "Total Amount",
      dataIndex: "amount",
      width: "20%",
      render: (_, record: OrderItem) => {
        const orderedQuantity: number = record.orderedQuantity
          ? record.orderedQuantity
          : 0;
        const price: number = record.price ? record.price : 0;
        const amount = orderedQuantity * price;

        return amount;
      },
    },
    {
      title: "operation",
      dataIndex: "operation",
      width: "5%",
      render: (_, record) =>
        dataSource.length >= 1 ? (
          disabled === false ? (
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => handleDelete(record.key)}
            >
              <a>Delete</a>
            </Popconfirm>
          ) : null
        ) : null,
    },
  ];

  const handleAdd = () => {
    const newData: OrderItem = { key: count };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };

  const handleSave = (row: OrderItem) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    const correspondingItem = items.find((item) => item.id === row.itemId);

    newData.splice(index, 1, {
      ...item,
      ...row,
      itemName: correspondingItem?.itemName,
    });
    setDataSource(newData);
    onUpdateOrderItems(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

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
        inputType: col.inputType,
        dataSource,
        disabled,
      }),
    };
  });

  return (
    <div>
      <Button
        disabled={disabled}
        onClick={handleAdd}
        type="primary"
        style={{ marginBottom: 16 }}
      >
        Add an item to Order
      </Button>
      <Table
        components={components}
        rowClassName={() => "editable-row"}
        bordered
        dataSource={dataSource}
        columns={columns as ColumnTypes}
      />
    </div>
  );
};

export default EditAbleTable;
