import React, { useState } from 'react'
import { Typography, Row, Col } from 'antd'
import './index.less'
import AntForm from 'components/Form'
import { Form, Input, Button, Checkbox } from 'antd'

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

            {/* <Form.Item
                label="Password"
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!'
                    }
                ]}
            >
                <Input.Password />
            </Form.Item> */}

            <Form.Item
                name="remember"
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
            <Button type="primary" htmlType="submit">
                Submit
            </Button>
        </Form>
    )
}

export default function DrawerWrapExhibi() {
    return (
        <div className="switch-container">
            <Typography.Title level={3}>Form 表单</Typography.Title>
            <p style={{ marginTop: 16 }}>高性能表单控件，自带数据域管理。包含数据录入、校验以及对应样式。</p>
            <Typography.Title style={{ marginTop: 48, fontWeight: 500 }} level={3}>
                何时使用
            </Typography.Title>
            <ol>
                <li>用于创建一个实体或收集信息。 需要对输入的数据类型进行校验时。</li>
                <li>
                    当需要一个附加的面板来控制父窗体内容，这个面板在需要时呼出。比如，控制界面展示样式，往界面中添加内容。
                </li>
            </ol>
            <div className="code-demo">
                <Typography.Title style={{ marginTop: 48, fontWeight: 500 }} level={3}>
                    代码展示
                </Typography.Title>
            </div>
            <section style={{ height: 800 }}>
                <Row gutter={24}>
                    <Col lg={{ span: 24 }} md={{ span: 24 }}>
                        <Demo />
                        <AntForm></AntForm>
                    </Col>
                </Row>
            </section>
        </div>
    )
}