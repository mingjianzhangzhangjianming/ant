import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import classNames from 'classnames'
import Button from './Button'

const scale = {
    default: 378,
    large: 736
}

const DrawerStyle = styled.div`
    &.ant-drawer {
        position: fixed;
        width: 100%;
        height: 100%;
    }
    &.ant-drawer.ant-drawer-left,
    &.ant-drawer.ant-drawer-right {
        top: 0;
        width: 0;
    }
    &.ant-drawer.ant-drawer-top,
    &.ant-drawer.ant-drawer-bottom {
        left: 0;
        height: 0;
    }
    &.ant-drawer-left .drawer-wrapper,
    &.ant-drawer-right .drawer-wrapper {
        top: 0;
        width: ${props => `${props.width || scale[props.size]}px`};
        height: 100%;
    }
    &.ant-drawer-left .drawer-wrapper {
        transform: translateX(-100%);
    }
    &.ant-drawer-right .drawer-wrapper {
        transform: translateX(100%);
    }
    &.ant-drawer-top .drawer-wrapper,
    &.ant-drawer-bottom .drawer-wrapper {
        left: 0;
        width: 100%;
        height: ${props => `${props.height || scale[props.size]}px`};
    }
    &.ant-drawer-top .drawer-wrapper {
        transform: translateY(-100%);
    }
    &.ant-drawer-bottom .drawer-wrapper {
        transform: translateY(100%);
    }
    &.ant-drawer.ant-drawer-open {
        width: 100%;
        height: 100%;
        z-index: ${props => props.zIndex || 1000};
    }
    &.ant-drawer-open > .drawer-mask {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        height: 100%;
        opacity: 1;
    }
    &.ant-drawer-open > .drawer-wrapper {
        box-shadow: 6px 0 16px -8px #00000014, 9px 0 28px #0000000d, 12px 0 48px 16px #00000008;
        /* background: #fff; */
        transform: translate(0, 0);
    }
    .drawer-wrapper {
        position: absolute;
        background: #fff;
        transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.3s cubic-bezier(0.23, 1, 0.32, 1);
        & > .drawer-wrapper-content {
            display: flex;
            flex-flow: column nowrap;
            width: 100%;
            height: 100%;
            background-color: #fff;
            .wrapper-header-box {
                position: relative;
                z-index: 1;
                font-size: 16px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 16px 24px;
                color: #000000d9;
                border-bottom: 1px solid #f0f0f0;
                border-radius: 2px 2px 0 0;
                .wrapper-header-title {
                    margin: 0;
                    color: #000000d9;
                    font-weight: 500;
                    font-size: 16px;
                    line-height: 22px;
                    flex: 1;
                }
                .wrapper-header-extra {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }
            }

            .drawer-wrapper-body {
                flex-grow: 1;
                padding: 24px;
                overflow: auto;
                font-size: 14px;
                line-height: 1.5715;
                word-wrap: break-word;
            }
            .drawer-wrapper-footer {
                flex-shrink: 0;
                padding: 10px 16px;
                border-top: 1px solid #f0f0f0;
            }
        }
    }
`

const Mask = styled.div`
    height: 0;
    background-color: #00000073;
    opacity: 0;
    transition: opacity 0.36s linear;
`

//默认关闭Icon
const CloseOutlinedStyle = styled.span.attrs(() => ({
    role: 'img',
    ariaLabel: 'close'
}))`
    font-size: 16px;
    display: inline-block;
    color: #00000073;
    font-style: normal;
    line-height: 0;
    text-align: center;
    text-transform: none;
    vertical-align: -0.125em;
    text-rendering: optimizeLegibility;
    cursor: pointer;
    &:hover {
        color: #000000bf;
    }
`

const CloseOutlined = () => {
    return (
        <CloseOutlinedStyle>
            <svg
                viewBox="64 64 896 896"
                focusable="false"
                data-icon="close"
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
            >
                <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path>
            </svg>
        </CloseOutlinedStyle>
    )
}

