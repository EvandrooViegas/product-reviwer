import React from 'react'
import ReactDOM from 'react-dom/client'
import { router, RouterProvider } from './routes'
import { MantineProvider } from '@mantine/core';
import "./main.css"
import 'react-loading-skeleton/dist/skeleton.css'

import "swiper/css"
import "swiper/css/pagination"


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>

      <MantineProvider 
        withGlobalStyles
        theme={{ 
          colorScheme: "dark",
          fontFamily: 'Poppins, sans-serif',
        }}
        
      >
          <RouterProvider router={router} />
      </MantineProvider>
  </React.StrictMode>
)
