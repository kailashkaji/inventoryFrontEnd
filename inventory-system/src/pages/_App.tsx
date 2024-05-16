import SalesOverviewTable from "../components/views/SalesOverviewTable";
import InventorySummaryTable from "../components/views/InventoryItemTable";
import {
  MenuUnfoldOutlined,
  DollarTwoTone,
  UserOutlined,
  HeartFilled,
  ShoppingFilled,
} from "@ant-design/icons";
import { Row, Col, Card, Button, Timeline, Typography } from "antd";
import Paragraph from "antd/lib/typography/Paragraph";

import Echart from "./../components/chart/EChart";
import LineChart from "./../components/chart/LineChart";
import { useState } from "react";

function App() {
  const { Title, Text } = Typography;

  const [reverse, setReverse] = useState(false);
  // Sample sales data
  const salesData = [
    { key: "1", date: "2024-05-01", revenue: 1000, orders: 20 },
    { key: "2", date: "2024-05-02", revenue: 1500, orders: 25 },
    { key: "3", date: "2024-05-03", revenue: 1200, orders: 22 },
  ];

  // Sample inventory data
  const inventoryData = [
    {
      key: "1",
      name: "iPhone",
      quantityInHand: 10,
      toBeReceived: 5,
      price: 15,
    },
    {
      key: "2",
      name: "Samsung Galaxy",
      quantityInHand: 15,
      toBeReceived: 3,
      price: 20,
    },
    // Add more inventory items as needed
  ];
  const count = [
    {
      today: "Today’s Sales",
      title: "$53,000",
      persent: "+30%",
      icon: <DollarTwoTone />,
      bnb: "bnb2",
    },
    {
      today: "Today’s Users",
      title: "3,200",
      persent: "+20%",
      icon: <UserOutlined />,
      bnb: "bnb2",
    },
    {
      today: "New Clients",
      title: "+1,200",
      persent: "-20%",
      icon: <HeartFilled />,
      bnb: "redtext",
    },
    {
      today: "New Orders",
      title: "$13,200",
      persent: "10%",
      icon: <ShoppingFilled />,
      bnb: "bnb2",
    },
  ];
  const timelineList = [
    {
      title: "$2,400 - Redesign store",
      time: "09 JUN 7:20 PM",
      color: "green",
    },
    {
      title: "New order #3654323",
      time: "08 JUN 12:20 PM",
      color: "green",
    },
    {
      title: "Company server payments",
      time: "04 JUN 3:10 PM",
    },
    {
      title: "New card added for order #4826321",
      time: "02 JUN 2:45 PM",
    },
    {
      title: "Unlock folders for development",
      time: "18 MAY 1:30 PM",
    },
    {
      title: "New order #46282344",
      time: "14 MAY 3:30 PM",
      color: "gray",
    },
  ];

  return (
    <>
      <div className="layout-content">
        <Row className="rowgap-vbox" gutter={[24, 0]}>
          {count.map((c, index) => (
            <Col
              key={index}
              xs={24}
              sm={24}
              md={12}
              lg={6}
              xl={6}
              className="mb-24"
            >
              <Card bordered={false} className="criclebox ">
                <div className="number">
                  <Row align="middle" gutter={[24, 0]}>
                    <Col xs={18}>
                      <span>{c.today}</span>
                      <Title level={3}>
                        {c.title} <small className={c.bnb}>{c.persent}</small>
                      </Title>
                    </Col>
                    <Col xs={6}>
                      <div className="icon-box">{c.icon}</div>
                    </Col>
                  </Row>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
        <Row gutter={[24, 0]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={10} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              <Echart />
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={14} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              <LineChart />
            </Card>
          </Col>
        </Row>

        <Row gutter={[24, 0]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={16} className="mb-24">
            <InventorySummaryTable data={inventoryData} />
            <Card bordered={false} className="criclebox cardbody h-full">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ width: "50%", marginRight: "5px" }}>
                  <h2>Sales Overview</h2>
                  <SalesOverviewTable data={salesData} />
                </div>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={8} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              <div className="timeline-box">
                <Title level={5}>Orders History</Title>
                <Paragraph className="lastweek" style={{ marginBottom: 24 }}>
                  this month <span className="bnb2">20%</span>
                </Paragraph>

                <Timeline
                  pending="Recording..."
                  className="timelinelist"
                  reverse={reverse}
                >
                  {timelineList.map((t, index) => (
                    <Timeline.Item color={t.color} key={index}>
                      <Title level={5}>{t.title}</Title>
                      <Text>{t.time}</Text>
                    </Timeline.Item>
                  ))}
                </Timeline>
                <Button
                  type="primary"
                  className="width-100"
                  onClick={() => setReverse(!reverse)}
                >
                  {<MenuUnfoldOutlined />} REVERSE
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default App;
