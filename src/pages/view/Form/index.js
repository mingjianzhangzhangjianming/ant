import React, { useState } from 'react'
import { Typography, Row, Col } from 'antd'
import './index.less'
import AntForm from 'components/Form'
import { Form, Button, Input, Checkbox } from 'antd'
import Switch from 'components/Switch'

const Demo = () => {
    const onFinish = values => {
        console.log('Success:', values)
    }

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo)
    }

    return (
        <Form
            id="llll"
            name="basic"
            component={'form'}
            // layout="horizontal | vertical | inline"
            layout="horizontal"
            labelAlign="left"
            labelCol={{
                span: 8
            }}
            wrapperCol={{
                span: 16
            }}
            initialValues={{
                remember: true
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            validateTrigger={['onBlur']}
        >
            <Form.Item
                label="Username"
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your username!'
                    }
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="remember"
                // getValueProps={value => ({
                //     checked: value
                // })}
                valuePropName="checked"
                wrapperCol={{
                    offset: 8,
                    span: 16
                }}
            >
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16
                }}
            >
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}

export default function DrawerWrapExhibi() {
    const [layout, setLayout] = useState(false)
    return (
        <div className="switch-container">
            <Typography.Title level={3}>Form ??????</Typography.Title>
            <p style={{ marginTop: 16 }}>????????????????????????????????????????????????????????????????????????????????????????????????</p>
            <Typography.Title style={{ marginTop: 48, fontWeight: 500 }} level={3}>
                ????????????
            </Typography.Title>
            <ol>
                <li>?????????????????????????????????????????? ????????????????????????????????????????????????</li>
                <li>
                    ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
                </li>
            </ol>
            <div className="code-demo">
                <Typography.Title style={{ marginTop: 48, fontWeight: 500 }} level={3}>
                    ????????????
                </Typography.Title>
            </div>
            <section style={{ height: 800 }}>
                <Row gutter={24}>
                    <Col lg={{ span: 24 }} md={{ span: 24 }}>
                        <Demo />
                        <Switch
                            style={{ margin: '24px 0' }}
                            checked={layout}
                            onChange={e => setLayout(e)}
                            checkedChildren="vertical"
                            unCheckedChildren="horizontal"
                        />
                        <AntForm
                            layout={layout ? 'horizontal' : 'vertical'}
                            labelCol={{
                                span: 8
                            }}
                            wrapperCol={{
                                span: 16
                            }}
                        >
                            <AntForm.Item
                                name="username"
                                valuePropName="value"
                                label="username"
                                initialValue={999}
                                validateTrigger={['onBlur']}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your username!'
                                    }
                                ]}
                            >
                                <Input />
                            </AntForm.Item>
                            <AntForm.Item
                                name="tenant"
                                initialValue={876354634653485453}
                                valuePropName="value"
                                label="username"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!'
                                    },
                                    {
                                        message: '??????????????????????????????!',
                                        max: 10
                                    },
                                    {
                                        min: 5,
                                        message: '??????5?????????!'
                                    }
                                ]}
                                validateTrigger={['onChange']}
                            >
                                <Input />
                            </AntForm.Item>
                            <AntForm.Item label="Password" name="password" valuePropName="checked">
                                <Switch />
                            </AntForm.Item>
                            <AntForm.Item
                                name="remember"
                                // getValueProps={value => ({
                                //     checked: value
                                // })}
                                initialValue={true}
                                valuePropName="checked"
                                wrapperCol={{
                                    offset: 8,
                                    span: 16
                                }}
                            >
                                <Checkbox>Remember me</Checkbox>
                            </AntForm.Item>
                            <AntForm.Item
                                wrapperCol={{
                                    offset: 8,
                                    span: 16
                                }}
                            >
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </AntForm.Item>
                        </AntForm>
                    </Col>
                </Row>
            </section>
        </div>
    )
}
