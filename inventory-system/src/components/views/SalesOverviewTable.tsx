import { Table, Space } from 'antd';
import { DollarCircleOutlined, ShoppingOutlined, CalendarOutlined } from '@ant-design/icons';

interface SalesData {
  key: string;
  date: string;
  revenue: number;
  orders: number;
}

interface SalesOverviewTableProps {
  data: SalesData[];
}

const SalesOverviewTable: React.FC<SalesOverviewTableProps> = ({ data }) => {
    // Columns configuration
    const columns = [
      { 
        title: (
          <Space>
            <CalendarOutlined />
            Date
          </Space>
        ), 
        dataIndex: 'date', 
        key: 'date', 
        render: (text: string) => <Space><CalendarOutlined /> {text}</Space>
      },
      { 
        title: (
          <Space>
            <DollarCircleOutlined />
            Revenue ($)
          </Space>
        ), 
        dataIndex: 'revenue', 
        key: 'revenue', 
        render: (text: number) => <Space><DollarCircleOutlined /> {text}</Space>
      },
      { 
        title: (
          <Space>
            <ShoppingOutlined />
            Orders
          </Space>
        ), 
        dataIndex: 'orders', 
        key: 'orders', 
        render: (text: number) => <Space><ShoppingOutlined /> {text}</Space>
      },
    ];
  
    return (
      <Table<SalesData>
        dataSource={data}
        columns={columns}
        bordered
        pagination={false} // Disables pagination
        summary={pageData => {
          let totalRevenue = 0;
          let totalOrders = 0;
  
          pageData.forEach(({ revenue, orders }) => {
            totalRevenue += revenue;
            totalOrders += orders;
          });
  
          return (
            <>
              <Table.Summary.Row>
                <Table.Summary.Cell index={0}>Total</Table.Summary.Cell>
                <Table.Summary.Cell index={1}><DollarCircleOutlined /> {totalRevenue}</Table.Summary.Cell>
                <Table.Summary.Cell index={2}><ShoppingOutlined /> {totalOrders}</Table.Summary.Cell>
              </Table.Summary.Row>
            </>
          );
        }}
      />
    );
  };
  
  export default SalesOverviewTable;