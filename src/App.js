import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
// import { Input as AntInput } from 'antd'
import { SettingOutlined, EnterOutlined } from '@ant-design/icons'
import { Row, Col } from './components/Grid'
import Space from './components/Space'
import Input from './components/Input'
import Button from './components/Button'
import Drawer from './components/Drawer'
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
    /* } */
`

const theme = {
    default: {
        main: '#1890ff',
        hover: '#40a9ff',
        active: '#096dd9'
    }
}

export function App() {
    const [val, setVal] = React.useState(10101)
    const ref = React.createRef(null)
    const [visible, setVisible] = React.useState(false)
    const showDrawer = () => {
        setVisible(true)
    }

    const onClose = () => {
        setVisible(false)
    }
    React.useEffect(() => {
        // setTimeout(() => ref.current.focus({ cursor: 'start' }), 2000)
    })
    return (
        <ThemeProvider theme={theme}>
            <AppStyle>
                <div className="container">
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
                </div>
                <div>
                    <Row gutter={[{ lg: 16, xxl: 20 }, 12]} style={{ height: 200 }} align="middle">
                        {/* <Col span={4}>col-1</Col> */}
                        <Col span={4} xxl={{ push: 20 }}>
                            col-2
                        </Col>
                        <Col span={12} xxl={{ pull: 4 }}>
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
                    {/* <AntInput
                        size="large"
                        maxLength={10}
                        value={val}
                        defaultValue="~"
                        placeholder="size sm"
                        onChange={e => {
                            setVal(e.target.value)
                        }}
                        onPressEnter={e => console.log(e.target.value)}
                    /> */}
                </Space>
                {/* <AntInput
                    addonAfter={<h1>565</h1>}
                    // addonBefore={<h1>565</h1>}
                    // disabled
                    // bordered={false}
                    prefix={<SettingOutlined />}
                    suffix={<EnterOutlined />}
                    style={{ width: 240 }}
                    size="large"
                    maxLength={10}
                    value={val}
                    allowClear
                    defaultValue="~"
                    placeholder="size sm"
                    onChange={e => {
                        setVal(e.target.value)
                    }}
                    onPressEnter={e => console.log(e.target.value)}
                /> */}
                <Input
                    ref={ref}
                    addonAfter={<h1>http://</h1>}
                    addonBefore={<h1>.com</h1>}
                    allowClear={null}
                    prefix={<SettingOutlined />}
                    suffix={<EnterOutlined />}
                    style={{ width: 360 }}
                    size="middle"
                    maxLength={10}
                    value={val}
                    defaultValue="~"
                    placeholder="size sm"
                    // bordered={false}
                    // disabled
                    onChange={e => {
                        setVal(e.target.value)
                    }}
                    onPressEnter={e => console.log(e.target.value)}
                />
                {/* <Input.Password suffix={<h2>5454</h2>} placeholder="input password" />
                <Input.TextArea suffix={<h2>5454</h2>} placeholder="input password" />
                <Input.Search suffix={<h2>5454</h2>} placeholder="input password" /> */}
            </AppStyle>
        </ThemeProvider>
    )
}
