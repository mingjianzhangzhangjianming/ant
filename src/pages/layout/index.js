import SiderChildren from './Sider'
import HeaderChidren from './Header'
import FooterChildren from './Footer'
import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'

const { Header, Sider, Content, Footer } = Layout

export default function PageLayout() {
    return (
        <Layout className="layout-wrap">
            <Header className="header" children={<HeaderChidren />} />
            <Layout>
                <Sider theme="light" children={<SiderChildren />} />
                <Layout>
                    <Content>
                        <Outlet />
                    </Content>
                    <Footer children={<FooterChildren />} />
                </Layout>
            </Layout>
        </Layout>
    )
}
