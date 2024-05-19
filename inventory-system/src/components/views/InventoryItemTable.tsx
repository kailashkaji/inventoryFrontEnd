import { Card, Typography } from "antd";
import { ItemData } from "../../redux/item/constant";

interface InventoryItem {
  key: number;
  name: string;
  quantityInHand: number;
  minimumStock: number;
  price: number;
}

interface InventorySummaryTableProps {
  data: ItemData[];
}

const InventorySummaryTable: React.FC<InventorySummaryTableProps> = ({
  data,
}) => {
  const { Title } = Typography;
  let totalQuantityInHand = 0;
  let totalminimumStock = 0;
  let totalPrice = 0;

  const dataInTable: InventoryItem[] = data.map((x) => ({
    key: x.id,
    name: x.itemName,
    quantityInHand:
      x.itemLots?.reduce((total, itemLot) => total + itemLot.available, 0) || 0,
    minimumStock: x.minRecomStock,
    price: x.mrp || 0,
  }));

  dataInTable.forEach(({ quantityInHand, minimumStock, price }) => {
    totalQuantityInHand += quantityInHand;
    totalminimumStock += minimumStock;
    totalPrice += price;
  });
  return (
    <Card bordered={false} className="criclebox cardbody h-full">
      <div className="project-ant">
        <div>
          <Title level={5}>INVENTORY SUMMARY</Title>
          {/* <Paragraph className="lastweek">
                    done this month<span className="blue">40%</span>
                  </Paragraph> */}
        </div>
      </div>
      <div className="ant-list-box table-responsive">
        <table className="width-100">
          <thead>
            <tr>
              <th>PRODUCT NAME </th>
              <th>QUANTITY IN STOCK</th>
              <th>MINIMUM STOCK</th>
              <th>PRICE</th>
              <th>TOTAL VALUE</th>
            </tr>
          </thead>
          <tbody>
            {dataInTable.map((d, index) => (
              <tr key={index}>
                <td>
                  <h6>{d.name}</h6>
                </td>
                <td>{d.quantityInHand}</td>
                <td>{d.minimumStock}</td>
                <td>
                  <span className="text-xs font-weight-bold">
                    {"$ "}
                    {d.price}{" "}
                  </span>
                </td>
                <td>
                  <div className="percent-progress">
                    {"$ "}
                    {d.price * d.quantityInHand}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr key={21}>
              <td>
                <h6>Total </h6>
              </td>
              <td>{totalQuantityInHand}</td>
              <td>{totalminimumStock}</td>
              <td>
                <span className="text-xs font-weight-bold">
                  {"$ "}
                  {totalPrice}{" "}
                </span>
              </td>
              <td>
                <div className="percent-progress">
                  {"$ "}
                  {totalQuantityInHand * totalPrice}
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </Card>
  );
};

export default InventorySummaryTable;
