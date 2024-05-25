import React, { useEffect, useState } from "react";
import { Table, Button, Space, TableProps, Card, Row, Col } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { getAllOrders, updateOrder } from "../redux/order/action";
import { getProducts } from "../redux/product/action";
import { getBrands } from "../redux/brand/action";
import OrderReceiveForm from "./modal/addUpdateViewOrderReceive";
import { Order } from "../redux/order/constant";

const ReceiveOrders: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [order, setOrder] = React.useState<Order>();
  const [visible, setVisible] = React.useState(false);
  const orderList: Order[] = useSelector(
    (state: RootState) => state.orderReducer.orders,
    shallowEqual
  );
  useEffect(() => {
    if (loading) {
      setLoading(false);
      dispatch(getProducts());
      dispatch(getBrands());
      dispatch(getAllOrders());
    }
  }, [dispatch, loading]);

  const onCreate = () => {
    setOrder(undefined);
    setVisible(true);
  };

  const handleSaveOrder = (sup: Order) => {
    dispatch(updateOrder(sup));
    setVisible(false);
    setTimeout(() => setLoading(true), 1000);
  };

  const onUpdate = (sup: Order) => {
    setOrder(sup);
    setVisible(true);
    console.log(sup);
  };

  const columns: TableProps<Order>["columns"] = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "orderName",
      dataIndex: "orderName",
      key: "orderName",
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
      render: (_: unknown, record: Order) => (
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
              title="Orders Table"
              extra={
                <>
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={onCreate}
                  >
                    Create Order
                  </Button>
                </>
              }
            >
              <div className="table-responsive">
                <Table
                  dataSource={orderList.map((order) => ({
                    ...order,
                    key: order.id,
                  }))}
                  columns={columns}
                  className="ant-border-space"
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
      <OrderReceiveForm
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={handleSaveOrder}
        initialData={order}
      />
    </>
  );
};
export default ReceiveOrders;
