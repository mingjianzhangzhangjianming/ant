import { Component, createContext, createElement } from 'react'
import { Row, Col } from 'components/Grid'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './index.less'

const FormContext = createContext('')

class FormItem extends Comment {
    static displayName = 'Form.Item'
    static propsType = {}
    static defaultProps = {}

    render() {
        return (
            <Row>
                <Col>
                    <label></label>
                </Col>
                <Col>
                    <div className="ant-form-item-control-input"></div>
                </Col>
            </Row>
        )
    }
}

export default class F extends Component {
    static Item = FormItem
    static displayName = 'Form'
    static propsType = {
        colon: PropTypes.bool, //配置 Form.Item 的 colon 的默认值。表示是否显示 label 后面的冒号 (只有在属性 layout 为 horizontal 时有效)	boolean	true
        component: PropTypes.oneOf([PropTypes.string, PropTypes.bool]), //设置 Form 渲染元素，为 false 则不创建 DOM 节点	ComponentType | false	form
        fields: PropTypes.object, //通过状态管理（如 redux）控制表单字段，如非强需求不推荐使用。查看示例	FieldData[]
        form: PropTypes.object, //经 Form.useForm() 创建的 form 控制实例，不提供时会自动创建	FormInstance
        initialValues: PropTypes.object, //表单默认值，只有初始化以及重置时生效	object
        labelAlign: PropTypes.oneOf(['left', 'right']), //label 标签的文本对齐方式	left | right	right
        labelCol: PropTypes.object, //label 标签布局，同 <Col> 组件，设置 span offset 值，如 {span: 3, offset: 12} 或 sm: {span: 3, offset: 12}	object
        layout: PropTypes.oneOf(['horizontal', 'vertical', 'inline']), //	表单布局	horizontal | vertical | inline	horizontal
        name: PropTypes.string, //表单名称，会作为表单字段 id 前缀使用	string
        preserve: PropTypes.bool, //当字段被删除时保留字段值	boolean	true
        requiredMark: PropTypes.bool, //必选样式，可以切换为必选或者可选展示样式。此为 Form 配置，Form.Item 无法单独配置	boolean | optional	true
        scrollToFirstError: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]), //	提交失败自动滚动到第一个错误字段	boolean | Options	false
        size: PropTypes.string, //设置字段组件的尺寸（仅限 antd 组件）	small | middle | large	-
        validateMessages: PropTypes.func, //验证提示模板，说明见下	ValidateMessages	-
        validateTrigger: PropTypes.oneOfType([PropTypes.string, PropTypes.array]), //	统一设置字段触发验证的时机	string | string[]	onChange
        wrapperCol: PropTypes.object, //需要为输入控件设置布局样式时，使用该属性，用法同 labelCol	object
        onFieldsChange: PropTypes.func, //字段更新时触发回调事件	function(changedFields, allFields)
        onFinish: PropTypes.func, //提交表单且数据验证成功后回调事件	function(values)
        onFinishFailed: PropTypes.func, //提交表单且数据验证失败后回调事件	function({ values, errorFields, outOfDate })
        onValuesChange: PropTypes.func //字段值更新时触发回调事件	function(changedValues, allValues)
    }

    static defaultProps = {
        autoComplete: 'off',
        colon: true, //配置 Form.Item 的 colon 的默认值。表示是否显示 label 后面的冒号 (只有在属性 layout 为 horizontal 时有效)
        component: false, //	设置 Form 渲染元素，为 false 则不创建 DOM 节点	ComponentType | false	form
        // fields	通过状态管理（如 redux）控制表单字段，如非强需求不推荐使用。查看示例	FieldData[]
        // form	经 Form.useForm() 创建的 form 控制实例，不提供时会自动创建	FormInstance
        initialValues: { username: 'admin', password: 123455 }, //表单默认值，只有初始化以及重置时生效
        labelAlign: 'right', //label 标签的文本对齐方式	left | right	right
        labelCol: { span: 3, offset: 12 }, //label 标签布局，同 <Col> 组件，设置 span offset 值，如 {span: 3, offset: 12} 或 sm: {span: 3, offset: 12}
        layout: 'horizontal', //	表单布局	horizontal | vertical | inline	horizontal
        name: 'login', //	表单名称，会作为表单字段 id 前缀使用	string
        // preserve	当字段被删除时保留字段值	boolean	true
        requiredMark: true, //	必选样式，可以切换为必选或者可选展示样式。此为 Form 配置，Form.Item 无法单独配置	boolean | optional
        // scrollToFirstError	提交失败自动滚动到第一个错误字段	boolean | Options	false
        size: 'middle', //	设置字段组件的尺寸（仅限 antd 组件）	small | middle | large
        // validateMessages	验证提示模板，说明见下	ValidateMessages
        validateTrigger: ['onClick', 'onChange', 'onBlur'], //统一设置字段触发验证的时机
        wrapperCol: { span: 3, offset: 12 }, //	需要为输入控件设置布局样式时，使用该属性，用法同 labelCol,
        onFieldsChange: () => {
            console.log('')
        }, //字段更新时触发回调事件	function(changedFields, allFields)
        onFinish: () => {
            console.log('')
        }, //提交表单且数据验证成功后回调事件	function(values)
        onFinishFailed: () => {
            console.log('')
        }, //提交表单且数据验证失败后回调事件	function({ values, errorFields, outOfDate })
        onValuesChange: () => {
            console.log('')
        } //字段值更新时触发回调事件	function(changedValues, allValues)
    }

    constructor(props) {
        super(props)
    }

    render() {
        const {
            id,
            name,
            colon,
            component,
            fields,
            form,
            initialValues,
            labelAlign,
            labelCol,
            layout,
            requiredMark,
            preserve,
            scrollToFirstError,
            size,
            validateTrigger,
            wrapperCol,
            onFieldsChange,
            onFinish,
            onFinishFailed,
            onValuesChange,
            children,
            ...otherProps
        } = this.props
        const formClassName = classNames('ant-form')
        const validatelists = Array.isArray(validateTrigger)
            ? validateTrigger.map(i => ({ [i]: () => {} }))
            : [{ [validateTrigger]: () => {} }]
        const dispatChvalis = Object.assign({}, ...validatelists)

        // console.log(dispatChvalis)
        console.log(children)
        console.log(this.props)
        return (
            <FormContext.Provider value={this.props}>
                {component
                    ? createElement(component, { id: id || name, className: formClassName, ...otherProps }, children)
                    : children}
            </FormContext.Provider>
        )
    }
}

