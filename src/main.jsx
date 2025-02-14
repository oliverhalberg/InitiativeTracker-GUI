import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './components/context/ThemeContext.jsx'
//import Store from 'electron-store';

//const store = new Store();

let data = await window.dataStoreAPI.loadTheme();
if (data === null) {
  data = 'default';
}


createRoot(document.getElementById('root')).render(
  <StrictMode>
      <App savedTheme={data}/>
  </StrictMode>,
)
