import { Form, Input, Modal } from "antd";
import { ProductData } from "../../redux/product/constant";
import { useEffect, useState } from "react";
//import { useState } from "react";

interface ProductFormProps {
  visible: boolean;
  onCancel: () => void;
  onOk: (product: ProductData) => void;
  initialData?: ProductData;
}

const ProductForm: React.FC<ProductFormProps> = ({
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
          title={initialData ? "Update Product" : "Create Product"}
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
              name="title"
              label="title"
              rules={[{ required: true, message: "Please input the title!" }]}
            >
              <Input placeholder="fishing rod" />
            </Form.Item>
            <Form.Item
              name="summary"
              label="summary"
              rules={[{ required: true, message: "Please input the summary!" }]}
            >
              <Input placeholder="flexible rod for fishing" />
            </Form.Item>
            <Form.Item
              name="type"
              label="type"
              rules={[{ required: true, message: "Please input the type!" }]}
            >
              <Input placeholder="Entertainment and sports" />
            </Form.Item>
            <Form.Item
              name="content"
              label="content"
              rules={[{ required: true, message: "Please input the content!" }]}
            >
              <Input placeholder="additional information" />
            </Form.Item>
          </Form>
        </Modal>
      )}
    </>
  );
};

export default ProductForm;
