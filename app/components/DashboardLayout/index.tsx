import Layout from "antd/lib/layout";
import Menu from "antd/lib/menu"
import Typography from "antd/lib/typography"
import styles from './styles.module.css';
import { useRouter } from 'next/router';
import React, { useState, useMemo, useCallback } from 'react';

type DashboardLayoutTypes =  {
  id: "1" | "2";
  title: "Settings" | "Home"
  children: React.ReactNode
}

export function DashboardLayout({ id, title: Title, children }:DashboardLayoutTypes) {
  const [key] = useState<Pick<DashboardLayoutTypes, "key">>(id)
  const [title] = useState<Pick<DashboardLayoutTypes, "title">>(Title)

  const { Header, Content, Sider, Footer } = Layout;
  const { pathname, push } = useRouter();

  const page = useMemo((): Pick<DashboardLayoutTypes,"title"> => ({
      Home: "/dashboard",
      Settings: "/dashboard/settings"
  }),[])

  return (
    <Layout hasSider>
      <Sider className={styles.sider} >
        <Menu theme="dark" defaultSelectedKeys={[key]} mode="inline">
          <Menu.Item key="1" onClick={() => push(page.Home)} >
            <Typography.Text className={styles.siderMenuText}>Home</Typography.Text>
          </Menu.Item>
          <Menu.Item key="2" onClick={() => push(page.Settings)}>
            <Typography.Text className={styles.siderMenuText} >Settings</Typography.Text>
          </Menu.Item>
          </Menu>
       </Sider>
       <Layout>
         <Header className={styles.header} >
         <Typography.Title level={2}>{title}</Typography.Title>
         </Header>
         <Content className={styles.content} >
          {children}
           </Content>
           <Footer></Footer>
       </Layout>
    </Layout>
  );
}
