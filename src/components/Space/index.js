import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './index.less'

const spaceSize = {
    small: 12,
    middle: 16,
    large: 24
}

export default class Space extends Component {
    static propTypes = {
        align: PropTypes.oneOf(['start', 'end', 'center', 'baseline']),
        direction: PropTypes.oneOf(['vertical', 'horizontal']),
        size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        split: PropTypes.element,
        wrap: PropTypes.bool //是否自动换行，仅在 horizontal 时有效
    }

    static defaultProps = {
        align: 'start',
        direction: 'horizontal',
        size: 'small',
        wrap: false
    }
    render() {
        const { style, align, direction, size, split, wrap, children } = this.props
        const gapSize = typeof this.props.size === 'string' ? spaceSize[size] : size
        const spaceClass = classNames('space', {
            [`space-${align}`]: align,
            [`space-${direction}`]: direction,
            'space-wrap': wrap
        })
        const childrenCount = React.Children.count(children)
        return (
            <div className={spaceClass} style={{ ...style, gap: gapSize }}>
                {childrenCount === 1
                    ? children
                    : React.Children.map(children, (item, index) =>
                          index + 1 === childrenCount ? (
                              item
                          ) : (
                              <>
                                  {item}
                                  {split}
                              </>
                          )
                      )}
            </div>
        )
    }
}
