// src/App.tsx (updated)
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import AppLayout from './layouts/AppLayout';
import ProductsPage from './pages/Products/ProductsPage';
import CartPage from './pages/Cart/CartPage';
import PrivateRoute from './components/privateRoute';
import { LoginPage } from './pages/Login/LoginPage';
import { AuthRepository } from './features/repository/AuthRepository';
import type { User } from './features/entity/user';
import ProductDetail from './pages/Product/ProductDetail';

const App: React.FC = () => {
  const [user, setUser] = React.useState<User | null>(); // You can later replace this with actual login state

  useEffect(() => {
    const storedUser = AuthRepository.currentUser();
    console.log(storedUser)
    setUser(storedUser);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<ProductsPage/>} />
          <Route path='/login' element={<LoginPage />} />

          <Route
            path="/products"
            element={
              <PrivateRoute user={user}>
                <ProductsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/products/:id"
            element={
              <PrivateRoute user={user}>
                <ProductDetail />
              </PrivateRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <PrivateRoute user={user}>
                <CartPage />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
