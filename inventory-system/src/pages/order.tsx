import React, { useEffect, useState } from "react";
import { Table, Button, Space, TableProps, Card, Row, Col, Modal } from "antd";
import { PlusOutlined, EyeOutlined } from "@ant-design/icons";
import OrderForm from "./modal/addOrder";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { getAllOrders, createOrder, getOrderById } from "../redux/order/action";
import { Order } from "../redux/order/constant";

const Orders: React.FC = () => {
  const dispatch = useDispatch();
  const orderList: Order[] = useSelector(
    (state: RootState) => state.orderReducer.orders ?? [],
    shallowEqual
  );
  const loading: boolean = useSelector(
    (state: RootState) => state.orderReducer.loading,
    shallowEqual
  );

  useEffect(() => {
    if (loading) {
      dispatch(getAllOrders());
      //alert(getAllOrders.toString());
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
  };

  const handleViewTransaction = (record: Order) => {
    dispatch(getOrderById(record.id!));
    Modal.info({
      title: `View Transaction ID: ${record.id}`,
      content: (
        <div>
          {/* Render the details of the order */}
          <p>UserID: {record.userId}</p>
          {/* Add more order details as needed */}
        </div>
      ),
      onOk() {},
    });
  };

  const columns: TableProps<Order>["columns"] = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    // {
    //   title: "Order Item",
    //   dataIndex: "orderItem", // Assuming orderItem is an array of items
    //   key: "orderItem",
    //   render: (orderItems: any[]) => (
    //     <ul>
    //       {orderItems.map((item, index) => (
    //         <li key={index}>{item}</li>
    //       ))}
    //     </ul>
    //   ),
    // },
    {
      title: "type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => handleViewTransaction(record)}
          >
            View Transaction
          </Button>
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
              title="Order Table"
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
