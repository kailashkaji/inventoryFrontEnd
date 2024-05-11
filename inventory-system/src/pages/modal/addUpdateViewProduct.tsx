import { Form, Input, Modal, TreeDataNode, TreeSelect } from "antd";
import { ProductData } from "../../redux/product/constant";
import { useEffect, useState } from "react";
import { CategoryData } from "../../redux/category/constant";
//import { useState } from "react";

interface ProductFormProps {
  visible: boolean;
  onCancel: () => void;
  onOk: (product: ProductData) => void;
  initialData?: ProductData;
  categoryData: CategoryData[];
}

const ProductForm: React.FC<ProductFormProps> = ({
  visible,
  onCancel,
  onOk,
  initialData,
  categoryData,
}) => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (visible == true) {
      const temp = {
        ...initialData,
        productCategoryLinkIds: initialData?.productCategoryLink?.map(
          (item) => item.categoryId
        ),
      };
      console.log("apple =>", temp);
      form.setFieldsValue(temp);
      setIsLoading(false);
    }
  }, [form, initialData, visible]);

  const handleOk = () => {
    form.validateFields().then((values) => {
      const productCategoryLink = values.productCategoryLinkIds.map(
        (item: number) => ({ categoryId: item })
      );
      onOk({
        ...initialData,
        ...values,
        productCategoryLink: productCategoryLink,
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
  const dig = (categories: CategoryData[]): TreeDataNode[] =>
    categories.map((item) => ({
      title: item.title,
      key: item.id,
      value: item.id,
      children: item.childCategory ? dig(item.childCategory) : [],
    }));

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
              name={"productCategoryLinkIds"}
              label="category"
              rules={[
                { required: true, message: "Please select the category!" },
              ]}
              // getValueFromEvent={(values) => {
              //   return values.map((id: number) => ({ id }));
              // }}
              // getValueProps={(ids) => {
              //   return ids?.map(({ id }: { id: number }) => id);
              // }}
            >
              <TreeSelect
                showSearch
                style={{ width: "100%" }}
                dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                placeholder="Please select"
                allowClear
                multiple
                treeDefaultExpandAll
                treeData={dig(categoryData)}
                // value={form
                //   .getFieldValue("productCategoryLink")
                //   ?.map((item: ProductCategoryLink) => ({
                //     categoryId: item.categoryId,
                //   }))}
                // onChange={(value) =>
                //   form.setFieldsValue({
                //     productCategoryLink: value.map(
                //       (item: ProductCategoryLink) => item.categoryId
                //     ),
                //   })
                // }
              />
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
