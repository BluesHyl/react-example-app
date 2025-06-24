import { useState } from 'react'
import Login from '@/views/Pages/Login/Index.tsx'
import { RouterProvider } from 'react-router'
import { router } from '@/router/index.ts'

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
