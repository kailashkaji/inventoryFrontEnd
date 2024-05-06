import { Divider, Form, Input, Modal } from "antd";
import { SupplierData } from "../../redux/supplier/constant";
import { useEffect, useState } from "react";
//import { useState } from "react";

interface SupplierFormProps {
  visible: boolean;
  onCancel: () => void;
  onOk: (supplier: SupplierData) => void;
  initialData?: SupplierData;
}

const SupplierForm: React.FC<SupplierFormProps> = ({
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
          title={initialData ? "Update Supplier" : "Create Supplier"}
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
              name="companyName"
              label="Company Name"
              rules={[
                { required: true, message: "Please input the companyName!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="primaryContact"
              label="Primary Contact"
              rules={[
                { required: true, message: "Please input the primaryContact!" },
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
              name="mobileNumber"
              label="Mobile Number"
              rules={[
                { required: true, message: "Please input the phone number!" },
              ]}
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
            <Divider>Bank Details</Divider>
            <Form.Item
              name={["bankDetails", "beneficiaryName"]}
              label="beneficiaryName"
              rules={[
                {
                  required: true,
                  message: "Please input the beneficiaryName!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={["bankDetails", "bankName"]}
              label="bankName"
              rules={[
                { required: true, message: "Please input the bankName!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={["bankDetails", "accountNumber"]}
              label="accountNumber"
              rules={[
                { required: true, message: "Please input the accountNumber!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={["bankDetails", "bsbNumber"]}
              label="bsbNumber"
              rules={[
                { required: true, message: "Please input the bsbNumber!" },
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

export default SupplierForm;
