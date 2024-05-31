import React, { useEffect, useState } from "react";
import { Table, Button, Space, TableProps, Card, Row, Col, Modal } from "antd";
import { PlusOutlined, EyeOutlined, EditOutlined } from "@ant-design/icons";
import OrderForm from "./modal/addOrder";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { getAllOrders, createOrder, getOrderById } from "../redux/order/action";
import { getSuppliers } from "../redux/supplier/action";
import { Order } from "../redux/order/constant";
import { useLocation } from "react-router-dom";
import {
  getStatusTag,
  getTypeBadge,
} from "../components/views/statusCollection";

const Orders: React.FC = () => {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector(
    (state: RootState) => state.orderReducer,
    shallowEqual
  );

  const { state } = useLocation();
  const [order, setOrder] = useState<Order | undefined>(undefined);
  const [visible, setVisible] = useState(false);
  const { fromSpecificPage } = state || {};

  useEffect(() => {
    console.log("isComingFromItemPage ==>", fromSpecificPage);
    if (fromSpecificPage) {
      setVisible(true);
    } else {
      setVisible(false);
    }
    dispatch(getSuppliers());
    dispatch(getAllOrders());
  }, [dispatch, fromSpecificPage]);

  const onCreate = () => {
    const newData: Order = {};
    setOrder(newData);
    setVisible(true);
  };

  const updateTotal = (total: number) => {
    if (order) {
      setOrder({ ...order, total });
    }
  };

  const handleSaveOrder = (order: Order) => {
    dispatch(createOrder(order));
    setVisible(false);
  };

  const handleViewTransaction = (record: Order) => {
    dispatch(getOrderById(record.id!));
    Modal.info({
      title: `View Transaction ID: ${record.id}`,
      content: (
        <div>
          <p>UserID: {record.userId}</p>
          {/* Add more order details as needed */}
        </div>
      ),
      onOk() {},
    });
  };

  const onView = (record: Order) => {
    setOrder(record);
    setVisible(true);
  };

  const columns: TableProps<Order>["columns"] = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type: number) => getTypeBadge(type),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => getStatusTag(Number(status)),
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
          <Button
            icon={<EditOutlined />}
            type="link"
            onClick={() => onView(record)}
          >
            View Order
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
                  dataSource={orders.map((order, index) => ({
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
      {visible && (
        <OrderForm
          visible={visible}
          onCancel={() => setVisible(false)}
          onOk={handleSaveOrder}
          initialData={order}
          updateTotal={updateTotal}
        />
      )}
    </>
  );
};

export default Orders;
