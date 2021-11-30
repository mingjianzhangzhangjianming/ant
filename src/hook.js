import { Component, useState, useEffect, useCallback, useRef, useLayoutEffect, memo } from 'react'
import { Button, Input } from 'antd'
// import { useInterval } from 'ahooks'

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

//定时器
const useInterval = (fn, delay, option) => {
    const immediate = option && option.immediate
    const fnRef = useRef()
    fnRef.current = fn //fn 必须通过current绑定
    console.log('children hook render')
    useEffect(() => {
        if (delay === undefined || delay === null || typeof fnRef.current !== 'function') return
        if (immediate) fnRef.current()
        let timer = setInterval(() => {
            fnRef.current()
        }, delay)
        return () => {
            clearInterval(timer)
        }
    }, [delay])
}

const HookChildren = memo(() => {
    console.log('Hookchildren ->>> render')
    return (
        <>
            <h4>chiildren 组件</h4>
        </>
    )
})

const Hook = () => {
    let timer = null
    let num = 0
    const [count, setCount] = useState(100)
    const [delay, setDelay] = useState(500)
    const countRef = useRef(0)
    const handleClick = () => {
        setCount(c => c + 1)
    }

    // useInterval(
    //     () => {
    //         setCount(count)
    //     },
    //     delay,
    //     { immediate: true }
    // )
    // useLayoutEffect(() => {
    //     console.log(
    //         'useLayoutEffect >>>> 在渲染前同步调用 页面不闪烁 但严重阻塞浏览器渲染进程等待该副作用执行完成后才触发渲染更新 一般不推荐使用'
    //     )
    //     if (count === 0) {
    //         for (;;) {
    //             num++
    //             console.log(num)
    //             if (num == 8000) {
    //                 break
    //             }
    //         }
    //         setCount(Date.now())
    //     }
    // }, [count])
    // useEffect(() => {
    //     console.log(count, 'useEffect 页面可能闪烁两次 setCount 更新一次渲染一次 是在渲染后异步调用的 不会阻塞渲染线程')
    //     if (count === 0) {
    //         for (;;) {
    //             num++
    //             console.log(num)
    //             if (num == 8000) {
    //                 break
    //             }
    //         }
    //         setCount(Date.now())
    //     }
    // })

    return (
        <>
            {/* <A /> */}
            {/* <Input value={count} style={{ width: 240, marginBottom: 24 }} /> */}
            <br />
            {count}
            <HookChildren />
            <Button style={{ marginRight: 36 }} type="primary" children="add count" onClick={handleClick} />
            <Button
                style={{ marginRight: 36 }}
                type="primary"
                children="setInterval  + 500"
                onClick={() => {
                    setDelay(d => d + 500)
                }}
            />
            <Button
                style={{ marginRight: 36 }}
                type="primary"
                children="setInterval + reset"
                onClick={() => {
                    setDelay(500)
                }}
            />
            <Button
                style={{ marginRight: 36 }}
                type="primary"
                children="setInterval stop"
                onClick={() => {
                    setDelay(null)
                }}
            />
            <br />
            <Button style={{ margin: 36 }} type="primary" children="setInterval stop" onClick={() => setCount(0)} />
        </>
    )
}

export default Hook
