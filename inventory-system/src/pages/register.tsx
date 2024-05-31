import { useState } from "react";
import {
  Layout,
  Menu,
  Button,
  Typography,
  Card,
  Form,
  Input,
  Checkbox,
} from "antd";

import { Link } from "react-router-dom";
import {
  DribbbleOutlined,
  TwitterOutlined,
  InstagramOutlined,
  GithubOutlined,
} from "@ant-design/icons";
import { ValidateErrorEntity } from "rc-field-form/es/interface";
import { useDispatch, useSelector } from "react-redux";
import { signupRequest } from "../redux/signup/action";
import { RootState } from "../redux/store";
const { Title } = Typography;
const { Header, Footer, Content } = Layout;

const template = [
  <svg
    data-v-4ebdc598=""
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      data-v-4ebdc598=""
      d="M3 4C3 3.44772 3.44772 3 4 3H16C16.5523 3 17 3.44772 17 4V6C17 6.55228 16.5523 7 16 7H4C3.44772 7 3 6.55228 3 6V4Z"
      fill="#111827"
      className="fill-muted"
    ></path>
    <path
      data-v-4ebdc598=""
      d="M3 10C3 9.44771 3.44772 9 4 9H10C10.5523 9 11 9.44771 11 10V16C11 16.5523 10.5523 17 10 17H4C3.44772 17 3 16.5523 3 16V10Z"
      fill="#111827"
      className="fill-muted"
    ></path>
    <path
      data-v-4ebdc598=""
      d="M14 9C13.4477 9 13 9.44771 13 10V16C13 16.5523 13.4477 17 14 17H16C16.5523 17 17 16.5523 17 16V10C17 9.44771 16.5523 9 16 9H14Z"
      fill="#111827"
      className="fill-muted"
    ></path>
  </svg>,
];

const profile = [
  <svg
    data-v-4ebdc598=""
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      data-v-4ebdc598=""
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10ZM12 7C12 8.10457 11.1046 9 10 9C8.89543 9 8 8.10457 8 7C8 5.89543 8.89543 5 10 5C11.1046 5 12 5.89543 12 7ZM9.99993 11C7.98239 11 6.24394 12.195 5.45374 13.9157C6.55403 15.192 8.18265 16 9.99998 16C11.8173 16 13.4459 15.1921 14.5462 13.9158C13.756 12.195 12.0175 11 9.99993 11Z"
      fill="#111827"
      className="fill-muted"
    ></path>
  </svg>,
];

const signup = [
  <svg
    data-v-4ebdc598=""
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      data-v-4ebdc598=""
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6 2C5.44772 2 5 2.44772 5 3V4H4C2.89543 4 2 4.89543 2 6V16C2 17.1046 2.89543 18 4 18H16C17.1046 18 18 17.1046 18 16V6C18 4.89543 17.1046 4 16 4H15V3C15 2.44772 14.5523 2 14 2C13.4477 2 13 2.44772 13 3V4H7V3C7 2.44772 6.55228 2 6 2ZM6 7C5.44772 7 5 7.44772 5 8C5 8.55228 5.44772 9 6 9H14C14.5523 9 15 8.55228 15 8C15 7.44772 14.5523 7 14 7H6Z"
      fill="#111827"
      className="fill-muted"
    ></path>
  </svg>,
];

const signin = [
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 14 14"
  >
    <path
      className="fill-muted"
      d="M12.25,14H1.75A1.752,1.752,0,0,1,0,12.25V3.5A1.752,1.752,0,0,1,1.75,1.75h.876V.875a.875.875,0,0,1,1.75,0V1.75h5.25V.875a.875.875,0,0,1,1.75,0V1.75h.875A1.752,1.752,0,0,1,14,3.5v8.75A1.752,1.752,0,0,1,12.25,14ZM3.5,4.375a.875.875,0,0,0,0,1.75h7a.875.875,0,0,0,0-1.75Z"
    />
  </svg>,
];

