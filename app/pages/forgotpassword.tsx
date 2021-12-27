import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Button, Checkbox, Form, Input, Col, Row, Card } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import Link from 'next/link';

export default function ForgotPassword() {
  const onFinish = () => {};
  const onFinishFailed = () => {};
  return(
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
          <Card title="Forgot Password">
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
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
              <Form.Item>
                <Button
                style={{ marginRight: 10 }}
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  SendMail
                </Button>
                Or <Link href="/signin"><a > I remembered my account</a></Link>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
}