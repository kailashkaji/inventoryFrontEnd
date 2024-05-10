import { Checkbox, Form, Input, Modal, Select } from "antd";
import { ItemData } from "../../redux/item/constant";
import { useEffect, useState } from "react";
import { BrandData } from "../../redux/brand/constant";
import { ProductData } from "../../redux/product/constant";
//import { useState } from "react";

interface ItemFormProps {
  visible: boolean;
  onCancel: () => void;
  onOk: (item: ItemData) => void;
  initialData?: ItemData;
  productList: ProductData[];
  brandList: BrandData[];
}

const ItemForm: React.FC<ItemFormProps> = ({
  visible,
  onCancel,
  onOk,
  initialData,
  productList,
  brandList,
}) => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (visible == true) {
      console.log("data ==>", initialData);
      console.log("data product==>", productList);
      console.log("data brand==>", brandList);
      form.setFieldsValue(initialData);
      setIsLoading(false);
    }
  }, [brandList, form, initialData, productList, visible]);

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
          title={initialData ? "Update Item" : "Create Item"}
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
              name="itemName"
              label="itemName"
              rules={[
                { required: true, message: "Please input the itemName!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="brandId"
              label="Brand Name"
              rules={[
                { required: true, message: "Please Select the Brand Name!" },
              ]}
            >
              <Select
                showSearch
                filterOption={filterOption}
                options={brandList.map((item) => ({
                  value: item.id,
                  label: item?.name ?? "",
                }))}
              />
            </Form.Item>
            <Form.Item
              name="productId"
              label="Product Name"
              rules={[
                { required: true, message: "Please Select the Product Name!" },
              ]}
            >
              <Select
                showSearch
                filterOption={filterOption}
                options={productList.map((item) => ({
                  value: item.id,
                  label: item?.title ?? "",
                }))}
              />
            </Form.Item>
            <Form.Item
              name="sku"
              label="sku"
              rules={[{ required: true, message: "Please input the sku!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="mrp"
              label="mrp"
              rules={[{ required: true, message: "Please input the mrp!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="dimension" label="dimension">
              <Input />
            </Form.Item>
            <Form.Item name="weight" label="weight">
              <Input />
            </Form.Item>
            <Form.Item
              name="mpn"
              label="mpn"
              rules={[{ required: true, message: "Please input the mpn!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="minRecomStock"
              label="minRecomStock"
              rules={[
                { required: true, message: "Please input the minRecomStock!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="isActive" label="isActive" valuePropName="checked">
              <Checkbox />
            </Form.Item>
          </Form>
        </Modal>
      )}
    </>
  );
};

export default ItemForm;
