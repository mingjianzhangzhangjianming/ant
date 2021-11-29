import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
// import { Input as AntInput } from 'antd'
// import { SettingOutlined, EnterOutlined } from '@ant-design/icons'
// import { Row, Col } from './components/Grid'
// import Space from './components/Space'
// import Input from './components/Input'
// import Button from './components/Button'
// import Drawer from './components/Drawer'
// import Switch from './components/Switch'
import Hook from './hook'

const AppStyle = styled.div`
    margin: 120px auto;
    font-family: -apple-system, BlinkMacSystemFont, segoe ui, Roboto, helvetica neue, Arial, noto sans, sans-serif,
        apple color emoji, segoe ui emoji, segoe ui symbol, noto color emoji; //antd 组件库字体
    /* max-width: 1200px; */
    width: 800px;
    border: 1px dashed #a7a7a7;
    & > .container {
        width: 100%;
        height: 400px;
        padding: 48px;
        /* display: flex;
        flex-flow: row nowrap;
        align-content: center;
        align-items: flex-start; */
    }
`

const theme = {
    default: {
        main: '#1890ff',
        hover: '#40a9ff',
        active: '#096dd9'
    }
}

// const Demo = () => {
//     const [val, setVal] = React.useState(10101)
//     const ref = React.createRef(null)
//     const [visible, setVisible] = React.useState(false)
//     const showDrawer = () => {
//         setVisible(true)
//     }

//     const onClose = () => {
//         setVisible(false)
//     }
//     React.useEffect(() => {})
//     return (
//         <>
//             <Drawer
//                 placement="bottom"
//                 width={580}
//                 zIndex={10}
//                 onClose={onClose}
//                 visible={visible}
//                 getContainer={() => document.querySelector('.xxx')}
//                 footer={<h2>546545</h2>}
//             >
//                 <Button type="primary" onClick={showDrawer}>
//                     open
//                 </Button>
//             </Drawer>
//             <Button type="primary" onClick={showDrawer}>
//                 open
//             </Button>

//             <div>
//                 <Row gutter={[{ lg: 16, xxl: 20 }, 12]} style={{ height: 200 }} align="middle">
//                     {/* <Col span={4}>col-1</Col> */}
//                     <Col span={4} xxl={{ push: 20 }}>
//                         col-2
//                     </Col>
//                     <Col span={12} xxl={{ pull: 4 }}>
//                         col-3
//                     </Col>
//                 </Row>
//             </div>
//             <Space size="middle" style={{ height: 36 }} align="center" direction="horizontal" split={<h1>|</h1>}>
//                 <Switch />
//                 <Switch checkedChildren={'onsdfsdfdsfdgdfgdfgfd'} unCheckedChildren={'offdfsdfdsfdgdfgdfgfd'} />
//                 <Switch size="small" checkedChildren={'开'} unCheckedChildren={'关'} />
//             </Space>
//             <Input
//                 ref={ref}
//                 addonAfter={<h1>http://</h1>}
//                 addonBefore={<h1>.com</h1>}
//                 allowClear={null}
//                 prefix={<SettingOutlined />}
//                 suffix={<EnterOutlined />}
//                 style={{ width: 360 }}
//                 size="middle"
//                 maxLength={10}
//                 value={val}
//                 defaultValue="~"
//                 placeholder="size sm"
//                 // bordered={false}
//                 // disabled
//                 onChange={e => {
//                     setVal(e.target.value)
//                 }}
//                 onPressEnter={e => console.log(e.target.value)}
//             />
//         </>
//     )
// }

export function App() {
    return (
        <ThemeProvider theme={theme}>
            <AppStyle>
                <div className="container">
                    <Hook />
                </div>
            </AppStyle>
        </ThemeProvider>
    )
}
