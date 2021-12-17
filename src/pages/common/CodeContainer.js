import { useState, createElement } from 'react'
import { UnControlled as CodeMirror } from 'react-codemirror2'
import 'codemirror/mode/jsx/jsx'
// import 'codemirror/theme/material-darker.css'
import 'codemirror/theme/material-ocean.css'
import 'codemirror/lib/codemirror.css'
import { SnippetsOutlined, CheckOutlined } from '@ant-design/icons'
import { Divider } from 'antd'

export default function CodeContainer(props) {
    const [toggle, setToggle] = useState(false)
    const [copying, setCopying] = useState(false)
    const baseUrl = 'https://gw.alipayobjects.com/zos/antfincdn/'
    const { ViewJsx, title, detail, codeValue } = props
    return (
        <div className="code-container">
            <div className="code-view">
                {typeof ViewJsx === 'function' ? createElement(ViewJsx, null, null) : ViewJsx}
            </div>
            <div className="code-edit">
                <Divider orientation="left" plain>
                    {title}
                </Divider>
                <p>{detail}</p>
                <div className="copy-show-btn">
                    <span>{copying ? <CheckOutlined /> : <SnippetsOutlined />}</span>
                    <span onClick={() => setToggle(t => !t)} className="code-expand-icon">
                        <img
                            style={{ width: 16 }}
                            alt="expand code"
                            src={baseUrl + `${toggle ? 'Z5c7kzvi30/expand.svg' : '4zAaozCvUH/unexpand.svg'}`}
                        />
                    </span>
                </div>
                {toggle && (
                    <CodeMirror
                        className="code-mirror-item"
                        value={codeValue}
                        options={{
                            mode: { name: 'jsx', json: true },
                            theme: 'material-ocean',
                            lineNumbers: true
                        }}
                        onChange={(editor, data, value) => {}}
                    />
                )}
            </div>
        </div>
    )
}
