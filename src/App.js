import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
// import { Row, Col, Grid, Tag, Space } from 'antd'
import { Row, Col } from './components/Grid'
import { Space } from './components/Space'
// import Button from './components/Button'
// import Drawer from './components/Drawer'
import Switch from './components/Switch'

const AppStyle = styled.div`
    margin: 120px auto;
    font-family: -apple-system, BlinkMacSystemFont, segoe ui, Roboto, helvetica neue, Arial, noto sans, sans-serif,
        apple color emoji, segoe ui emoji, segoe ui symbol, noto color emoji; //antd 组件库字体
    /* max-width: 1200px; */
    width: 602px;
    border: 1px dashed #a7a7a7;
    /* & > .container {
        width: 100%;
        height: 300px;
        padding: 48px;
        display: flex;
        flex-flow: row nowrap;
        align-content: center;
        align-items: flex-start;
    } */
`

const theme = {
    default: {
        main: '#1890ff',
        hover: '#40a9ff',
        active: '#096dd9'
    }
}

export function App() {
    // const [visible, setVisible] = useState(false)
    // const showDrawer = () => {
    //     setVisible(true)
    // }

    // const onClose = () => {
    //     setVisible(false)
    // }
    return (
        <ThemeProvider theme={theme}>
            <AppStyle>
                {/* <div className="container">
                    <div className="xxx"></div>
                    <Drawer
                        width={580}
                        zIndex={10}
                        placement="right"
                        onClose={onClose}
                        visible={visible}
                        getContainer={() => document.querySelector('.xxx')}
                        footer={<h2>546545</h2>}
                    >
                        <Button type="primary" onClick={showDrawer}>
                            open
                        </Button>
                    </Drawer>
                    <Button type="primary" onClick={showDrawer}>
                        open
                    </Button>
                    <Switch
                        checkedChildren={'on'}
                        unCheckedChildren={'off'}
                        onChange={checked => console.log(checked, 'change')}
                        onClick={checked => console.log(checked, 'click')}
                    />
                </div> */}
                <div>
                    <Row gutter={[{ lg: 16, xxl: 20 }, 12]} style={{ height: 200 }} align="middle">
                        {/* <Col span={4}>col-1</Col> */}
                        <Col span={4} md={{ push: 20 }}>
                            col-2
                        </Col>
                        <Col span={12} md={{ pull: 4 }}>
                            col-3
                        </Col>
                        {/* <Col span={4}>col-4</Col> */}
                        {/* <Col span={6}>col-6-3</Col> */}
                    </Row>
                </div>
                <Space size="middle" style={{ height: 36 }} align="center" direction="horizontal" split={<h1>|</h1>}>
                    <Switch />
                    <Switch checkedChildren={'onsdfsdfdsfdgdfgdfgfd'} unCheckedChildren={'offdfsdfdsfdgdfgdfgfd'} />
                    <Switch size="small" checkedChildren={'开'} unCheckedChildren={'关'} />
                </Space>
            </AppStyle>
        </ThemeProvider>
    )
}
