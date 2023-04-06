import React from 'react'
import ReactDOM from 'react-dom/client'
import { router, RouterProvider } from './routes'
import MainLayout from './components/UI/layouts/MainLayout'
import { SkeletonTheme } from 'react-loading-skeleton';

import "./main.css"
import 'react-loading-skeleton/dist/skeleton.css'



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <SkeletonTheme 
     baseColor="#747a79"
     highlightColor='#818c8a'
    >
      <MainLayout>
        <RouterProvider router={router} />
      </MainLayout>
    </SkeletonTheme>
  </React.StrictMode>
)
