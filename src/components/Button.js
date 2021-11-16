import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled, { keyframes } from 'styled-components'
import classNames from 'classnames'

const clickAnimate = keyframes`
    0% {
        outline-width: 4px;
        opacity: 0.2;
        transform: scale(1);
    }
    50% {
        outline-width: 4px;
        opacity: 0.4;
        transform: scale(1.08);
    }
    100% {
        outline-width: 0px;
        opacity: 0.2;
        transform: scale(1);
    }
`
const loadingCircle = keyframes`
    0%{
        transform: rotate(0);
    }
    100%{
        transform: rotate(360deg);
    }
`
const ButtonStyle = styled.button.attrs(props => ({
    type: props.htmlType || 'text'
}))`
    position: relative;
    display: ${props => (props.block ? 'flex' : 'inline-flex')};
    width: ${props => (props.block ? '100%' : 'auto')};
    align-items: center;
    justify-content: space-between;
    height: 32px;
    padding: 4px 12px;
    border-radius: 2px;
    touch-action: manipulation;
    user-select: none;
    white-space: nowrap;
    font-weight: 400;
    border: 1px solid #d9d9d9;
    line-height: 1.5;
    cursor: pointer;
    border: 1px solid #d9d9d9;
    color: #000000d9;
    background-image: none;
    background-color: #fff;
    text-shadow: 0 -1px 0 rgb(0 0 0 / 12%);
    box-shadow: 0 2px #0000000b;
    text-decoration: none;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    &.large {
        height: 40px;
        padding: 6.4px 15px;
        font-size: 16px;
    }
    &.large.round {
        border-radius: 40px;
    }
    &.middle {
        height: 32px;
        padding: 4px 12px;
    }
    &.middle.round {
        border-radius: 32px;
    }
    &.small {
        height: 24px;
        padding: 2 7px;
    }
    &.small.round {
        border-radius: 24px;
    }
    &.circle {
        border-radius: 50%;
    }
    &.ant-btn-primary {
        border: 1px solid ${props => props.theme.default.main};
        color: #fff;
        background-image: none;
        background-color: ${props => props.theme.default.main};
    }
    &.ant-btn-ghost {
        color: #fff;
        border-color: #fff;
        background: transparent;
    }
    &.ant-btn-dashed {
        color: #000000d9;
        border-color: #d9d9d9;
        background: #fff;
        border-style: dashed;
    }
    &.ant-btn-link {
        color: #40a9ff;
        border-color: transparent;
        background: 0 0;
        box-shadow: none;
        transition: none;
    }
    &.ant-btn-link:hover {
        background: none;
        border-color: transparent;
    }
    &.ant-btn-link:active {
        color: #096dd9;
    }
    &.ant-btn-text {
        color: #000000d9;
        border-color: transparent;
        background: 0 0;
        box-shadow: none;
    }
    &.ant-btn-text:hover {
        color: #000000d9;
        background: rgba(0, 0, 0, 0.018);
        border-color: transparent;
    }

    &.ant-danger {
        color: #ff4d4f;
        border-color: #ff4d4f;
    }
    &::not([disabled]) {
        outline: none;
    }
    &[disabled] {
        cursor: not-allowed;
    }
    &:hover {
        border-color: ${props => props.theme.default.hover};
        background-color: #fff;
    }
    &:active {
        outline: none;
        border-color: ${props => props.theme.default.active};
        background-color: #fff;
    }
    & > .anticon + span {
        margin-left: 8px;
    }
    & > .anticon[aria-label='loading'] {
        display: inline-block;
        animation: ${loadingCircle} 0.8s infinite linear;
    }
    &.ant-click-animating::after {
        position: absolute;
        z-index: -1;
        content: '';
        display: block;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        opacity: 0.2;
        border-radius: inherit;
        outline: ${props => props.theme.default.hover} solid 0;
        background: ${props => props.theme.default.hover};
        pointer-events: none;
        transform-origin: center;
        animation: ${props => (props.animation ? clickAnimate : 'none')} 0.72s ease-in-out forwards;
    }
`
export default class Button extends Component {
    static propTypes = {
        block: PropTypes.bool, //将按钮宽度调整为其父宽度的选项
        danger: PropTypes.bool, //设置危险按钮
        disabled: PropTypes.bool, //按钮失效状态
        ghost: PropTypes.bool, //幽灵属性，使按钮背景透明
        href: PropTypes.string, //点击跳转的地址，指定此属性 button 的行为和 a 链接一致
        htmlType: PropTypes.string, //设置 button 原生的 type 值，可选值请参考 HTML 标准
        icon: PropTypes.element, //设置按钮的图标组件
        // loading: PropTypes.string,
        loadIcon: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape({ delay: PropTypes.number })]), //设置按钮载入状态
        shape: PropTypes.string, //设置按钮形状	default | circle | round
        size: PropTypes.string, //设置按钮大小	large | middle | small	middle
        target: PropTypes.string, //相当于 a 链接的 target 属性，href 存在时生效
        type: PropTypes.string, //设置按钮类型	primary | ghost | dashed | link | text | default	default
        onClick: PropTypes.func //点击按钮时的回调	(event) => void,
    }

    static defaultProps = {
        block: false,
        danger: false,
        disabled: false,
        ghost: false,
        loadIcon: false,
        htmlType: 'button',
        shape: 'default',
        size: 'middle',
        type: 'default'
    }

    constructor(props) {
        super(props)
        this.state = {
            animation: false
        }
        this.btnRef = React.createRef(null)
    }

    animatingNode = () => {
        clearTimeout(this.timer)
        this.setState({ animation: true })
        this.timer = setTimeout(() => {
            this.setState({ animation: false })
        }, 800)
    }

    componentDidMount() {
        this.btnRef.current.addEventListener('click', this.animatingNode)
    }

    componentWillUnmount() {
        this.btnRef.current.removeEventListener('click', this.animatingNode)
    }

    render() {
        const { animation } = this.state
        const { children, className, loadIcon, icon, type, danger, size, shape, onClick, ...otherProps } = this.props
        const antClass = classNames(
            className,
            `ant-btn-${type}`,
            {
                'ant-click-animating': animation,
                'ant-danger': danger,
                [shape]: shape !== 'default'
            },
            size
        )
        const tag = this.props.href ? 'a' : 'button'
        return (
            <ButtonStyle
                as={tag}
                className={antClass}
                ref={this.btnRef}
                {...otherProps}
                animation={animation}
                onClick={onClick}
            >
                {loadIcon ? (
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
                ) : (
                    icon
                )}
                <span>{children}</span>
            </ButtonStyle>
        )
    }
}
