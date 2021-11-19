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

const SwitchWrap = styled.button.attrs(props => ({
    role: 'switch',
    disabled: props.disabled
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

    & > .switch-handle {
        position: absolute;
        left: 2px;
        width: 18px;
        height: 18px;
        transition: all 0.24s ease-in-out;
        &::after {
            content: '';
            position: absolute;
            inset: 0;
            background-color: #fff;
            border-radius: 9px;
            box-shadow: 0 2px 4px #00230b33;
            transition: all 0.2s ease-in-out;
        }
    }
    & > .switch-inner {
        font-size: 12px;
        color: #fff;
        margin-right: 6px;
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
        onClick: PropTypes.func
    }

    static defaultProps = {
        autoFocus: false,
        defaultChecked: false,
        disabled: false,
        loading: false,
        size: 'default'
    }

    constructor(props) {
        super(props)
        this.state = {
            isChecked: typeof this.props.checked === 'undefined' ? this.props.defaultChecked : this.props.checked
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
                isChecked: typeof this.props.checked === 'undefined' ? !prevState.isChecked : prevState.isChecked
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
        const { size, className, disabled, checkedChildren, unCheckedChildren } = this.props
        const { isChecked } = this.state
        const switchClass = classNames(className, { 'switch-checked': isChecked, 'switch-disabled': disabled })
        return (
            <SwitchWrap className={switchClass} onClick={this.handleSwitchClick} disabled={disabled} size={size}>
                <div className="switch-handle"></div>
                <span className="switch-inner">{isChecked ? checkedChildren : unCheckedChildren}</span>
            </SwitchWrap>
        )
    }
}
