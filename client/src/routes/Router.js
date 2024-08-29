import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import Activities from '../pages/Activities';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import Cities from '../pages/Cities';
//import ViewElement from '../pages/ViewElement';
import ViewActivity from '../pages/ViewActivity';
import ViewCity from '../pages/ViewCity';
//import UpdateElement from '../pages/UpdateElement';
import UpdateActivity from '../pages/UpdateActivity';
import UpdateCity from '../pages/UpdateCity';
import NewCity from '../pages/NewCity';
import NewActivity from '../pages/NewActivity';
import Login from '../pages/Login';
import UserProfile from '../pages/UserProfile';
import PrivateRoute from '../components/PrivateRoute';
import UsersPage from '../pages/Users';
import Register from '../pages/Register';

function Router() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout><Home /></Layout>} />
                <Route path="/activities" element={<Layout><Activities /></Layout>} />
                <Route path="/cities" element={<Layout><Cities /></Layout>} />
                {/* <Route path="/view/:collection/:id" element={<Layout><ViewElement /></Layout>} /> */}
                <Route path="/view/activity/:id" element={<Layout><ViewActivity /></Layout>} />
                <Route path="/view/city/:id" element={<Layout><ViewCity /></Layout>} />
                {/* <Route path="/update/:collection/:id" element={<PrivateRoute role="client"><Layout><UpdateElement /></Layout></PrivateRoute>} /> */}
                <Route path="/update/activity/:id" element={<PrivateRoute role="admin"><Layout><UpdateActivity /></Layout></PrivateRoute>} />
                <Route path="/update/city/:id" element={<PrivateRoute role="admin"><Layout><UpdateCity /></Layout></PrivateRoute>} />
                <Route path="/new/city" element={<PrivateRoute role="admin"><Layout><NewCity /></Layout></PrivateRoute>} />
                <Route path="/new/activity" element={<PrivateRoute role="admin"><Layout><NewActivity /></Layout></PrivateRoute>} />
                <Route path="/register" element={<Layout><Register /></Layout>} />
                <Route path="/login" element={<Layout><Login /></Layout>} />
                <Route path="/profile" element={<PrivateRoute role="client"><Layout><UserProfile /></Layout></PrivateRoute>} />
                <Route path="/users" element={<PrivateRoute role="admin"><Layout><UsersPage /></Layout></PrivateRoute>} />
                <Route path="*" element={<Layout><NotFound /></Layout>} />
            </Routes>
        </BrowserRouter>
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