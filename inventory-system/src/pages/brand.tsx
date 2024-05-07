import React, { useEffect, useState } from "react";
import { Table, Button, Space, TableProps, Card, Row, Col } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import BrandForm from "./modal/addUpdateViewBrand";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { createBrand, getBrands, updateBrand } from "../redux/brand/action";
import { BrandData } from "../redux/brand/constant";

const Brands: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const brandList: BrandData[] = useSelector(
    (state: RootState) => state.brandReducer.brands,
    shallowEqual
  );

  useEffect(() => {
    if (loading) {
      setLoading(false);
      dispatch(getBrands());
    }
  }, [dispatch, loading]);
  const [brand, setBrand] = React.useState<BrandData>();
  const [visible, setVisible] = React.useState(false);

  const onCreate = () => {
    setBrand(undefined);
    setVisible(true);
  };
  const handleSaveBrand = (sup: BrandData) => {
    if (brand) {
      console.log("call update dispatch =>>", sup);
      dispatch(updateBrand(sup));
    } else {
      dispatch(createBrand(sup));
      console.log("call create dispatch =>>", sup);
    }
    setVisible(false);
    setLoading(true);
  };
  const onUpdate = (sup: BrandData) => {
    setBrand(sup);
    setVisible(true);
    console.log(sup);
  };
  const columns: TableProps<BrandData>["columns"] = [
    {
      title: "name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "website",
      dataIndex: "website",
      key: "website",
    },
    {
      title: "address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "phoneNumber",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: BrandData) => (
        <Space size="middle">
          <Button type="link" onClick={() => onUpdate(record)}>
            Update
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Brands Table"
              extra={
                <>
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={onCreate}
                  >
                    Create Brand
                  </Button>
                </>
              }
            >
              <div className="table-responsive">
                <Table
                  dataSource={brandList.map((brand, index) => ({
                    ...brand,
                    key: index,
                  }))}
                  columns={columns}
                  className="ant-border-space"
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
      <BrandForm
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={handleSaveBrand}
        initialData={brand}
      />
    </>
  );
};

export default Brands;
