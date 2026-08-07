// src/main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/styles/index.css'
import App from './App.jsx'
import { AppProvider } from '@/context/AppContext.jsx'
import { RoleProvider } from '@/context/RoleContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RoleProvider>
      <AppProvider>
        <App />
      </AppProvider>
    </RoleProvider>
  </StrictMode>,
)
