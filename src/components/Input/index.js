import React, { Component, createContext } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './index.less'

const InputContext = createContext()

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

class InputComponent extends Component {
    static contextType = InputContext

    render() {
        const {
            inputRef,
            disabled,
            value,
            size,
            maxLength,
            id,
            className,
            style,
            type,
            bordered,
            placeholder,
            handleChange,
            handleKeyDown,
            allowClear,
            prefix,
            suffix
        } = this.context
        const wrapClass = classNames('input-affix-wrapper', {
            [`input-affix-wrapper-${size}`]: size
        })
        const inputClass = classNames('input', className, {
            'input-not-bordered': !bordered,
            'input-disabled': disabled,
            [`input-${size}`]: size !== 'middle'
        })
        return (
            <>
                {allowClear || prefix || suffix ? (
                    <span className={wrapClass}>
                        {prefix && (
                            <span className="input-prefix" style={{ marginRight: 4 }}>
                                {prefix}
                            </span>
                        )}
                        <input
                            ref={inputRef}
                            className={inputClass}
                            id={id}
                            maxLength={maxLength}
                            disabled={disabled}
                            type={type}
                            style={style}
                            value={value}
                            placeholder={placeholder}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                        />
                        {suffix && (
                            <span className="input-suffix" style={{ marginLeft: 4 }}>
                                {suffix}
                            </span>
                        )}
                    </span>
                ) : (
                    <input
                        ref={inputRef}
                        className={inputClass}
                        id={id}
                        maxLength={maxLength}
                        disabled={disabled}
                        type={type}
                        style={style}
                        value={value}
                        placeholder={placeholder}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                    />
                )}
            </>
        )
    }
}

const WrapInput = WrappedComponent => {
    return class extends WrappedComponent {
        static context = InputContext
        render() {
            const { addonAfter, addonBefore, allowClear, prefix, suffix } = this.context
            if (addonAfter || addonBefore) {
                return (
                    <span className="input-group-wraper">
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

const InputChild = WrapInput(InputComponent)

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
        value: typeof this.props.value === 'undefined' ? this.props.defaultValue : this.props.value
    }

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

    componentDidUpdate(prevProps) {
        let { value } = this.props
        if (prevProps.value !== value) {
            value = typeof value === 'undefined' ? '' : value
            this.setState({ value })
        }
    }

    render() {
        return React.forwardRef((props, ref) => (
            <InputContext.Provider
                value={{
                    ...props,
                    inputRef: ref,
                    value: this.state.value,
                    handleChange: this.handleChange,
                    handleKeyDown: this.handleKeyDown
                }}
            >
                <InputChild />
            </InputContext.Provider>
        ))
    }
}
