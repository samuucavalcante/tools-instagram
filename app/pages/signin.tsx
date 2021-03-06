import { Button, Checkbox, Form, Input, Col, Row, Card, Modal } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';

import { useAuth, SignRequest } from '../hooks/AuthContext';

export default function SignIn() {
  const { signIn } = useAuth();

  const onFinish = async ({ email, password, username }: SignRequest) => {
    await signIn({
      email,
      password,
      username
    })
  };
  const onFinishFailed = () => {
    console.log('fail');
  };
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
          <Card title="Login">
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
                  { type: "email", message: "Email Invalid!", }
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
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <Link href="/forgotpassword">
                  <a className="login-form-forgot" >
                    Forgot password
                </a>
                </Link>
              </Form.Item>

              <Form.Item>
                <Button
                  style={{ marginRight: 10 }}
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Log in
                </Button>
                Or <Link href="/signup"><a >register now!</a></Link>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
