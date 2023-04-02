import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ProductListPage from './pages/ProductListPage';
import AdminProductsPage from './pages/Admin/AdminProductsPage';
import AdminCreateProductPage from './pages/Admin/AdminCreateProductPage';
import AdminEditProductPage from './pages/Admin/AdminEditProductPage';

import HeaderComponent from './Components/HeaderComponent';
import FooterComponent from './Components/FooterComponent';
import ProtectedRoute from './Authentication/ProtectedRoute';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <HeaderComponent />
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/products" element={<ProductListPage />} />

                    <Route element={<ProtectedRoute />}>
                        <Route
                            path="/manage_products"
                            element={<AdminProductsPage />}
                        />
                        <Route
                            path="/add_product"
                            element={<AdminCreateProductPage />}
                        />
                        <Route
                            path="/edit_product/:id"
                            element={<AdminEditProductPage />}
                        />{' '}
                    </Route>

                    <Route path="*" element="Page Does not Exist" />
                </Routes>
                <FooterComponent />
            </BrowserRouter>
        </div>
    );
}

export default App;
