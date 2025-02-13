import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './components/context/ThemeContext.jsx'

let msg = 'b';

//window.test.onTestMessage((value) => msg = value);

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <App message={window.test.message}/>
  </StrictMode>,
)
