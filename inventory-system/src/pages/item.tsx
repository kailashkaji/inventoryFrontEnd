import React, { useEffect, useState } from "react";
import { Table, Button, Space, TableProps, Card, Row, Col } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ItemForm from "./modal/addUpdateViewItem";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { createItem, getItems, updateItem } from "../redux/item/action";
import { ItemData } from "../redux/item/constant";
import { ProductData } from "../redux/product/constant";
import { getProducts } from "../redux/product/action";
import { getBrands } from "../redux/brand/action";
import { BrandData } from "../redux/brand/constant";

const Items: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [item, setItem] = React.useState<ItemData>();
  const [visible, setVisible] = React.useState(false);
  const itemList: ItemData[] = useSelector(
    (state: RootState) => state.itemReducer.items,
    shallowEqual
  );
  const productList: ProductData[] = useSelector(
    (state: RootState) => state.productReducer.products,
    shallowEqual
  );

  const brandList: BrandData[] = useSelector(
    (state: RootState) => state.brandReducer.brands,
    shallowEqual
  );

  useEffect(() => {
    if (loading) {
      setLoading(false);
      dispatch(getProducts());
      dispatch(getBrands());
      dispatch(getItems());
    }
  }, [dispatch, loading]);

  const onCreate = () => {
    setItem(undefined);
    setVisible(true);
  };
  const handleSaveItem = (sup: ItemData) => {
    if (item) {
      console.log("call update dispatch =>>", sup);
      dispatch(updateItem(sup));
    } else {
      dispatch(createItem(sup));
      console.log("call create dispatch =>>", sup);
    }
    setVisible(false);
    setTimeout(() => setLoading(true), 1000);
  };
  const onUpdate = (sup: ItemData) => {
    setItem(sup);
    setVisible(true);
    console.log(sup);
  };
  const columns: TableProps<ItemData>["columns"] = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "itemName",
      dataIndex: "itemName",
      key: "itemName",
    },
    {
      title: "Brand Name",
      dataIndex: "brandId",
      key: "brandId",
      render: (brandId) => <>{brandList.find((a) => a.id === brandId)?.name}</>,
    },
    {
      title: "Product Name",
      dataIndex: "productId",
      key: "productId",
      render: (productId) => (
        <>{productList.find((a) => a.id === productId)?.title}</>
      ),
    },
    {
      title: "sku",
      dataIndex: "sku",
      key: "sku",
    },
    {
      title: "mrp",
      dataIndex: "mrp",
      key: "mrp",
    },
    {
      title: "unit",
      dataIndex: "unit",
      key: "unit",
    },
    {
      title: "dimension",
      dataIndex: "dimension",
      key: "dimension",
    },
    {
      title: "minRecomStock",
      dataIndex: "minRecomStock",
      key: "minRecomStock",
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: ItemData) => (
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
              title="Items Table"
              extra={
                <>
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={onCreate}
                  >
                    Create Item
                  </Button>
                </>
              }
            >
              <div className="table-responsive">
                <Table
                  dataSource={itemList.map((item) => ({
                    ...item,
                    key: item.id,
                  }))}
                  columns={columns}
                  className="ant-border-space"
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
      <ItemForm
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={handleSaveItem}
        initialData={item}
        productList={productList}
        brandList={brandList}
      />
    </>
  );
};

export default Items;
