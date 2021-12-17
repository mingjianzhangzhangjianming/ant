import React, { useState } from 'react'
import Button from 'components/Button'
import Drawer from 'components/Drawer'
import { Typography, Row, Col, Radio, Space } from 'antd'
import CodeContainer from 'pages/common/CodeContainer'
import './index.less'

const props$1 = {
    ViewJsx: () => {
        const [visible, setVisible] = useState(false)

        const showDrawer = () => {
            setVisible(true)
        }

        const onClose = () => {
            setVisible(false)
        }

        return (
            <>
                <Button type="primary" onClick={showDrawer}>
                    Open
                </Button>
                <Drawer title="Basic Drawer" placement="right" onClose={onClose} visible={visible}>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Drawer>
            </>
        )
    },
    title: '基础抽屉',
    detail: '基础抽屉，点击触发按钮抽屉从右滑出，点击遮罩区关闭。',
    codeValue: `
    import React, { useState } from 'react'
    import { Drawer, Button } from 'antd'

    const App = () => {
        const [visible, setVisible] = useState(false)

        const showDrawer = () => {
            setVisible(true)
        }

        const onClose = () => {
            setVisible(false)
        }

        return (
            <>
                <Button type="primary" onClick={showDrawer}>
                    Open
                </Button>
                <Drawer title="Basic Drawer" placement="right" onClose={onClose} visible={visible}>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Drawer>
            </>
        )
    }

    ReactDOM.render(<App />, mountNode)`
}

const props$2 = {
    ViewJsx: class App extends React.Component {
        state = { visible: false, placement: 'left' }

        showDrawer = () => {
            this.setState({
                visible: true
            })
        }

        onClose = () => {
            this.setState({
                visible: false
            })
        }

        onChange = e => {
            this.setState({
                placement: e.target.value
            })
        }

        render() {
            const { placement, visible } = this.state
            return (
                <>
                    <Space>
                        <Radio.Group value={placement} onChange={this.onChange}>
                            <Radio value="top">top</Radio>
                            <Radio value="right">right</Radio>
                            <Radio value="bottom">bottom</Radio>
                            <Radio value="left">left</Radio>
                        </Radio.Group>
                        <Button type="primary" onClick={this.showDrawer}>
                            Open
                        </Button>
                    </Space>
                    <Drawer
                        title="Basic Drawer"
                        placement={placement}
                        closable={false}
                        onClose={this.onClose}
                        visible={visible}
                        key={placement}
                    >
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                    </Drawer>
                </>
            )
        }
    },
    title: '自定义位置',
    detail: '自定义位置，点击触发按钮抽屉从相应的位置滑出，点击遮罩区关闭。',
    codeValue: `
    import React, { useState } from 'react'
    import { Drawer, Button } from 'antd'

    class App extends React.Component {
        state = { visible: false, placement: 'left' }
    
        showDrawer = () => {
            this.setState({
                visible: true
            })
        }
    
        onClose = () => {
            this.setState({
                visible: false
            })
        }
    
        onChange = e => {
            this.setState({
                placement: e.target.value
            })
        }
    
        render() {
            const { placement, visible } = this.state
            return (
                <>
                    <Space>
                        <Radio.Group value={placement} onChange={this.onChange}>
                            <Radio value="top">top</Radio>
                            <Radio value="right">right</Radio>
                            <Radio value="bottom">bottom</Radio>
                            <Radio value="left">left</Radio>
                        </Radio.Group>
                        <Button type="primary" onClick={this.showDrawer}>
                            Open
                        </Button>
                    </Space>
                    <Drawer
                        title="Basic Drawer"
                        placement={placement}
                        closable={false}
                        onClose={this.onClose}
                        visible={visible}
                        key={placement}
                    >
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                    </Drawer>
                </>
            )
        }
    }
    
    ReactDOM.render(<App />, mountNode)`
}

const props$3 = {
    ViewJsx: () => {
        const [visible, setVisible] = useState(false)
        const [placement, setPlacement] = useState('right')

        const showDrawer = () => {
            setVisible(true)
        }

        const onChange = e => {
            setPlacement(e.target.value)
        }

        const onClose = () => {
            setVisible(false)
        }

        return (
            <>
                <Space>
                    <Radio.Group value={placement} onChange={onChange}>
                        <Radio value="top">top</Radio>
                        <Radio value="right">right</Radio>
                        <Radio value="bottom">bottom</Radio>
                        <Radio value="left">left</Radio>
                    </Radio.Group>
                    <Button type="primary" onClick={showDrawer}>
                        Open
                    </Button>
                </Space>
                <Drawer
                    title="Drawer with extra actions"
                    placement={placement}
                    width={500}
                    onClose={onClose}
                    visible={visible}
                    extra={
                        <Space>
                            <Button onClick={onClose}>Cancel</Button>
                            <Button type="primary" onClick={onClose}>
                                OK
                            </Button>
                        </Space>
                    }
                >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Drawer>
            </>
        )
    },
    title: '自定义位置',
    detail: '自定义位置，点击触发按钮抽屉从相应的位置滑出，点击遮罩区关闭。',
    codeValue: `
    import React, { useState } from 'react'
    import { Drawer, Button, Space, Radio } from 'antd'
    
    const App = () => {
        const [visible, setVisible] = useState(false)
        const [placement, setPlacement] = useState('right')
    
        const showDrawer = () => {
            setVisible(true)
        }
    
        const onChange = e => {
            setPlacement(e.target.value)
        }
    
        const onClose = () => {
            setVisible(false)
        }
    
        return (
            <>
                <Space>
                    <Radio.Group value={placement} onChange={onChange}>
                        <Radio value="top">top</Radio>
                        <Radio value="right">right</Radio>
                        <Radio value="bottom">bottom</Radio>
                        <Radio value="left">left</Radio>
                    </Radio.Group>
                    <Button type="primary" onClick={showDrawer}>
                        Open
                    </Button>
                </Space>
                <Drawer
                    title="Drawer with extra actions"
                    placement={placement}
                    width={500}
                    onClose={onClose}
                    visible={visible}
                    extra={
                        <Space>
                            <Button onClick={onClose}>Cancel</Button>
                            <Button type="primary" onClick={onClose}>
                                OK
                            </Button>
                        </Space>
                    }
                >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Drawer>
            </>
        )
    }
    
    ReactDOM.render(<App />, mountNode)`
}

