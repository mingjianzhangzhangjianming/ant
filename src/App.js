import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
// import { Row, Col } from 'antd'
import { Row, Col } from './components/Grid'
// import Button from './components/Button'
// import Drawer from './components/Drawer'
// import Switch from './components/Switch'

const AppStyle = styled.div`
    margin: 120px auto;
    font-family: -apple-system, BlinkMacSystemFont, segoe ui, Roboto, helvetica neue, Arial, noto sans, sans-serif,
        apple color emoji, segoe ui emoji, segoe ui symbol, noto color emoji; //antd 组件库字体
    /* max-width: 1200px; */
    width: 600px;
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
                    <Row gutter={[{ sm: 16, xxl: 20 }, 12]} style={{ height: 200 }} wrap={false}>
                        <Col span={12}>col-12-1</Col>
                        <Col span={12}>col-12-2</Col>
                        {/* <Col span={6}>col-6-3</Col> */}
                    </Row>
                </div>
            </AppStyle>
        </ThemeProvider>
    )
}
