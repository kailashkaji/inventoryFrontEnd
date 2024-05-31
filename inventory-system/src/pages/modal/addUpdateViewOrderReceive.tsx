import { Card, Divider, Form, Modal, Select, Statistic } from "antd";
import { Order, OrderItem } from "../../redux/order/constant";
import { useEffect, useState } from "react";
import { getSuppliers } from "../../redux/supplier/action";
import { getOrdersBySupplierId } from "../../redux/PurchaseReceive/action";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { SupplierData } from "../../redux/supplier/constant";
import { RootState } from "../../redux/store";
import EditAbleTable from "../../components/editableTree/EditableTable";
import { getItems } from "../../redux/item/action";
//import { useState } from "react";

interface SupplierFormProps {
  visible: boolean;
  onCancel: () => void;
  onOk: (order: Order) => void;
  initialData?: Order;
  updateTotal: (total: number) => void;
}

const OrderReceiveForm: React.FC<SupplierFormProps> = ({
  visible,
  onCancel,
  onOk,
  updateTotal,
  initialData,
}) => {
  const [form] = Form.useForm();
  const [form1] = Form.useForm();
  const dispatch = useDispatch();
  const [order, setOrder] = useState<Order>(initialData || {});
  const [orderItems, setOrderItems] = useState<OrderItem[]>(
    order?.orderItem || []
  );
  const [isLoading, setIsLoading] = useState(true);
  const vendorList: SupplierData[] = useSelector(
    (state: RootState) => state.supplierReducer.suppliers,
    shallowEqual
  );
  const orders: Order[] = useSelector(
    (state: RootState) => state.orderReceiveReducer.orders,
    shallowEqual
  );
  useEffect(() => {
    if (visible == true) {
      dispatch(getSuppliers());
      form.setFieldsValue(initialData);
      setIsLoading(false);
    }
  }, [dispatch, form, initialData, visible]);

  const handleOk = () => {
    form.validateFields().then((values) => {
      form1.validateFields().then((values1) => {
        console.warn("aaba k hunxa :", values, ":abc:", values1);
        onOk({
          ...order,
          ...initialData,
          ...values,
          orderItem: orderItems,
        });

        form.resetFields();
        onCancel();
      });
    });
  };
  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };
  const getOrders = (_: string, option?: { label: string; value: number }) => {
    const tempOrder: Order = {
      userId: option?.value,
      type: 1,
      id: 0,
      status: 0,
    };
    dispatch(getOrdersBySupplierId(tempOrder));
    dispatch(getItems());
    form.resetFields();
    form1.resetFields(["id"]);
    handleOrderItemsUpdate([]);
  };
  const selectOrder = (
    _: string,
    option?: { label: string; value: number }
  ) => {
    initialData = orders.find((x) => x.id == option?.value);
    if (initialData) setOrder(initialData);
    form.setFieldsValue(initialData);
    if (initialData?.orderItem) {
      //setOrderItems(initialData.orderItem);
      handleOrderItemsUpdate(initialData.orderItem);
    }
  };
  const handleClose = () => {
    form.resetFields();
    form1.resetFields();
    setOrderItems([]);
  };
  const filterOption = (
    input: string,
    option?: { label: string; value: number }
  ) => {
    console.log(option?.label, "+", input);
    return (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  };
  const handleOrderItemsUpdate = (items: OrderItem[]) => {
    const grandTotal = items.reduce(
      (total, item) => total + (item.orderedQuantity || 0) * (item.price || 0),
      0
    );
    const updatedItems = items.map((item) => ({
      ...item,
      arrivedQuantity: item.orderedQuantity,
    }));
    setOrderItems(updatedItems); // Update orderItems state
    updateTotal(grandTotal);
  };
  return (
    <>
      {isLoading == false && (
        <Modal
          width={1000}
          title={initialData ? "Update Supplier" : "New Purchase Receive"}
          open={visible}
          afterClose={handleClose}
          onCancel={handleCancel}
          onOk={handleOk}
          destroyOnClose={true}
          styles={{
            body: { overflowY: "auto", maxHeight: "calc(100vh - 200px)" },
          }}
        >
          <Form form={form1} layout="vertical">
            <Form.Item
              name="userId"
              label="Supplier Name"
              rules={[
                { required: true, message: "Please select the Supplier!" },
              ]}
            >
              <Select
                showSearch
                filterOption={filterOption}
                onSelect={getOrders}
                options={vendorList.map((item) => ({
                  value: item.id,
                  label: item?.companyName ?? "",
                }))}
              />
            </Form.Item>
            <Form.Item
              name="id"
              label="Purchase Orders"
              rules={[{ required: true, message: "Please select the order!" }]}
            >
              <Select
                showSearch
                filterOption={filterOption}
                onSelect={selectOrder}
                options={orders
                  .filter((item) => item?.id !== undefined) // Filter out items with undefined id
                  .map((item) => ({
                    value: item.id as number, // Type assertion to ensure value is a number
                    label: item.id?.toString() ?? "",
                  }))}
              />
            </Form.Item>
          </Form>
          <Divider>Ordered Items</Divider>
          <Form form={form} layout="vertical">
            <Form.Item name="orderItem">
              <EditAbleTable
                disabled={false}
                initialData={orderItems}
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

export default OrderReceiveForm;
