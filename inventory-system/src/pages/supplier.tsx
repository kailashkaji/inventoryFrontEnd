import React, { useEffect, useState } from "react";
import { Table, Button, Space, TableProps, Card, Row, Col } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import SupplierForm from "./modal/addUpdateViewSupplier";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  createSupplier,
  getSuppliers,
  updateSupplier,
} from "../redux/supplier/action";
import { SupplierData } from "../redux/supplier/constant";

const Suppliers: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const supplierList: SupplierData[] = useSelector(
    (state: RootState) => state.supplierReducer.suppliers,
    shallowEqual
  );

  useEffect(() => {
    if (loading) {
      setLoading(false);
      dispatch(getSuppliers());
    }
  }, [dispatch, loading]);
  const [supplier, setSupplier] = React.useState<SupplierData>();
  const [visible, setVisible] = React.useState(false);

  const onCreate = () => {
    setSupplier(undefined);
    setVisible(true);
  };
  const handleSaveSupplier = (sup: SupplierData) => {
    if (supplier) {
      console.log("call update dispatch =>>", sup);
      dispatch(updateSupplier(sup));
    } else {
      dispatch(createSupplier(sup));
      console.log("call create dispatch =>>", sup);
    }
    setVisible(false);
    setLoading(true);
  };
  const onUpdate = (sup: SupplierData) => {
    setSupplier(sup);
    setVisible(true);
    console.log(sup);
  };
  const columns: TableProps<SupplierData>["columns"] = [
    {
      title: "companyName",
      dataIndex: "companyName",
      key: "companyName",
    },
    {
      title: "primaryContact",
      dataIndex: "primaryContact",
      key: "primaryContact",
    },
    {
      title: "email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: SupplierData) => (
        <Space size="middle">
          <Button type="link" onClick={() => onUpdate(record)}>
            Update
          </Button>
        </Space>
      ),
    },
  ];
  // console.log("list =>", supplierList);
  // console.log(Array.isArray(supplierList));
  // const transformedSupplierList = supplierList.map((supplierData) => ({
  //   ...supplierData,
  // }));
  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Suppliers Table"
              extra={
                <>
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={onCreate}
                  >
                    Create Supplier
                  </Button>
                </>
              }
            >
              <div className="table-responsive">
                <Table
                  dataSource={supplierList}
                  columns={columns}
                  className="ant-border-space"
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
      <SupplierForm
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={handleSaveSupplier}
        initialData={supplier}
      />
    </>
  );
};

export default Suppliers;
