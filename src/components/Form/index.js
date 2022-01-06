import React, {
    Component,
    createContext,
    createElement,
    cloneElement,
    useContext,
    useState,
    useCallback,
    useEffect,
    memo,
    useMemo,
    useRef,
    Fragment
} from 'react'
import { Row, Col } from 'components/Grid'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './index.less'
import { Button, Input } from 'antd'

const FormContext = createContext('')

const eventType = {
    value: e => e.target.value,
    checked: e => (e?.target?.checked === undefined ? e : e.target.checked)
}

const handleRule = {
    required: val => val === '',
    max: maxLength => val => val.toString().length >= maxLength,
    min: minLength => val => val.toString().length <= minLength
}

const FormItem = memo(props => {
    const valRef = useRef(null)
    const [errorMsg, setErrorMsg] = useState('')
    const [hasError, setHasError] = useState(false)
    const errRef = useRef(null)
    //结束动画执行标识
    const [isAnimaing, setIsAnimaing] = useState(false)
    const [formItemvalid, setFormItemvalid] = useState({})
    const {
        colon,
        label,
        labelCol,
        labelAlign,
        wrapperCol,
        requiredMark,
        children,
        elProps,
        validList,
        rulelist,
        dispatchFormValue
        // FormItemvalid,
    } = props
    // console.log('form-item ------> render', isAnimaing)
    const rowClass = classNames('ant-form-item', {
        'ant-form-item-with-help': hasError,
        'ant-form-item-has-error': hasError
    })

    const labelClassName = classNames({
        'ant-form-item-required': requiredMark,
        [`ant-form-item-label-${labelAlign}`]: labelAlign,
        'lable-colon': colon
    })

    //表单验证触发事件
    const dispatChvalis = (vaild, Fn) => {
        const mergeonChange = e => {
            dispatchFormValue(e)
            Fn()
        }
        return new Promise(resolve => {
            resolve(
                Object.assign(
                    {},
                    ...(Array.isArray(vaild)
                        ? vaild.map(i => ({
                              [i]: i === 'onChange' ? mergeonChange : Fn
                          }))
                        : [
                              {
                                  [vaild]: vaild === 'onChange' ? mergeonChange : Fn
                              }
                          ])
                )
            )
        })
    }

    useEffect(() => {
        const [val] = Object.values(elProps)
        valRef.current = val
        const Fn = () => {
            setTimeout(() => {
                console.log(elProps, valRef, 'elProps 1996', rulelist)
                const result = rulelist?.some(rule => {
                    const [fn, msg] = rule
                    if (!fn) {
                        return false
                    }
                    // const ruleIsError = fn(valRef.current)
                    // if (ruleIsError) {
                    //     setErrorMsg(msg)
                    // }
                    // return ruleIsError

                    return fn(valRef.current) && !setErrorMsg(msg)
                })

                setHasError(result)
            })
        }
        dispatChvalis(validList, Fn).then(res => {
            setFormItemvalid(res)
        })
    }, [elProps])

    useEffect(() => {
        if (hasError && errRef.current) {
            errRef.current.onanimationend = () => {
                setIsAnimaing(hasError)
            }
        }
    }, [hasError])

    // console.log((hasError || isAnimaing) && 'render')
    return (
        <Row className={rowClass}>
            {label && (
                <Col className="label-control" {...labelCol}>
                    <label className={labelClassName}>{label}</label>
                </Col>
            )}
            <Col {...wrapperCol}>
                <div className="ant-form-item-control-input">
                    {cloneElement(children, {
                        ...elProps,
                        onChange: e => dispatchFormValue(e),
                        ...formItemvalid
                    })}
                </div>
                {(hasError || isAnimaing) && (
                    <div
                        ref={errRef}
                        className={`ant-form-item-${hasError ? 'show' : 'hiddens'} ant-form-item-explain-connected`}
                    >
                        <div role="alert" className="ant-form-item-explain-error">
                            {errorMsg}
                        </div>
                    </div>
                )}
            </Col>
        </Row>
    )
})

