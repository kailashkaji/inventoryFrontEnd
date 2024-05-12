import React, { useState, useEffect } from "react";
import { Modal, Form, InputNumber, Button } from "antd";
import { Order, OrderItem } from "../../redux/order/constant";

interface AddOrderFormProps {
  visible: boolean;
  onCancel: () => void;
  onOk: (order: Order) => void;
  initialData?: Order;
}

const AddOrderForm: React.FC<AddOrderFormProps> = ({
  visible,
  onCancel,
  onOk,
  initialData,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [quantity, setQuantity] = useState<number>(1);
  const [finalAmount, setFinalAmount] = useState<number>(0);

  useEffect(() => {
    calculateFinalAmount();
  }, [orderItems, quantity]);

  const calculateFinalAmount = () => {
    const unitPrice = 10; // get mrp
    const totalAmount = unitPrice * orderItems.length * quantity;
    setFinalAmount(totalAmount);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      const order: Order = {
        id: values.id,
        userId: values.userId,
        type: values.type,
        status: values.status,
        grandTotal: finalAmount,
        orderItem: orderItems,
        // Add more properties
      };
      onOk(order);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Add Order"
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={handleSubmit}
        >
          Submit
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item label="Quantity">
          <InputNumber
            min={1}
            value={quantity}
            onChange={(value) => setQuantity(value as number)}
          />
        </Form.Item>
        <Form.Item label="Final Amount">
          <InputNumber disabled value={finalAmount} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddOrderForm;
