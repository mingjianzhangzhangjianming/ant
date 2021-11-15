import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled, { keyframes } from 'styled-components'

const clickAnimate = keyframes`
    from {
        outline: 1px solid;
    }
    to {
        opacity: 0.5;
        outline: 6px solid;
    }
    /* from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(180deg);
  } */
`
const ButtonStyle = styled.button.attrs({})`
    position: relative;
    display: inline-block;
    height: 32px;
    padding: 4px 12px;
    border-radius: 2px;
    touch-action: manipulation;
    user-select: none;
    white-space: nowrap;
    font-size: 14px;
    font-weight: 400;
    border: 1px solid #d9d9d9;
    line-height: 1.5;
    cursor: pointer;
    border: 1px solid ${props => props.theme.default.main};
    color: #fff;
    background-image: none;
    background-color: ${props => props.theme.default.main};
    text-shadow: 0 -1px 0 rgb(0 0 0 / 12%);
    box-shadow: 0 2px #0000000b;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    &::not([disabled]) {
        outline: none;
    }
    &:hover {
        border-color: ${props => props.theme.default.hover};
        background-color: ${props => props.theme.default.hover};
    }
    &:active {
        outline: none;
        border-color: ${props => props.theme.default.active};
        background-color: ${props => props.theme.default.active};
    }
    &[ant-click-animating-without-extra-node='true']::after {
        position: absolute;
        content: '';
        display: block;
        /* box-shadow: 0 0 0 0 #afa0a00b; */
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        border-radius: inherit;
        opacity: 0.2;
        outline: ${props => props.theme.default.hover} solid 8px;
        /* background-color: ${props => props.theme.default.hover}; */
        pointer-events: none;
        animation: ${clickAnimate} 2s cubic-bezier(0.08, 0.82, 0.17, 1) forwards;
    }
    & > span {
    }
`
export default class Button extends Component {
    static propTypes = {
        block: PropTypes.bool, //将按钮宽度调整为其父宽度的选项
        danger: PropTypes.bool, //设置危险按钮
        disabled: PropTypes.bool, //按钮失效状态
        ghost: PropTypes.bool, //幽灵属性，使按钮背景透明
        href: PropTypes.string, //点击跳转的地址，指定此属性 button 的行为和 a 链接一致
        htmlType: PropTypes.string, //设置 button 原生的 type 值，可选值请参考 HTML 标准	string	button
        icon: PropTypes.element, //设置按钮的图标组件
        loading: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape({ delay: PropTypes.number })]), //设置按钮载入状态	boolean | { delay: number }	false
        shape: PropTypes.string, //设置按钮形状	default | circle | round	'default'
        size: PropTypes.string, //设置按钮大小	large | middle | small	middle
        target: PropTypes.string, //相当于 a 链接的 target 属性，href 存在时生效	string	-
        type: PropTypes.string, //设置按钮类型	primary | ghost | dashed | link | text | default	default
        onClick: PropTypes.func //点击按钮时的回调	(event) => void,
    }

    static defaultProps = {
        block: false,
        danger: false,
        disabled: false,
        ghost: false,
        htmlType: 'button',
        loading: false,
        shape: 'default',
        size: 'middle',
        type: 'default'
    }

    constructor(props) {
        super(props)
        this.state = {}
        this.btnRef = React.createRef(null)
        console.log(props)
    }

    animatingNode = () => {
        if (this.timer) {
            clearTimeout(this.timer)
        }
        this.btnRef.current.setAttribute('ant-click-animating-without-extra-node', true)
        this.timer = setTimeout(() => {
            // this.btnRef.current.setAttribute('ant-click-animating-without-extra-node', false)
        }, 2000)
        console.dir(this.btnRef.current)
    }

    componentDidMount() {
        this.btnRef.current.addEventListener('click', this.animatingNode)
    }

    componentWillUnmount() {
        this.btnRef.current.removeEventListener('click', this.animatingNode)
    }
    render() {
        return (
            <ButtonStyle ref={this.btnRef} onClick={this.props.onClick}>
                <span>{this.props.children}</span>
            </ButtonStyle>
        )
    }
}
//

// 属性	说明	类型	默认值	版本
// block	将按钮宽度调整为其父宽度的选项	boolean	false
// danger	设置危险按钮	boolean	false
// disabled	按钮失效状态	boolean	false
// ghost	幽灵属性，使按钮背景透明	boolean	false
// href	点击跳转的地址，指定此属性 button 的行为和 a 链接一致	string	-
// htmlType	设置 button 原生的 type 值，可选值请参考 HTML 标准	string	button
// icon	设置按钮的图标组件	ReactNode	-
// loading	设置按钮载入状态	boolean | { delay: number }	false
// shape	设置按钮形状	default | circle | round	'default'
// size	设置按钮大小	large | middle | small	middle
// target	相当于 a 链接的 target 属性，href 存在时生效	string	-
// type	设置按钮类型	primary | ghost | dashed | link | text | default	default
// onClick	点击按钮时的回调	(event) => void	-