//包裹组件 避免context变更多次渲染不应渲染的FormItem组件
const FormItemWarp = props => {
    const [valueProp, setValueProp] = useState('value')
    const {
        requiredMark,
        labelCol: contextLabelCol,
        wrapperCol: contextWrapperCol,
        initialValues,
        validateTrigger: contextValidateTrigger,
        labelAlign: contextLabelAlign,
        colon: contextColon
    } = useContext(FormContext)
    const {
        name,
        children,
        valuePropName,
        label,
        labelAlign,
        dispatchforminitialvalues,
        initialValue,
        validateTrigger,
        rules,
        colon
    } = props
    const [labelCol, wrapperCol] = [props.labelCol || contextLabelCol, props.wrapperCol || contextWrapperCol]
    const dispatchFormValue = useCallback(
        value =>
            new Promise((resolve, _) => {
                const result = eventType[valuePropName](value)
                dispatchforminitialvalues(name, result)
                resolve(result)
            }).then(val => setState(val)),
        [valuePropName]
    )

    const [state, setState] = useState(initialValue || initialValues?.[name])

    //  初始化initialValues
    useEffect(() => {
        if (initialValue !== undefined) {
            dispatchforminitialvalues(name, initialValue)
        }
    }, [])

    const elProps = useMemo(
        () =>
            !name
                ? {}
                : {
                      [valuePropName || valueProp]: state
                  },
        [name, valuePropName, valueProp, state]
    )

    //验证列表
    const rulelist = rules?.map(rule => {
        const { message, ...otherRule } = rule
        const [fnName] = Object.keys(otherRule)
        // console.log(rule, fnName)
        switch (fnName) {
            case 'required': {
                if (rule[fnName]) return [handleRule?.[fnName], message]
            }
            case 'max':
                return [handleRule?.[fnName](rule[fnName]), message]

            case 'min':
                return [handleRule?.[fnName](rule[fnName]), message]

            default:
                return [handleRule?.[fnName], message]
        }
        console.log(message, fnName)
    })
    // console.log(rulelist, 'rulelist')
    //注入触发时机
    const validList = validateTrigger?.length ? validateTrigger : contextValidateTrigger

    const formItemProps = {
        label,
        requiredMark,
        dispatchFormValue,
        labelCol,
        wrapperCol,
        elProps,
        validList,
        rulelist,
        labelAlign: labelAlign || contextLabelAlign,
        colon: colon || contextColon
    }

    return (
        <>
            <FormItem {...formItemProps}>{children}</FormItem>
        </>
    )
}

FormItemWarp.propsType = {}
FormItemWarp.displayName = 'Form.Item'
FormItemWarp.defaultProps = {
    // colon	配合 label 属性使用，表示是否显示 label 后面的冒号	boolean	true
    // dependencies	设置依赖字段，说明见下	NamePath[]	-
    // extra	额外的提示信息，和 help 类似，当需要错误信息和提示文案同时出现时，可以使用这个。	ReactNode	-
    // getValueFromEvent	设置如何将 event 的值转换成字段值	(..args: any[]) => any	-
    // getValueProps	为子元素添加额外的属性	(value: any) => any	-	4.2.0
    // hasFeedback	配合 validateStatus 属性使用，展示校验状态图标，建议只配合 Input 组件使用	boolean	false
    // help	提示信息，如不设置，则会根据校验规则自动生成	ReactNode	-
    // hidden	是否隐藏字段（依然会收集和校验字段）	boolean	false	4.4.0
    // htmlFor	设置子元素 label htmlFor 属性	string	-
    // initialValue	设置子元素默认值，如果与 Form 的 initialValues 冲突则以 Form 为准	string	-	4.2.0
    // labelCol	label 标签布局，同 <Col> 组件，设置 span offset 值，如 {span: 3, offset: 12} 或 sm: {span: 3, offset: 12}。你可以通过 Form 的 labelCol 进行统一设置，，不会作用于嵌套 Item。当和 Form 同时设置时，以 Item 为准	object	-
    // messageVariables	默认验证字段的信息	Record<string, string>	-	4.7.0
    // name	字段名，支持数组	NamePath	-
    // normalize	组件获取值后进行转换，再放入 Form 中。不支持异步	(value, prevValue, prevValues) => any	-
    // noStyle	为 true 时不带样式，作为纯字段控件使用	boolean	false
    // preserve	当字段被删除时保留字段值	boolean	true	4.4.0
    // required	必填样式设置。如不设置，则会根据校验规则自动生成	boolean	false
    // rules	校验规则，设置字段的校验逻辑。点击此处查看示例	Rule[]	-
    // shouldUpdate	自定义字段更新逻辑，说明见下	boolean | (prevValue, curValue) => boolean	false
    // tooltip	配置提示信息	ReactNode | TooltipProps & { icon: ReactNode }	-	4.7.0
    // trigger	设置收集字段值变更的时机。点击此处查看示例	string	onChange
    // validateFirst	当某一规则校验不通过时，是否停止剩下的规则的校验。设置 parallel 时会并行校验	boolean | parallel	false	parallel: 4.5.0
    // validateStatus	校验状态，如不设置，则会根据校验规则自动生成，可选：'success' 'warning' 'error' 'validating'	string	-
    validateTrigger: [], //设置字段校验的时机	string | string[]	onChange
    valuePropName: 'value' //	子节点的值的属性，如 Switch 的是 'checked'。该属性为 getValueProps 的封装，自定义 getValueProps 后会失效	string	value
    // wrapperCol	需要为输入控件设置布局样式时，使用该属性，用法同 labelCol。你可以通过 Form 的 wrapperCol 进行统一设置，不会作用于嵌套 Item。当和 Form 同时设置时，以 Item 为准	object
}

