import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import Activities from '../pages/Activities';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Cities from '../pages/Cities';
import ViewActivity from '../pages/ViewActivity';
import ViewElement from '../pages/ViewElement';
import UpdateActivity from '../pages/UpdateActivity';
import UpdateCity from '../pages/UpdateCity';
import NewCity from '../pages/NewCity';
import NewActivity from '../pages/NewActivity';
import Login from '../pages/Login';
import Logout from '../pages/Logout';
import UserProfile from '../pages/UserProfile';
import PrivateRoute from '../components/PrivateRoute';
import Register from '../pages/Register';
import Cart from '../pages/Cart';
import Contact from '../pages/Contact';
import About from '../pages/About';
import AddPets from '../pages/AddPets';
import { CartProvider } from '../context/CartContext';

function Router() {

    return (
        <CartProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout><Home /></Layout>} />
                    <Route path="/activities" element={<Layout><Activities /></Layout>} />
                    <Route path="/cities" element={<Layout><Cities /></Layout>} />
                    <Route path="/view/activities/:id" element={<Layout><ViewActivity /></Layout>} />
                    <Route path="/view/:collection/:id" element={<Layout><ViewElement /></Layout>} />
                    <Route path="/update/activities/:id" element={<PrivateRoute role="provider"><Layout><UpdateActivity /></Layout></PrivateRoute>} />
                    <Route path="/update/cities/:id" element={<PrivateRoute role="admin"><Layout><UpdateCity /></Layout></PrivateRoute>} />
                    <Route path="/new/city" element={<PrivateRoute role="admin"><Layout><NewCity /></Layout></PrivateRoute>} />
                    <Route path="/new/activity" element={<PrivateRoute role="provider"><Layout><NewActivity /></Layout></PrivateRoute>} />
                    <Route path="/register" element={<Layout><Register /></Layout>} />
                    <Route path="/login" element={<Layout><Login /></Layout>} />
                    <Route path="/logout" element={<Layout><Logout /></Layout>} />
                    <Route path="/profile" element={<Layout><UserProfile /></Layout>} />
                    <Route path="/add-pet" element={<PrivateRoute role="user"><Layout><AddPets /></Layout></PrivateRoute>} />
                    <Route path="/cart" element={<Layout><Cart /></Layout>} />
                    <Route path="/contact" element={<Layout><Contact /></Layout>} />
                    <Route path="/about" element={<Layout><About /></Layout>} />
                    <Route path="*" element={<Layout><NotFound /></Layout>} />
                </Routes>
            </BrowserRouter>
        </CartProvider>
    );
}

const Layout = ({ children }) => (
    <>
        <Header />
        {children}
        <Footer />
    </>
);

export default Router;