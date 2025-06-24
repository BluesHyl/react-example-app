import { useState } from 'react'
import Login from '@/pages/Login/Index.tsx'
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
