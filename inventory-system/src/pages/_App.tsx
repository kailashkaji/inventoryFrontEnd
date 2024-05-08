import SalesOverviewTable from '../components/views/SalesOverviewTable';
import InventorySummaryTable from '../components/views/InventoryItemTable';

function App() {
  // Sample sales data
  const salesData = [
    { key: '1', date: '2024-05-01', revenue: 1000, orders: 20 },
    { key: '2', date: '2024-05-02', revenue: 1500, orders: 25 },
    { key: '3', date: '2024-05-03', revenue: 1200, orders: 22 },
  ];

  // Sample inventory data
  const inventoryData = [
    { key: '1', name: 'iPhone', quantityInHand: 10, toBeReceived: 5, price: 15 },
    { key: '2', name: 'Samsung Galaxy', quantityInHand: 15, toBeReceived: 3, price: 20 },
    // Add more inventory items as needed
  ];

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ width: '50%', marginRight: '5px' }}>
        <h2>Sales Overview</h2>
        <SalesOverviewTable data={salesData} />
      </div>
      <div style={{ width: '50%' }}>
        <h2>Inventory Summary</h2>
        <InventorySummaryTable data={inventoryData} />
      </div>
    </div>
  );
}

export default App;
