// src/components/LogoutIcon.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa'; // Puedes usar cualquier icono que prefieras

const LogoutIcon = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Elimina el token de acceso del localStorage
        localStorage.removeItem('accessToken');


        // Redirige al usuario a la página de inicio
        navigate('/');
    };

    return (
        <button onClick={handleLogout} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            <FaSignOutAlt size={18} />
        </button>
    );
};

export default LogoutIcon;
