import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { ConfigProvider } from 'antd'
import GlobalStyleWrap from './GlobalStyle'
import './index.less'

ReactDOM.render(
    <GlobalStyleWrap>
        <ConfigProvider direction="ltr" autoInsertSpaceInButton={false}>
            <App />
        </ConfigProvider>
    </GlobalStyleWrap>,
    document.getElementById('root')
)
