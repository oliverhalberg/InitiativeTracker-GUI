import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

let data = window.dataStoreAPI.savedTheme;

if (data === null) {
  //Dark theme is the default if no saved data is present
  data = 'dark';
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <App savedTheme={data}/>
  </StrictMode>,
)
