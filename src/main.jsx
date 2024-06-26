import React from 'react'
import ReactDOM from 'react-dom/client'
import { MantineProvider } from '@mantine/core'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import SessionContextProvider from './contexts/SessionContext.jsx'

// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css'
import './styles/global.css'
import theme from './styles/theme.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
    <BrowserRouter>
    <SessionContextProvider>
        <App />
      </SessionContextProvider>
      </BrowserRouter>
    </MantineProvider>
  </React.StrictMode>
)
