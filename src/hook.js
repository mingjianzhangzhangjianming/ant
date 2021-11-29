import { Component, useState, useEffect, useCallback, useRef } from 'react'
import { Button, Input } from 'antd'

class A extends Component {
    state = {
        c: 12
    }

    handleClick = () => {
        const { c } = this.state
        this.setState(s => ({ c: s.c + 1 }))
        // this.setState({ c: 4 })
        this.setState(s => ({ c: s.c + 1 }))
        this.setState({ c: 4 })
        this.setState({ c: 8 })
        // this.setState({ c: c + 12 })
        // this.setState({ c: c + 5 })
        // this.setState(s => ({ c: s.c + 1 }))
        console.log(this.state.c)
    }
    componentDidMount() {
        document.querySelector('.btn').addEventListener('click', this.handleClick)
    }

    render() {
        console.log('render -Com')
        return (
            <>
                <Input value={this.state.c} style={{ width: 240, marginBottom: 24 }} />
                <br />
                <Button className="btn" type="dashed" children="add count" />
            </>
        )
    }
}

//setState时同步获取state
const useSynchroState = initState => {
    const callref = useRef(null)
    const [value, setValue] = useState(initState)

    useEffect(() => {
        callref.current && callref.current(value)
    }, [value])

    return [
        value,
        (nextState, callback) => {
            setValue(nextState)
            callref.current = callback
        }
    ]
}

const Hook = () => {
    const Interval = useRef()
    const [count, setCount] = useState(0)
    const handleClick = () => {
        setCount(c => c + 1)
    }

    const callback = () => {
        const timer = setInterval(() => {
            setCount(c => c + 1)
            console.log(timer)
        }, 1000)
    }
    // const callback = useCallback(() => {
    //     let timer = setInterval(() => {
    //         setCount(c => c + 1)
    //         console.log(timer)
    //     }, 1000)
    // }, [])

    useEffect(() => {
        callback()
    }, [])

    console.log('render')

    return (
        <>
            {/* <A /> */}
            <Input value={count} style={{ width: 240, marginBottom: 24 }} />
            <br />
            <Button type="dashed" children="add count" onClick={handleClick} />
        </>
    )
}

export default Hook
