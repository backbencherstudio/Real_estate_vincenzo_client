
import { useEffect } from 'react'
import './App.css'
import MainLayout from './layout/MainLayout'

function App() {
  useEffect(()=>{
    window.scrollTo(0,0)
  },[])
  return (
    <div className='max-w-[1920px] mx-auto bg-green-600 ' >
     <MainLayout></MainLayout>
    </div>
  )
}

export default App