const SignUp: React.FC = () => {
  const dispatch = useDispatch();
  const loading = useSelector(
    (state: RootState) => state.signupReducer.loading
  );
  const error = useSelector((state: RootState) => state.signupReducer.error);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [roles, setRoles] = useState<{ id: number; name: string }[]>([]);
  const allRoles = [
    { id: 1, name: "Admin" },
    { id: 2, name: "Customer" },
    // Add more roles as needed
  ];

  const handleCheckboxChange = (roleId: number, checked: boolean) => {
    if (checked) {
      setRoles([...roles, allRoles.find((role) => role.id === roleId)!]);
    } else {
      setRoles(roles.filter((role) => role.id !== roleId));
    }
  };

  const handleSignup = () => {
    dispatch(signupRequest(username, password, roles));
  };

  const onFinish = (values: string) => {
    console.log("Success:", values);
    handleSignup();
  };

  const onFinishFailed = (errorInfo: ValidateErrorEntity<string>) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <div className="layout-default ant-layout layout-sign-up">
        <Header>
          <div className="header-col header-brand">
            <h5>Dashboard</h5>
          </div>
          <div className="header-col header-nav">
            <Menu mode="horizontal" defaultSelectedKeys={["1"]}>
              <Menu.Item key="1">
                <Link to="/dashboard">
                  {template}
                  <span> Dashboard</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/profile">
                  {profile}
                  <span>Profile</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/sign-up">
                  {signup}
                  <span> Sign Up</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="4">
                <Link to="/sign-in">
                  {signin}
                  <span> Sign In</span>
                </Link>
              </Menu.Item>
            </Menu>
          </div>
        </Header>

        <Content className="p-0">
          <div className="sign-up-header">
            <div className="content">
              <Title>Sign Up</Title>
              <p className="text-lg">
                Use these awesome forms to login or create new account in your
                project for free.
              </p>
            </div>
          </div>

          <Card
            className="card-signup header-solid h-full ant-card pt-0"
            title={<h5>Register</h5>}
            bordered={false}
          >
            {error && <div className="error-message">Error: {error}</div>}
            <Form
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              className="row-col"
            >
              <Form.Item
                name="Name"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input
                  placeholder="Name"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Item>

              <Form.Item valuePropName="checked" name="roles">
                <Checkbox.Group>
                  {allRoles.map((role) => (
                    <Checkbox
                      key={role.id}
                      checked={roles.some((r) => r.id === role.id)}
                      value={role.id}
                      onChange={(e) =>
                        handleCheckboxChange(role.id, e.target.checked)
                      }
                    >
                      {role.name}
                    </Checkbox>
                  ))}
                </Checkbox.Group>
              </Form.Item>

              <Form.Item>
                <Button
                  style={{ width: "100%" }}
                  type="primary"
                  htmlType="submit"
                  disabled={loading}
                >
                  {loading ? "Signing up..." : "SIGN UP"}
                </Button>
              </Form.Item>
            </Form>
            <p className="font-semibold text-muted text-center">
              Already have an account?{" "}
              <Link to="/sign-in" className="font-bold text-dark">
                Sign In
              </Link>
            </p>
          </Card>
        </Content>
        <Footer>
          <Menu mode="horizontal">
            <Menu.Item key="1">Company</Menu.Item>
            <Menu.Item key="2">About Us</Menu.Item>
            <Menu.Item key="3">Teams</Menu.Item>
            <Menu.Item key="4">Products</Menu.Item>
            <Menu.Item key="5">Blogs</Menu.Item>
            <Menu.Item key="6">Pricing</Menu.Item>
          </Menu>
          <Menu mode="horizontal" className="menu-nav-social">
            <Menu.Item key="1">
              <Link to="#">{<DribbbleOutlined />}</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="#">{<TwitterOutlined />}</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="#">{<InstagramOutlined />}</Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to="#">
                <svg
                  width="18"
                  height="18"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M496 256c0 137-111 248-248 248-25.6 0-50.2-3.9-73.4-11.1 10.1-16.5 25.2-43.5 30.8-65 3-11.6 15.4-59 15.4-59 8.1 15.4 31.7 28.5 56.8 28.5 74.8 0 128.7-68.8 128.7-154.3 0-81.9-66.9-143.2-152.9-143.2-107 0-163.9 71.8-163.9 150.1 0 36.4 19.4 81.7 50.3 96.1 4.7 2.2 7.2 1.2 8.3-3.3.8-3.4 5-20.3 6.9-28.1.6-2.5.3-4.7-1.7-7.1-10.1-12.5-18.3-35.3-18.3-56.6 0-54.7 41.4-107.6 112-107.6 60.9 0 103.6 41.5 103.6 100.9 0 67.1-33.9 113.6-78 113.6-24.3 0-42.6-20.1-36.7-44.8 7-29.5 20.5-61.3 20.5-82.6 0-19-10.2-34.9-31.4-34.9-24.9 0-44.9 25.7-44.9 60.2 0 22 7.4 36.8 7.4 36.8s-24.5 103.8-29 123.2c-5 21.4-3 51.6-.9 71.2C65.4 450.9 0 361.1 0 256 0 119 111 8 248 8s248 111 248 248z"></path>
                </svg>
              </Link>
            </Menu.Item>
            <Menu.Item key="5">
              <Link to="#">{<GithubOutlined />}</Link>
            </Menu.Item>
          </Menu>
          <p className="copyright">
            {" "}
            Copyright © 2024 CQU by <a href="#pablo">Team F</a>.{" "}
          </p>
        </Footer>
      </div>
    </>
  );
};

export default SignUp;
