import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AppProvider } from './context/AppContext.jsx'
createRoot(document.getElementById('root')).render(
  <BrowserRouter>   {/* 👈 wrap everything in the context provider */}
    <AppProvider>
      <App />
    </AppProvider>
  </BrowserRouter>
)
