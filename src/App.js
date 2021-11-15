import styled, { ThemeProvider } from 'styled-components'
// import { Button } from 'antd'
import Button from './components/Button'

const AppStyle = styled.div`
    margin: 120px auto;
    max-width: 1200px;
    width: 1200px;
    border: 1px dashed #a7a7a7;
    & > .container {
        width: 100%;
        height: 600px;
        padding: 48px;
        display: flex;
        flex-flow: row nowrap;
        /* justify-content: space-between; */
        align-content: center;
        align-items: flex-start;
    }
`

const theme = {
    default: {
        main: '#1890ff',
        hover: '#40a9ff',
        active: '#096dd9'
    }
}

export function App() {
    const handleClick = e => console.log(e.target.offsetLeft, e.target.tagName)
    return (
        <ThemeProvider theme={theme}>
            <AppStyle>
                <div className="container">
                    <Button type="primary" onClick={e => handleClick(e)}>
                        Primary Button
                    </Button>
                    {/* <AntButton>Primary Button</AntButton> */}
                    {/* <Button type="primary">Primary Button</Button>
                <Button>Default Button</Button>
                <Button type="dashed">Dashed Button</Button>
                <Button type="text">Text Button</Button> */}
                    {/* <Button type="link">Link Button</Button> */}
                </div>
            </AppStyle>
        </ThemeProvider>
    )
}
