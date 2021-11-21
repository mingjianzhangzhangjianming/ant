import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled, { keyframes } from 'styled-components'
import classNames from 'classnames'

const fadeEffect = keyframes`
  0% {
      transform: scale(1);
      filter: blur(0px);
      opacity: 1;
    }
    100% {
      transform: scale(1.2);
      filter: blur(2px);
      opacity: 0;
    }
`
const loadingCircle = keyframes`
    0% {
        transform: rotate(0);
    }
    100% {
        transform: rotate(360deg);
    }
`

const SwitchWrap = styled.button.attrs(props => ({
    role: 'switch',
    disabled: props.disabled,
}))`
    margin: 0;
    padding: 0;
    position: relative;
    box-sizing: border-box;
    font-size: 12px;
    min-width: 44px;
    height: 22px;
    line-height: 22px;
    display: inline-flex;
    align-items: center;
    flex-flow: nowrap row;
    justify-content: flex-end;
    cursor: pointer;
    user-select: none;
    border-radius: 100px;
    background-color: #00000040;
    vertical-align: middle;
    white-space: nowrap;
    border: none;
    outline: none;
    color: #fff;
    &.switch-small {
        min-width: 28px;
        height: 16px;
        line-height: 16px;
        :not(.switch-disabled):active > .switch-handle::after {
            left: 0;
            right: -5px;
        }
        :not(.switch-disabled).switch-checked:active > .switch-handle::after {
            left: -5px;
            right: 0;
        }
    }
    &:focus {
        outline: 0;
        box-shadow: 0 0 0 2px #0000001a;
    }
    &.switch-checked::after {
        content: '';
        position: absolute;
        z-index: -1;
        border-radius: inherit;
        background-color: inherit;
        inset: 0;
        display: block;
        border-radius: inherit;
        box-shadow: 0 0 1px 1px #1890ff;
        opacity: 0.3;
        animation: ${fadeEffect} 1s cubic-bezier(0.165, 0.84, 0.44, 1) both;
        animation-fill-mode: forwards;
        transform: scale(1.16);
        pointer-events: none;
    }
    &.switch-disabled {
        opacity: 0.4;
        cursor: not-allowed;
    }
    &:not(.switch-disabled):active > .switch-handle::after {
        left: 0;
        right: -8px;
    }
    &:not(.switch-disabled).switch-checked:active > .switch-handle::after {
        left: -8px;
        right: 0;
    }

    &.switch-checked {
        background: #1890ff;
        justify-content: flex-start;
        .switch-handle {
            left: calc(100% - 20px);
        }
        .switch-inner {
            margin-left: 6px;
        }
    }
    &.switch-small.switch-checked {
        .switch-handle {
            left: calc(100% - 14px);
        }
        .switch-inner {
            margin-left: 2px;
        }
    }

    & > .switch-handle {
        position: absolute;
        left: 2px;
        width: 18px;
        height: 18px;
        transition: all 0.24s ease-in-out;
        display: flex;
        justify-items: center;
        align-items: center;
        font-size: 16px;
        &::after {
            content: '';
            position: absolute;
            inset: 0;
            background-color: #fff;
            border-radius: 9px;
            box-shadow: 0 2px 4px #00230b33;
            transition: all 0.2s ease-in-out;
        }
        .anticon {
            position: relative;
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2;
            height: 100%;
            color: #1890ff;
            animation: ${loadingCircle} 1s infinite linear;
        }
    }
    &.switch-small > .switch-handle {
        position: absolute;
        left: 2px;
        width: 12px;
        height: 12px;
        transition: all 0.24s ease-in-out;
        display: flex;
        justify-items: center;
        align-items: center;
        font-size: 10px;
        &::after {
            content: '';
            position: absolute;
            inset: 0;
            background-color: #fff;
            border-radius: 6px;
            box-shadow: 0 2px 4px #00230b33;
            transition: all 0.2s ease-in-out;
        }
    }
    & > .switch-inner {
        font-size: 12px;
        color: #fff;
        margin-right: 6px;
    }
    &.switch-small > .switch-inner {
        font-size: 12px;
        color: #fff;
        margin-right: 2px;
        transform: scale(0.6);
    }
`
export default class Switch extends Component {
    static propsTypes = {
        autoFocus: PropTypes.bool,
        checkedChildren: PropTypes.element,
        defaultChecked: PropTypes.bool,
        disabled: PropTypes.bool,
        loading: PropTypes.bool,
        size: PropTypes.oneOf(['small', 'default']),
        unCheckedChildren: PropTypes.element,
        onChange: PropTypes.func,
        onClick: PropTypes.func,
    }

    static defaultProps = {
        autoFocus: false,
        defaultChecked: false,
        disabled: false,
        loading: false,
        size: 'default',
    }

    constructor(props) {
        super(props)
        this.state = {
            isChecked:
                typeof this.props.checked === 'undefined'
                    ? this.props.defaultChecked
                    : this.props.checked,
        }
    }
    componentDidUpdate(nextProps) {
        if (nextProps.checked !== this.props.checked) {
            this.setState({ isChecked: this.props.checked })
        }
    }

    handleSwitchClick = e => {
        const { onClick, onChange } = this.props
        this.setState(
            prevState => ({
                isChecked:
                    typeof this.props.checked === 'undefined'
                        ? !prevState.isChecked
                        : prevState.isChecked,
            }),
            () => {
                if (onChange && typeof onChange === 'function') {
                    onChange(this.state.isChecked, e)
                }
            }
        )
        if (onClick && typeof onClick === 'function') {
            onChange(this.state.isChecked, e)
        }
    }

    render() {
        const { size, className, loading, disabled, checkedChildren, unCheckedChildren } =
            this.props
        const { isChecked } = this.state
        const switchClass = classNames(className, {
            'switch-small': size === 'small',
            'switch-checked': isChecked,
            'switch-disabled': loading || disabled,
        })
        return (
            <SwitchWrap
                className={switchClass}
                onClick={this.handleSwitchClick}
                disabled={loading || disabled}
            >
                <div className="switch-handle">
                    {loading && (
                        <span aria-label="loading" className="anticon">
                            <svg
                                viewBox="0 0 1024 1024"
                                focusable="false"
                                data-icon="loading"
                                width="1em"
                                height="1em"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"></path>
                            </svg>
                        </span>
                    )}
                </div>
                <span className="switch-inner">
                    {isChecked ? checkedChildren : unCheckedChildren}
                </span>
            </SwitchWrap>
        )
    }
}
