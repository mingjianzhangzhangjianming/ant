import { Component, createContext } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './index.less'

const RowContext = createContext()
const screenSize = [
    { span: 'xs', size: 576 },
    { span: 'sm', size: 768 },
    { span: 'md', size: 992 },
    { span: 'lg', size: 1200 },
    { span: 'xl', size: 1600 }
]
const debounce = (fn, wait = 200, immediate = false) => {
    let timer
    console.log(immediate)
    return function () {
        if (timer) {
            clearTimeout(timer)
        }
        // console.log(timer)
        if (immediate) {
            return (timer = setTimeout(() => fn.apply(this, arguments), wait))
        }
        timer = setTimeout(() => fn.apply(this, arguments), wait)
    }
}

const throttle = (fn, delay = 500) => {
    let lastDate = 0
    return function () {
        if (Date.now() - lastDate > delay) {
            fn.apply(this, arguments)
            lastDate = Date.now()
        }
    }
}
export class Row extends Component {
    static propTypes = {
        align: PropTypes.oneOf(['top', 'middle', 'bottom']),
        gutter: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
        justify: PropTypes.oneOf(['start', 'end', 'center', 'space-around', 'space-between']),
        wrap: PropTypes.bool
    }

    static defaultProps = {
        gutter: 0,
        wrap: true
    }

    constructor(props) {
        super(props)
        this.state = {
            screenWidth: this.matcheScreen(window.innerWidth || document.body.clientWidth)
        }
    }

    resize = debounce(
        e => {
            const screenWidth = this.matcheScreen(window.innerWidth || document.body.clientWidth)
            this.setState({ screenWidth })
            console.log(window.innerWidth || document.body.clientWidth)
        },
        100,
        true
    )

    computeOffset = (gutter, screenWidth) => {
        const indexOfSize = obj => {
            if (typeof obj === 'number') {
                return [obj]
            }
            for (let i in obj) {
                if (screenWidth === i) {
                    return [obj[i], 0]
                }
            }
            return [0, 0]
        }
        if (typeof gutter === 'number') {
            return [gutter, 0]
        }
        if (typeof gutter === 'object') {
            if (Array.isArray(gutter)) {
                return [indexOfSize(gutter[0])[0], indexOfSize(gutter[1])[0]]
            } else {
                return indexOfSize(gutter)
            }
        }
    }

    matcheScreen = screenW => screenSize.find((item, index) => screenW < item.size)?.span || 'xxl'

    componentDidMount() {
        console.log(this.resize)
        window.addEventListener('resize', this.resize)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resize)
    }

    render() {
        const { screenWidth } = this.state
        const { style, align, gutter, justify, wrap, children } = this.props
        const offset = this.computeOffset(gutter, screenWidth)
        const rowClass = classNames('row', {
            [`row-${align}`]: align,
            [`row-${justify}`]: justify,
            'row-nowrap': !wrap
        })
        return (
            <RowContext.Provider value={{ screen: screenWidth, offset }}>
                <RowContext.Consumer>
                    {({ screen, offset }) => {
                        // console.log(screen, offset, `0 ${offset[0]}`)
                        return (
                            <div
                                className={rowClass}
                                style={{ ...style, margin: `0 -${offset[0] / 2}px`, rowGap: offset[1] }}
                            >
                                {children}
                            </div>
                        )
                    }}
                </RowContext.Consumer>
            </RowContext.Provider>
        )
    }
}

export class Col extends Component {
    static propTypes = {
        flex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        offset: PropTypes.number,
        order: PropTypes.number,
        pull: PropTypes.number,
        push: PropTypes.number
    }

    static defaultProps = {
        offset: 0,
        order: 0,
        pull: 0,
        push: 0
    }

    static contextType = RowContext

    render() {
        const { screen, offset } = this.context
        const { children, flex, style, [screen]: dynamicLayout } = this.props
        const span = typeof dynamicLayout === 'number' ? dynamicLayout : dynamicLayout?.span || this.props.span
        const order = dynamicLayout?.order || this.props?.order
        const offsetX = dynamicLayout?.offset || this.props?.offset
        const push = dynamicLayout?.push || this.props?.push
        const pull = dynamicLayout?.pull || this.props?.pull
        const colClass = classNames('col', {
            [`col-${span}`]: span === 0 || span,
            [`col-order-${order}`]: order,
            [`col-offset-${offsetX}`]: offsetX,
            [`col-push-${push}`]: push,
            [`col-pull-${pull}`]: pull
        })
        return (
            <div className={colClass} style={{ ...style, padding: `0 ${offset[0] / 2}px`, flex }}>
                {children}
                {/* {screen} */}
            </div>
        )
    }
}
