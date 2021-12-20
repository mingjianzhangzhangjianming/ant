import { useEffect } from 'react'
import { HashRouter, Routes, Route, useNavigate } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import PageLayout from 'pages/layout'
import Switch from 'pages/view/Switch'
import Drawer from 'pages/view/Drawer'
import Form from 'pages/view/Form'

const theme = {
    default: {
        main: '#1890ff',
        hover: '#40a9ff',
        active: '#096dd9'
    }
}

function Tit() {
    const history = useNavigate()
    return (
        <>
            <h4 style={{ width: '100%', height: 900 }}>react-route-dom 6.1</h4>
        </>
    )
}

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <HashRouter>
                <Routes>
                    <Route path="/" element={<PageLayout />}>
                        <Route index caseSensitive path="button" element={<Tit />} />
                        <Route path="switch" element={<Switch />} />
                        <Route path="drawer" element={<Drawer />} />
                        <Route path="form" element={<Form />} />
                    </Route>
                </Routes>
            </HashRouter>
        </ThemeProvider>
    )
}
