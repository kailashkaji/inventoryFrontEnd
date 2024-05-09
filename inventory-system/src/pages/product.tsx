import React, { useEffect, useState } from "react";
import { Table, Button, Space, TableProps, Card, Row, Col } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ProductForm from "./modal/addUpdateViewProduct";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  createProduct,
  getProducts,
  updateProduct,
} from "../redux/product/action";
import { ProductData } from "../redux/product/constant";

const Products: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const productList: ProductData[] = useSelector(
    (state: RootState) => state.productReducer.products,
    shallowEqual
  );

  useEffect(() => {
    if (loading) {
      setLoading(false);
      dispatch(getProducts());
    }
  }, [dispatch, loading]);
  const [product, setProduct] = React.useState<ProductData>();
  const [visible, setVisible] = React.useState(false);

  const onCreate = () => {
    setProduct(undefined);
    setVisible(true);
  };
  const handleSaveProduct = (sup: ProductData) => {
    if (product) {
      console.log("call update dispatch =>>", sup);
      dispatch(updateProduct(sup));
    } else {
      dispatch(createProduct(sup));
      console.log("call create dispatch =>>", sup);
    }
    setVisible(false);
    setTimeout(() => setLoading(true), 500);
  };
  const onUpdate = (sup: ProductData) => {
    setProduct(sup);
    setVisible(true);
    console.log(sup);
  };
  const columns: TableProps<ProductData>["columns"] = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "summary",
      dataIndex: "summary",
      key: "summary",
    },
    {
      title: "type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "content",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: ProductData) => (
        <Space size="middle">
          <Button type="link" onClick={() => onUpdate(record)}>
            Update
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Products Table"
              extra={
                <>
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={onCreate}
                  >
                    Create Product
                  </Button>
                </>
              }
            >
              <div className="table-responsive">
                <Table
                  dataSource={productList.map((product, index) => ({
                    ...product,
                    key: index,
                  }))}
                  columns={columns}
                  className="ant-border-space"
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
      <ProductForm
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={handleSaveProduct}
        initialData={product}
      />
    </>
  );
};

export default Products;
