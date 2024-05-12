import React, { useEffect, useState } from "react";
import { Table, Button, Space, TableProps, Card, Row, Col } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import OrderForm from "./modal/addOrder";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { getAllOrders, createOrder, getOrderById } from "../redux/order/action";
import { Order } from "../redux/order/constant";

const Orders: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const orderList: Order[] = useSelector(
    (state: RootState) => state.orderReducer.orders,
    shallowEqual
  );

  useEffect(() => {
    if (loading) {
      setLoading(false);
     dispatch(getAllOrders());
    }
  }, [dispatch, loading]);

  const [order, setOrder] = React.useState<Order>();
  const [visible, setVisible] = useState(false);
  const onCreate = () => {
    setOrder(undefined);
    setVisible(true);
  };

  const handleSaveOrder = (order: Order) => {
    dispatch(createOrder(order));
    console.log("call create dispatch =>>", order);
    setVisible(false);
    setTimeout(() => setLoading(true), 500);
  };

  const columns: TableProps<Order>["columns"] = [
    {
      title: "Ordered By",
      dataIndex: "Ordered By",
      key: "userId",
    },
    {
      title: "Order Item",
      dataIndex: "OrderItem",
      key: "OrderItem",
    },
    {
      title: "Action",
      key: "View Transaction",
      render: (_, record) => (
        <Space size="middle">
          
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs={24} xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Suppliers Table"
              extra={
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={onCreate}
                >
                  Create Order
                </Button>
              }
            >
              <div className="table-responsive">
                <Table
                  dataSource={orderList.map((order, index) => ({
                    ...order,
                    key: index,
                  }))}
                  columns={columns}
                  loading={loading}
                  className="ant-border-space"
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
      <OrderForm
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={handleSaveOrder}
        initialData={order}
      />
    </>
  );
};

export default Orders;
