import { DashboardLayout } from "../../components/DashboardLayout";
import {
  Typography,
  Space,
  Form,
  Input,
  Row,
  Col,
  Divider,
  Card,
  Tag,
  Button,
  Modal,
} from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { AxiosResponse } from "axios";
import { api } from "../../services/api";
import { InstagramAccounts, useAuth } from "../../hooks/AuthContext";
import { useEffect, useState } from "react";

type RegisterInstagramAccount = {
  username: string;
  password: string;
};

export default function Settings() {
  const { user, refreshUser } = useAuth();
  const [form] = Form.useForm();
  const [instagramAccounts, setInstagramAccounts] = useState<InstagramAccounts[]>(user.instagramAccounts);
  console.log(instagramAccounts);
  const onFinishFailed = () => {};
  const onFinish = async ({ username, password }: RegisterInstagramAccount) => {
    form.resetFields();
    const { data } = await api.post<
      InstagramAccounts,
      AxiosResponse<InstagramAccounts>,
      RegisterInstagramAccount
    >("instagramaccount", {
      username,
      password,
    });

    setInstagramAccounts([...instagramAccounts || [], data]);
    await refreshUser();
  };

  const addHashtags = () => {
    Modal.info({
      title: "Type the hashtag",
      content: (
        <div>
          <p style={{ color: "gray" }}>no need to put #</p>
          <Input placeholder="example" />
        </div>
      ),
      onOk: () => {},
      cancelText: "Cancel",
      onCancel: () => {},
      okCancel: true,
    });
  };

  return (
    <DashboardLayout id="2" title="Settings">
      <Row>
        <Space direction="horizontal">
          {/** Register instagram account **/}
          <Col>
            <Typography.Title level={3}>
              Register instagram account
            </Typography.Title>
            <Form
              form={form}
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password />
              </Form.Item>
            </Form>
          </Col>

        </Space>
        <Divider />
        <Row>
          <Col>
            <Typography.Title level={2}>Accounts</Typography.Title>
            <Space style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', flexWrap: 'wrap' }} >
              <Card bordered title={<>samuucavalcante <Tag color="green" >Active</Tag></>}>
                <Space style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                </Space>
                <Typography.Text>Hashtags:</Typography.Text>
                <div style={{ marginTop: 10 }}>
                  <Tag closable >Amor</Tag>
                  <Tag closable >Amor</Tag>
                  <Tag closable >Amor</Tag>
                  <Button onClick={() => addHashtags()} shape="round" icon={<PlusCircleOutlined />}></Button>
                </div>
              </Card>
            </Space>
          </Col>
        </Row>


      </Row>
    </DashboardLayout>
  );
}

export const getServerSideProps: GetServerSideProps =  async (ctx) => {
  const { ['instagram-tools:token']: token } = parseCookies(ctx);

  if(!token) {
    return  {
      redirect: {
        destination: '/signin',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}
