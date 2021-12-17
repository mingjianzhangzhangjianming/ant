import React, { useState } from 'react'
import Switch from 'components/Switch'
import Button from 'components/Button'
import { Typography, Row, Col } from 'antd'
import CodeContainer from 'pages/common/CodeContainer'
import './index.less'

const props$1 = {
    ViewJsx: <Switch defaultChecked />,
    title: '基本',
    detail: '最简单的用法',
    codeValue: `
    import { Switch } from 'antd';

    function onChange(checked) {

        console.log(switch to ${'${checked}'});

    }

    ReactDOM.render(<Switch defaultChecked onChange={onChange} />, mountNode);`
}

const props$2 = {
    ViewJsx: () => {
        const [disable, setDisable] = useState(true)

        return (
            <>
                <Switch disabled={disable} defaultChecked />
                <br />
                <Button style={{ marginTop: 18 }} onClick={() => setDisable(!disable)}>
                    Toggle disabled
                </Button>
            </>
        )
    },
    title: '不可用',
    detail: 'Switch失效的状态。',
    codeValue: `
    import { Switch, Button } from 'antd';

    const App = () => {
        const [disabled, setDisabled] = React.useState(true)
    
        const toggle = () => {
            setDisabled(!disabled)
        }
    
        return (
            <>
                <Switch disabled={disabled} defaultChecked />
                <br />
                <Button type="primary" onClick={toggle}>
                    Toggle disabled
                </Button>
            </>
        )
    }

    ReactDOM.render(<App />, mountNode);`
}

const props$3 = {
    ViewJsx: () => {
        return (
            <>
                <Switch defaultChecked checkedChildren="开启" unCheckedChildren="关闭" />
                <br />
                <Switch defaultChecked checkedChildren="1" unCheckedChildren="0" style={{ margin: '24px 0' }} />
                <br />
                <Switch defaultChecked checkedChildren="✔" unCheckedChildren="❌" />
            </>
        )
    },
    title: '文字和图标',
    detail: '带有文字和图标',
    codeValue: `
    import { Switch } from 'antd'
    import { CloseOutlined, CheckOutlined } from '@ant-design/icons'

    ReactDOM.render(
        <>
            <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked />
            <br />
            <Switch checkedChildren="1" unCheckedChildren="0" />
            <br />
            <Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} defaultChecked />
        </>,
        mountNode
    )`
}

const props$4 = {
    ViewJsx: () => {
        return (
            <>
                <Switch defaultChecked />
                <br />
                <Switch size="small" defaultChecked style={{ margin: '24px 0' }} />
            </>
        )
    },
    title: '两种大小',
    detail: 'size="small" 表示小号开关。',
    codeValue: `
    import { Switch } from 'antd'

    ReactDOM.render(
        <>
            <Switch defaultChecked />
            <br />
            <Switch size="small" defaultChecked />
        </>,
        mountNode
    )`
}

const props$5 = {
    ViewJsx: () => {
        return (
            <>
                <Switch loading defaultChecked />
                <br />
                <Switch style={{ marginTop: 24 }} size="small" loading />
            </>
        )
    },
    title: '加载中',
    detail: '标识开关操作仍在执行中。',
    codeValue: `
    import { Switch } from 'antd'

    ReactDOM.render(
        <>
            <Switch loading defaultChecked />
            <br />
            <Switch size="small" loading />
        </>,
        mountNode
    )`
}

export default function SwitchWrapExhibi() {
    return (
        <div className="switch-container">
            <Typography.Title level={3}>Switch 开关</Typography.Title>
            <p style={{ marginTop: 16 }}>开关选择器。</p>
            <Typography.Title style={{ marginTop: 48, fontWeight: 500 }} level={3}>
                何时使用
            </Typography.Title>
            <ol>
                <li>需要表示开关状态/两种状态之间的切换时；</li>
                <li>
                    和 checkbox 的区别是，切换 switch 会直接触发状态改变，而 checkbox
                    一般用于状态标记，需要和提交操作配合。
                </li>
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
                    <Col lg={{ span: 12 }} md={{ span: 24 }}>
                        <CodeContainer {...props$5} />
                    </Col>
                </Row>
            </section>
        </div>
    )
}