const props$4 = {
    ViewJsx: class App extends React.Component {
        state = { visible: false, childrenDrawer: false }

        showDrawer = () => {
            this.setState({
                visible: true
            })
        }

        onClose = () => {
            this.setState({
                visible: false
            })
        }

        showChildrenDrawer = () => {
            this.setState({
                childrenDrawer: true
            })
        }

        onChildrenDrawerClose = () => {
            this.setState({
                childrenDrawer: false
            })
        }

        render() {
            return (
                <>
                    <Button type="primary" onClick={this.showDrawer}>
                        Open drawer
                    </Button>
                    <Drawer
                        title="Multi-level drawer"
                        width={620}
                        closable={false}
                        onClose={this.onClose}
                        visible={this.state.visible}
                    >
                        <Button type="primary" onClick={this.showChildrenDrawer}>
                            Two-level drawer
                        </Button>
                        <Drawer
                            title="Two-level Drawer"
                            width={420}
                            closable={false}
                            onClose={this.onChildrenDrawerClose}
                            visible={this.state.childrenDrawer}
                        >
                            This is two-level drawer
                            {/* <Button type="primary" onClick={this.showChildrenDrawer}>
                                Two-level drawer
                            </Button>
                            <Drawer title="Two-level Drawer" width={320} closable={false}>
                                This is two-level drawer
                            </Drawer> */}
                        </Drawer>
                    </Drawer>
                </>
            )
        }
    },
    title: '多层抽屉',
    detail: '在抽屉内打开新的抽屉，用以解决多分支任务的复杂状况。',
    codeValue: `
    import { Drawer, Button } from 'antd';

    class App extends React.Component {
        state = { visible: false, childrenDrawer: false }
    
        showDrawer = () => {
            this.setState({
                visible: true
            })
        }
    
        onClose = () => {
            this.setState({
                visible: false
            })
        }
    
        showChildrenDrawer = () => {
            this.setState({
                childrenDrawer: true
            })
        }
    
        onChildrenDrawerClose = () => {
            this.setState({
                childrenDrawer: false
            })
        }
    
        render() {
            return (
                <>
                    <Button type="primary" onClick={this.showDrawer}>
                        Open drawer
                    </Button>
                    <Drawer
                        title="Multi-level drawer"
                        width={520}
                        closable={false}
                        onClose={this.onClose}
                        visible={this.state.visible}
                    >
                        <Button type="primary" onClick={this.showChildrenDrawer}>
                            Two-level drawer
                        </Button>
                        <Drawer
                            title="Two-level Drawer"
                            width={320}
                            closable={false}
                            onClose={this.onChildrenDrawerClose}
                            visible={this.state.childrenDrawer}
                        >
                            This is two-level drawer
                        </Drawer>
                    </Drawer>
                </>
            )
        }
    }

    ReactDOM.render(<App />, mountNode);`
}

export default function DrawerWrapExhibi() {
    return (
        <div className="switch-container">
            <Typography.Title level={3}>Drawer 抽屉</Typography.Title>
            <p style={{ marginTop: 16 }}>屏幕边缘滑出的浮层面板。</p>
            <Typography.Title style={{ marginTop: 48, fontWeight: 500 }} level={3}>
                何时使用
            </Typography.Title>
            <p style={{ marginTop: 12 }}>
                抽屉从父窗体边缘滑入，覆盖住部分父窗体内容。用户在抽屉内操作时不必离开当前任务，操作完成后，可以平滑地回到原任务。
            </p>
            <ol>
                <li>
                    当需要一个附加的面板来控制父窗体内容，这个面板在需要时呼出。比如，控制界面展示样式，往界面中添加内容。
                </li>
                <li>当需要在当前任务流中插入临时任务，创建或预览附加内容。比如展示协议条款，创建子对象。</li>
            </ol>
            <div className="code-demo">
                <Typography.Title style={{ marginTop: 48, fontWeight: 500 }} level={3}>
                    代码展示
                </Typography.Title>
            </div>
            <section>
                <Row gutter={24}>
                    <Col lg={{ span: 12 }} md={{ span: 24 }}>
                        <CodeContainer {...props$1} />
                    </Col>
                    <Col lg={{ span: 12 }} md={{ span: 24 }}>
                        <CodeContainer {...props$2} />
                    </Col>
                    <Col lg={{ span: 12 }} md={{ span: 24 }}>
                        <CodeContainer {...props$3} />
                    </Col>
                    <Col lg={{ span: 12 }} md={{ span: 24 }}>
                        <CodeContainer {...props$4} />
                    </Col>
                </Row>
            </section>
        </div>
    )
}
