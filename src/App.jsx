

import './App.css'
import { Routes,Route } from 'react-router-dom'
import CreateBook from '../pages/CreateBooks'
import DeleteBook from "../pages/DeleteBook"
import EditBook from "../pages/EditBook"
import ShowBook from "../pages/ShowBook"
import Home from "../pages/Home"
import Login from "../pages/Login"
import SignUp from "../pages/SignUp"
import ProtectedRoute from "./ProtectedRoute"
function App() {


  return (
   <Routes>
    <Route path='/' element={<Home/>}/>
   <Route path='/login' element={<Login/>}/>
   <Route path='/signup' element={<SignUp/>}/>
   <Route path='/books/create' element={<ProtectedRoute><CreateBook/></ProtectedRoute>}/>
   <Route path='/books/details/:id' element={<ShowBook/>}/>
   <Route path='/books/edit/:id' element={<ProtectedRoute><EditBook/></ProtectedRoute>}/>
   <Route path='/books/delete/:id' element={<ProtectedRoute><DeleteBook/></ProtectedRoute>}/>
   </Routes>
  )
}

export default App
