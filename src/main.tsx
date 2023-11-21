import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.css'
import {RouterProvider} from 'react-router-dom';
import router from './router/Router';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}  />
      
  </React.StrictMode>,
)

// Remove Preload scripts loading
postMessage({ payload: 'removeLoading' }, '*')

// Use contextBridge
window.ipcRenderer.on('main-process-message', (_event, message) => {
  console.log(message)
})
