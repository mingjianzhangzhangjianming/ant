import React, { useState } from 'react'
import styled, { ThemeProvider } from 'styled-components'
// import { Switch } from 'antd'
import Button from './components/Button'
import Drawer from './components/Drawer'
import Switch from './components/Switch'

const AppStyle = styled.div`
    /* margin: 120px auto; */
    font-family: -apple-system, BlinkMacSystemFont, segoe ui, Roboto, helvetica neue, Arial,
        noto sans, sans-serif, apple color emoji, segoe ui emoji, segoe ui symbol, noto color emoji; //antd 组件库字体
    max-width: 1200px;
    width: 1200px;
    border: 1px dashed #a7a7a7;
    & > .container {
        width: 100%;
        height: 300px;
        padding: 48px;
        display: flex;
        flex-flow: row nowrap;
        align-content: center;
        align-items: flex-start;
    }
`

const theme = {
    default: {
        main: '#1890ff',
        hover: '#40a9ff',
        active: '#096dd9',
    },
}

export function App() {
    const [visible, setVisible] = useState(false)
    const showDrawer = () => {
        setVisible(true)
    }

    const onClose = () => {
        setVisible(false)
    }
    return (
        <ThemeProvider theme={theme}>
            <AppStyle>
                <div className="container">
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
                        {/* <Drawer
                            zIndex={10}
                            placement="right"
                            onClose={onClose}
                            visible={visible}
                            footer={<h2>546545</h2>}
                        >
                            <p>Some contents...</p>
                        </Drawer> */}
                        <Button type="primary" onClick={showDrawer}>
                            open
                        </Button>
                    </Drawer>
                    <Button type="primary" onClick={showDrawer}>
                        open
                    </Button>
                    <Switch
                        size="small"
                        // loading
                        // disabled={true}
                        // checked={false}
                        // defaultChecked={false}
                        checkedChildren={'on'}
                        unCheckedChildren={'off'}
                        onChange={checked => console.log(checked, 'change')}
                        onClick={checked => console.log(checked, 'click')}
                    />
                    {/* <Switch /> */}
                </div>
            </AppStyle>
        </ThemeProvider>
    )
}
