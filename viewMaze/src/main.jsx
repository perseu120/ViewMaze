import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../public/index.css'
import App from './App.jsx'
import { GlobalProvider } from './context/Context.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </StrictMode>,
)
