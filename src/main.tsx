import React from 'react'
import ReactDOM from 'react-dom/client'
import { router, RouterProvider } from './routes'
import "./main.css"

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
