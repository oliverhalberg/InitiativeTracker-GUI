import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

let data = await window.dataStoreAPI.loadTheme();

if (data === null) {
  //dark theme is the default
  data = 'dark';
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <App savedTheme={data}/>
  </StrictMode>,
)
