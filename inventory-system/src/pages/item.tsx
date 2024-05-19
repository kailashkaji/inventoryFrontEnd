import React, { useEffect, useState } from "react";
import { Table, Button, Space, TableProps, Card, Row, Col } from "antd";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
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
import { User } from "../redux/login/reducer";
import { useNavigate } from "react-router-dom";

const Items: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [item, setItem] = React.useState<ItemData>();
  const [visible, setVisible] = React.useState(false);
  const itemList: ItemData[] = useSelector(
    (state: RootState) => state.itemReducer.items,
    shallowEqual
  );
  const auth: User | null = useAuthUser();

  const productList: ProductData[] = useSelector(
    (state: RootState) => state.productReducer.products,
    shallowEqual
  );

  const handleNavigateToOrderClick = () => {
    navigate("/order", { state: { fromSpecificPage: true } });
  };
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

  const renderCustomerView = () => {
    return (
      <>
        <div className="item-cards">
          { }
          {itemList.map((item) => (
            <Card
              key={item.id}
              title={item.itemName}
              className="item-card"
              style={{ marginBottom: '20px' }}
            >
              { }
              <p>Brand: {brandList.find((brand) => brand.id === item.brandId)?.name}</p>
              <p>Product: {productList.find((product) => product.id === item.productId)?.title}</p>
              <p>SKU: {item.sku}</p>
              <p>MRP: {item.mrp}</p>
              <p>Unit: {item.unit}</p>
              <p>Dimension: {item.dimension}</p>
              <p>Min Recommended Stock: {item.minRecomStock}</p>

              <div>
                <Button type="primary" onClick={handleNavigateToOrderClick} style={{ marginTop: '10px' }}>Order Now</Button>
              </div>
            </Card>
          ))}
        </div>
      </>
    );
  };


  const renderAdminView = () => {
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

  const isAdmin = auth?.roles.some(role => role.name.includes("Admin"));
  return <>{isAdmin ? renderAdminView() : renderCustomerView()}</>;
};

export default Items;
