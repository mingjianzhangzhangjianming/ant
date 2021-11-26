import React, { Component, createContext } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './index.less'

const InputContext = createContext()

const CloseCircleFilled = (
    <svg
        viewBox="64 64 896 896"
        focusable="false"
        data-icon="close-circle"
        width="1em"
        height="1em"
        fill="currentColor"
        aria-hidden="true"
    >
        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"></path>
    </svg>
)

class InputTextArea extends Component {
    render() {
        return <h2>InputTextArea</h2>
    }
}

class InputPassword extends Component {
    render() {
        return <h2>InputPassword</h2>
    }
}

class InputSearch extends Component {
    render() {
        return <h2>InputSearch</h2>
    }
}

const InputFixComponent = () => {
    return (
        <InputContext.Consumer>
            {({
                className,
                saveInput,
                style,
                id,
                maxLength,
                disabled,
                type,
                value,
                placeholder,
                handleChange,
                handleKeyDown,
                handleFocus,
                handleBlur
            }) => {
                return (
                    <input
                        ref={saveInput}
                        style={style}
                        className={className}
                        id={id}
                        maxLength={maxLength}
                        disabled={disabled}
                        type={type}
                        value={value}
                        placeholder={placeholder}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    />
                )
            }}
        </InputContext.Consumer>
    )
}
class InputWrapComponent extends Component {
    static contextType = InputContext

    render() {
        const { style, size, bordered, allowClear, prefix, suffix, isFocus, clearValue, ...otherContext } = this.context
        const len = this.context.value.length !== 0
        const wrapClass = classNames('input-affix-wrapper', {
            'input-affix-wrapper-focus': isFocus,
            'input-affix-wrapper-bordered': !bordered,
            [`input-affix-wrapper-${size}`]: size,
            [`input-affix-wrapper-disabled`]: this.context.disabled
        })

        return (
            <>
                {allowClear || prefix || suffix ? (
                    //Provider 逐级消费value
                    <InputContext.Provider value={{ ...otherContext }}>
                        <span style={style} className={wrapClass}>
                            {prefix && <span className="input-prefix">{prefix}</span>}
                            <InputFixComponent />
                            {len && (
                                <span
                                    className="allow-clear-suffix"
                                    role="button"
                                    aria-label="close-circle"
                                    tabIndex="-1"
                                    onClick={clearValue}
                                >
                                    {CloseCircleFilled}
                                </span>
                            )}
                            {suffix && <span className="input-suffix">{suffix}</span>}
                        </span>
                    </InputContext.Provider>
                ) : (
                    <InputFixComponent />
                )}
            </>
        )
    }
}

const WrapInput = WrappedComponent => {
    return class extends WrappedComponent {
        static displayName = 'HOCWrapInput'
        static context = InputContext
        render() {
            const { style, bordered, addonAfter, addonBefore } = this.context
            const groupClass = classNames('input-group-wraper', {
                'input-group-wraper-bordered': !bordered
            })
            if (addonAfter || addonBefore) {
                this.context.style = null //HOC中context无法通过Provider组件设置value
                return (
                    <span style={style} className={groupClass}>
                        <span className="input-flex-wraper">
                            {addonAfter && <span className="input-group-addon">{addonAfter}</span>}
                            {super.render()}
                            {addonBefore && <span className="input-group-addon">{addonBefore}</span>}
                        </span>
                    </span>
                )
            }
            return super.render()
        }
    }
}

const InputChild = WrapInput(InputWrapComponent)

export default class Input extends Component {
    static TextArea = InputTextArea
    static Password = InputPassword
    static Search = InputSearch
    static propTypes = {
        addonAfter: PropTypes.element,
        addonBefore: PropTypes.element,
        allowClear: PropTypes.bool,
        bordered: PropTypes.bool,
        defaultValue: PropTypes.string,
        disabled: PropTypes.bool,
        id: PropTypes.string,
        maxLength: PropTypes.number,
        prefix: PropTypes.element,
        size: PropTypes.oneOf(['large', 'middle', 'small']),
        suffix: PropTypes.element,
        type: PropTypes.string,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        onChange: PropTypes.func,
        onPressEnter: PropTypes.func
    }

    static defaultProps = {
        bordered: true,
        disabled: false,
        type: 'text',
        size: 'middle'
    }

    state = {
        value: typeof this.props.value === 'undefined' ? this.props.defaultValue : this.props.value,
        isFocus: false
    }

    saveInput = input => (this.input = input)

    handleKeyDown = e => {
        const { onPressEnter } = this.props
        if (e.keyCode === 13) {
            onPressEnter && onPressEnter(e)
        }
    }

    handleChange = e => {
        const { value } = e.target
        const { onChange } = this.props
        this.setState({ value }, () => onChange && onChange(e))
    }

    handleFocus = () => {
        this.setState({ isFocus: true })
    }

    handleBlur = () => {
        this.setState({ isFocus: false })
    }

    clearValue = e => {
        const { onChange } = this.props
        this.setState({ value: '' }, () => {
            if (onChange && e.type === 'click') {
                const event = Object.create(e)
                event.target = event.currentTarget = this.input
                onChange(event)
            }
        })
    }

    select = {
        all: () => this.input.select()
    }

    blur = () => {
        this.input.blur()
    }

    focus = ({ cursor }) => {
        const el = this.input
        el.focus()
        this.select[cursor] && this.select[cursor]()
        var len = el.value.length
        switch (cursor) {
            case 'start':
                el.setSelectionRange(0, 0)
                break

            case 'end':
                el.setSelectionRange(len, len)
                break

            default:
                el.setSelectionRange(0, len)
        }
    }

    componentDidUpdate(prevProps) {
        let { value } = this.props
        if (prevProps.value !== value) {
            value = typeof value === 'undefined' ? '' : value
            this.setState({ value })
        }
    }

    render() {
        const { className, bordered, disabled, size } = this.props
        const inputClass = classNames('input', className, {
            'input-not-bordered': !bordered,
            'input-disabled': disabled,
            [`input-${size}`]: size !== 'middle'
        })
        return (
            <InputContext.Provider
                value={{
                    ...this.props,
                    ...this.state,
                    className: inputClass,
                    saveInput: this.saveInput,
                    handleChange: this.handleChange,
                    handleKeyDown: this.handleKeyDown,
                    handleFocus: this.handleFocus,
                    handleBlur: this.handleBlur,
                    clearValue: this.clearValue
                }}
            >
                <InputChild />
            </InputContext.Provider>
        )
    }
}
