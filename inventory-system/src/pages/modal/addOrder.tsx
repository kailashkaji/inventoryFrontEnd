import { Button, Card, Form, Input, Modal, Select, Statistic } from "antd";
import { Order, OrderItem } from "../../redux/order/constant";
import { useEffect, useState } from "react";
import EditAbleTable from "../../components/editableTree/EditableTable";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { SupplierData } from "../../redux/supplier/constant";
import { RootState } from "../../redux/store";
import { getItems } from "../../redux/item/action";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { User } from "../../redux/login/reducer";
interface OrderFormProps {
  visible: boolean;
  onCancel: () => void;
  onOk: (order: Order) => void;
  updateTotal: (total: number) => void;
  initialData?: Order;
}

const OrderForm: React.FC<OrderFormProps> = ({
  visible,
  onCancel,
  onOk,
  updateTotal,
  initialData,
}) => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(true);
  const [orderItems, setOrderItems] = useState<OrderItem[]>(
    initialData?.orderItem || []
  );
  const disabled = initialData?.id != undefined;
  const auth: User | null = useAuthUser();
  const isAdmin: boolean = auth?.roles.some((role) =>
    role.name.includes("Admin")
  );

  const vendorList: SupplierData[] = useSelector(
    (state: RootState) => state.supplierReducer.suppliers,
    shallowEqual
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (visible == true) {
      console.log("data ==>", initialData);
      dispatch(getItems());
      form.setFieldsValue(initialData);
      setIsLoading(false);
    }
  }, [dispatch, form, initialData, visible]);

  const handleOk = () => {
    form.validateFields().then((values) => {
      console.log(initialData, "final result:", values, "::", orderItems);

      onOk({
        ...initialData,
        ...values,
        type: 1,
        orderItem: orderItems,
      });

      form.resetFields();
      onCancel();
    });
  };
  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };
  const handleClose = () => {
    form.resetFields();
  };
  const handleOrderItemsUpdate = (items: OrderItem[]) => {
    setOrderItems(items); // Update orderItems state
    const grandTotal = items.reduce(
      (total, item) => total + (item.orderedQuantity || 0) * (item.price || 0),
      0
    );

    updateTotal(grandTotal);
  };

  // const handleDataFromChild = (childData: OrderItem[]) => {
  //   let total = 0;
  //   childData.forEach((item) => {
  //     total = total + item.amount;
  //   });
  //   return {
  //     ...initialData,
  //     orderItem: childData,
  //   };
  // };

  const filterOption = (
    input: string,
    option?: { label: string; value: number }
  ) => {
    console.log(option?.label, "+", input);
    return (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  };

  return (
    <>
      {isLoading == false && (
        <Modal
          width={1000}
          title={disabled ? "View Order" : "Create Purchase Order"}
          open={visible}
          afterClose={handleClose}
          onCancel={handleCancel}
          onOk={handleOk}
          destroyOnClose={true}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Cancel
            </Button>,
            !disabled && (
              <Button key="submit" type="primary" onClick={handleOk}>
                Ok
              </Button>
            ),
          ]}
          styles={{
            body: { overflowY: "auto", maxHeight: "calc(100vh - 200px)" },
          }}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              name="userId"
              label="Vendor Name"
              rules={[
                { required: true, message: "Please select the Vendor Name!" },
              ]}
            >
              {isAdmin ? (
                <Select
                  showSearch
                  filterOption={filterOption}
                  options={vendorList.map((item) => ({
                    value: item.id,
                    label: item?.companyName ?? "",
                  }))}
                />
              ) : (
                <Input placeholder={auth?.id} disabled={true} />
              )}
            </Form.Item>
            <Form.Item
              name="Delivery Address"
              label="Delivery Address"
              rules={[
                {
                  required: true,
                  message: "Please input the delivery address!",
                },
              ]}
            >
              <Input disabled={disabled} />
            </Form.Item>
            <Form.Item
              name="Purchase Order Number"
              label="Purchase Order Number"
              rules={[
                {
                  required: true,
                  message: "Please input the Purchase Order Number!",
                },
              ]}
            >
              <Input disabled={disabled} />
            </Form.Item>
            <Form.Item name="orderItem">
              <EditAbleTable
                disabled={disabled}
                initialData={initialData?.orderItem}
                onUpdateOrderItems={handleOrderItemsUpdate}
              />
            </Form.Item>
          </Form>
          <Card
            bordered={false}
            className="widget-2 h-full"
            style={{ float: "right" }}
          >
            <Statistic
              title={
                <>
                  <h6>Total</h6>
                </>
              }
              value={initialData?.total}
            />
          </Card>
        </Modal>
      )}
    </>
  );
};

export default OrderForm;