// colon	配置 Form.Item 的 colon 的默认值。表示是否显示 label 后面的冒号 (只有在属性 layout 为 horizontal 时有效)	boolean	true
// component	设置 Form 渲染元素，为 false 则不创建 DOM 节点	ComponentType | false	form
// fields	通过状态管理（如 redux）控制表单字段，如非强需求不推荐使用。查看示例	FieldData[]	-
// form	经 Form.useForm() 创建的 form 控制实例，不提供时会自动创建	FormInstance	-
// initialValues	表单默认值，只有初始化以及重置时生效	object	-
// labelAlign	label 标签的文本对齐方式	left | right	right
// labelCol	label 标签布局，同 <Col> 组件，设置 span offset 值，如 {span: 3, offset: 12} 或 sm: {span: 3, offset: 12}	object	-
// layout	表单布局	horizontal | vertical | inline	horizontal
// name	表单名称，会作为表单字段 id 前缀使用	string	-
// preserve	当字段被删除时保留字段值	boolean	true	4.4.0
// requiredMark	必选样式，可以切换为必选或者可选展示样式。此为 Form 配置，Form.Item 无法单独配置	boolean | optional	true	4.6.0
// scrollToFirstError	提交失败自动滚动到第一个错误字段	boolean | Options	false
// size	设置字段组件的尺寸（仅限 antd 组件）	small | middle | large	-
// validateMessages	验证提示模板，说明见下	ValidateMessages	-
// validateTrigger	统一设置字段触发验证的时机	string | string[]	onChange	4.3.0
// wrapperCol	需要为输入控件设置布局样式时，使用该属性，用法同 labelCol	object	-
// onFieldsChange	字段更新时触发回调事件	function(changedFields, allFields)	-
// onFinish	提交表单且数据验证成功后回调事件	function(values)	-
// onFinishFailed	提交表单且数据验证失败后回调事件	function({ values, errorFields, outOfDate })	-
// onValuesChange	字段值更新时触发回调事件	function(changedValues, allValues)	-
