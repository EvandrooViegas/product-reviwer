import React, { useEffect } from 'react'
import Navbar from '../navbar/Navbar'
import { useData } from '../../../stores/useData'
import { shallow } from "zustand/shallow"
import getApp from '../../../services/getApp'
import Skeleton from '../Skeleton'
import { layoutConfig } from "../../../../config"

interface IProps {
    children: React.ReactNode
}

export default function MainLayout({ children }:IProps) {
  const { setApp, app } = useData((s) => ({ ...s }), shallow)
  useEffect(() => {
      getApp().then(r => {
        setApp(r)
      })
  }, [])
  return (
    <div className='gradient-background min-h-screen flex justify-center'>
      <div style={{ maxWidth: layoutConfig.maxWidth + 30 }} className={`flex flex-col w-full `}>
          <Navbar className='bg-glass flex items-center justify-between px-4 py-3 w-full rounded-df mt-14'>
            <Skeleton 
            skeletonStyle={{ borderRadius: "35px" }} 
            renderwhen={!!app?.avatar} 
            className='w-20 h-20 rounded-df' 
            >
              <img src={app?.avatar} className='rounded-df fade-in' /> 
            </Skeleton>
            <Skeleton renderwhen={!!app?.name} rounded skeletonOptions={{ width: "150px", height: "20px" }}>
              <p className='font-bold text-2xl mr-4'>{app?.name}</p>
            </Skeleton>
          </Navbar>
          {children}
      </div>
    </div>
  )
}
