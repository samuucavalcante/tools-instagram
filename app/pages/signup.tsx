import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Button, Checkbox, Form, Input, Col, Row, Card } from "antd";
import { UserOutlined, LockOutlined, MailOutlined} from "@ant-design/icons";
import Link from 'next/link';

export default function SignUp() {
  const onFinish = () => {};
  const onFinishFailed = () => {};
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh"
      }}
    >
      <Row style={{ width: 450 }}>
        <Col span={24}>
          <Card title="Create Account">
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: "Please input your Username" },
                  {min: 4, message: "username field must be more that 3 characters"},
                  {max: 15, message: "username field must be less that 14 characters"}
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Username"
                />
              </Form.Item>
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please input your Email!" },
                  {type: "email", message: "Email Invalid!", }
                ]}
              >
                <Input
                  prefix={<MailOutlined className="site-form-item-icon" />}
                  placeholder="Email"
                />
              </Form.Item>
              
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your Password!" }
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
                <Form.Item>
                <Button
                style={{ marginRight: 10 }}
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Register
                </Button>
                Or <Link href="/signin" ><a>I have account</a></Link>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
}