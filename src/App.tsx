import './App.css'

import Header from './components/Header'
import Footer from './components/Footer'

import Lotto from './lotto/Lotto'
import FestivalGallery from './festival/FestivalGallery'
import FestivalContents from './festival/FestivalContents'
import TodoList from './todolist/TodoList'
import Login from './login/Login'
import Test from './test_ts/Test'

import { Routes, Route, BrowserRouter } from "react-router-dom"

function App() {
  return (
    <div className='w-full h-screen flex flex-col overflow-y-hidden'>
      <BrowserRouter>
        <Header />
        <main className='container mx-auto flex flex-col grow overflow-y-auto'>
          <Routes>
            <Route path="/" element={<Login />}></Route>          
            <Route path="/lotto" element={<Lotto />}></Route>
            <Route path="/FestivalGallery" element={<FestivalGallery />}></Route>
            <Route path="/FestivalGallery/Contents" element={<FestivalContents />}></Route>
            <Route path='/TodoList' element={<TodoList />}></Route>
            <Route path='/Test' element={<Test />}></Route>       
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
