import { Form, Input, Modal } from "antd";
import { BrandData } from "../../redux/brand/constant";
import { useEffect, useState } from "react";
//import { useState } from "react";

interface BrandFormProps {
  visible: boolean;
  onCancel: () => void;
  onOk: (brand: BrandData) => void;
  initialData?: BrandData;
}

const BrandForm: React.FC<BrandFormProps> = ({
  visible,
  onCancel,
  onOk,
  initialData,
}) => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (visible == true) {
      console.log("data ==>", initialData);
      form.setFieldsValue(initialData);
      setIsLoading(false);
    }
  }, [form, initialData, visible]);

  const handleOk = () => {
    form.validateFields().then((values) => {
      onOk({ ...initialData, ...values });
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

  return (
    <>
      {isLoading == false && (
        <Modal
          title={initialData ? "Update Brand" : "Create Brand"}
          open={visible}
          afterClose={handleClose}
          onCancel={handleCancel}
          onOk={handleOk}
          destroyOnClose={true}
          styles={{
            body: { overflowY: "auto", maxHeight: "calc(100vh - 200px)" },
          }}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Please input the Name!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="description"
              label="description"
              rules={[
                { required: true, message: "Please input the description!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Please input the email!" },
                { type: "email", message: "Please input a valid email!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="website"
              label="website"
              rules={[{ required: true, message: "Please input the website!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="address"
              label="address"
              rules={[{ required: true, message: "Please input the address!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="phoneNumber"
              label="phoneNumber"
              rules={[
                { required: true, message: "Please input the phoneNumber!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      )}
    </>
  );
};

export default BrandForm;
