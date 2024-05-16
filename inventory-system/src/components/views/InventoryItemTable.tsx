import { Card, Typography } from "antd";

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

const InventorySummaryTable: React.FC<InventorySummaryTableProps> = ({
  data,
}) => {
  const { Title } = Typography;
  let totalQuantityInHand = 0;
  let totalToBeReceived = 0;
  let totalPrice = 0;

  data.forEach(({ quantityInHand, toBeReceived, price }) => {
    totalQuantityInHand += quantityInHand;
    totalToBeReceived += toBeReceived;
    totalPrice += quantityInHand * price;
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
              <th>QUANTITY IN HAND</th>
              <th>QUANTITY TO RECEIVE</th>
              <th>PRICE</th>
              <th>TOTAL VALUE</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d, index) => (
              <tr key={index}>
                <td>
                  <h6>{d.name}</h6>
                </td>
                <td>{d.quantityInHand}</td>
                <td>{d.toBeReceived}</td>
                <td>
                  <span className="text-xs font-weight-bold">
                    {"$ "}
                    {d.price}{" "}
                  </span>
                </td>
                <td>
                  <div className="percent-progress">
                    {"$ "}
                    {d.quantityInHand * d.price}
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
              <td>{totalToBeReceived}</td>
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
