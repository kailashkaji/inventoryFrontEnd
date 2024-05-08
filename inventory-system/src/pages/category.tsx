import { DownOutlined } from "@ant-design/icons";
import {
  Button,
  Divider,
  Form,
  Input,
  Tree,
  TreeDataNode,
  TreeProps,
} from "antd";
import { CategoryData } from "../redux/category/constant";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useCallback, useEffect, useState } from "react";
import { createCategory, getCategoryTree } from "../redux/category/action";

const Category: React.FC = () => {
  const dispatch = useDispatch();
  const categoryTreeData: CategoryData[] = useSelector(
    (state: RootState) => state.categoryReducer.categorys,
    shallowEqual
  );
  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(true);
  //const [toUpdate, setToUpdate] = useState(false);

  const dig = useCallback((categories: CategoryData[]): TreeDataNode[] => {
    return categories.map((item) => ({
      title: item.title,
      key: item.id,
      value: item.id,
      children: item.childCategory ? dig(item.childCategory) : [],
    }));
  }, []);
  const [treeData, setTreeData] = useState<TreeDataNode[]>([]);
  const [form] = Form.useForm();
  const [value, setValue] = useState<TreeDataNode>();
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    if (fetching) {
      dispatch(getCategoryTree());
      setFetching(false);
    }
  }, [dispatch, fetching]);

  useEffect(() => {
    if (categoryTreeData.length) {
      setTreeData(dig(categoryTreeData));
      setLoading(false);
    }
  }, [categoryTreeData, dig]);

  const onSelect: TreeProps["onSelect"] = (selectedKeys, info) => {
    console.log("selected", selectedKeys, info);
    setValue(info.selectedNodes[0]);
    form.setFieldsValue({ Category: info.selectedNodes[0].title });
  };
  function onFinish() {
    const a: CategoryData = {
      title: title,
      parentId: Number.parseInt((value ? value.key : 1).toString()),
      isRootNode: false,
      childCategory: [],
      id: -1,
    };
    dispatch(createCategory(a));
    form.resetFields();
  }
  return (
    <>
      {loading == false && (
        <>
          <Tree
            showLine={true}
            switcherIcon={<DownOutlined />}
            onSelect={onSelect}
            treeData={treeData}
            height={233}
            defaultExpandAll
          />
          <Divider>Change Category Data</Divider>
          <div>
            <Form form={form} onFinish={onFinish} layout="vertical">
              <Form.Item
                name="Category"
                label="Parent Category"
                rules={[
                  {
                    required: true,
                    message: "Please select the Root Category!",
                  },
                ]}
              >
                <Input value={value?.key} readOnly />
              </Form.Item>
              <Form.Item
                name="title"
                label="Title"
                rules={[{ required: true, message: "Please input the Title!" }]}
              >
                <Input onChange={(e) => setTitle(e.target.value)} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Create
                </Button>
              </Form.Item>
            </Form>
          </div>
        </>
      )}
    </>
  );
};

export default Category;
