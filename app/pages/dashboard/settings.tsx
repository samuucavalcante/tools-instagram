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
  message,
} from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { AxiosResponse } from "axios";
import { api } from "../../services/api";
import { InstagramAccounts, useAuth, Hashtag } from "../../hooks/AuthContext";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

type RegisterInstagramAccount = {
  username: string;
  password: string;
};

export default function Settings() {
  const [form] = Form.useForm();
  const inputHashtagRef = useRef<HTMLInputElement>(null);
  const [instagramAccounts, setInstagramAccounts] = useState<InstagramAccounts[]>();
  const [refreshInstagraAccountState, setRefreshInstagraAccountState] = useState<boolean>(false);

  useEffect(() => {
    api
      .get<InstagramAccounts[], AxiosResponse<InstagramAccounts[]>>(
        "instagramaccount"
      )
      .then((res) => {
        setInstagramAccounts(res.data);
      });
  }, [refreshInstagraAccountState]);

  const onFinishFailed = () => {};

  const onFinish = async ({ username, password }: RegisterInstagramAccount) => {
    form.resetFields();
    if (instagramAccounts?.length === 3) {
      message.error("You can only have 3 accounts");
      return;
    }

    const instagramAccount = await api.post<
      InstagramAccounts,
      AxiosResponse<InstagramAccounts>,
      RegisterInstagramAccount
    >("instagramaccount", {
      username,
      password,
    });

    if (instagramAccount.status === 201 && instagramAccount.data) {
      setInstagramAccounts([
        ...(instagramAccounts as InstagramAccounts[]),
        instagramAccount.data,
      ]);
      message.success("Account added");
      return;
    }

    message.error("Something went wrong");
  };

  const addHashtags = useCallback((id: string) => {
    console.log(inputHashtagRef.current?.value)
    if(inputHashtagRef.current?.value) {
      inputHashtagRef.current.value = "";
    }
    Modal.info({
      title: "Add Hashtags",
      content: <input ref={inputHashtagRef} />,
      onOk: async () => {
        await api.post(`hashtags/${id}`, {
          hashtag: inputHashtagRef.current?.value || "",
        });

        setRefreshInstagraAccountState(state => !state);

      },
    });
  }, []);

  const removeHashtag = useCallback((id: string, hashtag: string) => {
    Modal.confirm({
      title: "Remove Hashtag",
      content: `Are you sure you want to remove ${hashtag}?`,
      onOk: async () => {
        await api.delete(`hashtags/${id}`);
        setRefreshInstagraAccountState(state => !state);

        message.success("Hashtag removed");
      },
    });
  },[])

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
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Space>
        <Divider />
        <Row style={{ display: "flex", width: "84%" }}>
          {instagramAccounts?.map((instagram) => (
            <Col
              xs={24}
              sm={24}
              md={12}
              lg={8}
              key={instagram.id}
              style={{ padding: 5 }}
            >
              <Card
                bordered
                title={
                  <>
                    {instagram.username}
                    {instagram.active ? (
                      <Tag color="green">Active</Tag>
                    ) : (
                      <Tag color="red">Inactive</Tag>
                    )}
                  </>
                }
              >
                <Space
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                ></Space>
                <Typography.Text>Hashtags:</Typography.Text>
                <div style={{ marginTop: 10 }}>
                  {instagram.Hashtag?.map((hashtag) => (
                    <Tag closable onClose={() => removeHashtag(hashtag.id, hashtag.hashtag)} key={hashtag.id} color="blue">
                      {hashtag.hashtag}
                    </Tag>
                  ))}
                  <Button
                    onClick={() => addHashtags(instagram.id)}
                    shape="round"
                    icon={<PlusCircleOutlined />}
                  ></Button>
                </div>
              </Card>
            </Col>
          ))}
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
