import { Table } from 'antd';

interface InventoryItem {
  key: string;
  name: string;
  quantityInHand: number;
  toBeReceived: number;
  price: number;
}

interface InventorySummaryTableProps {
  data: InventoryItem[];
}

const InventorySummaryTable: React.FC<InventorySummaryTableProps> = ({ data }) => {
  // Columns configuration
  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Quantity in Hand', dataIndex: 'quantityInHand', key: 'quantityInHand' },
    { title: 'To Be Received', dataIndex: 'toBeReceived', key: 'toBeReceived' },
    { title: 'Price ($)', dataIndex: 'price', key: 'price' },
    { title: 'Total Value ($)', key: 'totalValue', render: (text: any, record: InventoryItem) => record.quantityInHand * record.price },
  ];

  return (
    <Table<InventoryItem>
      dataSource={data}
      columns={columns}
      bordered
      pagination={false} // Disables pagination
      summary={pageData => {
        let totalQuantityInHand = 0;
        let totalToBeReceived = 0;
        let totalPrice = 0;

        pageData.forEach(({ quantityInHand, toBeReceived, price }) => {
          totalQuantityInHand += quantityInHand;
          totalToBeReceived += toBeReceived;
          totalPrice += quantityInHand * price;
        });

        return (
          <>
            <Table.Summary.Row>
              <Table.Summary.Cell index={0}>Total</Table.Summary.Cell>
              <Table.Summary.Cell index={1}>{totalQuantityInHand}</Table.Summary.Cell>
              <Table.Summary.Cell index={2}>{totalToBeReceived}</Table.Summary.Cell>
              <Table.Summary.Cell index={3}>{totalPrice.toFixed(2)}</Table.Summary.Cell>
              <Table.Summary.Cell index={4}></Table.Summary.Cell> {/* Empty cell for Total Value column */}
            </Table.Summary.Row>
          </>
        );
      }}
    />
  );
};

export default InventorySummaryTable;
