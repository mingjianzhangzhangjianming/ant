import { Row, Col, Input, Menu, Button } from 'antd'
import { SearchOutlined, DownOutlined } from '@ant-design/icons'
import './index.less'

const memulist = [
    {
        title: '设计',
        href: ''
    },
    {
        title: '文档',
        href: ''
    },
    {
        title: '组件',
        href: ''
    },
    {
        title: '资源',
        href: ''
    },
    {
        title: '国内镜像',
        href: ''
    }
]

export default function HeaderChidren() {
    return (
        <Row justify="space-between" wrap={false}>
            <Col lg={{ span: 6 }} xl={{ span: 5 }} xxl={{ span: 4 }}>
                <h1>
                    <a className="logo">
                        <img src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" alt="logo"></img>
                        ant desgin
                    </a>
                </h1>
            </Col>
            <Col className="right-search" flex={1}>
                <Input
                    className="search-input"
                    prefix={<SearchOutlined />}
                    placeholder="搜索"
                    bordered={false}
                    addonAfter={
                        <>
                            <span className="ant-typography">
                                <kbd>Ctrl</kbd>
                            </span>
                            <span className="ant-typography">
                                <kbd>K</kbd>
                            </span>
                        </>
                    }
                />

                <Menu className="head-menu" mode="horizontal">
                    {memulist.map((item, index) => (
                        <Menu.Item key={index}>{item.title}</Menu.Item>
                    ))}
                </Menu>
                <Button className="more-menu-btn" size="small">
                    更多
                    <DownOutlined className="more-icon" />
                </Button>
            </Col>
        </Row>
    )
}
