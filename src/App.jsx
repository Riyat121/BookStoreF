import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import CreateBook from '../pages/CreateBooks';
import DeleteBook from "../pages/DeleteBook";
import EditBook from "../pages/EditBook";
import ShowBook from "../pages/ShowBook";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";

// ProtectedRoute component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Routes>
      {/* Default Home route */}
      <Route path='/' element={<Home />} />

      {/* Auth routes */}
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<SignUp />} />

      {/* Protected book routes */}
      <Route path='/books/create' element={<ProtectedRoute><CreateBook /></ProtectedRoute>} />
      <Route path='/books/edit/:id' element={<ProtectedRoute><EditBook /></ProtectedRoute>} />
      <Route path='/books/delete/:id' element={<ProtectedRoute><DeleteBook /></ProtectedRoute>} />

      {/* Public book details */}
      <Route path='/books/details/:id' element={<ShowBook />} />

      {/* Catch-all route: redirect unknown paths to Home */}
      <Route path='*' element={<Navigate to='/' replace />} />
    </Routes>
  );
}

export default App;
