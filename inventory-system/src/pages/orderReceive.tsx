import React, { useEffect, useState } from "react";
import { Table, Button, Space, TableProps, Card, Row, Col } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { getAllOrdersByStatus, updateOrder } from "../redux/order/action";
import { getProducts } from "../redux/product/action";
import { getBrands } from "../redux/brand/action";
import OrderReceiveForm from "./modal/addUpdateViewOrderReceive";
import { Order } from "../redux/order/constant";
import {
  getStatusTag,
  getTypeBadge,
} from "../components/views/statusCollection";

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
      dispatch(getAllOrdersByStatus({ status: 3 }));
    }
  }, [dispatch, loading]);

  const onCreate = () => {
    setOrder(undefined);
    setVisible(true);
  };
  const updateTotal = (total: number) => {
    setOrder({ ...order, total });
  };

  const handleSaveOrder = (sup: Order) => {
    console.warn("data to update in db => ", sup);
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
    // {
    //   title: "Action",
    //   key: "action",
    //   render: (_: unknown, record: Order) => (
    //     <Space size="middle">
    //       <Button type="link" onClick={() => onUpdate(record)}>
    //         Update
    //       </Button>
    //     </Space>
    //   ),
    // },
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
                    Receive Order
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
        updateTotal={updateTotal}
      />
    </>
  );
};
export default ReceiveOrders;
