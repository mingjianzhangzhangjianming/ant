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
            // screenWidth: this.matcheScreen(0)
            screenWidth: this.matcheScreen(window.innerWidth || document.body.clientWidth)
        }
    }

    resize = e => {
        const screenWidth = this.matcheScreen(window.innerWidth || document.body.clientWidth)
        this.setState({ screenWidth })
    }

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
                return [indexOfSize(gutter[0][0]), indexOfSize(gutter[1])[0]]
            } else {
                return indexOfSize(gutter)
            }
        }
    }

    matcheScreen = screenW => screenSize.find((item, index) => screenW < item.size)?.span || 'xxl'

    componentDidMount() {
        window.addEventListener('resize', this.resize)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resize)
    }

    render() {
        const { screenWidth } = this.state
        const { style, align, gutter, justify, wrap, children } = this.props
        const offset = this.computeOffset(gutter, screenWidth)
        console.log(offset)
        const rowClass = classNames('row', {
            [`row-${align}`]: align,
            [`row-${justify}`]: justify,
            'row-nowrap': !wrap
        })
        return (
            <RowContext.Provider value={{ screen: screenWidth }}>
                <RowContext.Consumer>
                    {({ screen }) => {
                        console.log(screen)
                        return (
                            <div className={rowClass} style={style}>
                                {children}
                                {this.state.screenWidth}
                            </div>
                        )
                    }}
                </RowContext.Consumer>
            </RowContext.Provider>
        )
    }
}

export class Col extends Component {
    render() {
        const { children, span } = this.props
        const colClass = classNames('col', `col-${span}`)
        return (
            <RowContext.Consumer>
                {({ screen }) => {
                    return (
                        <div className={colClass}>
                            {children}
                            {screen}
                        </div>
                    )
                }}
            </RowContext.Consumer>
        )
    }
}
