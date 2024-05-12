import React, { useState } from "react";
import { Modal, Form, Input, Button } from "antd";
import { Order } from "../../redux/order/constant";

interface OrderFormProps {
  visible: boolean;
  onCancel: () => void;
  onOk: (order: Order) => void;
  initialData?: Order;
}

const OrderForm: React.FC<OrderFormProps> = ({
  visible,
  onCancel,
  onOk,
  initialData,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      onOk(values);
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  return (
    <Modal
      title={initialData ? "Update Order" : "Create Order"}
      visible={visible}
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
          {initialData ? "Update" : "Create"}
        </Button>,
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={initialData}
      >
        <Form.Item
          name="companyName"
          label="Company Name"
          rules={[{ required: true, message: "Please enter company name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="primaryContact"
          label="Primary Contact"
          rules={[{ required: true, message: "Please enter primary contact" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: "Please enter email" }]}
        >
          <Input type="email" />
        </Form.Item>
        <Form.Item
          name="address"
          label="Address"
          rules={[{ required: true, message: "Please enter address" }]}
        >
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default OrderForm;