export default class Drawer extends Component {
    static propTypes = {
        visible: PropTypes.bool,
        placement: PropTypes.string,
        mask: PropTypes.bool, //是否展示遮罩
        maskClosable: PropTypes.bool, //点击蒙层是否允许关闭
        maskStyle: PropTypes.object, //遮罩样式,
        footerStyle: PropTypes.object,
        headerStyle: PropTypes.object,
        onClose: PropTypes.func,
        closeIcon: PropTypes.element,
        closable: PropTypes.bool,
        destroyOnClose: PropTypes.bool,
        extra: PropTypes.element,
        footer: PropTypes.element,
        zIndex: PropTypes.number,
        size: PropTypes.string,
        keyboard: PropTypes.bool
        /* getContainer: PropTypes.oneOfType([PropTypes.node, PropTypes.bool, PropTypes.func]) */
    }

    static defaultProps = {
        closable: true,
        visible: true,
        placement: 'right',
        mask: true,
        maskClosable: true,
        closeIcon: <CloseOutlined />,
        destroyOnClose: false,
        zIndex: 1000,
        size: 'default',
        keyboard: true,
        extra: (
            <>
                <Button type="text" size="small" style={{ marginRight: 12 }}>
                    Cancel
                </Button>
                <Button type="primary">OK</Button>
            </>
        )
    }

    constructor(props) {
        super(props)
        this.state = {
            maskIsClose: !this.props.visible
        }
        this.el = document.createElement('div')
        this.el.tabIndex = -1
    }

    handleKeyDown = e => {
        console.log(4545)
    }

    componentDidMount() {
        /* console.log(this.props.getContainer()) */
        document.body.appendChild(this.el)
    }

    componentDidUpdate(prevProps) {
        if (prevProps.visible !== this.props.visible) {
            document.body.style = this.props.visible ? 'overflow: hidden; touch-action: none;' : ''
        }
    }

    componentWillUnmount() {
        document.body.removeChild(this.el)
    }

    render() {
        const {
            className,
            closable,
            visible,
            placement,
            title,
            children,
            onClose,
            mask,
            maskClosable,
            closeIcon,
            headerStyle,
            bodyStyle,
            maskStyle,
            contentWrapperStyle,
            footerStyle,
            destroyOnClose,
            extra,
            footer,
            ...otherProps
        } = this.props
        const classList = classNames(
            'ant-drawer',
            `ant-drawer-${placement}`,
            {
                'ant-drawer-open': visible
            },
            className
        )
        const onCloseIcon = maskClosable ? onClose : null
        return ReactDOM.createPortal(
            <DrawerStyle onKeyUp={this.handleKeyDown} className={classList} {...otherProps} style={{ [placement]: 0 }}>
                {mask && <Mask className="drawer-mask" style={maskStyle} onClick={onCloseIcon} />}
                <div className="drawer-wrapper" style={{ ...contentWrapperStyle, [placement]: 0 }}>
                    <div className="drawer-wrapper-content">
                        <div className="drawer-wrapper-header" style={headerStyle}>
                            <div className="wrapper-header-box">
                                {closable && (
                                    <Button
                                        style={{ height: 'auto', padding: 0, marginRight: 12 }}
                                        onClick={onClose}
                                        type="text"
                                        btnTransform={false}
                                        icon={closeIcon}
                                    />
                                )}
                                <div className="wrapper-header-title">{title}</div>
                                <div className="wrapper-header-extra">{extra}</div>
                            </div>
                        </div>
                        <div className="drawer-wrapper-body" style={bodyStyle}>
                            {(destroyOnClose && !visible) || children}
                        </div>
                        <div className="drawer-wrapper-footer" style={footerStyle}>
                            {footer}
                        </div>
                    </div>
                </div>
            </DrawerStyle>,
            this.el
        )
    }
}

/* autoFocus	抽屉展开后是否将焦点切换至其 Dom 节点	boolean	true	4.17.0
afterVisibleChange	切换抽屉时动画结束后的回调	function(visible)	-	
forceRender	预渲染 Drawer 内元素	boolean	false	
getContainer	指定 Drawer 挂载的 HTML 节点, false 为挂载在当前 dom	HTMLElement | () => HTMLElement | Selectors | false	body	
keyboard	是否支持键盘 esc 关闭	boolean	true	
push	用于设置多层 Drawer 的推动行为	boolean | { distance: string | number }	{ distance: 180 }	4.5.0+ */