export default class Form extends Component {
    static Item = FormItemWarp
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
        validateMessages: PropTypes.object, //验证提示模板，说明见下	ValidateMessages	-
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
        component: 'form', //	设置 Form 渲染元素，为 false 则不创建 DOM 节点	ComponentType | false	form
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
        validateMessages: {
            required: "'${name}' 是必选字段"
        }, //	验证提示模板，说明见下	ValidateMessages
        validateTrigger: [], //统一设置字段触发验证的时机
        wrapperCol: { span: 3, offset: 12 }, //	需要为输入控件设置布局样式时，使用该属性，用法同 labelCol,
        onFieldsChange: () => {
            console.log('')
        }, //字段更新时触发回调事件	function(changedFields, allFields)
        onFinish: value => {
            console.log('Success', value)
        }, //提交表单且数据验证成功后回调事件	function(values)
        onFinishFailed: () => {
            console.log('')
        }, //提交表单且数据验证失败后回调事件	function({ values, errorFields, outOfDate })
        onValuesChange: () => {
            console.log('')
        } //字段值更新时触发回调事件    function(changedValues, allValues)
    }

    constructor(props) {
        super(props)
        this.state = {
            ...props.initialValues
        }
    }

    dispatchforminitialvalues = (name, value) => {
        if (!name) {
            return
        }
        // console.log(this.state, 'initialValues >>>')
        this.setState({ [name]: value })
    }

    onSubmit = e => {
        const { onFinish } = this.props
        onFinish(this.state)
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
            labelCol,
            labelAlign,
            layout,
            requiredMark,
            preserve,
            scrollToFirstError,
            size,
            validateMessages,
            validateTrigger,
            wrapperCol,
            onFieldsChange,
            onFinish,
            onFinishFailed,
            onValuesChange,
            children,
            ...otherProps
        } = this.props
        const { dispatchforminitialvalues, onSubmit } = this
        const formClassName = classNames(
            'ant-form',
            { [`ant-form-${size}`]: size !== 'middle' },
            { [`ant-form-${layout}`]: layout }
        )
        // console.log(this.props)
        return (
            <FormContext.Provider
                value={{
                    ...this.props,
                    initialValues: this.state
                }}
            >
                {createElement(
                    component || Fragment,
                    component
                        ? {
                              id: id || name,
                              className: formClassName,
                              ...otherProps,
                              onSubmit: onSubmit
                          }
                        : {},
                    React.Children.map(children, child => cloneElement(child, { dispatchforminitialvalues }))
                )}
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
