import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AdminUsersPage from './pages/AdminUsersPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DailyPage from './pages/dailyPage';
import ProductsPage from './pages/productsPage';
import ProtectedRoute  from './ProtectedRoute';

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<h1>Home Page</h1>} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/daily' element={<DailyPage/>} />
         <Route element={<ProtectedRoute/>}>
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/adminuser' element={<AdminUsersPage />} />
          <Route path='/products' element={<ProductsPage/>} />
          <Route path='/getdaily/:id' element={<DailyPage/>} />
         </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
